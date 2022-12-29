import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {RacesProps} from '../types';

export const Races: React.FC<RacesProps> = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{'Races screen'}</Text>
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
