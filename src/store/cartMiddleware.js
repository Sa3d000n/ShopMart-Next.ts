
export const cartPersistenceMiddleware = (storeAPI) => (next) => (action) => {
  const result = next(action);

  const cartActionPrefix = "cart/";
  if (action.type.startsWith(cartActionPrefix)) {
    const cart = storeAPI.getState().cart;
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  return result;
};
