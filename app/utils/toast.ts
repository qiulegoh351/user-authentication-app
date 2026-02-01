import Toast, { ToastPosition } from 'react-native-toast-message';

type ToastMessageProps = {
  duration?: number;
  placement?: ToastPosition;
};

const success = (
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

const error = (message: string, { duration = 2000, placement = 'top' }: ToastMessageProps = {}) => {
  return Toast.show({
    type: 'errorToast',
    text1: message,
    position: placement,
    visibilityTime: duration,
  });
};

export const toast = {
  success,
  error,
};

export default toast;
