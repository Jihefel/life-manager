import { createSlice } from '@reduxjs/toolkit';

const initialState = {datas: null};

export const carrefourSlice = createSlice({
  name: 'dataCarrefour',
  initialState,
  reducers: {
    getCarrefourDatas: (state, action) => {
      state.datas = action.payload
    },
  },
});

export const { getCarrefourDatas } = carrefourSlice.actions;

export default carrefourSlice.reducer;