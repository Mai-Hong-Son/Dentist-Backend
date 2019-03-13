import React from 'react';
import { connect } from 'react-redux';
import { Navigation } from 'react-native-navigation';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Field, reduxForm, formValueSelector } from 'redux-form';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import { t, dispatchAsync } from '../../utils/common';
import FullGradient from '../../components/FullGradient';
import LightButton from '../../theme/components/LightButton';
import platform from '../../theme/variables/platform';
import InputField from '../../elements/Form/InputField';
import { forgotPasswordViaEmail } from '../../store/actions/auth';

const selector = formValueSelector('forgot_password');

@reduxForm({
  form: 'forgot_password',
  initialValues: {
    email: ''
  }
})
@connect(
  state => ({
    email: selector(state, 'email')
  }),
  dispatch => ({
    dispatchAsync: dispatchAsync(dispatch)
  })
)
export default class ForgotPassword extends React.Component {
  static navigatorStyle = {
    navBarBlur: false,
    navBarBackgroundColor: 'transparent', // the background is black
    drawUnderNavBar: true,
    navBarTransparent: true,
    navBarTranslucent: true,
    navBarTextColor: '#fff',
    navBarButtonColor: '#fff',
    navBarButtonFontWeight: 'bold'
  };

  componentDidMount() {
    this.props.navigator.setTitle({
      // the new title of the screen as appears in the nav bar
      title: t('forgot_password.screen_title')
    });
  }

  performRequest = async () => {
    try {
      await this.props.dispatchAsync(
        forgotPasswordViaEmail({ email: this.props.email || '' })
      );

      // show alert
      Navigation.showLightBox({
        screen: 'modal_success',
        passProps: {
          title: t('forgot_password.success_title'),
          content: t('forgot_password.success_message'),
          onSuccess: () => {
            this.props.navigator.popToRoot(); // login screen
          }
        },
        style: {
          backgroundBlur: 'none',
          backgroundColor: '#000c',
          tapBackgroundToDismiss: true
        }
      });
    } catch (e) {
      if (e.errors) {
        // show alert
        Alert.alert(
          'Lỗi',
          Object.keys(e.errors)
            .map(key => e.errors[key])
            .join('\n')
        );
      }
    }
  };

  render() {
    return (
      <FullGradient style={{ padding: 0 }}>
        <KeyboardAwareScrollView
          keyboardShouldPersistTaps={'handled'}
          enableOnAndroid
          enableAutomaticScroll
          keyboardOpeningTime={0}
          extraHeight={Platform.select({ android: 200 })}
        >
          <View
            style={{
              padding: 20,
              marginTop: 30,
              minHeight: platform.deviceHeight
            }}
          >
            <View
              style={{
                alignItems: 'center'
              }}
            >
              <Image
                resizeMode="contain"
                style={{
                  width: platform.deviceWidth / 3,
                  height: platform.deviceWidth / 3 + 50
                }}
                source={require('./logo.png')}
              />
            </View>

            <Field
              name="email"
              label={t('forgot_password.email')}
              component={InputField}
              prefix={
                <Image
                  resizeMode={'contain'}
                  source={require('../../assets/images/icon_email.png')}
                  style={{
                    width: 22,
                    height: 26
                  }}
                />
              }
            />

            <View
              style={{
                flexDirection: 'row-reverse',
                paddingVertical: 20
              }}
            >
              <TouchableOpacity
                style={{ flexDirection: 'row' }}
                onPress={() => this.props.navigator.popToRoot()}
              >
                <Text style={{ color: '#fff' }}>
                  {t('forgot_password.remember')}{' '}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline'
                  }}
                >
                  {t('forgot_password.login')}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={{ alignItems: 'center' }}>
              <LightButton
                onPress={this.props.handleSubmit(this.performRequest)}
                style={{
                  marginTop: 30,
                  // paddingHorizontal: 10
                }}
              >
                {t('forgot_password.submit')}
              </LightButton>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 30
                }}
                onPress={this.performRequest}
              >
                <Text style={{ color: '#fff' }}>
                  {t('forgot_password.resend_email')}{' '}
                </Text>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    textDecorationLine: 'underline'
                  }}
                >
                  {t('forgot_password.resend')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </FullGradient>
    );
  }
}
