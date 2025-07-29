import { createSlice } from "@reduxjs/toolkit";

const initialState = [];
const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addItemToFavorite: (state, action) => {
      state.push(action.payload);
    },
    removeItemFromFavorite: (state, action) => {
      return state.filter((item) => item.id !== action.payload);
    },
    clearFavorite: (state) => {
      return [];
    },
  },
});

export const { addItemToFavorite, clearFavorite, removeItemFromFavorite } =
  favoriteSlice.actions;
export default favoriteSlice.reducer;

export const isItemInFavorite = (id) => (state) => {
  return state.favorite.some((item) => item.id === id);
};
export function getTotalFavoriteQuantity(state) {
  return state.favorite.length;
}
