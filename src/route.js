import { Navigation } from 'react-native-navigation';
import { HOC } from './utils/common';
import { NavigatorProvider } from './utils/withNavigator';

// TAB_BEGIN
import Home from './container/Home';
import Question from './container/Question';
import MySchedule from './container/MySchedule';
import Service from './container/Service';
// // TAB_END

import SideBar from './container/SideBar';
import Profile from './container/Profile';
import Notifications from './container/Notifications';

// AUTH
import Login from './container/Login';
import ForgotPassword from './container/ForgotPassword';

// //COMMON SCREENS
import Notification from './components/Notification';
import ModalConfirm from './components/ModalConfirm';
// import Browser from './components/Browser';
// import BrowserDialog from './components/Browser/Dialog';
// import Header from './components/Header';
import ModalSuccess from './components/ModalSuccess';
import QuestionDetail from './container/QuestionDetail';
import Conclusion from './container/Conclusion';
import ConfirmDialog from './components/ConfirmDialog';
import ConclusionID from './components/ConclusionID';
import Gallery from './container/Gallery';
import NotificationBell from './components/NotificationBell';
import Library from './container/Library';
import Calendar from './container/Calendar';
import PreviewSelection from './container/Conclusion/PreviewSelection';

// // fix YodaNode
// const Home = wtf;
// const ForgotPassword = wtf;
// const Question = wtf;
// const QuestionDetail = wtf;
// const MySchedule = wtf;
// const Service = wtf;
// const SideBar = wtf;
// const Profile = wtf;
// const Login = wtf;
// const Notification = wtf;
// const Notifications = wtf;
// const ModalSuccess = wtf;
// const ModalConfirm = wtf;
// const Conclusion = wtf;
// const ConclusionID = wtf;
// const ConfirmDialog = wtf;
// const NotificationBell = wtf;
// const Gallery = wtf;
// const Library = wtf;

// all screen must listed here
const screens = [
  {
    id: 'login',
    screen: Login
  },
  {
    id: 'forgot_password',
    screen: ForgotPassword
  },
  {
    id: 'home',
    screen: Home
  },
  {
    id: 'question',
    screen: Question
  },
  {
    id: 'question_detail',
    screen: QuestionDetail
  },
  {
    id: 'my_schedule',
    screen: MySchedule
  },
  {
    id: 'service',
    screen: Service
  },
  {
    id: 'sidebar',
    screen: SideBar
  },
  {
    id: 'profile',
    screen: Profile
  },
  {
    id: 'notifications',
    screen: Notifications
  },

  //Commons
  {
    id: 'modal_confirm',
    screen: ModalConfirm
  },
  {
    id: 'modal_success',
    screen: ModalSuccess
  },
  {
    id: 'notification',
    screen: Notification
  },
  {
    id: 'conclusion',
    screen: Conclusion
  },
  {
    id: 'confirm_dialog',
    screen: ConfirmDialog
  },
  {
    id: 'conclusion_id',
    screen: ConclusionID
  },
  {
    id: 'notification_bell',
    screen: NotificationBell
  },
  {
    id: 'gallery',
    screen: Gallery
  },
  {
    id: 'library',
    screen: Library
  },
  {
    id: 'admin_calendar',
    screen: Calendar
  },
  {
    id: 'preview_selection',
    screen: PreviewSelection
  }
];

// /**
//  * Finding screen by id
//  * If many duplicated screen id, just take the first one
//  */
// export const findScreenById = (id = null) => {
//   if (!id || id.length === 0) {
//     throw Error('Screen id is required.');
//   }
//   const result = screens.filter(screen => screen.id === id);
//   if (!result || result.length === 0) {
//     throw Error(`Screen id ${id} not found`);
//   }
//   const path = result[0].id;
//   return path;
// };

/**
 * Register all screen
 */
export const registerScreens = (store, Provider) =>
  screens.forEach(({ id, screen }) =>
    Navigation.registerComponent(
      id,
      () => NavigatorProvider(HOC(screen)),
      store,
      Provider
    )
  );
