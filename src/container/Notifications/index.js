import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  // Animated
} from 'react-native';
import { connect } from 'react-redux';
import platform from '../../theme/variables/platform';

import {
  listNotification,
  deleteNotification,
  deleteAllNotification,
  loadMoreNotification,
  // initNotification
} from '../../store/actions/notification';
// import images from '../../assets/images';
import Scale from '../../utils/Scale';
import NotifItem from './NotifItem';
import { t } from '../../utils/common';
import Loading from '../../elements/Loading/index';
import Icon from '../../elements/Icon/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  wrapHeaderTitle: {
    height: 65,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    alignItems: 'center',
    paddingBottom: 1,
    paddingHorizontal: 30
    // paddingLeft: Scale.getSize(30),
    // paddingRight: Scale.getSize(15)
  },
  txtHeaderTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: platform.primaryOrange
  },
  txtClear: {
    color: '#A8A8A8',
    fontWeight: '700',
    fontSize: 12
  },
  contentContainerStyle: {
    paddingHorizontal: Scale.getSize(10)
  },

  wrapEmptyNotif: {
    flex: 1,
    paddingTop: Scale.getSize(120),
    alignItems: 'center'
  },
  bigTitleEmpty: {
    fontSize: Scale.getSize(18),
    paddingVertical: Scale.getSize(15),
    fontWeight: '700',
    lineHeight: 22
  },
  smallTitleEmpty: {
    fontSize: Scale.getSize(13),
    color: '#758EA8',
    lineHeight: 22
  },
  emptyIcon: {
    color: '#525252'
  }
});

@connect(state => ({
  notification: state.notification
}))
export default class Notifications extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'notification/init' });
  }

  onRefresh = async () => {
    this.props.dispatch(
      listNotification({
        ...this.props.notification.criterial,
        page: 1
      })
    );
  };

  onDeleteItem = item => {
    try {
      // reinit
      this.props.dispatch(deleteNotification(item.id));
    } catch (e) {
      this.props.dispatch({ type: 'notification/stopRefreshing' });
    }
  };

  onDeleteAll = async () => {
    this.props.dispatch(deleteAllNotification());
  };

  onLoadMoreData = () => {
    this.props.dispatch(loadMoreNotification());
  };

  get notification() {
    console.warn(this.props.notification.data);
    return this.props.notification;
  }

  renderItem = ({ item }) => (
    <NotifItem item={item} onDeleteOneItem={this.onDeleteItem} />
  );

  render() {
    const { isLoadMore } = this.notification;
    const EmptyNotifView = (
      <View style={styles.wrapEmptyNotif}>
        {/* <Image source={images.emptyNotif} resizeMode="cover" /> */}
        <Icon name="ring" size={65} style={styles.emptyIcon} />
        <Text style={styles.bigTitleEmpty}>{t('notifications.empty_text')}</Text>
        <Text style={styles.smallTitleEmpty}>{t('notifications.message1')}</Text>
        <Text style={styles.smallTitleEmpty}>{t('notifications.message2')}</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <View style={{ height: 10 }} />
        <View style={styles.wrapHeaderTitle}>
          <Text style={styles.txtHeaderTitle}>
            {t('notifications.screen_title')}
          </Text>
          <TouchableOpacity onPress={this.onDeleteAll}>
            <Text style={styles.txtClear}>{t('notifications.delete_all')}</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{ flexGrow: 1 }}
          data={this.notification.data.items}
          contentContainerStyle={styles.contentContainerStyle}
          ListEmptyComponent={EmptyNotifView}
          refreshing={this.notification.refreshing}
          onRefresh={this.onRefresh}
          renderItem={this.renderItem}
          keyExtractor={item => String(item.id)}
          onEndReached={this.onLoadMoreData}
          ListFooterComponent={isLoadMore ? <Loading /> : null}
        />
      </View>
    );
  }
}
