import { createClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID?.trim() || undefined;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION?.trim() || '2026-01-01';

export const isSanityConfigured = Boolean(projectId);

const _client = isSanityConfigured
  ? createClient({ projectId: projectId!, dataset, apiVersion, useCdn: true, perspective: 'published' })
  : null;

const _builder = _client ? createImageUrlBuilder(_client) : null;

export const sanity = _client!;
export const urlFor = (source: SanityImageSource) => _builder!.image(source);
