import { useCallback } from 'react';
import { HomeScreen } from '@app/screens';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BottomTabBar from './BottomTabBar';
import { BottomTabParamList } from './props';

/**
 * ===========================
 * MAIN
 * ===========================
 */
const Tab = createBottomTabNavigator<BottomTabParamList>();

export const BottomTabNavigator = () => {
  // =============== RENDERER VIEWS
  const renderBottomTab = useCallback((props: BottomTabBarProps) => {
    return <BottomTabBar {...props} />;
  }, []);

  // =============== VIEWS
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={renderBottomTab}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
    </Tab.Navigator>
  );
};

/**
 * ===========================
 * EXPORTS
 * ===========================
 */
export * from './props';
export default BottomTabNavigator;
