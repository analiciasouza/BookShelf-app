import React from 'react';
import { Image, ImageProps } from 'react-native';

interface AImageProps extends ImageProps {
  alt: string;
  decorative?: boolean;  // true = oculta do screen reader (imagem puramente decorativa)
}

export function AImage({ alt, decorative = false, ...rest }: AImageProps) {
  if (decorative) {
    return (
      <Image
        accessible={false}
        importantForAccessibility="no-hide-descendants"
        {...rest}
      />
    );
  }

  return (
    <Image
      accessible
      accessibilityRole="image"
      accessibilityLabel={alt}
      {...rest}
    />
  );
}