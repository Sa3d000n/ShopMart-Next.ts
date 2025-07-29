import { useDispatch, useSelector } from "react-redux";
import { removeItemFromFavorite } from "../../store/favoriteSlice";
import {
  addItemToCart,
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
} from "../../store/cartSlice";
import { Product } from "@/store/types";
import Image from "next/image";

function FavoriteItem({ product }: { product: Product }) {
  const dispatch = useDispatch();
  const itemQuantity = useSelector(getItemQuantity(product.id));

  return (
    <>
      <tr className="hidden sm:table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <Image
            src={product.image}
            className="w-16 md:w-32 max-w-full max-h-full"
            alt={product.nameEn}
            width={400}
            height={400}
          />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.nameEn}
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          ${product.price.toFixed(2)}
        </td>
        <td className="px-6 py-4 space-y-2">
          <button
            type="button"
            onClick={() => dispatch(removeItemFromFavorite(product.id))}
            className="block text-red-600 dark:text-red-500 font-medium hover:underline"
          >
            Remove
          </button>
          {itemQuantity > 0 ? (
            <div className="flex gap-3 items-center">
              <button
                onClick={() => dispatch(increaseItemQuantity(product.id))}
                className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
              >
                +
              </button>
              {itemQuantity}
              <button
                onClick={() => dispatch(decreaseItemQuantity(product.id))}
                className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
              >
                -
              </button>
            </div>
          ) : (
            <button
              onClick={() =>
                dispatch(addItemToCart({ ...product, quantity: 1 }))
              }
              className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
            >
              Add to Cart
            </button>
          )}
        </td>
      </tr>

      <div className="sm:hidden p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-4">
          <Image
            src={product.image}
            alt={product.nameEn}
            className="w-20 h-20 object-contain"
            width={400}
            height={400}
          />
          <div className="flex-1">
            <div className="text-gray-900 dark:text-white font-semibold mb-1">
              {product.nameEn}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              ${product.price.toFixed(2)}
            </div>
            <div className="flex gap-4 mt-2">
              <button
                onClick={() => dispatch(removeItemFromFavorite(product.id))}
                className="text-sm text-red-600 dark:text-red-500 hover:underline"
              >
                Remove
              </button>
              {itemQuantity > 0 ? (
                <div className="flex gap-3 items-center">
                  <button
                    onClick={() => dispatch(increaseItemQuantity(product.id))}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
                  >
                    +
                  </button>
                  {itemQuantity}
                  <button
                    onClick={() => dispatch(decreaseItemQuantity(product.id))}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  onClick={() =>
                    dispatch(addItemToCart({ ...product, quantity: 1 }))
                  }
                  className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default FavoriteItem;
