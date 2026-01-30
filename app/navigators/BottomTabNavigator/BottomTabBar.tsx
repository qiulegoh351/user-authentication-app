import { memo, useMemo } from 'react';
import { Text, TouchableOpacity } from '@app/components';
// import ActiveHomeIcon from '@assets/icons/active-home-icon.svg';
// import ActiveStoreIcon from '@assets/icons/active-location-icon.svg';
// import ActiveProfileIcon from '@assets/icons/active-profile-icon.svg';
// import ActiveQRIcon from '@assets/icons/active-qr-icon.svg';
// import HomeIcon from '@assets/icons/home-icon.svg';
// import StoreIcon from '@assets/icons/location-icon.svg';
// import ProfileIcon from '@assets/icons/profile-icon.svg';
// import QRIcon from '@assets/icons/qr-icon.svg';
import { BottomTabBarProps as RNVBottomTab } from '@react-navigation/bottom-tabs';
import { SvgProps } from 'react-native-svg';
import { getTokens, Stack, XStack, YStack } from 'tamagui';

import { BottomTabParamList } from './props';

export type BottomTabBarProps = RNVBottomTab;

const BottomTabBarView: React.FC<BottomTabBarProps> = (props) => {
  const { descriptors, insets, navigation, state } = props;
  const primaryColor = getTokens()?.color?.$primary300?.val;
  // =============== HOOKS
  const TabItem = ({
    focused,
    label,
    // Icon,
    // ActiveIcon,
  }: {
    focused: boolean;
    label?: string;
    Icon: React.FC<SvgProps>;
    ActiveIcon: React.FC<SvgProps>;
  }) => {
    const color = focused ? primaryColor : '$primaryText';
    // const iconColor = focused ? primaryColor : '#BBBBBB';

    return (
      <YStack alignItems="center" rowGap={4}>
        <Stack
          borderRadius={'$radius.full'}
          paddingVertical={'$space.md'}
          paddingHorizontal={'$space.2xl'}
          gap={'$space.xs'}
          alignItems="center"
        >
          {/* {focused ? <ActiveIcon color={iconColor} /> : <Icon color={iconColor} />} */}
          {label && (
            <Text
              fontWeight={focused ? '$600' : '$500'}
              fontSize={'$sm'}
              color={color}
              textAlign="center"
              numberOfLines={1}
            >
              {label}
            </Text>
          )}
        </Stack>
      </YStack>
    );
  };

  const TabItems = useMemo(
    () => [
      {
        name: 'Home',
        title: 'Home',
        // Icon: HomeIcon,
        // ActiveIcon: ActiveHomeIcon,
      },
      {
        name: 'Venue',
        title: 'Shop',
        // Icon: StoreIcon,
        // ActiveIcon: ActiveStoreIcon,
      },
      {
        name: 'QR',
        title: 'QR',
        // Icon: QRIcon,
        // ActiveIcon: ActiveQRIcon,
      },
      {
        name: 'Profile',
        title: 'Profile',
        // Icon: ProfileIcon,
        // ActiveIcon: ActiveProfileIcon,
      },
    ],
    [],
  );

  const renderIcon = (focused: boolean, name: string) => {
    const tab = TabItems.find((t) => t.name === name);
    if (!tab) return null;
    return (
      <TabItem
        focused={focused}
        Icon={(<></>) as any}
        ActiveIcon={(<></>) as any}
        label={tab.title}
      />
    );
  };
  return (
    <Stack backgroundColor={'white'} borderTopColor={'$border'} borderTopWidth={0.25}>
      <XStack
        paddingBottom={insets?.bottom + 10}
        paddingTop={'$md'}
        paddingHorizontal={'$xs'}
        zIndex={2}
      >
        {state?.routes?.map((route, index) => {
          // eslint-disable-next-line no-unsafe-optional-chaining
          const { options } = descriptors?.[route.key];

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              if (route.name === 'Chat') {
                navigation.navigate(route.name);
                return;
              }
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const routeName = (
            route?.name === 'DiscoverTalent' ? 'Home' : route?.name
          ) as keyof BottomTabParamList;

          return (
            <TouchableOpacity
              key={`route-${route?.key}`}
              disabled={isFocused}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: 'center',
              }}
            >
              {renderIcon(isFocused, routeName)}
            </TouchableOpacity>
          );
        })}
      </XStack>
    </Stack>
  );
};

export const BottomTabBar = memo(BottomTabBarView);
export default BottomTabBar;
