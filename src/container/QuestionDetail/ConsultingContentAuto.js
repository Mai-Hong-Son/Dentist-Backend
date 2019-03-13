import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Image from 'react-native-fast-image';
import { t } from '../../utils/common';
import Divider from '../../elements/Divider';
import GenericModal from '../../components/GenericModal/index';
import Scale from '../../utils/Scale';
import { Row } from '../../elements/Grid';

const Sep = props => <View style={styles.sep} />;

export default class ConsultingContentAuto extends Component {
  render() {
    // const item = {
    //   tooth_status: 'Răng hô / Hô do răng / Nặng',
    //   consultation: 'Kết quả',
    //   consultation_detail: 'Độ hô của bạn sẽ được cải thiện đáng kể',
    //   expecting_time: 'Thời gian dự kiến',
    //   time_detail: 'Từ 2 - 2,5 năm',
    //   expecting_method: 'Thủ thuật cần làm',
    //   method_detail: 'Có khả năng cao phải nhổ răng + cắm vít',
    //   be_af: 'Before & After',
    //   be_af_detail: 'Hai ảnh before và after'
    // };

    console.log(this.props.item, 'question');
    const {
      content_title,
      content_result,
      content_surgery,
      content_time,
      gallery
    } = this.props.item.auto_answer;

    return (
      <GenericModal style={styles.modal}>
        <Text style={styles.header}>{content_title}</Text>

        <Divider />
        <Sep />

        <Text style={styles.title}>1) {t('conclusion.form.result')}</Text>
        <Text style={styles.content}>{content_result}</Text>
        <Sep />

        <Text style={styles.title}>
          2) {t('conclusion.form.time_expected')}
        </Text>
        <Text style={styles.content}>{content_time}</Text>
        <Sep />

        <Text style={styles.title}>3) {t('conclusion.form.method')}</Text>
        <Text style={styles.content}>{content_surgery}</Text>
        <Sep />

        <Text style={styles.title}>4) {t('conclusion.form.preview')}</Text>
        <Row style={{ justifyContent: 'flex-start' }}>
          <Image
            style={{ width: 70, height: 70, marginRight: 10 }}
            resizeMethod="scale"
            source={{ uri: gallery.image_before_url }}
          />
          <Image
            style={{ width: 70, height: 70 }}
            resizeMethod="scale"
            source={{ uri: gallery.image_after_url }}
          />
        </Row>
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
    lineHeight: 18,
  },
  sep: {
    height: Scale.getSize(10)
  }
});
