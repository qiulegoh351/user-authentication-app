import { memo } from 'react';
import { isNil } from 'lodash';

import TextNodeProps from './props';
import { Text } from '../Text';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const TextNodeView: React.FC<TextNodeProps> = (props) => {
  const { children, tx } = props;

  // =============== VIEWS
  if (isNil(children) && !tx) return null;
  if (children && typeof children !== 'string' && typeof children !== 'number') return children;
  return <Text tx={tx} {...props} />;
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export const TextNode = memo(TextNodeView);
export default TextNode;
