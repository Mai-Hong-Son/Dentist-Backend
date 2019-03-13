import standard from './standard';
import platform from './platform';

export default {
  ...standard,
  LightButton: {
    paddingHorizontal: 40,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 40,
    marginBottom: 16
  },
  LightButtonText: {
    textAlign: 'center',
    color: platform.primaryColor,
    fontWeight: 'bold',
    fontSize: 16
  },
  LightInput: {
    color: '#fff',
    paddingVertical: 10
  },

  Button: {
    ...standard.Button,
    backgroundColor: platform.navigationBg
  },
  Text: {
    color: '#fff'
  },
  Content: {
    foreground: '#ffffff',
    backgroundColor: '#eeeeee'
  },

  MenuItem: {
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  MenuITemText: {
    color: '#fff'
  }
};
