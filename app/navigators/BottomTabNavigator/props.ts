import { BottomTabScreenProps as NativeStackScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';

import { AppStackParamList, AppStackScreenProps } from '../AppNavigator/props';

export type BottomTabParamList = {
  Home?: undefined;
  Profile?: undefined;
};

export type BottomTabScreenProps<T extends keyof BottomTabParamList> = CompositeScreenProps<
  NativeStackScreenProps<BottomTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>;
