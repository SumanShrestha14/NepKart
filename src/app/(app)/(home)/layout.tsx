import React, { Suspense } from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SearchFilters, SearchFiltersSkeleton } from "./searchfilters";
import { getQueryClient , trpc } from "@/trpc/server";
import { dehydrate, hydrate, HydrationBoundary } from "@tanstack/react-query";



interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const queryClient = getQueryClient();

void queryClient.prefetchQuery(
    trpc.categories.getMany.queryOptions(),
)
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
        <SearchFilters/>
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
