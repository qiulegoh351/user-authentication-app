export const safeJsonParse = (str?: string): any => {
  try {
    return JSON.parse(str ?? '');
  } catch {
    return '';
  }
};

export default safeJsonParse;
