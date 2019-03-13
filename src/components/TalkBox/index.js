import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Scale from '../../utils/Scale';

export default class Talkbox extends Component {
  render() {
    const { children } = this.props;
    return (
      <View>
        <View style={styles.talkBox}>
          <View style={styles.rect} />
        </View>

        <View style={styles.talkBoxContainer}>
          <View style={styles.content}>
            {React.isValidElement(children) ? (
              <View
                style={[
                  styles.titleStatus,
                  { flexDirection: 'row', alignItems: 'stretch' }
                ]}
              >
                {children}
              </View>
            ) : (
              <Text
                style={[
                  styles.titleStatus,
                  {
                    color: '#666',
                    lineHeight: Scale.getSize(24)
                  }
                ]}
              >
                {children}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  talkBoxContainer: {
    marginVertical: Scale.getSize(15)
  },
  talkBox: {
    zIndex: 1,
    width: 15,
    height: 15,
    borderWidth: 2,
    borderColor: '#fc852c',
    backgroundColor: '#fff',
    marginLeft: Scale.getSize(30),
    marginTop: Scale.getSize(8),
    position: 'absolute',
    overflow: 'visible',
    transform: [
      {
        rotate: '45deg'
      }
    ]
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: Scale.getSize(15),
    alignItems: 'flex-start',
    padding: Scale.getSize(15),
    minHeight: Scale.getSize(100),

    borderWidth: 2,
    borderColor: '#fc852c'
  },
  titleStatus: {
    // color: '#666',
    // lineHeight: Scale.getSize(24),
    zIndex: 4
  },
  rect: {
    zIndex: 2,
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    position: 'absolute'
  }
});
