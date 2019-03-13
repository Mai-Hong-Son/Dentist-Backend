import React from 'react';
import path from 'object-path';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import TabItem, { TabContainer as TabContainerBase } from '../../components/QuestionTabs';
import screenPayload from '../../store/actions/screen';

import Loading from '../../elements/Loading';
import { dispatchAsync } from '../../utils/common';
import { fetchQuestionStatuses, fetchSummaryQuestions } from '../../store/actions/question';
import Scale from '../../utils/Scale';

const styles = StyleSheet.create({
  tabContainer: {
    height: 65,
    zIndex: 9999,
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
});

@connect(state => ({
  filters: path.get(state, 'screen.question.filters', {
    status: -1
  })
}), dispatch => ({
  dispatch,
  dispatchAsync: dispatchAsync(dispatch)
}))
export default class TabContainer extends React.Component {

  state = {
    loading: true,
  }

  componentDidMount() {
    this.fetch();
  }

  async fetch() {
    // if (this.isLoading) return;

    this.isLoading = true;
    const statuses = await this.props.dispatchAsync(fetchQuestionStatuses());

    // fetch tab
    const results = await Promise.all(statuses.items.map(({ id }) =>
      this.props.dispatchAsync(fetchSummaryQuestions({
        filters: {
          ...this.props.filters,
          status: id,
        },
        limit: 0,
      }))));

    const tabs = statuses.items.map(({ id, title }, index) => ({
      key: id,
      title,
      total: results[index].total_record,
    }));

    this.setState({
      loading: false,
      tabs,
    }, () => {
      this.isLoading = false;
    });
  }

  isLoading = false;

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <TabContainerBase style={[styles.tabContainer, this.props.style]}>
        {this.state.tabs.map((item, index) => (
          <TabItem
            key={String(index)}
            onPress={() => this.props.dispatch(screenPayload('question', {
              filters: {
                ...this.state.filters,
                status: item.key,
              }
            }))
            }
            title={item.title}
            total={item.total}
            isSelected={
              item.key === this.props.filters.status ||
              (this.props.filters.status == null && index === 0)
            }
          />
        ))}
      </TabContainerBase>
    );
  }
}
