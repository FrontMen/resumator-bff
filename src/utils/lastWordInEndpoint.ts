export const getWordFromEndpoint = (url: string, index: number): string => {
  const arrayOfString: string[] = url.split('/');
  arrayOfString.shift();
  return arrayOfString[index];
};
