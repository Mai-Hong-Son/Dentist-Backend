import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import path from 'object-path';
import {
  View,
  Text,
  ScrollView,
  // Image,
  RefreshControl
} from 'react-native';
import { connect } from 'react-redux';

import Dot from '../../elements/Dot';
import GenericModal from '../../components/GenericModal';
import SafeArea from '../../components/SafeArea';
import { t, dispatchAsync, hiddenPhone } from '../../utils/common';
import GenericButton from '../../components/GenericButton';
import NavigationEvent from '../../NavigationEvent';
import Loading from '../../elements/Loading';
import { fetchDetailOfQuestion } from '../../store/actions/question';
import { Gap, Left, Right, Row } from '../../elements/Grid';
import Talkbox from '../../components/TalkBox';
import Answer from './Answer';
import Gallery from '../../components/Gallery';
import platform from '../../theme/variables/platform';
import ConsultingContentAuto from './ConsultingContentAuto';
import ConsultingContentManual from './ConsultingContentManual';

const styles = {
  modal: {
    padding: 10
  },

  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#474747',
    marginBottom: 4
  },
  content: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4
  },

  date: {
    fontSize: 12,
    color: '#b0b0b0',
    fontWeight: '700'
  },
  phone: {
    fontSize: 12,
    color: '#222'
  },
  container: {
    marginHorizontal: 20,
    marginVertical: 20,
    paddingBottom: 10
  },
  header: {
    fontSize: 16,
    fontWeight: '800',
    color: '#515151',
    paddingVertical: 15
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  status_default: {
    color: '#fc852c',
    fontSize: 13,
    fontWeight: '800'
  },
  status_pending: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '800'
  },

  center: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30
  }
};

const Header = ({ children }) => <Text style={styles.header}>{children}</Text>;

