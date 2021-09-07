import React, { memo } from 'react';
import { View, Text } from 'react-native';

const THUMB_RADIUS = 12;

const Thumb = ({color}) => {
  return (
    <View style={{
      width: THUMB_RADIUS * 2,
      height: THUMB_RADIUS * 2,
      borderRadius: THUMB_RADIUS,
      borderWidth: 2,
      borderColor: '#7f7f7f',
      backgroundColor: color,
    }}>
      </View>
  );
};


export default Thumb;