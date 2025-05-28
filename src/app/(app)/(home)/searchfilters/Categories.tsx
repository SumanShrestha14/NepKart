"use client";
import { CategoryDropDown } from "./CategoryDropDown";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import { CategoriesSidebar } from "./CategoriesSidebar";
import { categoriesGetManyOutput } from "@/modules/categories/types";

interface CategoriesProps {
  data: categoriesGetManyOutput,
}

export const Categories = ({ data }: CategoriesProps) => {
  const constainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory =  "all"

  const activeCategoryIndex = data.findIndex((cat)=>cat.slug === activeCategory);
  const isActiveCategoryHidden = activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if(!constainerRef.current || !measureRef.current || !viewAllRef.current) return;

      const containerWidth = constainerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;
      
      const items = Array.from(measureRef.current.children);

      let totalWidth = 0;
      let visible=0;

      for(const item of items) {
        const width = item.getBoundingClientRect().width;

        if(totalWidth + width > availableWidth){
          break;
        }else{
          totalWidth += width
          visible++
        }

        setVisibleCount(visible);
      }
    }

    const resizeObersever = new ResizeObserver(calculateVisible)
    resizeObersever.observe(constainerRef.current!)
    return () => {
      resizeObersever.disconnect();
    }
  }, [data.length]);

  return (
    <div className="relative w-full ">

      {/* Categories sidebar */}
      <CategoriesSidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen}/>
      {/* Hidden div to measure width of items */}
      <div ref={measureRef} className="absolute opacity-0 pointer-events-none flex" style={{position:"fixed", top:-9999, left:-9999}}>
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropDown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHover={false}
            />
          </div>
        ))}
      </div>

      {/* Actual container for visible items */}
      <div ref={constainerRef} className="flex flex-nowrap items-center" onMouseEnter={() => setIsAnyHovered(true)} onMouseLeave={() => setIsAnyHovered(false)}>
        {data.slice(0,visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropDown
              category={category}
              isActive={activeCategory === category.slug}
              isNavigationHover={isAnyHovered}
            />
          </div>
        ))}
        <div ref={viewAllRef} className="shrink-0">
        <Button className={cn(
                    "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
                    isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary",
                    
                  )}
                  onClick={() => setIsSidebarOpen(true)}
                  >
          View All
          <ListFilterIcon className="ml-2"/>
        </Button>
        </div>
      </div>
    </div>
  );
};
