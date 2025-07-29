'use client'


import { clearFavorite } from "../../store/favoriteSlice";
import FavoriteItem from "../../components/FavoriteItem/FavoriteItem";
import EmptyMessageComponent from "../../components/EmptyMessageComponent/EmptyMessageComponent";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

function WishlistPage() {
  const favorites = useAppSelector((state) => state.favorite);
  const dispatch = useAppDispatch();
  if (favorites.length == 0) {
    return <EmptyMessageComponent name="Wishlist" />;
  }

  return (
    <div className="py-16 container">
      <h2 className="text-primary-color text-4xl font-bold text-center mb-11">
        Wishlist
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
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {favorites.map((product) => (
              <FavoriteItem key={product.id} product={product} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className="px-6 py-4 text-right">
                <button
                  className="cursor-pointer text-red-600 dark:text-red-500 font-medium hover:underline"
                  onClick={() => dispatch(clearFavorite())}
                >
                  Clear Wishlist
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default WishlistPage;
