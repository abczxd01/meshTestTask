import React, {useEffect} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Driver, DriversProps} from '../types';
import {fetchDrivers} from '../services/api';
import {useAppDispatch, useAppSelector} from '../store/index';

export const Drivers: React.FC<DriversProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const drivers = useAppSelector(state => state.drivers.drivers);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const navigateToDriver = (driver: Driver) => {
    navigation.navigate('Driver', driver);
  };

  const navigateToRaces = (driverId: string) => {
    navigation.navigate('Races', driverId);
  };

  const renderItem = ({item}: {item: Driver}) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity onPress={() => navigateToDriver(item)}>
        <Text
          style={
            styles.driverName
          }>{`${item.givenName} ${item.familyName}`}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToRaces(item.driverId)}>
        <Text style={styles.races}>{'Races'}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList data={drivers} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  driverName: {
    fontSize: 22,
    fontWeight: '500',
    color: 'rgba(0,0,0,0.8)',
  },
  races: {
    fontSize: 22,
    fontWeight: '500',
    color: '#ffac30',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ffac30',
  },
});
