import React from 'react';
import path from 'object-path';

import { StyleSheet, View, Text, TextInput } from 'react-native';
import Talkbox from '../../components/TalkBox/index';
import { t } from '../../utils/common';

const styles = StyleSheet.create({
  answer: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fc852c'
  }
});

const Answer = props => (
  <View>
    <Text style={styles.answer}>
      {t('question_detail.answer_of_dentist')}
    </Text>
    <Talkbox>
      <TextInput
        multiline
        minHeight={50}
        style={[
          props.style,
          {
            flex: 1
          }
        ]}
        {...props}
      />
    </Talkbox>
  </View>
);

export default Answer;

export const renderInput = ({ input: { onChange, ...restInput } }) => (
  <Answer onChangeText={onChange} {...restInput} />
);
