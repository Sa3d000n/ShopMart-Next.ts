"use client";
import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useRouter } from "next/navigation";
import CardSkeleton from "../CardSkeleton/CardSkeleton";
import { Product } from "@/store/types";

function TopPicksSection() {
  const [items, setItems] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  async function getTopPicks(): Promise<void> {
    setIsLoading(true);
    const res = await fetch(
      "https://task-ecommerce-api.vercel.app/api/products"
    );
    const data = await res.json();
    const topPicks = data.data.products.slice(0, 4);
    setItems(topPicks);
    setIsLoading(false);
  }

  useEffect(function () {
    getTopPicks();
  }, []);
  return (
    <div className="container py-16">
      <h2 className="mb-12 text-2xl font-medium ">Top Picks</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-5">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          items?.map((item) => <ProductCard item={item} key={item.id} />)
        )}
      </div>
      <div className=" text-center mt-12">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className=" cursor-pointer group relative inline-flex items-center overflow-hidden rounded-full bg-primary-color px-8 py-3 text-white focus:ring-3 focus:outline-hidden transition-colors duration-300 hover:bg-sky-600"
        >
          <span className="absolute -end-full transition-all group-hover:end-4">
            <FaArrowAltCircleRight className="text-3xl font-bold " />
          </span>

          <span className="text-3xl font-bold transition-all group-hover:me-4">
            {" "}
            View All Products{" "}
          </span>
        </button>
      </div>
    </div>
  );
}

export default TopPicksSection;
