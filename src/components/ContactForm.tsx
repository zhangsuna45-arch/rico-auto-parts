'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { InquirySuccess } from '@/components/InquirySuccess';
import { getHoneypotFieldName } from '@/lib/antispam';

export function ContactForm() {
  const t = useTranslations('forms');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    country: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const timestampRef = useRef(Date.now());
  const honeypotName = getHoneypotFieldName();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError(null);

    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('email', formData.email);
    payload.append('phone', formData.phone);
    payload.append('company', formData.company);
    payload.append('country', formData.country);
    payload.append('message', formData.message);
    payload.append('source', 'contact_page');
    payload.append('_timestamp', String(timestampRef.current));

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        body: payload,
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        setSubmitting(false);
        return;
      }

      setSuccessId(data.id);
      setFormData({ name: '', email: '', phone: '', company: '', country: '', message: '' });
      setSubmitting(false);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 600,
    color: '#374151',
    marginBottom: '6px',
  };

  if (successId) {
    return (
      <InquirySuccess
        referenceId={successId}
        onClose={() => setSuccessId(null)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <input
          type="text"
          name={honeypotName}
          tabIndex={-1}
          autoComplete="off"
          onChange={() => {}}
        />
      </div>

      {error && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <label htmlFor="name" style={labelStyle}>
          {t('fullName')}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="John Doe"
          disabled={submitting}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label htmlFor="email" style={labelStyle}>
            {t('email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
            placeholder="john@company.com"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="phone" style={labelStyle}>
            {t('phone')}
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
            placeholder="+1 (555) 123-4567"
            disabled={submitting}
          />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div>
          <label htmlFor="company" style={labelStyle}>
            {t('company')}
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            style={inputStyle}
            placeholder="Your Company"
            disabled={submitting}
          />
        </div>

        <div>
          <label htmlFor="country" style={labelStyle}>
            {t('country')}
          </label>
          <input
            type="text"
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={inputStyle}
            placeholder="United States"
            disabled={submitting}
          />
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label htmlFor="message" style={labelStyle}>
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          style={{ ...inputStyle, resize: 'vertical' }}
          placeholder="Tell us about your requirements..."
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={submitting}
        style={{
          width: '100%',
          background: submitting ? '#93c5fd' : '#2563eb',
          color: '#fff',
          border: 'none',
          padding: '14px 24px',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '16px',
          cursor: submitting ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
        }}
      >
        {submitting ? t('sending') : t('sendInquiry')}
      </button>
    </form>
  );
}
