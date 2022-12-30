import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Linking} from 'react-native';

import {DriverProps} from '../navigation/types';

export const Driver: React.FC<DriverProps> = ({route, navigation}) => {
  const driver = route.params;
  const driverName = `${driver.givenName} ${driver.familyName}`;

  useEffect(() => {
    navigation.setOptions({headerTitle: driverName});
  }, [navigation, driverName]);

  const onPress = () => Linking.openURL(driver.url);

  return (
    <View style={styles.container}>
      <Text style={styles.text1}>
        <Text>{'Driver Name:  '}</Text>
        <Text style={styles.text2}>{driverName}</Text>
      </Text>
      <Text style={styles.text1}>
        <Text>{'Permanent Number:  '}</Text>
        <Text style={styles.text2}>{driver.permanentNumber ?? ''}</Text>
      </Text>
      <Text style={styles.text1}>
        <Text>{'Nationality:  '}</Text>
        <Text style={styles.text2}>{driver.nationality}</Text>
      </Text>
      <Text style={styles.text1}>
        <Text>{'Date Of Birth:  '}</Text>
        <Text style={styles.text2}>{driver.dateOfBirth}</Text>
      </Text>
      <View style={styles.informationContainer}>
        <Text style={[styles.text1, styles.marginZero]}>
          {'Information:  '}
        </Text>
        <TouchableOpacity onPress={onPress}>
          <Text style={styles.text2}>{'Biography'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  text1: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    color: '#000',
  },
  text2: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffac30',
  },
  informationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  marginZero: {marginTop: 0},
});
