import React from 'react';
import { connect } from 'react-redux';
import {
  ImageBackground,
  Image,
  Alert,
  View,
  Text,
  TouchableOpacity
} from 'react-native';

import { reduxForm, Field } from 'redux-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import InputField from '../../elements/Form/InputField';
import PasswordField from '../../elements/Form/PasswordField';

import platform from '../../theme/variables/platform';
import { t, dispatchAsync } from '../../utils/common';
import LightButton from '../../theme/components/LightButton';
import { login } from '../../store/actions/auth';
import { isLogged } from '../../store/selectors/auth';

import Loading from '../../elements/Loading/index';
import Scale from '../../utils/Scale';

@connect(
  state => ({
    isLogged: isLogged(state),
    screen: state.navigator.current
  }),
  dispatch => ({ dispatch, dispatchAsync: dispatchAsync(dispatch) })
)
@reduxForm({
  form: 'login'
})
export default class Login extends React.Component {
  static navigatorStyle = {
    tabBarHidden: true,
    navBarHidden: true,
    disabledBackGesture: true
  };

  state = {
    modalVisible: false,
    isLogging: false
  };

  login = async values => {
    if (this.state.isLogging) return;

    this.setState({ isLogging: true });
    try {
      await this.props.dispatchAsync(login(values));
      this.setState({ isLogging: false, modalVisible: true });
    } catch (e) {
      this.setState({ isLogging: false });

      // show Alert
      if (e.errors) {
        const messages = Object.keys(e.errors).map(field => e.errors[field]);
        const messagesFormat = [];

        for (let i = 0; i < messages.length; i++) {
          if (messages[i] === 'INCORRECT_USERNAME' || messages[i] === 'INCORRECT_PASSWORD') {
            messagesFormat.push(t(messages[i]));
          } else {
            messagesFormat.push(messages[i]);
          }
        }

        Alert.alert(t('login.error_title'), messagesFormat.join('\n')); // eslint-disable-line
      }
    }
  };

  render() {
    const { navigator, handleSubmit } = this.props;

    return (
      <ImageBackground
        source={require('./doctor.png')}
        style={{
          // alignItems: 'center',
          backgroundColor: '#FE702E',
          flex: 1
        }}
      >
        <KeyboardAwareScrollView
          contentContainerStyle={{
            flex: 1,
            alignContent: 'center',
            justifyContent: 'center',
            padding: 25
          }}
        >
          <View>
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: platform.deviceWidth / 3,
                  height: platform.deviceWidth / 3
                }}
                source={require('./logo.png')}
              />
            </View>
            <View style={{ alignItems: 'center', paddingTop: Scale.getSize(15) }}>
              <Text style={{ fontSize: Scale.getSize(15), color: '#fff', fontWeight: '700' }}>
                {t('login.sologan')}
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                marginTop: 20
              }}
            >
              <Field
                name="username"
                label={t('login.username')}
                component={InputField}
                prefix={
                  <Image
                    resizeMode={'contain'}
                    source={require('../../assets/images/icon_username.png')}
                    style={{
                      width: 22,
                      height: 26
                    }}
                  />
                }
              />
              <Field
                name="password"
                label={t('login.password')}
                component={PasswordField}
                prefix={
                  <Image
                    resizeMode={'contain'}
                    source={require('../../assets/images/icon_password.png')}
                    style={{
                      width: 22,
                      height: 26
                    }}
                  />
                }
              />

              <TouchableOpacity
                onPress={() =>
                  navigator.push({
                    screen: 'forgot_password'
                  })
                }
              >
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 12,
                    textAlign: 'right',
                    paddingVertical: 15
                  }}
                >
                  {t('login.forgot')}
                </Text>
              </TouchableOpacity>
              <View style={{ height: 20 }} />
              <View
                style={{
                  alignItems: 'center'
                }}
              >
                {this.state.isLogging ? (
                  <Loading />
                ) : (
                    <LightButton
                      onPress={handleSubmit(this.login)}
                      style={{
                        width: platform.deviceWidth * 0.6
                      }}
                    >
                      {t('login.submit')}
                    </LightButton>
                  )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ImageBackground>
    );
  }
}
