import platform from './platform';

export default {
  Button: {
    backgroundColor: 'transparent',
    paddingVertical: 15,
    borderRadius: platform.borderRadius,
    paddingHorizontal: 15
  },
  Text: {
    color: '#000'
  },
  Header: {
    backgroundColor: 'red',
    // platform.navigationBg,
    width: platform.deviceWidth,
    paddingHorizontal: 10,
    height: 45,
    alignItems: 'center',
    flexDirection: 'row'
  }
};
