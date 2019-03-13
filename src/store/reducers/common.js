import RNUtils from 'react-native-agiletech';
import standard from '../../theme/variables/standard';

// I18N
export const locale = (state = RNUtils.locale, { type, payload }) => {
  switch (type) {
    case 'app/changeLanguage':
      return 'vi';
    default:
      return state;
  }
};

// Theme
export const theme = (
  state = {
    theme: standard,
    toggleTheme: () => { }
  },
  { type, payload }
) => {
  switch (type) {
    case 'app/changeTheme':
      return { ...state, theme: payload };
    case 'app/applyThemeFunction':
      return { ...state, toggleTheme: payload };
    default:
      return state;
  }
};

export const navigator = (
  state = {
    current: null,
    before: null
  },
  { type, payload }
) => {
  switch (type) {
    case 'nav/changed':
      const lastCurrent = state.current;
      if (lastCurrent === payload) {
        return state;
      }

      return {
        before: lastCurrent,
        current: payload
      };
    default:
      return state;
  }
};
