import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { categoriesGetManyOutput } from "@/modules/categories/types";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CategoriesSidebar = ({ open, onOpenChange }: Props) => {

  const trpc = useTRPC();
  const { data } = useQuery(trpc.categories.getMany.queryOptions(),)

    const router = useRouter();
  const [parentCategories, setParentCategories] = useState<categoriesGetManyOutput | null>(null);
  const [selectedCategories, setSelectedCategories] =useState<categoriesGetManyOutput[1] | null>(null);

  //   if we have parent category show those , otherwise show roor categories
    const handleOpenchange = (open: boolean) => {
        setSelectedCategories(null)
        setParentCategories(null);
        onOpenChange(open);
    }
  const currentCategories = parentCategories ?? data ?? [];

  const handleCategoryClick = (category: categoriesGetManyOutput[1]) => {
    if (category.subCategories && category.subCategories.length > 0) {
        setParentCategories(category.subCategories as categoriesGetManyOutput);
        setSelectedCategories(category);
    }else
    {
        // this is a leaf category (no subcategories)
        if(parentCategories && selectedCategories){
            // This is a sub category - navigate to /category/subCategory/
            router.push(`/${selectedCategories.slug}/${category.slug}`);
        }else{
            // This is a main category - navigate to /category/
            if(category.slug === "all"){
                router.push(`/`);
            }else{
                router.push(`/${category.slug}`);
            }
        }
        handleOpenchange(false)
    }

}

const handleBackClick = () => {
    if(parentCategories){
        setParentCategories(null);
        setSelectedCategories(null);
    }
}
const backgroundColor = selectedCategories?.color || "white"
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        className="p-0 transition-none"
        style={{ backgroundColor}}
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle>Categories</SheetTitle>
        </SheetHeader>
        <ScrollArea className="flex flex-col overflow-y-auto h-full pb-2">
          {parentCategories && (
            <button
              onClick={handleBackClick}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center text-base font-medium cursor-pointer"
            >
              <ChevronLeftIcon className="size-4 mr-2" />
              Back
            </button>
          )}

          {currentCategories.map((category) => (
            <button
              key={category.slug}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex items-center justify-between text-base font-medium cursor-pointer"
              onClick={() => handleCategoryClick(category)}
            >
              {category.name}
              {category.subCategories && category.subCategories.length > 0 && (
                <ChevronRightIcon className="size-4" />
              )}
            </button>
          ))}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
