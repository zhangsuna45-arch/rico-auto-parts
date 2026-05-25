import nodemailer from 'nodemailer';
import type { InquiryData } from './inquiry-types';

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendInquiryNotification(inquiry: InquiryData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || 'suwenz0716@gmail.com';
  const user = process.env.SMTP_USER;
  const transporter = getTransporter();

  const subject = `New Inquiry from ${inquiry.name} - ${inquiry.productName || 'General'}`;
  const body = `
New inquiry received from Rico Car Accessories website:

Name: ${inquiry.name}
Email: ${inquiry.email}
Phone: ${inquiry.phone || 'N/A'}
Company: ${inquiry.company || 'N/A'}
Country: ${inquiry.country || 'N/A'}
Product: ${inquiry.productName || 'N/A'} (SKU: ${inquiry.sku || 'N/A'})
Category: ${inquiry.category || 'N/A'}
Quantity: ${inquiry.quantity || 'N/A'}
Urgency: ${inquiry.urgency}
Source: ${inquiry.source}
Message: ${inquiry.message}
Reference ID: ${inquiry.id}
Attachments: ${inquiry.attachments.length > 0 ? inquiry.attachments.join(', ') : 'None'}

Submitted: ${inquiry.submittedAt}
  `.trim();

  if (transporter) {
    try {
      await transporter.sendMail({
        from: user,
        to: adminEmail,
        subject,
        text: body,
      });
    } catch (err) {
      console.error('Failed to send admin notification:', err);
    }
  }

  console.log('=== INQUIRY NOTIFICATION ===');
  console.log(body);
  console.log('============================');
}

export async function sendAutoReply(inquiry: InquiryData): Promise<void> {
  const transporter = getTransporter();
  const user = process.env.SMTP_USER;

  const subject = `Thank you for your inquiry - Rico Car Accessories [${inquiry.id}]`;
  const body = `
Dear ${inquiry.name},

Thank you for your interest in ${inquiry.productName || 'our products'}.

Our team has received your inquiry and will respond within 24 hours.

Your reference ID: ${inquiry.id}

If you have any urgent questions, please contact us via WhatsApp: +86 19854054842

Best regards,
Rico Car Accessories Team
https://www.ricoautoparts.com
  `.trim();

  if (transporter && user) {
    try {
      await transporter.sendMail({
        from: user,
        to: inquiry.email,
        subject,
        text: body,
      });
    } catch (err) {
      console.error('Failed to send auto-reply:', err);
    }
  }

  console.log('=== AUTO-REPLY ===');
  console.log(`To: ${inquiry.email}`);
  console.log(body);
  console.log('==================');
}
