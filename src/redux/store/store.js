import { configureStore } from '@reduxjs/toolkit';
import carrefourSlice from '../features/products/carrefourSlice';
import dateSlice from '../features/date/dateSlice';
import selectedIngredientsSlice from '../features/ingredients/selectedIngredientsSlice';
import workoutsSlice from '../features/entrainements/workoutsSlice';

export const store = configureStore({
  reducer: {
    dataCarrefour: carrefourSlice,
    whatDate: dateSlice,
    selectedIngredients: selectedIngredientsSlice,
    workouts: workoutsSlice,
  }
});