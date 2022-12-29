import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {DriversMRData, RacesMRData} from '../types';

const baseUrl = 'http://ergast.com/api/f1';
const driversUrl = baseUrl + '/drivers.json?limit=20';

export const fetchDrivers = createAsyncThunk(
  'drivers/fetchDrivers',
  async (offsetNumber: number = 0) => {
    const response = await axios.get(driversUrl + `&offset=${offsetNumber}`);
    return response?.data as DriversMRData;
  },
);

export const fetchRaces = createAsyncThunk(
  'races/fetchRaces',
  async ({
    driverName,
    offsetNumber,
  }: {
    driverName: string;
    offsetNumber: number;
  }) => {
    const response = await axios.get(
      baseUrl + `/drivers/${driverName}/results.json&offset=${offsetNumber}`,
    );
    return response?.data as RacesMRData;
  },
);
