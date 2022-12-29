import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type Driver = {
  driverId: string;
  permanentNumber: string;
  code: string;
  url: string;
  givenName: string;
  familyName: string;
  dateOfBirth: string;
  nationality: string;
};
export type Drivers = Driver[];

export type Race = {
  season: string;
  round: string;
  url: string;
  raceName: string;
  date: string;
  time: string;

  Results: [
    {
      number: string;
      position: string;
      positionText: string;
      points: string;
      Driver: Driver;
      Constructor: {
        name: string;
      };
      grid: string;
      laps: string;
      status: string;
      Time: {
        time: string;
      };
    },
  ];
};

export type Races = Race[];

export type RacesMRData = {
  MRData: {
    offset: string;
    total: string;
    RaceTable: {
      Races: Races;
    };
  };
};

export type DriversMRData = {
  MRData: {
    offset: string;
    total: string;
    DriverTable: {
      Drivers: Drivers;
    };
  };
};

export type StackParamList = {
  Drivers: undefined;
  Driver: Driver;
  Races: String;
};

export type DriversProps = NativeStackScreenProps<StackParamList, 'Drivers'>;
export type DriverProps = NativeStackScreenProps<StackParamList, 'Driver'>;
export type RacesProps = NativeStackScreenProps<StackParamList, 'Races'>;
