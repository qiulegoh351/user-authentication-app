import { FC, ReactNode, useCallback, useMemo, useRef } from 'react';
import { HomeItem } from '@app/@types';
import { Button, LanguageSetting, Screen, ScreenHeader, Text } from '@app/components';
import BottomSheet, { BottomSheetRef } from '@app/components/BottomSheet';
import { useAuth } from '@app/context';
import { useTranslation } from '@app/i18n';
import { dayjs } from '@app/utils';
import { LegendList, LegendListRenderItemProps } from '@legendapp/list';
import { getTokens, Stack } from 'tamagui';

import HomeScreenProps from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
export const HomeScreen: FC<HomeScreenProps> = () => {
  // =============== HOOKS
  const logoutRef = useRef<BottomSheetRef>(null);
  const deleteAccRef = useRef<BottomSheetRef>(null);
  const { user, logout, deleteAccount } = useAuth();
  const { t } = useTranslation();

  // =============== VARIABLES
  const colorTokens = getTokens()?.color;
  const alphabet = user?.name?.slice(0, 1)?.toUpperCase();
  const data: HomeItem[] = useMemo(
    () => [
      { label: t('common:input.name.title'), value: user?.name },
      { label: t('common:input.email.title'), value: user?.email },
      {
        label: t('common:label.createdAt'),
        value: user?.created_at
          ? dayjs(user?.created_at).format('YYYY-MM-DD hh:mm a')?.toString()
          : '-',
      },
    ],
    [user, t],
  );

  // =============== EVENTS
  const onLogout = useCallback(() => {
    logout();
    logoutRef.current?.dismiss();
  }, [logout]);

  const onDeleteAccount = useCallback(() => {
    deleteAccount();
    deleteAccRef.current?.dismiss();
  }, [deleteAccount]);

  // =============== EFFECTS

  // =============== VIEWS
  const renderHomeItem: (props: LegendListRenderItemProps<HomeItem | null>) => ReactNode =
    useCallback(({ item }) => {
      return (
        <Stack alignItems="flex-start" gap="$2xs">
          <Text fontWeight={'$600'}>{`${item?.label}: `}</Text>
          <Text>{item?.value}</Text>
        </Stack>
      );
    }, []);

  const renderHeader = useCallback(() => {
    return (
      <Stack
        borderRadius="$radius.full"
        backgroundColor="$primary500"
        width={80}
        aspectRatio={1}
        alignItems="center"
        justifyContent="center"
      >
        <Text preset="subheading" fontSize={'$5xl'} color="white">
          {alphabet}
        </Text>
      </Stack>
    );
  }, [alphabet]);

  const renderFooter = useCallback(() => {
    return (
      <Stack gap={'$sm'}>
        <Button
          variant="outlined"
          containerStyle={{ flex: 1 }}
          minHeight={'auto'}
          paddingVertical={'$sm'}
          tx="common:button.logout"
          color="$red400"
          backgroundColor={colorTokens?.red400?.val}
          hoverColor="$red300"
          onPress={() => logoutRef.current?.present()}
        />
        <Button
          variant="text"
          containerStyle={{ flex: 1 }}
          minHeight={'auto'}
          paddingVertical={'$sm'}
          tx="common:button.deleteAcc"
          onPress={() => deleteAccRef.current?.present()}
        />
      </Stack>
    );
  }, [colorTokens]);

  return (
    <Screen
      preset="scroll"
      StickyHeader={
        <ScreenHeader title="Home" backButton={false} right={<LanguageSetting color="white" />} />
      }
    >
      <Stack gap="$2xl" padding="$screenPadding">
        <Stack
          alignItems="center"
          borderRadius="$radius.md"
          backgroundColor="$primary100"
          padding="$screenPadding"
        >
          <LegendList
            keyExtractor={(item, index) => `${item?.label}-${index}`}
            data={data}
            renderItem={renderHomeItem}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            overScrollMode="never"
            style={{ width: '100%', flexGrow: 0 }}
            ListHeaderComponentStyle={{ alignItems: 'center', marginBottom: 10 }}
            ListHeaderComponent={renderHeader}
            ListFooterComponentStyle={{ marginTop: 20 }}
            ListFooterComponent={renderFooter}
            ItemSeparatorComponent={() => <Stack height={10} />}
          />
        </Stack>
      </Stack>
      <BottomSheet ref={logoutRef} onConfirm={onLogout} tx="common:button.logout">
        <Stack paddingVertical={'$md'}>
          <Text preset="body" tx="common:label.logoutConfirmation" />
        </Stack>
      </BottomSheet>

      <BottomSheet ref={deleteAccRef} onConfirm={onDeleteAccount} tx="common:button.deleteAcc">
        <Stack paddingVertical={'$md'}>
          <Text preset="body" tx="common:label.deleteConfirmation" />
        </Stack>
      </BottomSheet>
    </Screen>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default HomeScreen;
