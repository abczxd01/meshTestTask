import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';

import {RacesProps} from '../navigation/types';
import {Race} from '../types';
import {useAppDispatch, useAppSelector} from '../store';
import {fetchRaces} from '../services/api';
import {removeAll} from '../store/racesSlice';

export const Races: React.FC<RacesProps> = ({route}) => {
  const dispatch = useAppDispatch();
  const races = useAppSelector(state => state.races.races);
  const error = useAppSelector(state => state.races.error);
  const [offsetNumber, setOffsetNumber] = useState(0);

  const dispatchRaces = (_offsetNumber: number = 0) =>
    dispatch(
      fetchRaces({
        driverName: route.params as string,
        offsetNumber: _offsetNumber,
      }),
    );

  useEffect(() => {
    dispatchRaces();
    return () => {
      dispatch(removeAll());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const onEndReached = () => {
    if (offsetNumber < 110) {
      setOffsetNumber(offsetNumber + 10);
      dispatchRaces(offsetNumber);
    }
  };

  const renderItem = ({item}: {item: Race}) => {
    const resultNumber = item.Results.length - 1;
    const {season, raceName, Results} = item;
    const result = Results[resultNumber];

    return (
      <View style={styles.itemContainer}>
        <Text style={styles.seasonName}>{`${season} ${raceName}`}</Text>
        <Text style={styles.results}>{'Rase Results'}</Text>
        <Text style={styles.text1}>
          <Text>{'Pos: '}</Text>
          <Text style={styles.text2}>{result.position}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'No: '}</Text>
          <Text style={styles.text2}>{result.number}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'Driver: '}</Text>
          <Text style={styles.text2}>
            {result.Driver.givenName + result.Driver.familyName}
          </Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'Constructor: '}</Text>
          <Text style={styles.text2}>{result.Constructor.name}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'Laps: '}</Text>
          <Text style={styles.text2}>{result.laps}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'Grid: '}</Text>
          <Text style={styles.text2}>{result.grid}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'Points: '}</Text>
          <Text style={styles.text2}>{result.points}</Text>
        </Text>
        <Text style={styles.text1}>
          <Text>{'Status: '}</Text>
          <Text style={styles.text2}>{result.status}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>{'Something went wrong :('}</Text>
          <Text style={styles.errorMessage}>{'Try later'}</Text>
        </View>
      ) : (
        <FlatList
          data={races}
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
  seasonName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  results: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
  },
  text1: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginTop: 5,
  },
  text2: {
    fontSize: 22,
    fontWeight: '600',
    color: '#ffac30',
  },
  itemContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 20,
    borderWidth: 2,
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
