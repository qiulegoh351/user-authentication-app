import { memo } from 'react';
import { TouchableOpacity as RNTouchableOpacity } from 'react-native';

import TouchableOpacityProps from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const TouchableOpacityView: React.FC<TouchableOpacityProps> = (props) => {
  // =============== PROPS
  const { activeOpacity = 0.75, children, ...restProps } = props;

  // =============== VARIABLES

  // =============== VIEWS
  return (
    <RNTouchableOpacity activeOpacity={activeOpacity} {...restProps}>
      {children}
    </RNTouchableOpacity>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const TouchableOpacity = memo(TouchableOpacityView);
export default TouchableOpacity;
