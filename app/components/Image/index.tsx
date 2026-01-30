import { memo } from 'react';
import { Image as ExpoImage } from 'expo-image';

import { ImageProps } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const Image: React.FC<ImageProps> = (props) => {
  const { uri, source: imageSource, ...rest } = props;
  const source = uri ? { uri } : imageSource;

  // ====================== VIEWS
  return <ExpoImage source={source} placeholderContentFit="cover" transition={300} {...rest} />;
};

/**
 * ===========================
 * EXPORT
 * ===========================
 */
export default memo(Image);
