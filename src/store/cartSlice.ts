import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { CartState, Product } from "./types";

const loadCart = (): CartState => {
  if (typeof window === "undefined") return [];
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
};
export const loadCartFromLocalStorage = createAsyncThunk<CartState>(
  "cart/loadCartFromLocalStorage",
  async () => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  }
);

// export const saveCartToLocalStorage = createAsyncThunk(
//   "cart/saveCartToLocalStorage",
//   async (cart, thunkAPI) => {
//     localStorage.setItem("cart", JSON.stringify(cart));
//     return cart;
//   }
// );

const initialState: CartState = loadCart();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<Product>) => {
      state.push({
        ...action.payload,
        quantity: 1,
        totalPrice: action.payload.price,
      });
    },
    removeItemFromCart: (state, action: PayloadAction<number>) => {
      return state.filter((item) => item.id !== action.payload);
    },
    increaseItemQuantity: (state, action: PayloadAction<number>) => {
      const item = state.find((cartItem) => cartItem.id == action.payload);
      if (!item) return;
      if (item.quantity) item.quantity++;

      item.totalPrice = item.quantity || 0 * item.price;
    },
    decreaseItemQuantity: (
      state,
      action: PayloadAction<number>
    ): CartState | void => {
      const item = state.find((cartItem) => cartItem.id == action.payload);
      if (!item) return;
      if (item.quantity === 1) {
        return cartSlice.caseReducers.removeItemFromCart(state, action);
      } else {
        if (item.quantity) item.quantity--;
        item.totalPrice = item.quantity || 0 * item.price;
      }
    },
    clearCart: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loadCartFromLocalStorage.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const {
  addItemToCart,
  increaseItemQuantity,
  removeItemFromCart,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
export function getTotalCartQuantity(state: { cart: CartState }) {
  return state.cart.reduce((sum, curr) => (sum += curr.quantity || 0), 0);
}
export function getTotalCartPrice(state: { cart: CartState }) {
  return state.cart.reduce((sum, curr) => (sum += curr.totalPrice || 0), 0);
}
export const getItemQuantity = (id: number) => (state: { cart: CartState }) => {
  return state.cart.find((item) => item.id == id)?.quantity ?? 0;
};
