import { ImageProps as ExpoImageProps, ImageSource } from 'expo-image';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export type ImageProps = Omit<ExpoImageProps, 'source'> & {
  uri?: string;
  source?: ImageSource;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export default ImageProps;
