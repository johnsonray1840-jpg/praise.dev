import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Praise Godswill <hello@praise.dev>',
      to: [to],
      subject,
      html,
    });

    if (error) {
      console.error('Email error:', error);
      throw new Error('Failed to send email');
    }

    return data;
  } catch (error) {
    console.error('Email service error:', error);
    throw error;
  }
};

export const sendContactEmail = async (name: string, email: string, message: string) => {
  const html = `
    <h2>New Contact Message</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Message:</strong></p>
    <p>${message}</p>
  `;

  return sendEmail(
    'Praisegodswill23@gmail.com', // Your email
    `New Message from ${name}`,
    html
  );
};