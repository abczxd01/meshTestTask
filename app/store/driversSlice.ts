import {createSlice} from '@reduxjs/toolkit';
import {Drivers} from '../types';
import {fetchDrivers} from '../services/api';

type SliceState = {
  drivers: [] | Drivers;
  error: any;
  loading: boolean;
};

const initialState: SliceState = {
  drivers: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'drivers',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchDrivers.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchDrivers.fulfilled, (state, action) => {
      if (action.payload.MRData.offset === '0') {
        state.drivers = action.payload.MRData.DriverTable.Drivers;
      } else {
        state.drivers = [
          ...state.drivers,
          ...action.payload.MRData.DriverTable.Drivers,
        ];
      }
      state.loading = false;
    });
    builder.addCase(fetchDrivers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default slice.reducer;
