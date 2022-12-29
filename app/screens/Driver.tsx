import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {DriverProps} from '../types';

export const Driver: React.FC<DriverProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Driver screen'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
  },
});
