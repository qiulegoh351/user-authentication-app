import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { $styles } from '@app/theme/styles';

import GradientLayoutProps from './props';

export const GradientLayout: React.FC<GradientLayoutProps> = (props) => {
  const { children, layout = 'gradient', style } = props;

  // ============== VIEWS
  if (layout === 'none') return children;
  return (
    <View style={[$styles.flex1, style]}>
      {/* ================= BACKGROUND ================= */}
      <LinearGradient
        colors={['#1B284F', '#351159', '#421C45', '#3B184E']}
        locations={[0.15, 0.5, 0.75, 1]}
        start={{ x: 0, y: 0.15 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <LinearGradient
        colors={['#240D38', 'rgba(51, 15, 82, 0)']}
        locations={[0, 0.14]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* ================= CONTENT ================= */}
      {children}
    </View>
  );
};

export default GradientLayout;
