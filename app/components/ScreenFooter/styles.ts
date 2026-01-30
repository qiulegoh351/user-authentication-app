import { ViewStyle } from 'react-native';

export type Presets = 'shadow' | 'boderLine';

export const $baseStyle: ViewStyle = {
  backgroundColor: 'white',
};

export const $presets: Record<Presets, ViewStyle> = {
  shadow: {
    ...$baseStyle,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    // Android
    elevation: 20,
  },
  boderLine: {
    ...$baseStyle,
    borderTopWidth: 1,
    borderTopColor: '$border',
  },
};
