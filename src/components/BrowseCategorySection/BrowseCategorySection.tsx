import CategoryItem from "../CategoryItem/CategoryItem";
import { Category } from "@/store/types";

async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    "https://task-ecommerce-api.vercel.app/api/categories"
  );
  const data = await res.json();
  return data.data.map((item: Category) => ({
    id: item.id,
    image: item.image,
    nameEn: item.nameEn,
    name: item.name, // Now we know it's there
  }));
}
async function BrowseCategorySection() {
  const categories: Category[] = await getCategories();

  return (
    <div className="py-16 container ">
      <h2 className="mb-12 text-2xl font-medium ">Browse By Category</h2>
      <div className="grid grid-cols-2 lg:grid-cols-8 gap-x-4 gap-y-10">
        {categories.map((item) => (
          <CategoryItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default BrowseCategorySection;
