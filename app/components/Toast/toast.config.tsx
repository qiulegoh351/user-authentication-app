import Image from '@app/components/Image';
import Text from '@app/components/Text';
import Error from '@assets/images/toast-error.png';
import Success from '@assets/images/toast-success.png';
import { ToastConfig } from 'react-native-toast-message';
import { View, XStack } from 'tamagui';
/*
  1. Create the config
*/
const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  // success: (props) => (
  //   <BaseToast
  //     {...props}
  //     style={{ borderLeftColor: 'pink' }}
  //     contentContainerStyle={{ paddingHorizontal: 15 }}
  //     text1Style={{
  //       fontSize: 15,
  //       fontWeight: '400',
  //     }}
  //   />
  // ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  // error: (props) => (
  //   <ErrorToast
  //     {...props}
  //     text1Style={{
  //       fontSize: 17,
  //     }}
  //     text2Style={{
  //       fontSize: 15,
  //     }}
  //   />
  // ),
  /*
    Or create a completely new type - `tomatoToast`,
    building the layout from scratch.

    I can consume any custom `props` I want.
    They will be passed when calling the `show` method (see below)
  */
  successToast: ({ text1 }) => (
    <View
      flex={1}
      borderRadius={'$radius.sm'}
      borderLeftWidth={4}
      borderLeftColor={'$green300'}
      backgroundColor={'white'}
      width={'90%'}
      padding={'$lg'}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <XStack alignItems="center" gap="$sm">
        <Image source={Success} style={{ width: 16, aspectRatio: 1 }} />
        <Text flex={1} flexWrap="wrap" preset="body" text={text1} />
      </XStack>
    </View>
  ),
  errorToast: ({ text1 }) => (
    <View
      flex={1}
      borderRadius={'$radius.sm'}
      borderLeftWidth={4}
      borderLeftColor={'$red400'}
      backgroundColor={'white'}
      width={'90%'}
      padding={'$lg'}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
        elevation: 2,
      }}
    >
      <XStack alignItems="center" gap="$sm">
        <Image source={Error} style={{ width: 16, aspectRatio: 1 }} />
        <Text flex={1} flexWrap="wrap" preset="body" text={text1} />
      </XStack>
    </View>
  ),
};

export default toastConfig;
