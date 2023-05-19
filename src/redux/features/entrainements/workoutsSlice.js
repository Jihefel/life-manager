import { createSlice } from '@reduxjs/toolkit';

const initialState = {workoutOfTheDay: null};

export const workoutsSlice = createSlice({
  name: 'workouts',
  initialState,
  reducers: {
    setWorkoutOfTheDay: (state, action) => {
      state.workoutOfTheDay = action.payload
    },
  },
});

export const { setWorkoutOfTheDay } = workoutsSlice.actions;

export default workoutsSlice.reducer;