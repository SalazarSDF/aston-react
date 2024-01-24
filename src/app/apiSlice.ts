import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recipe } from "../widgets/cards-list";
//Recipe
type RecipesData = {
  recipes: Recipe[];
};
const limit = 9;

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Recipes"],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getInitialRecipes: builder.query<RecipesData, void>({
      query: () => `/recipes?limit=${limit}`,
    }),
    searchRecipes: builder.query<RecipesData, string>({
      query: (query: string) => `recipes/search?q=${query}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetInitialRecipesQuery, useSearchRecipesQuery } = apiSlice;
