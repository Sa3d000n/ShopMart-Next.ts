"use client";

import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToFavorite,
  isItemInFavorite,
  removeItemFromFavorite,
} from "../../store/favoriteSlice";
import {
  addItemToCart,
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
} from "../../store/cartSlice";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { CiStar } from "react-icons/ci";
import { Product } from "@/store/types";
function ProductCard({ item }: { item: Product }) {
  const {
    id,
    image,
    nameEn: name,
    price,
    originalPrice,
    inStock,
    rating,
    reviewCount,
    description,
  } = item;
  const dispatch = useDispatch();
  const router = useRouter();
  const isInFavorite = useSelector(isItemInFavorite(id));
  const itemQuantity = useSelector(getItemQuantity(id));

  const discount = ((1 - price / originalPrice) * 100).toFixed(0);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <CiStar
        key={i}
        className={`w-5 h-5  ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };
  return (
    <div className="group relative block overflow-hidden hover:shadow-2xl transition-all duration-300">
      {inStock &&
        (isInFavorite ? (
          <button
            type="button"
            onClick={() => {
              dispatch(removeItemFromFavorite(id));
            }}
            className="absolute cursor-pointer end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
          >
            <span className="sr-only">Wishlist</span>

            <MdFavorite className="text-red-500" />
          </button>
        ) : (
          <button
            onClick={() => dispatch(addItemToFavorite(item))}
            className="absolute cursor-pointer end-4 top-4 z-10 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75"
          >
            <span className="sr-only">Wishlist</span>

            <MdFavoriteBorder />
          </button>
        ))}

      <Image
        src={image}
        alt=""
        width={400}
        height={400}
        className={`${
          !inStock && "grayscale"
        } h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72`}
      />

      <div className="relative border border-gray-100 bg-white p-6">
        {inStock && (
          <p className="text-gray-700 ">
            ${price}
            <span className="text-gray-400 line-through mx-3">
              ${originalPrice}
            </span>
            <span className="text-green-500">{discount}%</span>
          </p>
        )}
        <h3 className="mt-1.5 text-lg font-medium text-gray-900">{name}</h3>
        <p className="mt-1.5 line-clamp-3 text-gray-700">{description}</p>
        <div className="flex items-center gap-0.5">
          {renderStars(item?.rating)}{" "}
          <span className="text-xs text-stone-600">({reviewCount})</span>
        </div>

        <div className="mt-4 flex gap-4">
          {inStock ? (
            <>
              {itemQuantity > 0 ? (
                <div className="flex gap-3 items-center">
                  <button
                    type="button"
                    onClick={() => dispatch(increaseItemQuantity(id))}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
                  >
                    +
                  </button>
                  {itemQuantity}
                  <button
                    type="button"
                    onClick={() => dispatch(decreaseItemQuantity(id))}
                    className="px-2.5 py-1 sm:px-3.5 sm:py-2 text-sm flex justify-center items-center  font-bold bg-gray-100  shadow-2xl rounded-full cursor-pointer"
                  >
                    -
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => dispatch(addItemToCart(item))}
                  className="block w-full rounded-sm bg-gray-100 px-4 py-3 text-sm font-medium text-gray-900 transition hover:scale-105"
                >
                  Add to Cart
                </button>
              )}

              <button
                type="button"
                onClick={() => router.push(`/product/${id}`)}
                className="block w-full rounded-sm bg-gray-900 px-4 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                See Details
              </button>
            </>
          ) : (
            <p className="text-red-600">
              Sorry this Product isn&apos;t available right now{" "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
