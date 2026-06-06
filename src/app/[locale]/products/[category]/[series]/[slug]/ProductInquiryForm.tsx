'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { InquirySuccess } from '@/components/InquirySuccess';
import { getHoneypotFieldName } from '@/lib/antispam';

interface ProductInquiryFormProps {
  productName: string;
  productUrl?: string;
  sku?: string;
  category?: string;
}

export function ProductInquiryForm({
  productName,
  productUrl,
  sku,
  category,
}: ProductInquiryFormProps) {
  const t = useTranslations('forms');
  const dt = useTranslations('productDetail');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    country: '',
    quantity: '',
    message: `I am interested in ${productName}. Please send me more information.`,
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);
  const timestampRef = useRef(Date.now());
  const honeypotName = getHoneypotFieldName();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
    payload.append('company', formData.company);
    payload.append('country', formData.country);
    payload.append('quantity', formData.quantity);
    payload.append('message', formData.message);
    payload.append('productName', productName);
    payload.append('productUrl', productUrl || '');
    payload.append('sku', sku || '');
    payload.append('category', category || '');
    payload.append('source', 'product_page');
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
      setFormData({
        name: '',
        email: '',
        company: '',
        country: '',
        quantity: '',
        message: `I am interested in ${productName}. Please send me more information.`,
      });
      setSubmitting(false);
    } catch {
      setError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  const inputS: React.CSSProperties = {
    width: '100%',
    padding: '14px 18px',
    border: '1px solid #e2e8f0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontFamily: 'inherit',
    transition: 'border-color 0.2s, background 0.2s',
    background: '#f8fafc',
    color: '#0f172a',
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#2563eb';
    e.target.style.background = '#fff';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderColor = '#e2e8f0';
    e.target.style.background = '#f8fafc';
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
            borderRadius: '12px',
            marginBottom: '16px',
            fontSize: '14px',
          }}
        >
          {error}
        </div>
      )}

      <div style={{ marginBottom: '16px' }}>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          required
          style={inputS}
          placeholder={t('fullName')}
          disabled={submitting}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          required
          style={inputS}
          placeholder={t('email')}
          disabled={submitting}
        />
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          style={inputS}
          placeholder={t('company')}
          disabled={submitting}
        />
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
          marginBottom: '16px',
        }}
      >
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          style={inputS}
          placeholder={t('country')}
          disabled={submitting}
        />
        <input
          type="text"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          style={inputS}
          placeholder={t('quantity')}
          disabled={submitting}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          onFocus={focusStyle}
          onBlur={blurStyle}
          rows={4}
          style={{ ...inputS, resize: 'vertical' }}
          placeholder={t('message')}
          disabled={submitting}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: '100%',
            background: submitting ? '#93c5fd' : '#2563eb',
            color: '#fff',
            border: 'none',
            padding: '16px 28px',
            borderRadius: '14px',
            fontWeight: 800,
            fontSize: '16px',
            cursor: submitting ? 'not-allowed' : 'pointer',
            letterSpacing: '0.5px',
            transition: 'background 0.2s',
          }}
        >
          {submitting ? t('sending') : t('sendInquiry')}
        </button>
        <a
          href={`https://wa.me/8619854054842?text=${encodeURIComponent(`Hi, I am interested in ${productName}`)}`}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            textAlign: 'center',
            padding: '14px 28px',
            background: '#fff',
            color: '#25D366',
            border: '2px solid #25D366',
            borderRadius: '14px',
            fontWeight: 800,
            fontSize: '15px',
            textDecoration: 'none',
          }}
        >
          {dt('whatsAppInquiry')}
        </a>
      </div>
    </form>
  );
}
