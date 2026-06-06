const HONEYPOT_FIELDS = ['_website', '_url', '_hidden', '_hp'] as const;

export function getHoneypotFieldName(): string {
  return HONEYPOT_FIELDS[0];
}

export function isSpamHoneypot(formData: FormData): boolean {
  for (const field of HONEYPOT_FIELDS) {
    const value = formData.get(field);
    if (value && String(value).trim().length > 0) {
      return true;
    }
  }
  return false;
}

export function validateInquiryForm(formData: FormData): string | null {
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || name.length < 2) {
    return 'Please enter your full name.';
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address.';
  }
  if (!message || message.length < 10) {
    return 'Please enter a message (at least 10 characters).';
  }

  return null;
}

export function checkTiming(timestamp: number, minSeconds: number): boolean {
  const elapsed = (Date.now() - timestamp) / 1000;
  return elapsed >= minSeconds;
}
