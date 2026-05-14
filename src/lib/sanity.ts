import { createClient, type ClientConfig } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';

const rawProjectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const projectId = rawProjectId?.trim() || undefined;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET?.trim() || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION?.trim() || '2026-01-01';

export const isSanityConfigured = Boolean(projectId);

const config: ClientConfig = {
  projectId: projectId ?? 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
};

export const sanity = createClient(config);

const builder = createImageUrlBuilder(sanity);
export const urlFor = (source: SanityImageSource) => builder.image(source);
