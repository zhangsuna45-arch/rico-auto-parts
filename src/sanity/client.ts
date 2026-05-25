import { createClient, type SanityClient } from '@sanity/client';
import { dataset, projectId, apiVersion, useCdn, token, isSanityConfigured } from './env';

function createSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    token,
    perspective: 'published',
    stega: false,
  });
}

function createPreviewClient(): SanityClient | null {
  if (!isSanityConfigured() || !token) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    token,
    perspective: 'previewDrafts',
    stega: false,
  });
}

export const sanityClient = createSanityClient();
export const previewClient = createPreviewClient();
