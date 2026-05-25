import { NextRequest, NextResponse } from 'next/server';
import { generateInquiryId } from '@/lib/inquiry-types';
import type { InquiryData } from '@/lib/inquiry-types';
import { checkRateLimit } from '@/lib/rate-limit';
import { isSpamHoneypot, validateInquiryForm, checkTiming } from '@/lib/antispam';
import { sendInquiryNotification, sendAutoReply } from '@/lib/mailer';

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  const { allowed, retryAfter } = checkRateLimit(ip, 5, 60_000);
  if (!allowed) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.', retryAfter },
      { status: 429 },
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: 'Invalid form data.' }, { status: 400 });
  }

  if (isSpamHoneypot(formData)) {
    return NextResponse.json({ error: 'Spam detected.' }, { status: 400 });
  }

  const validationError = validateInquiryForm(formData);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const timestamp = parseInt(String(formData.get('_timestamp') || '0'), 10);
  if (timestamp && !checkTiming(timestamp, 3)) {
    return NextResponse.json(
      { error: 'Please take your time filling out the form.' },
      { status: 400 },
    );
  }

  const id = generateInquiryId();
  const submittedAt = new Date().toISOString();

  const attachments: string[] = [];
  const uploadedFiles = formData.getAll('attachments');
  for (const file of uploadedFiles) {
    if (file instanceof File) {
      attachments.push(file.name);
    }
  }

  const inquiry: InquiryData = {
    id,
    name: String(formData.get('name') || '').trim(),
    email: String(formData.get('email') || '').trim(),
    company: String(formData.get('company') || '').trim(),
    country: String(formData.get('country') || '').trim(),
    phone: String(formData.get('phone') || '').trim(),
    quantity: String(formData.get('quantity') || '').trim(),
    productName: String(formData.get('productName') || '').trim(),
    productUrl: String(formData.get('productUrl') || '').trim(),
    sku: String(formData.get('sku') || '').trim(),
    category: String(formData.get('category') || '').trim(),
    message: String(formData.get('message') || '').trim(),
    urgency: (String(formData.get('urgency') || 'medium').trim() as InquiryData['urgency']) || 'medium',
    source: (String(formData.get('source') || 'product_page').trim() as InquiryData['source']) || 'product_page',
    attachments,
    status: 'new',
    submittedAt,
    crm: {
      leadSource: `website_${String(formData.get('source') || 'product_page').trim()}`,
      leadStatus: 'new',
      companySize: String(formData.get('companySize') || '').trim(),
      industry: 'automotive',
    },
  };

  console.log('=== NEW INQUIRY ===');
  console.log(JSON.stringify(inquiry, null, 2));
  console.log('===================');

  sendInquiryNotification(inquiry).catch((err) =>
    console.error('Notification failed:', err),
  );
  sendAutoReply(inquiry).catch((err) =>
    console.error('Auto-reply failed:', err),
  );

  return NextResponse.json({ success: true, id });
}
