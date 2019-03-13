import { StyleSheet } from 'react-native';
import platform from '../../theme/variables/platform';

const loadingWidth = platform.deviceWidth * 0.2;
const errorWidth = platform.deviceWidth * 0.5;

export default StyleSheet.create({
  addressBar: {
    backgroundColor: '#FAFAFA',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    padding: 5,
    borderRadius: 5,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  address: {
    color: '#333'
  },
  btnReload: {
    position: 'absolute',
    right: 5
  },
  iconReload: {
    color: '#000',
    fontSize: 16,
    marginLeft: 10
  },
  webview: {
    flex: 1
  },
  anounceContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20
  },
  msgError: {
    textAlign: 'center',
    fontSize: 26,
    color: '#666'
  },
  msgError2: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  },
  // lottie
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loading: {
    width: loadingWidth,
    height: loadingWidth
  },
  error: {
    width: errorWidth,
    height: errorWidth
  }
});
