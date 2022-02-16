import { Dimensions } from 'react-native';

export enum EnumType {
  BROCCOLI = 'broccoli',
  MUSHROOM = 'mushroom',
  BASIL = 'basil',
  SAUSAGE = 'sausage',
}

export const assets = {
  plate: require('../../assets/Plate.png'),
  bread: [require('../../assets/bread/Bread_1.png')],
  [EnumType.BASIL]: [
    require('../../assets/basil/Basil_1.png'),
    require('../../assets/basil/Basil_2.png'),
    require('../../assets/basil/Basil_3.png'),
    require('../../assets/basil/Basil_4.png'),
    require('../../assets/basil/Basil_5.png'),
    require('../../assets/basil/Basil_6.png'),
    require('../../assets/basil/Basil_7.png'),
    require('../../assets/basil/Basil_8.png'),
    require('../../assets/basil/Basil_9.png'),
    require('../../assets/basil/Basil_10.png'),
    require('../../assets/basil/Basil_11.png'),
  ],
  [EnumType.BROCCOLI]: [
    require('../../assets/broccoli/Broccoli_1.png'),
    require('../../assets/broccoli/Broccoli_2.png'),
    require('../../assets/broccoli/Broccoli_3.png'),
    require('../../assets/broccoli/Broccoli_4.png'),
    require('../../assets/broccoli/Broccoli_5.png'),
    require('../../assets/broccoli/Broccoli_6.png'),
    require('../../assets/broccoli/Broccoli_7.png'),
    require('../../assets/broccoli/Broccoli_8.png'),
    require('../../assets/broccoli/Broccoli_9.png'),
    require('../../assets/broccoli/Broccoli_10.png'),
    require('../../assets/broccoli/Broccoli_11.png'),
  ],
  [EnumType.MUSHROOM]: [
    require('../../assets/mushroom/Mushroom_1.png'),
    require('../../assets/mushroom/Mushroom_2.png'),
    require('../../assets/mushroom/Mushroom_3.png'),
    require('../../assets/mushroom/Mushroom_4.png'),
    require('../../assets/mushroom/Mushroom_5.png'),
    require('../../assets/mushroom/Mushroom_6.png'),
    require('../../assets/mushroom/Mushroom_7.png'),
    require('../../assets/mushroom/Mushroom_8.png'),
    require('../../assets/mushroom/Mushroom_9.png'),
    require('../../assets/mushroom/Mushroom_10.png'),
    require('../../assets/mushroom/Mushroom_11.png'),
    require('../../assets/mushroom/Mushroom_12.png'),
  ],
  [EnumType.SAUSAGE]: [
    require('../../assets/sausage/Sausage_1.png'),
    require('../../assets/sausage/Sausage_2.png'),
    require('../../assets/sausage/Sausage_3.png'),
    require('../../assets/sausage/Sausage_4.png'),
    require('../../assets/sausage/Sausage_5.png'),
    require('../../assets/sausage/Sausage_6.png'),
    require('../../assets/sausage/Sausage_7.png'),
    require('../../assets/sausage/Sausage_8.png'),
    require('../../assets/sausage/Sausage_9.png'),
    require('../../assets/sausage/Sausage_10.png'),
    require('../../assets/sausage/Sausage_11.png'),
  ],
  PizzaBoxTop: require('../../assets/pizza-box-top.png'),
  PizzaBoxBottom: require('../../assets/pizza-box-bottom.png'),
};
const { width } = Dimensions.get('screen');

export const SIZE_PIZZA = width * 0.65;

export const GAP_HEIGHT = 150;
