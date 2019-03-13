import { Dimensions } from 'react-native';

const IPHONE_8_DEVICE_WIDTH = 414;

export default class Scale {
  static getSize(size) {
    if (typeof size !== 'number') {
      throw new Error("Error: Scale.getSize can't parse a non number value");
    }

    return size; //(size * Dimensions.get('window').width) / IPHONE_8_DEVICE_WIDTH;
  }
}
