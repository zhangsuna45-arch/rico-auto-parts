import imageUrlBuilder from '@sanity/image-url';
import { projectId, dataset } from '../env';

type SanityImageSource = Parameters<ReturnType<typeof imageUrlBuilder>['image']>[0];

const builder = imageUrlBuilder({ projectId, dataset });

export function imageUrl(source: SanityImageSource): ReturnType<typeof builder.image> {
  return builder.image(source);
}

export function imageUrlWithDimensions(
  source: SanityImageSource,
  width: number,
  height?: number,
): string {
  const img = builder.image(source).width(width).auto('format');
  if (height) {
    img.height(height);
  }
  return img.url();
}
