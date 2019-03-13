import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';
// import { t } from '../../../../utils/common';

export default class ConfirmDialog extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    messageContent: PropTypes.string
  };

  static defaultProps = {
    title: '',
    messageContent: ''
  }

  success() {
    this.props.navigator.dismissLightBox();
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }

  render() {
    const { title, messageContent } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <View style={styles.wrapTitle}>
            <Image
              source={require('../../assets/images/icon_check.png')} style={styles.imageIcon}
            />
            <Text style={styles.title}>{title}</Text>
          </View>
          <Text style={styles.messageContent}>
            {messageContent}
          </Text>
          <View style={styles.wrapBtnOk}>
            <View />
            <TouchableOpacity onPress={() => this.success()}>
              <Text style={styles.btnName}>
                {'OK'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, .86)',
    width: platform.deviceWidth,
    height: platform.deviceHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentBox: {
    width: platform.deviceWidth - 40,
    maxHeight: platform.deviceHeight - 40,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 16,
    padding: 20,
  },
  wrapTitle: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  imageIcon: {
    width: Scale.getSize(32),
    height: Scale.getSize(32),
  },
  title: {
    fontSize: Scale.getSize(17),
    fontWeight: 'bold',
    padding: 18,
  },
  messageContent: {
    fontSize: Scale.getSize(15),
    color: 'rgb(82,82,82)',
    paddingVertical: 10,
    fontWeight: '100'
  },
  wrapBtnOk: {
    marginTop: 20,
    flexDirection: 'row',
    alignContent: 'space-between',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnName: {
    fontWeight: '700',
    color: platform.primaryOrange,
    fontSize: Scale.getSize(20)
  }
});
