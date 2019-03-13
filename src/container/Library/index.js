import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  RefreshControl,
  FlatList,
  View
  // Image
} from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import Image from 'react-native-fast-image';
import I18n from 'react-native-i18n';
import { fetchGallery, fetchGalleryDetail } from '../../store/actions/gallery';
import SafeArea from '../../components/SafeArea';
import { dispatchAsync, t } from '../../utils/common';
import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';
import Loading from '../../elements/Loading/index';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  image: {
    width: platform.deviceWidth / 2,
    height: platform.deviceWidth / 3
  },
  imgContainer: {
    flex: 1,
    marginBottom: 10,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  }
});

@connect(
  null,
  dispatch => ({ dispatchAsync: dispatchAsync(dispatch) })
)
export default class Library extends Component {
  static propTypes = {
    service_issue_id: PropTypes.any.isRequired
  };

  state = {
    page: 0,
    refreshing: false,
    loading: true,
    needRefresh: true,
    filters: {
      service_issue_id: null
    },
    items: []
  };

  constructor(props) {
    super(props);
    this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
  }

  static getDerivedStateFromProps(props, state) {
    if (props.service_issue_id !== state.filters.service_issue_id) {
      return {
        filters: {
          ...state.filters,
          service_issue_id: props.service_issue_id
        },
        needRefresh: true
      };
    }

    return false;
  }

  async componentDidUpdate() {
    if (this.state.needRefresh) {
      await this.fetchData();
      this.setState({
        loading: false,
        needRefresh: false
      });
    }
  }

  async componentDidMount() {
    this.props.navigator.setTitle({
      title: t('library.screen_title')
    });

    if (this.state.needRefresh) {
      this.state.needRefresh = false;
      await this.fetchData();
      this.setState({
        loading: false
      });
    }
  }

  async onNavigatorEvent(event) {
    const isVisible = await this.props.navigator.screenIsCurrentlyVisible();
    if (isVisible) {
      const { type, id } = event;

      if (type === 'NavBarButtonPress') {
        switch (id) {
          case 'library_back':
            Navigation.dismissModal();
            break;

          default:
        }
      }
    }

    if (event.id === 'willAppear') {
      this.setState(
        {
          isAppear: true
        },
        async () => {
          this.setState({
            loading: true
          });
          await this.fetchData();
          this.setState({
            loading: false
          });
        }
      );
    }
  }

  async onItemPress(item) {
    const result = await this.props.onSelection(item);
    if (!result) {
      Navigation.dismissModal();
    }
  }

  async fetchData() {
    try {
      const library = await this.props.dispatchAsync(
        fetchGallery(this.state.filters)
      );

      this.state.items = library.items;
      this.state.page = library.page;
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    if (!this.state.isAppear) {
      return (
        <SafeArea>
          <View />
        </SafeArea>
      );
    }

    if (this.state.loading) {
      return (
        <SafeArea>
          <Loading />
        </SafeArea>
      );
    }

    return (
      <SafeArea>
        <FlatList
          refreshing={this.state.refreshing}
          onEndReached={() => {}}
          onRefresh={async () => {
            this.setState({
              refreshing: true
            });
            await this.fetchData();
            this.setState({
              refreshing: false
            });
          }}
          data={this.state.items}
          keyExtractor={(item, index) => String(index)}
          renderItem={({ item }) => (
            <View style={styles.container}>
              <View style={styles.imgContainer}>
                <TouchableOpacity onPress={() => this.onItemPress(item)}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image_before_url }}
                    resizeMode={Image.resizeMode.cover}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.imgContainer}>
                <TouchableOpacity onPress={() => this.onItemPress(item)}>
                  <Image
                    style={styles.image}
                    source={{ uri: item.image_after_url }}
                    resizeMode={Image.resizeMode.cover}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </SafeArea>
    );
  }
}
