"use client"
import { LuShoppingCart } from "react-icons/lu";
import heroImage from "../../../public/heroSection/market.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const IntroSection = () => {
  const router = useRouter();

  return (
    <div className="container px-4 py-8 md:py-16">
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24">
        <div className="flex-1 text-center lg:text-left">
          <p className="mb-2.5 text-primary-color text-lg md:text-xl font-medium">
            Premium Quality
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-6xl mb-4 md:mb-6 leading-tight">
            Discover Amazing Products at{" "}
            <span className="text-primary-color">ShopMart</span>!
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-stone-600 mb-8 lg:mb-0">
            Shop the latest trends and timeless classics from top brands around
            the world with unbeatable prices, premium quality, and
            lightning-fast delivery to your doorstep
          </p>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={heroImage}
            alt="Featured Product"
            className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl object-cover"
          />
        </div>
      </div>
      <div className="flex justify-center lg:justify-start mt-8">
        <button
          type="button"
          onClick={() => router.push("/products")}
          className="cursor-pointer group relative inline-flex items-center overflow-hidden rounded-full bg-sky-800 px-6 md:px-8 py-3 md:py-4 text-white focus:ring-3 focus:outline-hidden transition-colors duration-300 hover:bg-sky-600 w-full sm:w-auto"
        >
          <span className="absolute -end-full transition-all group-hover:end-3 md:group-hover:end-4">
            <LuShoppingCart className="text-2xl md:text-3xl font-bold" />
            
          </span>
          <span className="text-2xl md:text-3xl font-bold transition-all group-hover:me-3 md:group-hover:me-4">
            Shop Now
          </span>
        </button>
         
      </div>
    </div>
  );
};

export default IntroSection;
