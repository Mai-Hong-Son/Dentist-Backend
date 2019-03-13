import React, { Component } from 'react';
import { View, Alert, Text } from 'react-native';
import { connect } from 'react-redux';
import Fabric from 'react-native-fabric';

import SafeArea from '../../components/SafeArea';
import NavigationEvent from '../../NavigationEvent';
import {
  fetchAdvisoryTemplate,
  submitConclusion
} from '../../store/actions/advisory';
import Loading from '../../elements/Loading/index';
import ConclusionForm from './ConclusionForm';
import { dispatchAsync, t } from '../../utils/common';


@connect(
  null,
  dispatch => ({ dispatchAsync: dispatchAsync(dispatch) })
)
export default class Conclusion extends Component {
  static navigatorStyle = {
    tabBarHidden: true,
    drawUnderTabBar: true
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isAppeared: false,
    loading: true,
    refreshing: false,

    initialValues: {},
    template: {
      result: {
        title: '',
        sub_title: '',
        items: []
      },
      time: {
        title: '',
        items: []
      },
      method: {
        title: '',
        items: []
      },
      difficulty: {
        title: '',
        items: []
      }
    }
  };

  componentDidMount() {
    this.state.isAppeared = true;
    this.fetch();
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

        if (!this.state.isAppeared) {
          this.setState(
            {
              isAppeared: true
            },
            () => this.fetch()
          );
        }

        return;
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
  }

  onSubmit = async values => {
    try {
      this.setState({ loading: true });
      await this.props.dispatchAsync(
        submitConclusion({
          ...values,
          question_id: this.props.item.id
        })
      );
      this.setState({
        loading: false
      });

      this.props.navigator.showLightBox({
        screen: 'confirm_dialog',
        passProps: {
          title: t('conclusion.dialog_success.title'),
          messageContent: t('conclusion.dialog_success.content'),
          onSuccess: () => {
            // go back
            // refresh listing
            this.props.navigator.pop();
          }
        }
      });
    } catch (e) {
      this.setState({
        loading: false,
        mes: JSON.stringify(e)
      });

      if (e.errors) {
        // join alert
        const errors = e.errors;
        Alert.alert(
          t('conclusion.error'),
          Object.keys(errors)
            .map(field => errors[field])
            .join('\n')
        );

        // set old value
        this.setState({
          initialValues: values
        });
      } else {
        console.log(e);
      }
    }
  };

  async fetch() {
    // console.log(this.props.item);
    const template = await this.props.dispatchAsync(
      fetchAdvisoryTemplate({
        ...this.props.item
      })
    );

    this.props.navigator.setButtons({
      rightButtons: [
        {
          component: 'conclusion_id',
          passProps: {
            item: this.props.item
          }
        }
      ], // see "Adding buttons to the navigator" below for format (optional)
      animated: true
    });

    this.setState({
      loading: false,
      template,
      initialValues: {
        assumed_result_id: template.result.items[0].id,
        difficulty_id: template.difficulty.items[0].id
      }
    });
  }

  render() {
    if (!this.state.isAppeared) {
      return (
        <SafeArea>
          <View />
        </SafeArea>
      );
    }

    if (this.state.loading) return <Loading />;

    return (
      <SafeArea>
        <ConclusionForm
          refreshing={this.state.refreshing}
          onRefresh={() => {
            if (this.state.refreshing) return;

            this.setState({ refreshing: true }, async () => {
              await this.fetch();
              this.setState({ refreshing: false });
            });
          }}
          template={this.state.template}
          item={this.props.item}
          initialValues={this.state.initialValues}
          onSubmit={this.onSubmit}
        />
      </SafeArea>
    );
  }
}
