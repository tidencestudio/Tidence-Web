// node --test api/_lib/enquiry.test.js  (or: npm run test:api)
// The enquiry pipeline with a fake reCAPTCHA and a fake mailer: nothing is
// sent and nothing reaches Google.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import nodemailer from 'nodemailer';
import { composeMail, handleEnquiry, readConfig, readEnquiry } from './enquiry.js';

const config = readConfig({ SMTP_USER: 'studio@example.com', SMTP_PASS: 'x', RECAPTCHA_SECRET: 's' });

const google = (verdict) => async (url, init) => {
  assert.equal(url, 'https://www.google.com/recaptcha/api/siteverify');
  assert.match(init.body, /secret=s/);
  return { json: async () => verdict };
};

const good = {
  name: 'Ana Rojas',
  email: 'ana@empresa.com',
  need: 'crm',
  needLabel: 'CRM',
  details: 'Necesito un CRM\r\npara 3 vendedores.',
  lang: 'es',
  token: 'tok',
};

test('a real enquiry is verified and mailed to the studio, reply-to the visitor', async () => {
  const sent = [];
  const out = await handleEnquiry(good, {
    config,
    ip: '1.2.3.4',
    fetchImpl: google({ success: true, action: 'enquiry', score: 0.9 }),
    sendMail: async (mail) => sent.push(mail),
  });
  assert.deepEqual(out, { status: 200, body: { ok: true } });
  assert.equal(sent.length, 1);
  assert.equal(sent[0].to, 'studio@example.com');
  assert.deepEqual(sent[0].replyTo, { name: 'Ana Rojas', address: 'ana@empresa.com' });
  assert.match(sent[0].subject, /Consulta desde tidence\.dev: CRM \(Ana Rojas\)/);
  assert.match(sent[0].text, /Necesito un CRM\npara 3 vendedores\./);
});

test('a low reCAPTCHA score, wrong action or failed check is refused and nothing is sent', async () => {
  for (const verdict of [
    { success: true, action: 'enquiry', score: 0.2 },
    { success: true, action: 'login', score: 0.9 },
    { success: false, 'error-codes': ['invalid-input-response'] },
  ]) {
    let sent = 0;
    const out = await handleEnquiry(good, { config, fetchImpl: google(verdict), sendMail: async () => sent++ });
    assert.equal(out.status, 403);
    assert.equal(out.body.error, 'captcha');
    assert.equal(sent, 0);
  }
});

test('missing or bad fields are rejected before Google is asked', async () => {
  const never = async () => assert.fail('should not call Google');
  for (const [body, error] of [
    [{ ...good, name: '  ' }, 'name'],
    [{ ...good, email: 'not-an-email' }, 'email'],
    [{ ...good, token: '' }, 'captcha'],
    [null, 'bad-request'],
  ]) {
    const out = await handleEnquiry(body, { config, fetchImpl: never, sendMail: never });
    assert.equal(out.status, 400);
    assert.equal(out.body.error, error);
  }
});

test('the honeypot is answered as a success and dropped', async () => {
  const never = async () => assert.fail('should not send');
  const out = await handleEnquiry({ ...good, token: '', botcheck: 'on' }, { config, fetchImpl: never, sendMail: never });
  assert.deepEqual(out, { status: 200, body: { ok: true } });
});

test('without settings the function says so instead of failing silently', async () => {
  assert.equal(readConfig({ SMTP_USER: 'a' }), null);
  const out = await handleEnquiry(good, { config: null });
  assert.deepEqual(out, { status: 503, body: { ok: false, error: 'not-configured' } });
});

test('a mail server failure is reported as a send error', async () => {
  const out = await handleEnquiry(good, {
    config,
    fetchImpl: google({ success: true, action: 'enquiry', score: 0.9 }),
    sendMail: async () => {
      throw new Error('smtp down');
    },
  });
  assert.deepEqual(out, { status: 502, body: { ok: false, error: 'send' } });
});

test('visitor text is escaped in the HTML email and lengths are capped', () => {
  const { data } = readEnquiry({ ...good, name: '<b>x</b>', details: 'a'.repeat(9000) });
  const mail = composeMail(data, { to: 't', from: 'f' });
  assert.match(mail.html, /&lt;b&gt;x&lt;\/b&gt;/);
  assert.equal(data.details.length, 5000);
});

test('the composed message is something Nodemailer accepts', async () => {
  const { data } = readEnquiry(good);
  const transport = nodemailer.createTransport({ jsonTransport: true });
  const info = await transport.sendMail(composeMail(data, config));
  const message = JSON.parse(info.message);
  assert.equal(message.replyTo[0].address, 'ana@empresa.com');
  assert.equal(message.from.address, 'studio@example.com');
});
