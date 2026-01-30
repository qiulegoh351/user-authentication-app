import { useEffect } from 'react';
import { BackHandler } from 'react-native';

type UseBackHandlerProps = {
  onBackPress: () => boolean;
  dependencies?: any[];
};

export const useBackHandler = ({ onBackPress, dependencies = [] }: UseBackHandlerProps) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

    return () => backHandler.remove();
  }, [dependencies, onBackPress]);
};
