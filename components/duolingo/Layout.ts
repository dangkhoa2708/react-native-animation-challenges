import { Dimensions } from 'react-native';
import { OffSetItem } from './WordContainer';

const { width } = Dimensions.get('screen');

export const WORD_HEIGHT = 40;
export const GAP = 150;
const CON_WIDTH = width;
export const NUMBER_OF_LINES = 3;

export const isInLines = (offset: OffSetItem) => {
  'worklet';
  return offset.order.value !== -1;
};

export const byOrder = (a: OffSetItem, b: OffSetItem) => {
  'worklet';
  return a.order.value > b.order.value ? 1 : -1;
};

export const reOrderItems = (
  orderOffsets: Array<OffSetItem>,
  offsetItem: OffSetItem,
  indexSwap: number,
) => {
  'worklet';
  if (offsetItem.order.value !== -1) {
    orderOffsets.splice(offsetItem.order.value, 1);
  }

  orderOffsets.splice(indexSwap, 0, offsetItem);

  orderOffsets.forEach((e, index) => {
    e.order.value = index;
  });
};

export const remove = (offsets: Array<OffSetItem>, index: number) => {
  'worklet';
  const offsetItem = offsets[index];
  const removedItemOrder = offsetItem.order.value;
  offsetItem.order.value = -1;
  offsets.forEach(offset => {
    const orderValue = offset.order.value;
    if (orderValue !== -1 && orderValue > removedItemOrder) {
      offset.order.value = orderValue - 1;
    }
  });
};

export const arrangeOffsets = (offsets: Array<OffSetItem>) => {
  'worklet';

  const newOffsets = offsets.filter(isInLines).sort(byOrder);
  if (newOffsets.length == 0) {
    return;
  }

  let numberOfLine = 0;
  let breakIndex = 0;

  newOffsets.forEach((offset, index) => {
    const itemsOnCurrentLine = newOffsets.slice(breakIndex, index);
    const totalWidth = itemsOnCurrentLine.reduce(
      (acc, cur) => acc + cur.width.value,
      0,
    );
    if (totalWidth + offset.width.value > CON_WIDTH) {
      numberOfLine += 1;
      breakIndex = index;
      offset.x.value = 0;
    } else {
      offset.x.value = totalWidth;
    }

    offset.y.value = numberOfLine * WORD_HEIGHT + (numberOfLine > 0 ? 2 : 0);
  });
};
