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
    cleanCars: state => {
      state.cars = null;
    },
  },
});

export const {getCars, cleanCars} = carsSlice.actions;

export default carsSlice.reducer;