@connect(
  null,
  dispatch => ({
    dispatch,
    dispatchAsync: dispatchAsync(dispatch)
  })
)
export default class QuestionDetail extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true,
    drawUnderTabBar: true
  };

  static propTypes = {
    id: PropTypes.any,
    item: PropTypes.shape({
      id: PropTypes.any.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  state = {
    isAppear: false,
    loading: true,
    refreshing: false,
    item: {}
  };

  componentDidMount() {
    this.props.navigator.setTitle({
      title: t('question_detail.screen_title')
    });
    // if (!this.state.isAppear) {
    //   return;
    // }
    // this.state.loading = true;
    // fix hot reload
    // this.fetchData();
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      NavigationEvent(this.props.dispatch, this.props.navigator, event);
    }

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
          isAppear: true,
          loading: true
        },
        () => {
          this.fetchData();
        }
      );

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

  async fetchData() {
    try {
      const data = await this.props.dispatchAsync(
        fetchDetailOfQuestion(this.props.id ? { id: this.props.id } : this.props.item)
      );

      const item = {
        image_urls: [],
        x_ray_image_urls: [],
        ...data,

        // id: data.id,

        status_text: data.status ? t('questions.done') : t('questions.pending')
      };

      this.setState({
        item,
        ...(this.state.refreshing
          ? {
              refreshing: false,
              loading: false
            }
          : {
              loading: false,
              refreshing: false
            })
      });
      return;
    } catch (e) {
      //
      console.log('err', e);
    }

    this.setState({
      loading: false,
      refreshing: false
    });
  }

  refresh() {
    if (this.state.loading || this.state.refreshing) return;

    this.setState({ refreshing: true }, () => {
      this.fetchData();
    });
  }

  get issueTree() {
    const { item } = this.state;

    const res = [
      path.get(item, 'service.name'),
      path.get(item, 'service_issue.title')
    ];

    for (const info of path.get(item, 'issue_tree', [])) {
      res.push(info.title);
    }

    return res.map((title, index) => {
      // is last ?
      if (index === res.length - 1) {
        return (
          <Text key={String(index)} style={[styles.content, { color: '#222' }]}>
            {' / '}
            {title}
          </Text>
        );
      }

      return (
        <Text key={String(index)} style={styles.content}>
          {title}
          {index === res.length - 2 ? '' : ' / '}
        </Text>
      );
    });
  }

  get problem() {
    const { item } = this.state;

    const res = [
      path.get(item, 'service.name'),
      path.get(item, 'service_issue.title')
    ];

    // for (const info of item.issue_tree) {
    //   res.push(info.title);
    // }

    return res.map((title, index) => {
      // is last ?
      if (index === res.length - 1) {
        return (
          <Text key={String(index)} style={[styles.content]}>
            {' / '}
            {title}
          </Text>
        );
      }

      return (
        <Text key={String(index)} style={styles.content}>
          {title}
          {index === res.length - 2 ? '' : ' / '}
        </Text>
      );
    });
  }

  dentistAnswer() {
    if (this.state.item.status) {
      const content = path.get(this.state.item, 'answer_of_advisor.content');
      return (
        <View>
          <Text style={styles.answerTxt}>
            {t('question_detail.answer_of_dentist')}
          </Text>
          <Talkbox>{content}</Talkbox>
        </View>
      );
    }

    return null;
  }

  render() {
    if (!this.state.isAppear) {
      return (
        <SafeArea style={{ backgroundColor: platform.toolbarDefaultBg }}>
          <View />
        </SafeArea>
      );
    }

    if (this.state.loading) {
      return <Loading />;
    }

    const { item } = this.state;

    return (
      <SafeArea>
        <ScrollView
          contentContainerStyle={[styles.container]}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={() => this.refresh()}
            />
          }
        >
          <GenericModal style={styles.modal}>
            <Row>
              <Left>
                <View style={styles.row}>
                  <Dot style={{ marginRight: 10, marginBottom: 8 }} />
                  <Text style={styles.title}>
                    {'ID#'}
                    {item.id}
                  </Text>
                </View>
              </Left>
              <Right>
                <Text style={styles.date}>
                  {moment(item.created_at).format('L')}
                </Text>
              </Right>
            </Row>
            <Gap />

            <Row>
              <Left>
                <Text style={[styles.title, { paddingLeft: 25 }]}>
                  {path.get(item, 'creator.fullname')}
                </Text>
              </Left>
              <Right>
                <Text style={styles.phone}>
                  {hiddenPhone(path.get(item, 'creator.phone'))}
                </Text>
              </Right>
            </Row>

            <Row>
              <Left>
                <Text style={[styles.content, { paddingLeft: 25 }]}>
                  {this.problem}
                </Text>
              </Left>
              <Right>
                {item.status === 0 ? (
                  <Text style={styles.status_pending}>{item.status_text}</Text>
                ) : (
                  <Text style={styles.status_default}>{item.status_text}</Text>
                )}
              </Right>
            </Row>
          </GenericModal>

          <Gap />

          <Header>{t('question_detail.auto_consulting')}</Header>
          <Text style={styles.content}>{this.issueTree}</Text>

          <Gap />
          <Gap />

          {item.status === 0 ? (
            <ConsultingContentAuto item={item} />
          ) : (
            <ConsultingContentManual item={item} />
          )}

          <View style={{ marginTop: 10 }}>
            <Header>{t('question_detail.picture')}</Header>

            <Gallery
              items={path.get(item, 'image_urls', [])}
              itemSize={Math.min(44, platform.deviceWidth / 6)}
            />

            <Header>{t('question_detail.xray')}</Header>

            <Gallery
              items={path.get(item, 'x_ray_image_urls', [])}
              itemSize={80}
            />
          </View>
          <Gap />

          <Answer item={this.state.item} />
        </ScrollView>
        {!this.state.item.status && (
          <View style={styles.center}>
            <GenericButton
              style={{ marginBottom: 20 }}
              caption={t('question_detail.reason_button_title')}
              onPress={() =>
                this.props.navigator.push({
                  screen: 'conclusion',
                  title: t('conclusion.screen_title'),
                  passProps: {
                    item
                  }
                })
              }
            />
          </View>
        )}
      </SafeArea>
    );
  }
}
