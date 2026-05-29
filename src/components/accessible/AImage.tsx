import React from 'react';
import { Image, ImageProps, ImageSourcePropType } from 'react-native';

interface AImageProps extends Omit<ImageProps, 'source'> {
  alt: string;
  decorative?: boolean;
  source: ImageSourcePropType | { uri: string | null | undefined };
}

export function AImage({ alt, decorative = false, source, ...rest }: AImageProps) {
  const safeSource =
    source && typeof source === 'object' && 'uri' in source
      ? { uri: (source as { uri: string | null | undefined }).uri ?? undefined }
      : (source as ImageSourcePropType);

  if (decorative) {
    return (
      <Image
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        source={safeSource}
        {...rest}
      />
    );
  }

  return (
    <Image
      accessible
      accessibilityRole="image"
      accessibilityLabel={alt}
      source={safeSource}
      {...rest}
    />
  );
}