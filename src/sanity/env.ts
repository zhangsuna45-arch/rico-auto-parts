export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-05-24';

export const useCdn = process.env.NODE_ENV === 'production';

export const token = process.env.SANITY_API_TOKEN;

export function isSanityConfigured(): boolean {
  return Boolean(projectId && projectId.length > 0);
}
