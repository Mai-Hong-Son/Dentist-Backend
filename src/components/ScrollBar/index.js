import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ScrollView, View, Text, Button } from 'react-native';

@connect(state => ({ locale: state.locale }))
export default class ScrollBar extends React.Component {
  static propTypes = {
    selectedIndex: PropTypes.number,
    data: PropTypes.array
  };

  static defaultProps = {
    selectedIndex: 0,
    data: []
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: props.selectedIndex
    };
  }

  _onPressed = (item, index) => {
    if (this.state.selectedIndex === index) {
      return;
    }
    this.setState({ selectedIndex: index });
  };

  render() {
    const { data, locale } = this.props;
    if (!data || data.length === 0) {
      return null;
    }
    return (
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <View style={{ backgroundColor: '#28C39D', flexDirection: 'row' }}>
          {data.map((item, index) => {
            const selected = index === this.state.selectedIndex;
            if (selected) {
              return (
                <View key={index}>
                  <Button transparent onPress={() => this._onPressed(item, index)}>
                    <Text style={{ color: '#F18246' }}>{item.title[locale]}</Text>
                  </Button>
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'center',
                      bottom: -5,
                      width: 10,
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: '#F18246'
                    }}
                  />
                </View>
              );
            }
            return (
              <Button key={index} transparent onPress={() => this._onPressed(item, index)} title={item.title[locale]}/>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
