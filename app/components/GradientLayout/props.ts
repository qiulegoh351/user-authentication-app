import { StyleProp, ViewStyle } from 'react-native';

export type GradientLayoutProps = {
  children: React.ReactNode;
  layout?: 'gradient' | 'none';
  style?: StyleProp<ViewStyle>;
};

export default GradientLayoutProps;
