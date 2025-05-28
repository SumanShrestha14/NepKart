"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";
import { useRef, useState } from "react";
import { useDropDownPosition } from "./useDropDownPosition";
import { SubCategoryMenu } from "./SubCategoryMenu";
import Link from "next/link";
import { categoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  category: categoriesGetManyOutput[1];
  isActive?: boolean;
  isNavigationHover?: boolean;
}
export const CategoryDropDown = ({
  category,
  isActive,
  isNavigationHover,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropDownRef = useRef<HTMLDivElement>(null);
  const { getDropDownPosition } = useDropDownPosition(dropDownRef);

  const onMouseEnter = () => {
    if (category.subcategories) {
      setIsOpen(true);
    }
  };
  const onMouseLeave = () => {
    setIsOpen(false);
  };


  const dropDownPosition = getDropDownPosition();
  return (
    <div
      className="relative"
      ref={dropDownRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="relative">
        <Button
          variant={"elevated"}
          className={cn(
            "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
            isActive && !isNavigationHover && "bg-white border-primary",
            isOpen && "bg-white border-primary shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          )}
        >
          <Link href={`/${category.slug === "all" ? "" : category.slug}`}>
          {category.name}
          </Link>
        </Button>
      
        {category.subcategories&& category.subcategories.length > 0 && (
          <div
            className={cn(
              "opacity-0 absolute -bottom-3 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[10px] border-l-transparent border-r-transparent border-b-black left-1/2 -translate-x-1/2 ",
              isOpen && "opacity-100"
            )}
          >
          </div>
        )
        }
      </div>
        <SubCategoryMenu category={category} isOpen={isOpen} position = {dropDownPosition} />
    </div>
    //2 : 49 : 49
    // TODO : implement hover of subcategories
  );
};
