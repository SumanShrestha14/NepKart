import { Category } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";

import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { SearchFilters } from "./searchfilters";
import { CustomCategory } from "./types";

interface Props {
  children: React.ReactNode;
}

const layout = async ({ children }: Props) => {
  const payload = await getPayload({
    config: configPromise,
  });

  const data = await payload.find({
    pagination: false,
    collection: "categories",
    depth: 1,//Populate   subcategories , subCategories[0] will be of type category
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
  });

  const formattedData : CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subCategories: (doc.subcategories?.docs ?? []).map((sub) => ({
      // Because of Depth 1 we are confident that doc will be type Category
      ...(sub as Category),
      subCategories : undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#f4f4f0]">{children}</div>
      <Footer />
    </div>
  );
};

export default layout;
