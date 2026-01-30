import { memo } from 'react';
import DefaultIcon from '@assets/icons/radio-icon.svg';
import SelectedIcon from '@assets/icons/radio-selected-icon.svg';

import CheckIconProps from './props';
/**
 * ===========================
 * MAIN
 * ===========================
 */
const CheckIconView: React.FC<CheckIconProps> = (props) => {
  const { selected } = props;
  // =============== VIEWS
  if (selected) return <SelectedIcon />;
  return <DefaultIcon />;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const CheckIcon = memo(CheckIconView);
export default CheckIcon;

export * from './props';
