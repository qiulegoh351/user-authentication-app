import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Text from '@app/components/Text';
import { $styles } from '@app/theme/styles';
import { ToastConfig } from 'react-native-toast-message';
import { Stack, View } from 'tamagui';
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
      style={[
        $styles.flex1,
        {
          maxWidth: '80%',
          borderRadius: 20,
          overflow: 'hidden',
        },
      ]}
    >
      <LinearGradient
        colors={['#C724E1', '#4E22CC']}
        locations={[0, 1]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <Stack borderRadius={'$radius.xl'} paddingVertical={'$md'} paddingHorizontal={'$xl'}>
        <Text flex={1} textAlign="center" preset="subheading" text={text1} />
      </Stack>
    </View>
  ),
};

export default toastConfig;
