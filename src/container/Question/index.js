import React from 'react';
import path from 'object-path';
import { connect } from 'react-redux';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import SafeArea from '../../components/SafeArea';
import screenPayload from '../../store/actions/screen';

import NavigationEvent from '../../NavigationEvent';
import Loading from '../../elements/Loading';
import GenericSelect from '../../components/GenericSelect';
import Scale from '../../utils/Scale';
import { t, dispatchAsync } from '../../utils/common';
import GenericModal from '../../components/GenericModal';
import TabContainer from './TabContainer';
import QuestionItem from './QuestionItem';
import { fetchServices } from '../../store/actions/service';
import {
  fetchQuestionStatuses,
  fetchQuestions
} from '../../store/actions/question';
import platform from '../../theme/variables/platform';
import FooterShadow from '../../components/FooterShadow';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 18,
    // paddingBottom: 15,
    marginBottom: -10,
    zIndex: -1
  },
  listContainer: {
    flex: 1,
    marginVertical: 15,
    marginBottom: 10,
  },

  filterLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#474747',
    paddingVertical: 10,
    fontFamily: platform.titleFontfamily
  },

  row: {
    flexDirection: 'row',
    marginHorizontal: -10
  },
  col: {
    flex: 1,
    marginHorizontal: 10
  }
});

const Label = ({ children }) => (
  <Text style={styles.filterLabel}>{children}</Text>
);
const Row = ({ children }) => <View style={styles.row}>{children}</View>;
const Col = ({ children }) => <View style={styles.col}>{children}</View>;

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
export default class Question extends React.PureComponent {
  static navigatorStyle = {
    tabBarHidden: true,
    tabBarTranslucent: true
    // drawUnderTabBar: true,
  };

  static getDerivedStateFromProps(props, state) {
    if (
      props.filters.status !== state.filters.status ||
      props.filters.service_id !== state.filters.service_id
    ) {
      return {
        filters: props.filters,
        page: 1,
        needRefresh: true
      };
    }

    return null;
  }

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isAppeared: false,
    loading: true,
    refreshing: false,
    needRefresh: false,

    filters: {
      status: -1
    },
    total: 0,
    page: 0,
    items: [],

    statuses: [],
    services: [],

    tabs: []
  };

  componentDidMount() {
    // fix hot reload
    this.state.isAppeared = true;
    this.init();
  }

  componentDidUpdate() {
    if (this.state.needRefresh) {
      this.state.needRefresh = false;
      this.init();
    }
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
        this.props.navigator.setDrawerEnabled({
          side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
          enabled: false // should the drawer be enabled or disabled (locked closed)
        });

        this.setState(
          {
            isAppeared: true
          },
          () => this.init()
        );
        return;
      }
    }

    if (event.id === 'willDisappear') {
      this.props.navigator.setDrawerEnabled({
        side: 'left', // the side of the drawer since you can have two, 'left' / 'right'
        enabled: true // should the drawer be enabled or disabled (locked closed)
      });
      this.props.navigator.setDrawerEnabled({
        side: 'right', // the side of the drawer since you can have two, 'left' / 'right'
        enabled: true // should the drawer be enabled or disabled (locked closed)
      });
      return;
    }
  }

  init() {
    this.fetch();
  }

  async fetch() {
    const patches = {
      loading: false,
      page: this.state.page,
      items: this.state.items
    };

    try {
      if (this.state.statuses.length === 0) {
        const fetchStatusesResult = await this.props.dispatchAsync(
          fetchQuestionStatuses()
        );
        patches.statuses = fetchStatusesResult.items;
      }

      if (this.state.services.length === 0) {
        const fetchServicesResult = await this.props.dispatchAsync(
          fetchServices()
        );
        patches.services = fetchServicesResult.items.map(({ id, name }) => ({
          id,
          title: name
        }));
        patches.services.unshift({
          id: 0,
          title: t('questions.filters.service_all')
        });
      }

      // fetch items
      const questions = await this.props.dispatchAsync(
        fetchQuestions({
          filters: this.props.filters,
          page: this.state.page
        })
      );

      patches.total = questions.total;
      patches.items = [
        ...(patches.page === 1 ? [] : patches.items),
        ...questions.items
      ];

      patches.page = questions.current;
    } catch (e) {
      console.log(e);
    }

    this.setState(patches);
  }

  render() {
    if (!this.state.isAppeared) {
      return (
        <SafeArea>
          <View />
        </SafeArea>
      );
    }

    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <SafeArea style={{ backgroundColor: '#FAFAFA' }}>
        <View style={styles.container}>
          <Row>
            <Col>
              <Label>{t('questions.filters.service')}</Label>
              <GenericSelect
                value={this.props.filters.service_id}
                items={this.state.services}
                defaultTitle={t('questions.filters.service_all')}
                onChange={service_id =>
                  this.props.dispatch(
                    screenPayload('question', {
                      filters: {
                        ...this.props.filters,
                        service_id
                      }
                    })
                  )
                }
              />
            </Col>
            <Col>
              <Label>{t('questions.filters.status')}</Label>
              <GenericSelect
                value={this.props.filters.status}
                items={this.state.statuses}
                defaultTitle={t('questions.filters.status_all')}
                onChange={status =>
                  this.props.dispatch(
                    screenPayload('question', {
                      filters: {
                        ...this.props.filters,
                        status
                      }
                    })
                  )
                }
              />
            </Col>
          </Row>

          <View style={{ marginVertical: 10 }}>
            <Label>{t('questions.list_all')}</Label>
          </View>

          <GenericModal style={{ flexGrow: 1 }}>
            <FlatList
              style={[styles.listContainer]}
              data={this.state.items}
              keyExtractor={(item, index) => String(index)}
              renderItem={({ item }) => <QuestionItem item={item} />}
              refreshing={this.state.refreshing}
              onEndReached={() => {
                this.state.page += 1;
                if (this.state.page > this.state.total) return;

                this.fetch();
              }}
              onEndReachedThreshold={0.1}
              onRefresh={async () => {
                if (this.state.refreshing) return;

                this.setState({ refreshing: true, page: 1 }, async () => {
                  try {
                    await this.fetch();
                  } catch (e) {
                    //
                    console.log('err', e);
                  }

                  this.setState({ refreshing: false });
                });
              }}
            />
          </GenericModal>
        </View>
        <FooterShadow />
        <TabContainer />
      </SafeArea>
    );
  }
}
