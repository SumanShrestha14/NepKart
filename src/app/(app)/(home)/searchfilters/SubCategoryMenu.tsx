import { categoriesGetManyOutput } from "@/modules/categories/types";
import { Category } from "@/payload-types";
import Link from "next/link";

interface SubCategoryMenuProps {
  category: categoriesGetManyOutput[1];
  isOpen?: boolean;
  position: { top: number; left: number };
}

export const SubCategoryMenu = ({
  category,
  isOpen,
  position,
}: SubCategoryMenuProps) => {
  if (!isOpen || !category.subCategories || category.subCategories.length === 0)
    return null;

  const backGroundColor = category.color || "#F5F5F5";
  return (
    <div
      className="fixed z-[100]"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="h-3 w-60">
        <div
          style={{ backgroundColor: backGroundColor }}
          className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] -translate-x-[2px] -translate-y-[2px]"
        >
          <div>
            {category.subCategories?.map((subCategory: Category) => (
              <Link
                key={subCategory.slug}
                href={`/${category.slug}/${subCategory.slug}`}
                className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center gap-2"
              >
                {subCategory.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
