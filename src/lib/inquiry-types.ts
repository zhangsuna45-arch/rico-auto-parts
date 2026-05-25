export type InquiryStatus = 'new' | 'read' | 'replied' | 'converted';

export type InquirySource = 'product_page' | 'contact_page' | 'rfq';

export type InquiryUrgency = 'low' | 'medium' | 'high';

export interface InquiryData {
  id: string;
  name: string;
  email: string;
  company: string;
  country: string;
  phone: string;
  quantity: string;
  productName: string;
  productUrl: string;
  sku: string;
  category: string;
  message: string;
  urgency: InquiryUrgency;
  source: InquirySource;
  attachments: string[];
  status: InquiryStatus;
  submittedAt: string;
  crm: {
    leadSource: string;
    leadStatus: string;
    companySize: string;
    industry: string;
  };
}

export function generateInquiryId(): string {
  const ts = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `INQ-${ts}-${rand}`.toUpperCase();
}
