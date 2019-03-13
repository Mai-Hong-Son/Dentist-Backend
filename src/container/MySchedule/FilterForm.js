import React from 'react';
import {
  View,
  StyleSheet,
  Text
} from 'react-native';
import { reduxForm, Field } from 'redux-form';
import Scale from '../../utils/Scale';
import platform from '../../theme/variables/platform';
import { t } from '../../utils/common';
import { ScheduleSelectField } from '../../components/Form/SelectField';

const styles = StyleSheet.create({
  wrappedFilter: {
    justifyContent: 'space-between',
    marginBottom: 10,
    width: Scale.getSize(150)
  },
  selectionFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  filterLabel: {
    fontSize: platform.titleFontSize,
    fontWeight: '700',
    color: '#474747',
    paddingVertical: 10,
    fontFamily: platform.titleFontfamily
  },
  filterSubTxt: {
    fontFamily: platform.titleFontfamily,
    fontWeight: '700',
    color: platform.primaryOrange
  },
  row: {
    flexDirection: 'row'
  },
  sep: {
    width: 30
  }
});

const Label = ({ children }) => (
  <Text style={styles.filterLabel}>{children}</Text>
);
const Row = ({ children }) => <View style={styles.row}>{children}</View>;
const Col = ({ children }) => <View style={styles.col}>{children}</View>;
const Sep = props => <View style={styles.sep} />;

@reduxForm({
  form: 'schedule'
})
export default class Schedule extends React.PureComponent {
  render() {
    return (
      <View>
        <Row>
            <View>
              <Label>{t('questions.filters.service')}</Label>
              <Field
                name="service_id"
                component={ScheduleSelectField}
                items={[]}
              />
            </View>
            <Sep />
            <View>
              <Label>{t('questions.filters.status')}</Label>
              <Field
                name="status"
                component={ScheduleSelectField}
                items={[]}
              />
            </View>

        </Row>
        <Row>
          <View>
            <Label>{t('questions.filters.calendar')}</Label>
            <Field
              name="schedule_id"
              component={ScheduleSelectField}
              items={[]}
            />
          </View>
        </Row>
      </View>
    );
  }
}
