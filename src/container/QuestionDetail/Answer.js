import React from 'react';
import path from 'object-path';
import { StyleSheet, View, Text } from 'react-native';
import Talkbox from '../../components/TalkBox/index';
import { t } from '../../utils/common';

const styles = StyleSheet.create({
  answer: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fc852c'
  },
  container: {
    marginBottom: 15
  }
});

export default ({ item }) => {
  if (item.status) {
    const content = path.get(item, 'answer_of_advisor.content');
    return (
      <View style={styles.container}>
        <Text style={styles.answer}>
          {t('question_detail.answer_of_dentist')}
        </Text>
        <Talkbox>{content}</Talkbox>
      </View>
    );
  }

  return null;
};
