import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet
} from 'react-native';
import CalendarScreen from '../../components/Calendar/Calendars';
import GenericModal from '../../components/GenericModal/index';
import SafeArea from '../../components/SafeArea';

export default class Calendar extends React.Component {
  render() {
    return (
      <SafeArea>
        <ScrollView
          contentContainerStyle={styles.container}
        >
          <View style={styles.info}>
            <Text style={styles.name}>Patient X</Text>
            <Text style={styles.method}>Nieng rang</Text>
          </View>
            <GenericModal>
              <CalendarScreen />
            </GenericModal>
        </ScrollView>
      </SafeArea>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20
  },
  info: {
    paddingVertical: 15
  },
  name: {
    fontSize: 16
  },
  method: {
    fontSize: 14
  }
});
