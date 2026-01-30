import Toast, { ToastPosition } from 'react-native-toast-message';

type ToastMessageProps = {
  duration?: number;
  placement?: ToastPosition;
  // type?: 'success' | 'error';
};

export const toastMessage = (
  message: string,
  { duration = 2000, placement = 'top' }: ToastMessageProps = {},
) => {
  return Toast.show({
    type: 'successToast',
    text1: message,
    position: placement,
    visibilityTime: duration,
  });
};
