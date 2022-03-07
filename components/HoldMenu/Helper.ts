import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('screen');

class Helper {
  wscale: number = width / 375;
  hscale: number = height / 915;
  normalize = (size: number, based: 'width' | 'height' = 'width') => {
    const newSize =
      based === 'height' ? size * this.hscale : size * this.wscale;
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
  };
}
export default new Helper();
