// =========================
// PRIMARY (Brand)
// =========================
const primary: any = {
  100: '#E6F2F1',
  200: '#C2DFDD',
  300: '#8FBFBC',
  400: '#2E6F6A',
  500: '#004643',
};

// =========================
// NEUTRAL / SECONDARY
// =========================
const secondary: any = {
  50: '#FFFFFF',
  75: '#F9FAFB',
  100: '#F3F4F6',
  125: '#E5E7EB',
  150: '#D1D5DB',
  200: '#9CA3AF',
  300: '#6B7280',
  400: '#4B5563',
  500: '#374151',
  600: '#1F2937',
  700: '#111827',
  800: '#0B1220',
  900: '#020617',
};

// =========================
// ACCENTS
// =========================
const blue: any = {
  100: '#DBEAFE',
  200: '#93C5FD',
  300: '#3B82F6',
};

const green: any = {
  100: '#DCFCE7',
  200: '#4ADE80',
  300: '#47CB18',
  400: '#16A34A',
};

const yellow: any = {
  100: '#FEF3C7',
  200: '#FACC15',
};

const orange: any = {
  400: '#FDBA74',
  500: '#F97316',
  600: '#EA580C',
};

const purple: any = {
  100: '#EDE9FE',
  200: '#A78BFA',
};

const red: any = {
  100: '#FEE2E2',
  300: '#F87171',
  400: '#EF4444',
  500: '#EC2224',
};

const brown: any = {
  100: '#E7D7CF',
};

// =========================
// EXPORT TOKEN
// =========================
export const color = {
  // System
  inputBg: '#FFFFFF',
  disabled: '#E5E7EB',
  border: '#C4C4C4',
  errorText: '#DC2626',
  primaryText: '#111827',
  secondaryText: '#757575',
  placeholderText: '#9CA3AF',
  line: '#E5E7EB',
  bg: '#F3F4F6',

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
