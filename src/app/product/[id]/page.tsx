"use client";
import React, { useState, useEffect } from "react";
import { CiStar } from "react-icons/ci";
import { FaTruck } from "react-icons/fa";

import {
  addItemToFavorite,
  isItemInFavorite,
  removeItemFromFavorite,
} from "../../../store/favoriteSlice";
import {
  addItemToCart,
  decreaseItemQuantity,
  getItemQuantity,
  increaseItemQuantity,
} from "../../../store/cartSlice";
import { IoShield } from "react-icons/io5";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Product } from "@/store/types";
import DefaultSkeleton from "@/components/DefaultSkeleton/DefaultSkeleton";
import Image from "next/image";

function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const dispatch = useAppDispatch();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const isInFavorite = useAppSelector(
    product?.id ? isItemInFavorite(product.id) : () => false
  );
  const itemQuantity = useAppSelector(
    product?.id ? getItemQuantity(product.id) : () => 0
  );
  const discountPercentage =
    product?.originalPrice && product?.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <CiStar
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  useEffect(
    function () {
      async function getProduct() {
        setIsLoading(true);
        const { id } = await params;
        const res = await fetch(
          `https://task-ecommerce-api.vercel.app/api/products/${id}`
        );
        const data = await res.json();
        setProduct(data.data);
        setIsLoading(false);
      }
      getProduct();
    },
    [params]
  );

  if (isLoading || product == undefined) {
    return <DefaultSkeleton />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div className="space-y-4">
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <Image
              src={product?.images?.at(selectedImage) || ""}
              alt={product?.nameEn}
              className="w-full h-full object-cover"
              width={400}
              height={400}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {product?.images?.map((image, index) => (
              <button
                title="button"
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                  selectedImage === index
                    ? "border-blue-500"
                    : "border-gray-200"
                }`}
              >
                <Image
                  src={image}
                  alt={`${product?.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={400}
                  height={400}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>{product?.category?.nameEn}</span>
              <span>•</span>
              <span>{product?.brand}</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {product?.nameEn}
            </h1>
            <p className="text-lg text-gray-600">{product?.name}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              {renderStars(product?.rating)}
              <span className="ml-2 text-sm font-medium">
                {product?.rating}
              </span>
            </div>
            <span className="text-sm text-gray-500">
              ({product?.reviewCount} reviews)
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-gray-900">
              ${product?.price}
            </span>
            {product?.originalPrice > product?.price && (
              <>
                <span className="text-xl text-gray-500 line-through">
                  ${product?.originalPrice}
                </span>
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  {discountPercentage}% OFF
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`w-3 h-3 rounded-full ${
                product?.inStock ? "bg-green-500" : "bg-red-500"
              }`}
            ></div>
            <span
              className={`text-sm font-medium ${
                product?.inStock ? "text-green-600" : "text-red-600"
              }`}
            >
              {product?.inStock
                ? `In Stock (${product?.stockQuantity} available)`
                : "Out of Stock"}
            </span>
          </div>

          <div className="flex gap-4">
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
            {product.inStock && (
              <button
                onClick={() =>
                  !isInFavorite
                    ? dispatch(addItemToFavorite(product))
                    : dispatch(removeItemFromFavorite(product.id))
                }
                className={`p-3 rounded-lg border-2 ${
                  isInFavorite
                    ? "border-red-500 text-red-500"
                    : "border-gray-300 text-gray-400"
                } hover:border-red-500 hover:text-red-500`}
              >
                {isInFavorite ? (
                  <MdFavorite className="w-6 h-6" />
                ) : (
                  <MdFavoriteBorder
                    className={`w-6 h-6 ${isInFavorite ? "fill-current" : ""}`}
                  />
                )}
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaTruck className="w-5 h-5" />
              <span>Free Shipping</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaTruck className="w-5 h-5" />
              <span>30-Day Returns</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <IoShield className="w-5 h-5" />
              <span>2 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="flex border-b border-gray-200">
          {["description", "specifications"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-medium capitalize ${
                activeTab === tab
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="py-8">
          {activeTab === "description" && (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {activeTab === "specifications" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div
                  key={key}
                  className="flex justify-between py-3 border-b border-gray-100"
                >
                  <span className="font-medium text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
