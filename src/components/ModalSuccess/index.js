import React from 'react';
import PropTypes from 'prop-types';
import { Text, Image, View, TouchableOpacity, StyleSheet } from 'react-native';
import platform from '../../theme/variables/platform';
import { t } from '../../utils/common';

const IconCheck = () => (
  <Image
    source={require('../../assets/images/icon_check.png')}
    style={{
      width: 32,
      height: 32
    }}
  />
);

export default class ModalSuccess extends React.Component {
  static propTypes = {
    title: PropTypes.string
  };

  static defaultProps = {
    title: 'Ursmiles'
  };

  success() {
    this.props.navigator.dismissLightBox();
    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <IconCheck />
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text style={styles.content}>{this.props.content}</Text>
        <View style={styles.controls}>
          <TouchableOpacity
            style={{
              padding: 10
            }}
            onPress={() => this.success()}
          >
            <Text style={styles.activeButton}>{t('modal.success_text')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: platform.deviceWidth - 40,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 16,
    padding: 14
  },
  header: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 18
  },
  content: {
    fontSize: 14
  },
  controls: {
    flexDirection: 'row-reverse',
    alignContent: 'space-between',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  activeButton: {
    fontWeight: 'bold',
    color: platform.primaryColor,
    fontSize: 16
  }
});
