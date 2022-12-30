import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Driver} from '../types';

export type StackParamList = {
  Drivers: undefined;
  Driver: Driver;
  Races: String;
};

export type DriversProps = NativeStackScreenProps<StackParamList, 'Drivers'>;
export type DriverProps = NativeStackScreenProps<StackParamList, 'Driver'>;
export type RacesProps = NativeStackScreenProps<StackParamList, 'Races'>;
