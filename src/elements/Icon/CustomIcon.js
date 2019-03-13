import createIconSet from 'react-native-vector-icons/lib/create-icon-set';

import glyphMap from './ur-icon.json';

const iconSet = createIconSet(glyphMap, 'ur-icon', 'ur-icon.ttf');

export default iconSet;

export const Button = iconSet.Button;
export const TabBarItem = iconSet.TabBarItem;
export const TabBarItemIOS = iconSet.TabBarItemIOS;
export const ToolbarAndroid = iconSet.ToolbarAndroid;
export const getImageSource = iconSet.getImageSource;
