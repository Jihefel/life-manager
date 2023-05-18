import { createSlice } from '@reduxjs/toolkit';

const initialState = {today: "", hour: "", minute: ""};

export const dateSlice = createSlice({
  name: 'whatDate',
  initialState,
  reducers: {
    getDay: (state, action) => {
      state.today = action.payload
    },
    getHour: (state, action) => {
      state.hour = action.payload
    },
    getMinute: (state, action) => {
      state.minute = action.payload
    },
  },
});

export const { getDay, getHour, getMinute } = dateSlice.actions;

export default dateSlice.reducer;