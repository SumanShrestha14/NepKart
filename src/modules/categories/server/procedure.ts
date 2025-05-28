import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter= createTRPCRouter({
    getMany : baseProcedure.query(async ({ctx})=>{
         
        const data = await ctx.db.find({
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

  const formattedData = data.docs.map((doc) => ({
      ...doc,
      subCategories: (doc.subcategories?.docs ?? []).map((sub) => ({
        // Because of Depth 1 we are confident that doc will be type Category
        ...(sub as Category),
        subCategories: undefined,
      })),
    }));
  return formattedData;
    }),
});