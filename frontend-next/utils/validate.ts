export const stringSingleSpace = (source?: string) => {
  if (typeof source !== 'string') {
    return '';
  }
  return source.trim().replace(/  +/g, ' ');
};
