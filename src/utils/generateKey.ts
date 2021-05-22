export const generateKey = (text: string) => {
  return `${text}-${new Date().getTime()}`;
};
