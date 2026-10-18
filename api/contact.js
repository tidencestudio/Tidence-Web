import nodemailer from 'nodemailer';
import { handleEnquiry, readConfig } from './_lib/enquiry.js';

/**
 * POST /api/contact: the enquiry form's endpoint (Vercel serverless function).
 *
 * Checks the fields, verifies the reCAPTCHA v3 token with Google, then emails
 * the enquiry to the studio inbox through SMTP with Nodemailer, with the
 * visitor as reply-to. Settings come from Vercel environment variables:
 *
 *   SMTP_USER, SMTP_PASS   the sending account (for Gmail, an app password)
 *   RECAPTCHA_SECRET       the reCAPTCHA v3 secret key
 *   SMTP_HOST, SMTP_PORT   optional; default smtp.gmail.com and 465
 *   MAIL_TO                optional; defaults to SMTP_USER
 *   RECAPTCHA_MIN_SCORE    optional; defaults to 0.5
 *
 * The page calls it same-origin and sends no CORS headers, so other sites'
 * browsers cannot post to it. Any failure answers with a short error code and
 * the page falls back to opening the visitor's email app.
 */
let transport;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method' });
  }

  const config = readConfig();
  if (config && !transport) transport = nodemailer.createTransport(config.smtp);

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined;
  const { status, body } = await handleEnquiry(req.body, {
    config,
    ip,
    sendMail: (mail) => transport.sendMail(mail),
  });

  if (status >= 500) console.error('contact:', body.error);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(status).json(body);
}
