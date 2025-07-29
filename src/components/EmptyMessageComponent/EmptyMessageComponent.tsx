import { IoCartOutline } from "react-icons/io5";
import styles from "./EmptyMessageComponent.module.css";
import { MdFavorite } from "react-icons/md";
import Link from "next/link";
function EmptyMessageComponent({ name }: { name: string }) {
  return (
    <div className="text-center py-20">
      <div className="text-6xl text-gray-400 mb-6 flex justify-center">
        {name == "Wishlistc" ? <MdFavorite /> : <IoCartOutline />}
      </div>
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
        Your {name} is Empty
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        Looks like you haven’t added anything to your {name} yet.
      </p>
      <Link
        href="/products"
        className="inline-block bg-primary-color hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition"
      >
        Browse Products
      </Link>
    </div>
  );
}

export default EmptyMessageComponent;
