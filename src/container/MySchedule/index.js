import React from 'react';
import path from 'object-path';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity
 } from 'react-native';
import { connect } from 'react-redux';
import NavigationEvent from '../../NavigationEvent';
// import screenPayload from '../../store/actions/screen';
import { t, dispatchAsync } from '../../utils/common';
import SafeArea from '../../components/SafeArea';
import Scale from '../../utils/Scale';
import withNavigator from '../../utils/withNavigator';
import platform from '../../theme/variables/platform';
import GenericModal from '../../components/GenericModal/index';
import FilterForm from './FilterForm';
import QuestionItem from '../Question/QuestionItem';
import ScheduleItem from './ScheduleItem';
import CalendarScreen from '../../components/Calendar/Calendars';

const styles = StyleSheet.create({
  flex: {
    paddingHorizontal: 20
  },
  modal: {
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 20
  },
  filterLabel: {
    fontSize: platform.titleFontSize,
    fontWeight: '700',
    color: '#474747',
    paddingVertical: 10,
    fontFamily: platform.titleFontfamily
  },
  filterSubTxt: {
    fontFamily: platform.titleFontfamily,
    fontWeight: '700',
    color: platform.primaryOrange
  },
  row: {
    flexDirection: 'row',
    marginHorizontal: -10
  },
  col: {
    flex: 1,
    marginHorizontal: 10
  },
  wrappedFilter: {
    justifyContent: 'space-between',
    marginBottom: 10,
    width: Scale.getSize(150)
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  div: {
    height: 1,
    backgroundColor: '#b0b0b0'
  },
  title: {
    fontSize: platform.titleFontSize,
    fontWeight: '700',
    fontFamily: platform.titleFontFamily
  }
});

const Div = props => <View style={styles.div} />;

const Label = ({ children }) => (
  <Text style={styles.filterLabel}>{children}</Text>
);

@connect(
  state => ({
    filters: path.get(state, 'screen.question.filters', {
      status: -1
    })
  }),
  dispatch => ({
    dispatch,
    dispatchAsync: dispatchAsync(dispatch)
  })
)
export default class MySchedule extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: true,
    tabBarTranslucent: true,
    // drawUnderTabBar: true,
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isAppeared: false,

    filters: {
      status: -1
    },
    items: [],
    statuses: [],
    services: [],

    tabs: []
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);

      if (event.id === 'willAppear') {
        this.props.navigator.setDrawerEnabled({
          side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
          enabled: false // should the drawer be enabled or disabled (locked closed)
        });

        this.setState(
          {
            isAppeared: true
          },
          // () => this.init()
        );
        return;
      }
    }

    if (event.id === 'willDisappear') {
      this.props.navigator.setDrawerEnabled({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        enabled: true // should the drawer be enabled or disabled (locked closed)
      });
      return;
    }
  }

  // init() {
  //   this.fetch();
  // }

  // async fetch() {
  //   this.state.items;
  // }


  render() {
    return (
      <SafeArea style={styles.flex}>
        <GenericModal
          style={styles.modal}
        >
        <FilterForm />
        </GenericModal>

        <Text style={styles.title}>{t('schedule_list.title')}</Text>

        <GenericModal
          style={styles.modal}
        >
        <FlatList
          data={this.state.items}
          renderItem={({ item }) => <ScheduleItem item={item} />}
        />
        </GenericModal>

      </SafeArea>
    );
  }
}
