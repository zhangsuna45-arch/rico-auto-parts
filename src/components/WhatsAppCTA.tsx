'use client';

interface WhatsAppCTAProps {
  productName?: string;
}

export function WhatsAppCTA({ productName }: WhatsAppCTAProps) {
  const whatsappNumber = '8619854054842';
  const message = productName
    ? `Hi, I am interested in ${productName}. Can you provide more details?`
    : 'Hello, I am interested in your automotive components.';
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      title="Chat on WhatsApp"
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 40,
        background: '#25D366',
        color: '#fff',
        borderRadius: '16px',
        padding: '14px 22px',
        boxShadow: '0 6px 24px rgba(37,211,102,0.35)',
        transition: 'transform 0.2s, box-shadow 0.2s',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '10px',
        textDecoration: 'none',
        fontFamily: 'inherit',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 10px 32px rgba(37,211,102,0.45)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(37,211,102,0.35)';
      }}
    >
      <svg
        width="22"
        height="22"
        fill="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.734.732 5.41 2.124 7.738L1.623 23.73l8.239-2.722c2.261 1.236 4.8 1.888 7.384 1.889h.004c5.43 0 9.868-4.438 9.868-9.868 0-2.633-.636-5.12-1.84-7.347z" />
      </svg>
      <span style={{ fontWeight: 700, fontSize: '15px', whiteSpace: 'nowrap' }}>
        Chat WhatsApp
      </span>
    </a>
  );
}
