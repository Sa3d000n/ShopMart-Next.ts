"use client";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Category, Product } from "@/store/types";
import CardSkeleton from "@/components/CardSkeleton/CardSkeleton";

function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState<Product[]>([]);
  const [filteredItems, setFilteredItems] = useState<Product[] | null>(null);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [activeSort, setActiveSort] = useState("default");
  const [activeCategory, setActiveCategory] = useState({
    name: "الكل",
    nameEn: "All Categories",
    id: -1,
  });

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setFilteredItems(() => {
      if (activeCategory.nameEn == "All Categories") {
        return items.filter(
          (item) =>
            item.nameEn.toLowerCase().includes(e.target.value.toLowerCase()) ||
            item.description
              .toLowerCase()
              .includes(e.target.value.toLowerCase()) ||
            item.name.toLowerCase().includes(e.target.value.toLowerCase())
        );
      } else {
        return items.filter(
          (item) =>
            item.category.name == activeCategory.name &&
            (item.nameEn.toLowerCase().includes(e.target.value.toLowerCase()) ||
              item.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(e.target.value.toLowerCase()))
        );
      }
    });
  }

  function handleCategorySelection(
    e: MouseEvent<HTMLButtonElement>,
    category: Category
  ) {
    e.preventDefault();
    setFilteredItems(() => {
      if (category.nameEn == "All Categories") {
        return null;
      }
      return items.filter((item) => item.category.name == category.name);
    });
  }

  function sortItems(itemsToSort: Product[]) {
    if (activeSort === "default") {
      return itemsToSort;
    }

    const sorted = [...itemsToSort];
    switch (activeSort) {
      case "name":
        return sorted.sort((a, b) => a.nameEn.localeCompare(b.nameEn));
      case "price-low":
        return sorted.sort((a, b) => a.price - b.price);
      case "price-high":
        return sorted.sort((a, b) => b.price - a.price);
      case "rating":
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      default:
        return sorted;
    }
  }

  function filterByPrice(itemsToFilter: Product[]) {
    if (!priceRange.min && !priceRange.max) {
      return itemsToFilter;
    }

    return itemsToFilter.filter((item) => {
      const price = item.price;
      const min = priceRange.min ? parseFloat(priceRange.min) : 0;
      const max = priceRange.max ? parseFloat(priceRange.max) : Infinity;

      return price >= min && price <= max;
    });
  }

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  async function getItems() {
    setIsLoading(true);
    const res = await fetch(
      "https://task-ecommerce-api.vercel.app/api/products"
    );
    const data = await res.json();

    setItems(data.data.products);
    setIsLoading(false);
  }

  async function getCategories() {
    const res = await fetch(
      "https://task-ecommerce-api.vercel.app/api/categories"
    );
    const data = await res.json();

    setCategories(data.data);
  }

  let displayItems = filteredItems
    ? sortItems(filteredItems)
    : sortItems(items);
  displayItems = filterByPrice(displayItems);

  useEffect(function () {
    getItems();
    getCategories();
  }, []);

  return (
    <div className="container py-16 dark:bg-gray-900 dark:text-gray-100">
      <h2 className="text-primary-color dark:text-blue-400 text-4xl font-bold text-center mb-11">
        Products
      </h2>
      <div className="flex flex-col lg:flex-row items-center gap-3 justify-end">
        <form className="max-w-lg grow mb-9">
          <div className="flex relative">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-100"
            >
              Your Email
            </label>

            <button
              type="button"
              onClick={toggleDropdown}
              className="cursor-pointer shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-white bg-primary-color dark:bg-blue-600 transition-all duration-300 border border-blue-700 dark:border-blue-500 rounded-s-lg hover:bg-blue-700 dark:hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              {activeCategory.nameEn}
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="z-20 bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700 rounded-lg shadow w-44 absolute top-12 left-0 border border-blue-200 dark:border-gray-600">
                <ul
                  className="py-2 text-sm text-gray-700 dark:text-gray-100"
                  aria-labelledby="dropdown-button"
                >
                  {[
                    { name: "الكل", nameEn: "All Categories", id: -1 },
                    ...(categories || []),
                  ].map((item) => {
                    if (item !== activeCategory)
                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={(e) => {
                              toggleDropdown();
                              handleCategorySelection(e, item);
                              setActiveCategory(item);
                            }}
                            className="inline-flex w-full px-4 py-2 hover:bg-blue-100 dark:hover:bg-gray-700 text-stone-700 dark:text-gray-100 hover:text-blue-900 dark:hover:text-blue-400"
                          >
                            {item.nameEn}
                          </button>
                        </li>
                      );
                  })}
                </ul>
              </div>
            )}

            <div className="relative w-full">
              <input
                type="search"
                id="search-dropdown"
                onChange={(e) => {
                  handleSearch(e);
                }}
                className="block p-2.5 w-full z-10 text-sm text-gray-900 dark:text-gray-100 bg-gray-50 dark:bg-gray-800 rounded-e-lg border-s-0 border border-blue-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400"
                placeholder="Search Desserts..."
                required
              />
              <button
                type="button"
                className="cursor-pointer absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-primary-color dark:bg-blue-600 rounded-e-lg border border-blue-700 dark:border-blue-500 hover:bg-blue-700 dark:hover:bg-blue-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              >
                <IoSearch />
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
        </form>
        <div className="lg:ml-44">
          <div className="flex justify-between items-center mb-6 max-w-lg">
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-100">
                Sort by:
              </label>
              <select
                title="sort"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="px-3 py-2 border rounded-lg text-sm border-blue-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-700 dark:focus:border-blue-400"
              >
                <option value="default">Default</option>
                <option value="name">Name</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>

          <details className="group relative z-50 mb-12">
            <summary className="flex items-center gap-2 border-b border-gray-300 dark:border-gray-600 pb-1 text-gray-700 dark:text-gray-100 transition-colors hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:hover:text-gray-200 [&::-webkit-details-marker]:hidden">
              <span className="text-sm font-medium"> Price </span>

              <span className="transition-transform group-open:-rotate-180">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                  />
                </svg>
              </span>
            </summary>

            <div className="z-auto w-64 divide-y divide-gray-300 dark:divide-gray-600 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm group-open:absolute group-open:start-0 group-open:top-8">
              <div className="flex items-center justify-between px-3 py-2">
                <span className="text-sm text-gray-700 dark:text-gray-100">
                  {" "}
                </span>

                <button
                  type="button"
                  onClick={() => setPriceRange({ min: "", max: "" })}
                  className="text-sm text-gray-700 dark:text-gray-100 underline transition-colors hover:text-gray-900 dark:hover:text-gray-200"
                >
                  Reset
                </button>
              </div>

              <div className="flex items-center gap-3 p-3">
                <label htmlFor="MinPrice">
                  <span className="text-sm text-gray-700 dark:text-gray-100">
                    {" "}
                    Min{" "}
                  </span>

                  <input
                    type="number"
                    id="MinPrice"
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        min: e.target.value,
                      }))
                    }
                    value={priceRange.min || 0}
                    className="mt-0.5 w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm sm:text-sm"
                  />
                </label>

                <label htmlFor="MaxPrice">
                  <span className="text-sm text-gray-700 dark:text-gray-100">
                    {" "}
                    Max{" "}
                  </span>

                  <input
                    type="number"
                    id="MaxPrice"
                    onChange={(e) =>
                      setPriceRange((prev) => ({
                        ...prev,
                        max: e.target.value,
                      }))
                    }
                    value={priceRange.max || 600000}
                    className="mt-0.5 w-full rounded border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 shadow-sm sm:text-sm"
                  />
                </label>
              </div>
            </div>
          </details>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-6 gap-y-5 mb-9">
        {isLoading ? (
          <CardSkeleton />
        ) : (
          displayItems?.map((item) => <ProductCard key={item.id} item={item} />)
        )}
      </div>
    </div>
  );
}

export default ProductsPage;