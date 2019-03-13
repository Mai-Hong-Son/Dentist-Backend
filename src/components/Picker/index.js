import React from 'react';
import {
  View,
  Picker,
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native';

import platform from '../../theme/variables/platform';
import Scale from '../../utils/Scale';

export default class ItemPicker extends React.PureComponent {
  state = {
    itemSelected: this.props.data[0].id
  }

  onConfirm = () => {
    const { itemSelected } = this.state;

    this.props.itemSelected(itemSelected);
    this.props.navigator.dismissLightBox();
  }

  render() {
    const { data } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Picker
            selectedValue={this.state.itemSelected}
            style={styles.wrapPicker}
            itemStyle={styles.itemPicker}
            onValueChange={(itemValue) => this.setState({ itemSelected: itemValue })}
          >
            {data.map((item, index) => <Picker.Item
              key={index}
              label={item.name}
              value={item.id}
            />)}
          </Picker>
          <TouchableHighlight onPress={this.onConfirm}>
            <View style={styles.btnConfirm}>
              <Text style={styles.txtBtnConfirm}>{'Confirm'}</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TouchableHighlight onPress={() => this.props.navigator.dismissLightBox()}>
          <View style={styles.btnCancel}>
            <Text style={styles.txtBtnConfirm}>{'Cancel'}</Text>
          </View>
        </TouchableHighlight>
      </View >
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(0,0,0, .5)',
    width: platform.deviceWidth,
    height: platform.deviceHeight,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  wrapPicker: {
    width: platform.deviceWidth - 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  itemPicker: {
    backgroundColor: '#fff',
    height: (platform.deviceHeight / 2) - Scale.getSize(50),
  },
  btnConfirm: {
    height: Scale.getSize(50),
    width: platform.deviceWidth - 50,
    backgroundColor: '#fff',
    borderTopColor: 'rgb(237,237,237)',
    borderTopWidth: 1,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  txtBtnConfirm: {
    fontSize: Scale.getSize(17),
    fontWeight: '700',
  },
  btnCancel: {
    height: Scale.getSize(50),
    width: platform.deviceWidth - 50,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 15
  }
});
