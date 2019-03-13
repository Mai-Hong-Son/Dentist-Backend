import React from 'react';
import { View, Text, ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import SafeArea from '../../components/SafeArea';
import { t } from '../../utils/common';

import ProfileHeader from './ProfileHeader';
import QuestionList from './QuestionList';
import NavigationEvent from '../../NavigationEvent';
import TabGap from '../../components/TabGap';

@connect(
  null,
  dispatch => ({ dispatch })
)
export default class Home extends React.Component {
  static navigatorStyle = {
    // tabBarHidden: false
    drawUnderTabBar: true,
    tabBarHideShadow: false
  };

  constructor(props) {
    super(props);

    this.questionList = React.createRef();
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isAppeared: false,
    refreshing: false
  };

  async componentDidMount() {
    this.state.isAppeared = true;
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);

      if (event.id === 'willAppear') {
        this.setState(
          {
            isAppeared: true
          },
          () => {
            if (this.questionList.current) {
              this.questionList.current.getWrappedInstance().fetchData();
            }
          }
        );

        return;
      }
    }
  }

  render() {
    if (!this.state.isAppeared) {
      return (
        <SafeArea>
          <View />
        </SafeArea>
      );
    }

    return (
      <SafeArea>
        <ScrollView
          style={{ flexGrow: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={async () => {
                this.setState({ refreshing: true });

                try {
                  await this.questionList.current
                    .getWrappedInstance()
                    .fetchData();
                } catch (e) {
                  //
                }
                this.setState({ refreshing: false });
              }}
            />
          }
        >
          <ProfileHeader />
          <QuestionList ref={this.questionList} />
        </ScrollView>
      </SafeArea>
    );
  }
}
