import React from 'react';
import { assets, EnumType } from './config';
import Ingredient from './Ingredient';

type IngredientListProps = {
  type: EnumType;
  index: number;
  radius: number;
};

function IngredientList({ type, index, radius }: IngredientListProps) {
  if (index == 0) {
    return null;
  }

  const renderIngredient = () => {
    return assets[type].map((e, i) => {
      return <Ingredient radius={radius} key={i} source={e} index={index} />;
    });
  };

  return <>{renderIngredient()}</>;
}

export default React.memo(IngredientList);
