const BASE_URL = 'https://api.airtable.com/v0';

export function isAirtableConfigured(): boolean {
  return Boolean(
    process.env.AIRTABLE_API_KEY &&
    process.env.AIRTABLE_API_KEY.length > 0 &&
    process.env.AIRTABLE_BASE_ID &&
    process.env.AIRTABLE_BASE_ID.length > 0,
  );
}

function baseId(): string {
  return process.env.AIRTABLE_BASE_ID || '';
}

function authHeader(): Record<string, string> {
  return { Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}` };
}

export function extractAttachmentUrl(
  attachments: unknown,
): string {
  if (
    Array.isArray(attachments) &&
    attachments.length > 0 &&
    attachments[0] &&
    typeof attachments[0] === 'object' &&
    'url' in attachments[0]
  ) {
    return String(attachments[0].url);
  }
  return '';
}

export function extractAttachments(attachments: unknown): string[] {
  if (!Array.isArray(attachments)) return [];
  return attachments
    .filter(
      (a): a is Record<string, unknown> =>
        typeof a === 'object' && a !== null && 'url' in a,
    )
    .map((a) => String(a.url));
}

interface FetchTableOptions {
  filterByFormula?: string;
  sort?: { field: string; direction: 'asc' | 'desc' }[];
  maxRecords?: number;
}

interface AirtableRecord<T> {
  id: string;
  fields: T;
  createdTime: string;
}

interface AirtableResponse<T> {
  records: AirtableRecord<T>[];
  offset?: string;
}

export async function fetchTable<T extends Record<string, unknown>>(
  tableName: string,
  options?: FetchTableOptions,
): Promise<(T & { id: string })[]> {
  const params = new URLSearchParams();

  if (options?.filterByFormula) {
    params.set('filterByFormula', options.filterByFormula);
  }
  if (options?.sort) {
    options.sort.forEach((s, i) => {
      params.set(`sort[${i}][field]`, s.field);
      params.set(`sort[${i}][direction]`, s.direction);
    });
  }
  if (options?.maxRecords) {
    params.set('maxRecords', String(options.maxRecords));
  }

  const url = `${BASE_URL}/${baseId()}/${encodeURIComponent(tableName)}?${params.toString()}`;

  const res = await fetch(url, { headers: authHeader() });

  if (!res.ok) {
    throw new Error(`Airtable fetch failed: ${res.status} ${res.statusText} for ${tableName}`);
  }

  const json: AirtableResponse<T> = await res.json();

  return json.records.map((r) => {
    // Normalize field keys: trim whitespace (some Airtable fields get trailing tabs)
    const normalized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(r.fields)) {
      normalized[key.trim()] = value;
    }
    return { ...normalized, id: r.id } as T & { id: string };
  });
}

export async function fetchRecord<T extends Record<string, unknown>>(
  tableName: string,
  filterByFormula: string,
): Promise<(T & { id: string }) | null> {
  const records = await fetchTable<T>(tableName, {
    filterByFormula,
    maxRecords: 1,
  });
  return records[0] || null;
}
