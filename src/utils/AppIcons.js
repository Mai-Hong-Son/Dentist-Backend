import { PixelRatio } from 'react-native';

import { getImageSource } from '../elements/Icon/CustomIcon';
import platform from '../theme/variables/platform';

export const navIconSize = platform.isAndroid // eslint-disable-line
  ? PixelRatio.getPixelSizeForLayoutSize(6)
  : 14;

const iconTabSize = 18;

const icons = {
  arrow_back: [26],
  'arrow_back--nav': [navIconSize],

  'drawer--nav': [navIconSize],
  arrow_right: [26],
  bell: [26],
  'bell--nav': [navIconSize],
  service: [iconTabSize],
  calendar_check: [iconTabSize],
  home: [iconTabSize],
  // ursmiles: [33, '#FE702E'],
  tooth_search: [iconTabSize]
};

const iconsMap = {};

const iconsLoaded = new Promise(resolve => {
  Promise.all(
    Object.keys(icons).map(name => {
      // BEM like: icon--modifier
      const iconName = name.split('--')[0];
      return getImageSource(iconName, icons[name][0], icons[name][1]);
    })
  ).then(sources => {
    Object.keys(icons).forEach(
      (iconName, idx) => (iconsMap[iconName] = sources[idx])
    );
    resolve(true);
  });
});

export { iconsMap, iconsLoaded };
