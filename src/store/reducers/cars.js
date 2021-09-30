import {createSlice} from '@reduxjs/toolkit';

export const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    answers: [],
  },
  reducers: {
    getCars: (state, action) => {
      state.cars = action.payload;
    },
  },
});

export const {getCars} = carsSlice.actions;

export default carsSlice.reducer;
