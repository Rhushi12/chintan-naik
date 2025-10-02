const { Resend } = require('resend');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: 'Missing required fields' });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const toEmail = process.env.TO_EMAIL || 'contact@chintannaik.com';
    const fromEmail = process.env.FROM_EMAIL || 'website@resend.dev';

    const subject = `New inquiry from ${name}`;
    const html = `
      <h2>New Website Inquiry</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap">${message}</p>
    `;

    await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      reply_to: email,
      subject,
      html,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact api error', err);
    return res.status(500).json({ ok: false, error: 'Internal server error' });
  }
};
