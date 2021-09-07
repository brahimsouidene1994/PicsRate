  
import React, { memo } from 'react';
import { View} from 'react-native';

const RailSelected = ({color}) => {
  return (
    <View style={{ height: 6,backgroundColor: color ,borderRadius: 2}}/>
  );
};

export default RailSelected;

