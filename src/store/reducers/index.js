import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { locale, theme, navigator } from './common';

import auth from './auth';
import screen from './screen';

import question from './question';
import service from './service';
import notification from './notification';

export default combineReducers({
  locale,
  theme,
  form,
  auth,
  navigator,
  screen,


  question,
  service,
  notification,
});
