"use client";

import { clearCart, getTotalCartPrice } from "../../store/cartSlice";
import CartItem from "../../components/CartItem/CartItem";
import EmptyMessageComponent from "../../components/EmptyMessageComponent/EmptyMessageComponent";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
function CartPage() {
  const products = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const totalPrice = useAppSelector(getTotalCartPrice);
  const deliveryFee = 50;
  const finalTotal = totalPrice + deliveryFee;
  if (products.length == 0) {
    return <EmptyMessageComponent name="Cart" />;
  }
  return (
    <div className="py-16 container">
      <h2 className="text-primary-color text-4xl font-bold text-center mb-11">
        Products
      </h2>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Qty
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="px-6 py-4 text-right">
                <button
                  type="button"
                  className="cursor-pointer text-red-600 dark:text-red-500 font-medium hover:underline"
                  onClick={() => dispatch(clearCart())}
                >
                  Clear Cart
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 sm:p-6 max-w-full sm:max-w-md w-full mx-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Order Summary
        </h3>

        <div className="space-y-3 text-sm sm:text-base">
          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Subtotal:</span>
            <span>{totalPrice.toFixed(2)} EGP</span>
          </div>

          <div className="flex justify-between text-gray-600 dark:text-gray-300">
            <span>Delivery to Mansoura:</span>
            <span>{deliveryFee.toFixed(2)} EGP</span>
          </div>

          <hr className="border-gray-200 dark:border-gray-600" />

          <div className="flex justify-between text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
            <span>Total:</span>
            <span>{finalTotal.toFixed(2)} EGP</span>
          </div>
        </div>

        <button
          onClick={() => {
            dispatch(clearCart());
            alert("Order is on it's way");
          }}
          className="w-full mt-6 bg-primary-color hover:bg-primary-color/90 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 text-sm sm:text-base"
        >
          Confirm Order
        </button>
      </div>
    </div>
  );
}

export default CartPage;
