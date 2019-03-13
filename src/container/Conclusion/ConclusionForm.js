import React from 'react';
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { reduxForm, Field } from 'redux-form';
import GenericButton from '../../components/GenericButton/index';
import Title from '../../elements/Title';
import { Row, Col } from '../../elements/Grid';
import {
  SelectField,
  RadioSelectField,
  MultiSelectField,
} from '../../components/Form/SelectField';
import Scale from '../../utils/Scale';
import { t } from '../../utils/common';
import { renderInput } from './Answer';
import { LibrarySelection } from '../../components/Selection';
import CustomIcon from '../../elements/Icon/CustomIcon';

const styles = StyleSheet.create({
  container: {
    // flexGrow: 1,
    padding: 20,
  },
  marginSection: {
    marginBottom: 15,
  },
  headerTxt: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fc852c',
    paddingTop: 20,
  },
  previewTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const GalleryField = (props) => (<View>
  <TouchableOpacity
    style={styles.previewTitle}
    onPress={() => Navigation.showLightBox({
      screen: 'preview_selection',
      passProps: {
        onSelection: x => {
          props.input.onChange(x.id);
        }
      },
      style: {
        backgroundBlur: 'dark',
      }
    })}
  >
    <Title style={styles.marginSection}>
      {t('conclusion.form.preview')}
    </Title>
    <CustomIcon
      name="double_arrow"
      style={{ fontSize: 12, paddingBottom: 12, paddingLeft: 10 }}
    />
  </TouchableOpacity>
  <View style={{ flexDirection: 'row' }}>
    <LibrarySelection {...props} />
  </View>
</View>);

@reduxForm({
  form: 'conclusion',
  enableReinitialize: true,
})
export default class ConclusionForm extends React.Component {
  render() {
    const { template, onSubmit, handleSubmit, item } = this.props;

    return (
      <View
        style={{
          flex: 1,
        }}
      >
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.props.refreshing}
              onRefresh={this.props.onRefresh}
            />
          }
          contentContainerStyle={styles.container}
        >
          <KeyboardAwareScrollView
            contentContainerStyle={{
              flex: 1,
            }}
          >
            <View style={styles.marginSection}>
              <Title>{template.result.title}</Title>
              <Row>
                <Text style={{ marginRight: 15, fontWeight: '200' }}>
                  {template.result.sub_title}
                  <Text style={{ marginRight: 15, fontWeight: '200' }}>
                    {t('conclusion.form.protrusion')}
                  </Text>
                </Text>
                <Field
                  name="assumed_result_id"
                  component={SelectField}
                  items={template.result.items.map(({ id, name }) => ({
                    id,
                    title: name,
                  }))}
                />
              </Row>
            </View>

            <View styles={styles.marginSection}>
              <Title style={styles.marginSection}>{template.time.title}</Title>
              <Field
                name="assumed_time_id"
                component={RadioSelectField}
                items={template.time.items.map(({ id, name }) => ({
                  id,
                  title: name,
                }))}
              />
            </View>

            <View styles={styles.marginSection}>
              <Title style={styles.marginSection}>
                {template.surgery.title}
              </Title>
              <Field
                name="assumed_surgery_id"
                component={MultiSelectField}
                items={template.surgery.items.map(({ id, name }) => ({
                  id,
                  title: name,
                }))}
              />
            </View>

            <Row
              style={{
                alignItems: 'baseline',
                paddingBottom: 20,
              }}
            >
              <Col style={{ flex: 2 }}>
                <Field
                  service_issue_id={item.service_issue_id}
                  name="gallery_id"
                  component={GalleryField}
                />
              </Col>

              <Col style={{ flex: 1 }}>
                <Title style={styles.marginSection}>
                  {template.difficulty.title}
                </Title>
                <Field
                  name="difficulty_id"
                  items={template.difficulty.items.map(({ id, name }) => ({
                    id,
                    title: name,
                  }))}
                  style={{ width: Scale.getSize(100) }}
                  component={SelectField}
                />
              </Col>
            </Row>
            <Field name="content" component={renderInput} />
          </KeyboardAwareScrollView>
        </ScrollView>
        <View
          style={{ paddingHorizontal: 60, paddingTop: 20, paddingBottom: 30 }}
        >
          <GenericButton
            caption={t('conclusion.form.submit')}
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    );
  }
}
