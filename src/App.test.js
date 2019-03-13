import 'react-native';
import React from 'react';
import App from './App';

/* eslint-disable */
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
// mock('react-native-i18n', () => 'I18n');
describe('Test App Root', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
