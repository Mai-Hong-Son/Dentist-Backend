import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { Calendar } from 'react-native-calendars';
import CustomIcon from '../../elements/Icon/CustomIcon';
import platform from '../../theme/variables/platform';

const ViewNextIcon = () => (
  <CustomIcon
    name="arrow_right"
    style={{ color: '#b0b0b0', fontSize: 12, paddingBottom: 20 }}
  />
);

export default class CalendarScreen extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onDayPress = (day) => {
    this.setState({
      selected: day.dateString
    });
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.wrappedHeader}>
          <Text style={styles.header}>Time</Text>
          <TouchableOpacity>
            <ViewNextIcon />
          </TouchableOpacity>
        </View>

        <Calendar
          onDayPress={this.onDayPress}
          markedDates={{ [this.state.selected]: { selected: true, disableTouchEvent: true, selectedColor: platform.primaryOrange } }}
          theme={{
            arrowColor: platform.primaryOrange,
            textDayFontSize: 14,
            monthTextColor: '#000',
            textMonthFontWeight: '800',
            textDayHeaderFontSize: 16,
            todayTextColor: platform.primaryOrange
          }}
          hideExtraDays
          firstDay={0}
          dayNamesShort
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: '800',
    paddingBottom: 20
  },
  wrappedHeader: {
    marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dcdcdc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
});
