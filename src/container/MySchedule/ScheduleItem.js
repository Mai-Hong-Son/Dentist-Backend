import React from 'react';
import path from 'object-path';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Dot from '../../elements/Dot';
import Divider from '../../elements/Divider';
import * as Grid from '../../elements/Grid';
import { t, hiddenPhone } from '../../utils/common';
import CustomIcon from '../../elements/Icon/CustomIcon';
import withNavigator from '../../utils/withNavigator';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  title: {
    fontSize: 13,
    fontWeight: '700',
    color: '#474747'
  },
  date: {
    fontSize: 10,
    color: '#b0b0b0',
    fontWeight: '700'
  },
  phone: {
    fontSize: 13,
    color: '#222'
  },
  detail: {
    marginHorizontal: 5,
    paddingBottom: 5
  },

  content: {
    fontSize: 13,
    color: '#555',
    marginBottom: 4
  },
  status_default: {
    fontSize: 10,
    color: '#fc852c',
    fontWeight: '800'
  },
  status_pending: {
    color: '#aaa',
    fontSize: 10,
    fontWeight: '800'
  }
});

const Row = Grid.Row;
const Left = ({ style, children }) => (
  <Grid.Left
    style={[
      style,
      {
        flex: 2
      }
    ]}
  >
    {children}
  </Grid.Left>
);

const Right = ({ children, style }) => (
  <Grid.Right
    style={[
      style,
      {
        flex: 1
      }
    ]}
  >
    {children}
  </Grid.Right>
);

const issueTree = item => {
  const res = [item.service.name, item.service_issue.title];

  return res.map((title, index) => {
    // is last ?
    if (index === res.length - 1) {
      return (
        <Text key={index} style={[styles.content, { color: '#222' }]}>
          {' / '}
          {title}
        </Text>
      );
    }

    return (
      <Text key={index} style={styles.content}>
        {title}
        {index === res.length - 2 ? '' : ' / '}
      </Text>
    );
  });
};
const statusText = item =>
  item.status ? t('questions.done') : t('questions.pending');

const ViewNextIcon = () => (
  <CustomIcon
    name="arrow_right"
    style={{ color: '#b0b0b0', paddingLeft: 20, fontSize: 9 }}
  />
);

const ScheduleItem = ({ item, navigator }) => (
  // <TouchableOpacity
  //   style={styles.detail}
  //   onPress={() => {
  //     navigator.push({
  //       screen: 'question_detail',
  //       title: t('tabs.question_detail'),
  //       animationType: 'fade',
  //       passProps: {
  //         item
  //       }
  //     });
  //   }}
  // >
  <View>
    <Row>
      <Left>
        <View style={styles.row}>
          <Dot style={{ marginRight: 10, marginBottom: 7, marginTop: 7 }} />
          <Text style={styles.title}>{`ID#${item.id}`}</Text>
        </View>
      </Left>
      <Right>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.date}>
            {moment(path.get(item, 'created_at', '')).format('L')}
          </Text>
          <ViewNextIcon />
        </View>
      </Right>
    </Row>

    <View style={{ marginTop: 10 }}>
      <Row>
        <Left>
          <Text style={[styles.title, { paddingLeft: 25 }]}>
            {path.get(item, 'creator.fullname', '')}
          </Text>
        </Left>
        <Right>
          <Text style={styles.phone}>
            {hiddenPhone(path.get(item, 'creator.phone', ''))}
          </Text>
        </Right>
      </Row>

      <Row>
        <Left style={{ flexDirection: 'row' }}>
          <View style={{ marginLeft: 25 }}>{issueTree(item)}</View>
        </Left>
        <Right>
          {item.status === 0 ? (
            <Text style={styles.status_pending}>{statusText(item)}</Text>
          ) : (
            <Text style={styles.status_default}>{statusText(item)}</Text>
          )}
        </Right>
      </Row>

      <View style={{ marginLeft: 25, marginRight: 5 }}>
        <Divider />
      </View>
    </View>
  </View>
  // </TouchableOpacity>
);

export default withNavigator()(ScheduleItem);
