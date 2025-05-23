import { Category } from "@/payload-types";
import { CategoryDropDown } from "./CategoryDropDown";

interface CategoriesProps {
  data: any;
}

export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div className="relative w-full ">

    <div className="flex flex-nowrap items-center">
      {data.map((category: Category) => (
        <div key={category.id}>
          <CategoryDropDown
            category={category}
            isActive={false}
            isNavigationHover={false}
            />  
        </div>
      ))}
      </div>
    </div>
  );
};
