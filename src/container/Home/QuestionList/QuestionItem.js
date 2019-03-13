import React from 'react';
import moment from 'moment';
import path from 'object-path';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import withNavigator from '../../../utils/withNavigator';
import Dot from '../../../elements/Dot';
import platform from '../../../theme/variables/platform';

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10
  },
  itemContent: {
    // width: platform.deviceWidth - 140,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    marginHorizontal: 12,
    paddingVertical: 12
  },
  title: {
    // fontSize: Scale.getSize(),
    fontWeight: '700',
    color: '#525252'
  },
  date: {
    fontSize: 10,
    color: '#A8A8A8',
    fontWeight: '700'
  },

  dot: {
    width: 10,
    height: 10,
    marginTop: 0,
    marginRight: 0
  }
});

export const Dot2 = () => <Dot style={styles.dot} />;

@withNavigator()
export default class QuestionItem extends React.Component {
  render() {
    const { props } = this;
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() =>
          props.navigator.push({
            screen: 'question_detail',
            passProps: {
              item: props.item
            }
          })
        }
      >
        <Dot2 />
        <View style={styles.itemContent}>
          <Text
            style={[
              styles.title,
              {
                marginRight: 80
              }
            ]}
            numberOfLines={1}
          >
            {props.item.id}{'. '}{path.get(props, 'item.creator.fullname')}
            {' - '}
            {path.get(props, 'item.service_issue.title')}
          </Text>
          <Text
            style={[
              styles.date,
              {
                marginLeft: -80
              }
            ]}
            numberOfLines={1}
          >
            {moment(props.item.created_at).format('L')}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
