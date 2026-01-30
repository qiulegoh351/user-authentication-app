const primary: any = {
  100: '#BF2228',
  200: '#BF2228',
  300: '#BF2228',
  400: '#BF2228',
  500: '#BF2228',
};

const secondary: any = {
  50: '#FFFFFF',
  75: '#F7F7F8',
  100: '#F8F9FC',
  125: '#F2F4F8',
  150: '#D1D5DB',
  200: '#E9ECF3',
  300: '#646464',
  400: '#67708C',
  500: '#374255',
  600: '#252C38',
  700: '#DAE2EE',
  800: '#151920',
  900: '#292a2dff',
};

const blue: any = {
  100: '#34A7FF',
};

const green: any = {
  100: '#297355',
  200: '#47C5A0',
  300: '#47CB18',
};

const yellow: any = {
  100: '#FFF4D7',
};

const orange: any = {
  400: '#F59E0B',
  500: '#EF7B4F',
  600: '#EA580C',
};

const purple: any = {
  100: '#626FC8',
};

const red: any = {
  100: '#F86863',
  300: '#F44336',
  400: '#DC2626',
  500: '#BF2228',
  600: '#EC2224',
};

const brown: any = {
  100: '#754F5B',
};

export const color = {
  inputBg: '#EFEFEF',
  disabled: '#DBDBDB',
  border: '#E0E0E0',
  errorText: '#EC2224',
  primaryText: '#202020',
  secondaryText: '#646464',
  placeholderText: '#BBBBBB',
  line: '#E0E0E0',
  bg: '#F2F2F2',

  // Primary
  ...Object.keys(primary).reduce((acc: any, key: any) => {
    acc[`primary${key}`] = primary[key];
    return acc;
  }, {}),

  // Secondary
  ...Object.keys(secondary).reduce((acc: any, key: any) => {
    acc[`secondary${key}`] = secondary[key];
    return acc;
  }, {}),

  // Yellow
  ...Object.keys(yellow).reduce((acc: any, key: any) => {
    acc[`yellow${key}`] = yellow[key];
    return acc;
  }, {}),

  // Orange
  ...Object.keys(orange).reduce((acc: any, key: any) => {
    acc[`orange${key}`] = orange[key];
    return acc;
  }, {}),

  // Blue
  ...Object.keys(blue).reduce((acc: any, key: any) => {
    acc[`blue${key}`] = blue[key];
    return acc;
  }, {}),

  // Green
  ...Object.keys(green).reduce((acc: any, key: any) => {
    acc[`green${key}`] = green[key];
    return acc;
  }, {}),

  // Purple
  ...Object.keys(purple).reduce((acc: any, key: any) => {
    acc[`purple${key}`] = purple[key];
    return acc;
  }, {}),

  // Red
  ...Object.keys(red).reduce((acc: any, key: any) => {
    acc[`red${key}`] = red[key];
    return acc;
  }, {}),

  // Brown
  ...Object.keys(brown).reduce((acc: any, key: any) => {
    acc[`brown${key}`] = brown[key];
    return acc;
  }, {}),
};
