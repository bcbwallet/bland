import { lightTheme, darkTheme } from '~/renderer/constants/themes';

export const getTheme = (name: string) => {
  if (name === 'bland-light') return lightTheme;
  else if (name === 'bland-dark') return darkTheme;
  return lightTheme;
};
