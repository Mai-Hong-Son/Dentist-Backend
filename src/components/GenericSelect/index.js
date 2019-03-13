import React from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  ScrollView,
  Modal,
  View,
  TouchableOpacity,
  Text
} from 'react-native';
import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';
import CustomIcon from '../../elements/Icon/CustomIcon';

const Icon = () => (
  <CustomIcon
    name="double_arrow"
    style={{ fontSize: 15 }}
  />
);

const OptionButton = ({ value, children, selected, onChange }) => (
  <TouchableOpacity
    style={[
      styles.option,
      {
        ...(selected
          ? {
              backgroundColor: platform.primaryColor
            }
          : {})
      }
    ]}
    onPress={() => onChange(value)}
  >
    <Text
      style={[
        styles.optionText,
        selected
          ? {
              color: '#fff'
            }
          : {
              color: '#222'
            }
      ]}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

const cap = str => {
  if (str) {
    str += ' ';
    return (str.charAt(0).toUpperCase() + str.slice(1)).trim();
  }
};

export default class GenericSelect extends React.PureComponent {
  static propTypes = {
    icon: PropTypes.element,
    items: PropTypes.array,
    // (PropTypes.shape({
    //   id: PropTypes.any.isRequired,
    //   title: PropTypes.string.isRequired,
    // })),
    value: PropTypes.any
  };

  static defaultProps = {
    style: {},
    icon: <Icon />
  };

  state = {
    isModalVisible: false
  };

  get displayValue() {
    const item = this.props.items.find(v => v.id === this.props.value);
    if (item) {
      return cap(item.title);
    }

    return null;
  }

  render() {
    const { value, onChange } = this.props;

    return (
      <View>
        <Modal
          animationType="fade"
          visible={this.state.isModalVisible}
          style={styles.modal}
          transparent
          onRequestClose={() => {
            this.setState({ isModalVisible: false }, () => {
              // sdf
            });
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'rgba(0, 0, 0, 0.3)'
            }}
            activeOpacity={1}
            onPress={() => this.setState({ isModalVisible: false })}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: '#fff',
              padding: 20
            }}
          >
            <ScrollView>
              {this.props.items.map((item, index) => (
                <OptionButton
                  key={index}
                  selected={item.id === value}
                  onChange={() => {
                    this.setState({ isModalVisible: false });
                    onChange(item.id);
                  }}
                >
                  {cap(item.title)}
                </OptionButton>
              ))}
            </ScrollView>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => this.setState({ isModalVisible: true })}
          style={[styles.container, this.props.style]}
        >
          <Text style={styles.text}>
            {this.displayValue || this.props.defaultTitle}
          </Text>
          <View>{this.props.icon}</View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    shadowOffset: { width: 0, height: Scale.getSize(3) },
    shadowColor: '#777',
    shadowOpacity: 0.3,
    shadowRadius: Scale.getSize(3),
    elevation: Scale.getSize(1),

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Scale.getSize(10),
    paddingVertical: 10, //Scale.getSize(0),
    borderRadius: Scale.getSize(30)
  },

  text: {
    fontSize: 13,
    fontWeight: '700',
    color: '#515151'
  },

  modal: {
    // height: '50%',
  },

  option: {
    borderColor: '#eee',
    borderRadius: 100,
    borderWidth: 1,
    padding: 14,
    marginBottom: 10
  },

  optionText: { textAlign: 'center' }
});
