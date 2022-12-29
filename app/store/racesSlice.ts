import {createSlice} from '@reduxjs/toolkit';
import {Races} from '../types';
import {fetchRaces} from '../services/api';

type SliceState = {
  races: [] | Races;
  error: any;
  loading: boolean;
};

const initialState: SliceState = {
  races: [],
  loading: false,
  error: null,
};

const slice = createSlice({
  name: 'races',
  initialState: initialState,
  reducers: {
    removeAll: state => {
      state.races = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRaces.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchRaces.fulfilled, (state, action) => {
      if (action.payload.MRData.offset === '0') {
        state.races = action.payload.MRData.RaceTable.Races;
      } else {
        state.races = [
          ...state.races,
          ...action.payload.MRData.RaceTable.Races,
        ];
      }
      state.loading = false;
    });
    builder.addCase(fetchRaces.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export const {removeAll} = slice.actions;

export default slice.reducer;
