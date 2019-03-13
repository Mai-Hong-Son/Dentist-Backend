import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
// import { connect } from 'react-redux';
import { t } from '../../utils/common';
import Divider from '../../elements/Divider';
import GenericModal from '../../components/GenericModal/index';
import Scale from '../../utils/Scale';


const Sep = props => <View style={styles.sep} />;

export default class ConsultingContentManual extends Component {

  state = {
    items: []
  }

  render() {
    console.log(this.props.item, 'question');
    const {
      content_title,
      assumed_result,
      assumed_surgeries,
      assumed_time
    } = this.props.item.answer_of_advisor;

    return (
      <GenericModal style={styles.modal}>
        <Text style={styles.header}>{content_title}</Text>

        <Divider />
        <Sep />

        <Text style={styles.title}>1) {t('conclusion.form.result')}</Text>
        <Text style={styles.content}>{assumed_result.name}</Text>
        <Sep />

        <Text style={styles.title}>2) {t('conclusion.form.time_expected')}</Text>
        <Text style={styles.content}>{assumed_time.name}</Text>
        <Sep />

        <Text style={styles.title}>3) {t('conclusion.form.method')}</Text>
        <Text style={styles.content}>
          {assumed_surgeries.map((item) => (
            item.assumed_surgery.name
        )).join(', ')}
        </Text>
        <Sep />

        <Text style={styles.title}>4) {t('conclusion.form.preview')}</Text>
        <Image
          style={{ width: 70, height: 70 }}
          // source={{ uri: gallery.image_before_url }}
        />
      </GenericModal>
    );
  }
}

const styles = StyleSheet.create({
  modal: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  header: {
    fontSize: 16,
    fontWeight: '800',
    color: '#515151',
    paddingVertical: 10,
    textAlign: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: '800',
    color: '#515151',
    paddingVertical: 5
  },
  content: {
    paddingVertical: 8,
    fontWeight: '200',
    fontSize: 14,
  },
  sep: {
    height: Scale.getSize(10)
  }
});
