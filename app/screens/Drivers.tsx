import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {Driver} from '../types';
import {DriversProps} from '../navigation/types';
import {fetchDrivers} from '../services/api';
import {useAppDispatch, useAppSelector} from '../store/index';

export const Drivers: React.FC<DriversProps> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const drivers = useAppSelector(state => state.drivers.drivers);
  const error = useAppSelector(state => state.drivers.error);

  const [offsetNumber, setOffsetNumber] = useState(0);

  useEffect(() => {
    dispatch(fetchDrivers());
  }, [dispatch]);

  const navigateToDriver = (driver: Driver) => {
    navigation.navigate('Driver', driver);
  };

  const navigateToRaces = (driverId: string) => {
    navigation.navigate('Races', driverId);
  };

  const onEndReached = () => {
    if (offsetNumber < 110) {
      setOffsetNumber(offsetNumber + 10);
      dispatch(fetchDrivers(offsetNumber));
    }
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
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{'Something went wrong :('}</Text>
          <Text style={styles.errorMessage}>{'Try later'}</Text>
        </View>
      ) : (
        <FlatList
          data={drivers}
          renderItem={renderItem}
          onEndReachedThreshold={0.3}
          onEndReached={onEndReached}
        />
      )}
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
    marginBottom: 20,
  },
  errorMessage: {
    fontSize: 22,
    fontWeight: '500',
    color: '#000',
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
