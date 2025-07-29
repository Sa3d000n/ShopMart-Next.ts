import { Category } from "@/store/types";
import styles from "./CategoryItem.module.css";
import Image from "next/image";

function CategoryItem({ item }: { item: Category }) {
  const { image, nameEn: name } = item;
  return (
    <div className="flex flex-col items-center gap-3">
      <Image
        src={image || ""}
        alt={name + "image"}
        className="size-24 rounded-full"
        width={400}
        height={400}
      />
      <p className="font-medium ">{name}</p>
    </div>
  );
}

export default CategoryItem;
