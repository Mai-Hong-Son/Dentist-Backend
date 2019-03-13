import React from 'react';
import standard from './variables/standard';
import appDesign from './variables/app-design';

export const themes = {
  standard,
  appDesign
};

export const ThemeContext = React.createContext({
  theme: themes.appDesign,
  toggleTheme: () => {}
});
