import { Router } from 'express';
import Message from '../models/Message';
import { Resend } from 'resend';
import { createRateLimiter } from '../middleware/rateLimiter';

const router = Router();

const contactLimiter = createRateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 5,
  message: 'Too many contact messages sent. Please wait a few minutes before trying again.',
});

// Only create the Resend client if the API key is provided
const resendApiKey = process.env.RESEND_API_KEY;
let resend: Resend | null = null;
if (resendApiKey) {
  try {
    resend = new Resend(resendApiKey);
  } catch (error) {
    console.warn('Invalid or missing Resend API key. Email sending disabled.');
    resend = null;
  }
}

router.post('/', contactLimiter, async (req, res) => {
  try {
    const { name, email, body } = req.body;

    if (!name || !email || !body) {
      return res.status(400).json({ error: 'Missing required fields: name, email, body' });
    }

    // Always save the message to MongoDB
    await Message.create({ name, email, body });

    // Only attempt to send email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: 'ctcorporationbusiness.com', // Replace with your verified Resend domain
          to: 'praisegodswill23@gmail.com',       // Replace with your real email
          subject: `New message from ${name}`,
          text: `${body}\n\nReply to: ${email}`,
        });
      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Don't fail the request; message is already saved
      }
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Contact route error:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

export default router;