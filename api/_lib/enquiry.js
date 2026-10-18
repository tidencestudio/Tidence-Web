// The enquiry form's server side, kept apart from the Vercel handler so it can
// be tested with a fake mailer and a fake reCAPTCHA. Files under api/_lib are
// not deployed as functions of their own.

export const NEEDS = ['website', 'crm', 'automation', 'other'];

const LIMITS = { name: 120, email: 200, needLabel: 60, details: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (value, max) => String(value ?? '').replace(/\r\n?/g, '\n').trim().slice(0, max);

/**
 * Checks and tidies what the browser sent. Returns { data } or { error },
 * where error is a short code the page maps to a message.
 */
export function readEnquiry(body) {
  if (!body || typeof body !== 'object') return { error: 'bad-request' };

  const data = {
    name: clean(body.name, LIMITS.name),
    email: clean(body.email, LIMITS.email),
    need: NEEDS.includes(body.need) ? body.need : 'other',
    needLabel: clean(body.needLabel, LIMITS.needLabel),
    details: clean(body.details, LIMITS.details),
    lang: body.lang === 'es' ? 'es' : 'en',
    token: String(body.token ?? ''),
    honey: Boolean(body.botcheck),
  };

  if (!data.name) return { error: 'name' };
  if (!EMAIL_RE.test(data.email)) return { error: 'email' };
  if (!data.token && !data.honey) return { error: 'captcha' };
  return { data };
}

/**
 * Asks Google whether the reCAPTCHA v3 token is real, came from the enquiry
 * action, and scored as a person. `fetchImpl` is injectable for tests.
 */
export async function verifyCaptcha({ token, ip, secret, minScore = 0.5, fetchImpl = fetch }) {
  const res = await fetchImpl('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token, ...(ip ? { remoteip: ip } : {}) }).toString(),
  });
  const result = await res.json().catch(() => ({}));
  const ok = result.success === true && result.action === 'enquiry' && Number(result.score) >= minScore;
  return { ok, score: result.score, codes: result['error-codes'] ?? [] };
}

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

/** The email the studio receives. Reply goes straight to the visitor. */
export function composeMail(data, { to, from }) {
  const need = data.needLabel || data.need;
  const subject = `${data.lang === 'es' ? 'Consulta' : 'Enquiry'} desde tidence.dev: ${need} (${data.name})`;
  const lines = [
    `Nombre / Name: ${data.name}`,
    `Correo / Email: ${data.email}`,
    `Necesita / Needs: ${need}`,
    `Idioma / Language: ${data.lang}`,
    '',
    data.details || '(sin mensaje / no message)',
  ];
  const html = `
    <table style="font:15px/1.5 Arial,sans-serif;color:#070F12">
      <tr><td style="padding:2px 12px 2px 0;color:#4a6561">Nombre</td><td><strong>${escapeHtml(data.name)}</strong></td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#4a6561">Correo</td><td><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#4a6561">Necesita</td><td>${escapeHtml(need)}</td></tr>
      <tr><td style="padding:2px 12px 2px 0;color:#4a6561">Idioma</td><td>${data.lang}</td></tr>
    </table>
    <p style="font:15px/1.6 Arial,sans-serif;color:#070F12;white-space:pre-wrap;margin-top:16px">${escapeHtml(data.details || '(sin mensaje)')}</p>
    <p style="font:12px Arial,sans-serif;color:#4a6561;margin-top:24px">Enviado desde el formulario de tidence.dev. Responde a este correo para escribirle directamente.</p>`;

  return {
    from,
    to,
    replyTo: { name: data.name, address: data.email },
    subject,
    text: lines.join('\n'),
    html,
  };
}

/** Reads the function's settings from the environment, or null if incomplete. */
export function readConfig(env = process.env) {
  const user = env.SMTP_USER;
  const pass = env.SMTP_PASS;
  const secret = env.RECAPTCHA_SECRET;
  if (!user || !pass || !secret) return null;
  const port = Number(env.SMTP_PORT || 465);
  return {
    smtp: {
      host: env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user, pass },
    },
    to: env.MAIL_TO || user,
    from: { name: 'Tidence web', address: user },
    secret,
    minScore: Number(env.RECAPTCHA_MIN_SCORE || 0.5),
  };
}

/**
 * The whole request, minus HTTP: validate, check the captcha, send. Returns
 * { status, body }. The honeypot is answered as a success and dropped, so a
 * bot learns nothing.
 */
export async function handleEnquiry(body, { config, ip, sendMail, fetchImpl }) {
  if (!config) return { status: 503, body: { ok: false, error: 'not-configured' } };

  const { data, error } = readEnquiry(body);
  if (error) return { status: 400, body: { ok: false, error } };
  if (data.honey) return { status: 200, body: { ok: true } };

  const captcha = await verifyCaptcha({
    token: data.token,
    ip,
    secret: config.secret,
    minScore: config.minScore,
    fetchImpl,
  });
  if (!captcha.ok) return { status: 403, body: { ok: false, error: 'captcha' } };

  try {
    await sendMail(composeMail(data, { to: config.to, from: config.from }));
  } catch {
    return { status: 502, body: { ok: false, error: 'send' } };
  }
  return { status: 200, body: { ok: true } };
}
