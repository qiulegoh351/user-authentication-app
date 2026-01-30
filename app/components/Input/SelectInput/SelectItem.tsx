import { memo } from 'react';
import CheckIcon from '@app/components/CheckIcon';
import Text from '@app/components/Text';
import TouchableOpacity from '@app/components/TouchableOpacity';
import { XStack } from 'tamagui';

import { SelectItem } from './props';

type ItemProps = {
  selected: boolean;
  item: SelectItem;
  onPress?: (value: SelectItem) => void;
};
/**
 * ===========================
 * MAIN
 * ===========================
 */
const ItemView: React.FC<ItemProps> = (props) => {
  const { selected, item, onPress } = props;
  // =============== VIEWS
  return (
    <TouchableOpacity onPress={() => onPress?.(item)}>
      <XStack
        gap="$sm"
        alignItems="center"
        paddingVertical={'$md'}
        paddingHorizontal={'$screenPadding'}
      >
        <CheckIcon selected={selected} />
        <Text>{item?.label}</Text>
      </XStack>
    </TouchableOpacity>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export const Item = memo(ItemView);
export default Item;
