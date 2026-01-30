import * as Linking from 'expo-linking';
import { getPathFromState, getStateFromPath, LinkingOptions } from '@react-navigation/native';

// Deep Link Configuration
const prefix = Linking.createURL('/');
const prefixes = [prefix, 'ignite-tamagui-stack://'];

const config = {
  screens: {
    Signin: '/signin',
    Home: '*',
  },
};

const linking: LinkingOptions<{ [key: string]: any }> = {
  prefixes: prefixes,
  config: config,
  async getInitialURL() {
    const url = await Linking.getInitialURL();
    return url;
  },
  subscribe(listener) {
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      listener(url);
    });

    return () => {
      linkingSubscription.remove();
    };
  },

  getStateFromPath: (path, options) => {
    const state = getStateFromPath(path, options);
    // Return a state object here
    return state;
  },
  getPathFromState(state, config) {
    const path = getPathFromState(state, config);
    // Return a path string here
    return path;
  },
};

export default linking;
