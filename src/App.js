import { Navigation, ScreenVisibilityListener } from 'react-native-navigation';
import OneSignal from 'react-native-onesignal';
import path from 'object-path';
import { Provider } from 'react-redux';
import I18n from 'react-native-i18n';
import Orientation from 'react-native-orientation';
import { configStore } from './store/index';
import { registerScreens } from './route';
import { iconsLoaded } from './utils/AppIcons';
import { getLocale } from './store/selectors/common';
import { isLogged } from './store/selectors/auth';

import Authenticated from './AppAuthenticated';
import UnAuthenticated from './AppUnAuthenticated';

import locales from './assets/locales';
import { navChanged } from './store/actions/common';
import constant from './constant';
import screenPayload from './store/actions/screen';
import { setDevice } from './utils/onesignal';
// import platform from './theme/variables/platform';

I18n.fallbacks = true;
I18n.translations = locales;
I18n.defaultLocale = 'en';
console.disableYellowBox = true;

// let navigator = null; // eslint-disable-line

Orientation.lockToPortrait();

// export function setNavigator(nav) {
//   console.log('setNavigator');
//   navigator = nav;
// }

// export function getNavigator() {
//   return navigator;
// }

let store = null;

let currentState = {
  isLogged: null,
  locale: null
};
let isFirstTime = true;

const handleSubscribe = () => {
  if (!store) return;

  if (isFirstTime) {
    isFirstTime = false;
    currentState = {
      isLogged: isLogged(store.getState()),
      locale: getLocale(store.getState())
    };
    I18n.locale = currentState.locale;

    // if (currentState.isLogged && store.getState().app.deviceId) {
    //   dispatch({ 'type': 'registerDevice'});
    // }

    console.log('state change1');
    startApp(currentState);
    return;
  }

  // if change ?
  const nextState = {
    isLogged: isLogged(store.getState()),
    locale: getLocale(store.getState())
  };

  if (
    nextState.isLogged !== currentState.isLogged ||
    nextState.locale !== currentState.locale
  ) {
    I18n.locale = nextState.locale;

    currentState = nextState;

    console.log('state change2');
    startApp(nextState);
  }
};

function startApp() {
  // is auth
  if (currentState.isLogged) {
    Authenticated(currentState);
  } else {
    UnAuthenticated(currentState);
  }
}

// initial check authenticate
iconsLoaded.then(async () => {
  try {
    store = await configStore();
    registerScreens(store, Provider);

    store.subscribe(handleSubscribe);

    OneSignal.init(constant.onesignal, { kOSSettingsKeyAutoPrompt: true });

    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('ids', ids => {
      if (!store) {
        console.log('ids', ids);
        return;
      }

      setDevice(ids.userId);
    });

    OneSignal.addEventListener('opened', async openResult => {
      const { launchURL } = openResult.notification.payload;

      // store.dispatch(
      //   screenPayload('notifications', {
      //     total: openResult.notification.payload.badge
      //   })
      // );

      store.dispatch({
        type: 'notification/init'
      });

      // check state
      Navigation.handleDeepLink({
        link: launchURL
      });
    });

    OneSignal.addEventListener('received', async () => {
      store.dispatch({
        type: 'notification/init'
      });
    });

    OneSignal.configure();

    new ScreenVisibilityListener({
      willAppear: ({ screen, startTime, endTime, commandType }) => {
        // ignore sidebar screen
        if (screen === 'notifications') {
          const total = path.get(
            store.getState(),
            'screen.notifications.total'
          );
          if (total > 0) {
            // refresh
            store.dispatch(screenPayload('notifications', { total: 0 }));
          }
        }

        store.dispatch(navChanged(screen));
      }
    }).register();

    store.dispatch({
      type: 'app/changeLanguage',
      payload: getLocale(store.getState())
    });
  } catch (e) {
    console.error(e);
  }
});
