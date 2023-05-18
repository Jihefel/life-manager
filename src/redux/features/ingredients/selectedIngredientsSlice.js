import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allChecked: false,
    ingredientsFromMenus: [],
    checkedIngredients: [], 
    sortedIngredients: [], 
    sortedCheckedIngredients: [] 
};

export const selectedIngredientsSlice = createSlice({
  name: "selectedIngredients",
  initialState,
  reducers: {
    setAllChecked: (state, action) => {
      state.allChecked = action.payload;
    },
    setIngredientsFromMenus: (state, action) => {
      state.ingredientsFromMenus = action.payload;
    },
    setCheckedIngredients: (state, action) => {
      state.checkedIngredients = action.payload;
    },
    setSortedIngredients: (state, action) => {
      state.sortedIngredients = action.payload;
    },
    setSortedCheckedIngredients: (state, action) => {
      state.sortedCheckedIngredients = action.payload;
    },
  },
});

export const { setAllChecked, setIngredientsFromMenus, setCheckedIngredients, setSortedIngredients, setSortedCheckedIngredients } = selectedIngredientsSlice.actions;

export default selectedIngredientsSlice.reducer;
