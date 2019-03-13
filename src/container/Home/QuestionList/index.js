import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import path from 'object-path';
// import screenPayload from '../../../store/actions/screen';

import Loading from '../../../elements/Loading';
import {
  fetchSummaryQuestions,
  fetchQuestionStatuses
} from '../../../store/actions/question';

import GenericModal from '../../../components/GenericModal';
import { t, dispatchAsync } from '../../../utils/common';
import TabItem, { TabContainer } from '../../../components/QuestionTabs';
import QuestionItem from './QuestionItem';
import Title from '../../../elements/Title';
import CustomIcon from '../../../elements/Icon/CustomIcon';

const styles = StyleSheet.create({
  listName: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 15,
    marginTop: 25,
    marginBottom: 20
  },
  list: {
    marginHorizontal: 15
  },

  viewAll: {
    fontSize: 12,
    fontWeight: '800',
    color: '#b0b0b0'
  }
});

@connect(
  state => ({
    tabSelection: path.get(state, 'screen.question.filters.status', null)
  }),
  dispatch => ({
    dispatch,
    dispatchAsync: dispatchAsync(dispatch)
  }),
  null,
  { withRef: true }
)
export default class QuestionList extends Component {
  state = {
    tabSelection: null,
    tabs: []
  };

  componentDidMount() {
    this.fetchData();
  }

  getTab(key) {
    if (key === null) {
      // go first
      return this.state.tabs[0];
    }

    const res = this.state.tabs.find(v => v.id === key);
    if (res === undefined) {
      return null;
    }

    return res;
  }

  get currentTab() {
    return this.getTab(this.state.tabSelection);
  }

  async fetchData() {
    const statuses = await this.props.dispatchAsync(fetchQuestionStatuses());

    const results = await Promise.all(
      statuses.items.map(({ id }) =>
        this.props.dispatchAsync(
          fetchSummaryQuestions({
            filters: {
              status: id
            }
          })
        )
      )
    );

    const tabs = statuses.items.map(({ id, title }, index) => ({
      id,
      title,
      total: results[index].total_record,
      items: results[index].items
    }));

    this.setState({
      tabs
    });
  }

  renderList() {
    const currentTab = this.currentTab;
    if (currentTab == null) {
      return <Loading />;
    }

    const ViewAllIcon = () => (
      <CustomIcon
        name="arrow_right"
        style={{ color: '#b0b0b0', paddingTop: 2 }}
      />
    );

    return (
      <View>
        <View style={styles.listName}>
          <Title>{t('questions.list_all')}</Title>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: 80
            }}
            onPress={() => {
              Navigation.handleDeepLink({
                link: 'questions',
                payload: {
                  filters: {
                    status: currentTab.id
                  }
                }
              });
            }}
          >
            <Text style={styles.viewAll}>{t('questions.view_all')}</Text>

            <ViewAllIcon />
          </TouchableOpacity>
        </View>

        <GenericModal style={styles.list}>
          {currentTab.items.map((item, index) => (
            <QuestionItem key={index} item={item} />
          ))}
        </GenericModal>
      </View>
    );
  }

  render() {
    return (
      <View>
        <TabContainer>
          {this.state.tabs.map((item, index) => (
            <TabItem
              key={String(index)}
              onPress={() =>
                this.setState({
                  tabSelection: item.id
                })
              }
              title={item.title}
              total={item.total}
              isSelected={
                item.id === this.state.tabSelection ||
                (this.state.tabSelection === null && index === 0)
              }
            />
          ))}
        </TabContainer>
        {this.renderList()}
      </View>
    );
  }
}
