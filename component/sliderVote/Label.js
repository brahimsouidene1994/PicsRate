import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Label = ({ text, color, ...restProps }) => {
  return (
    <View style={{
      alignItems: 'center',
      padding: 10,
      backgroundColor: color,
      borderRadius: 50,
    }} {...restProps}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  
  text: {
    fontSize: 20,
    color: '#fff',
  },
});

export default Label;