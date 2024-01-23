import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Recepie } from "../widgets/cards-list";
type RecipiesData = {
  recipes: Recepie[];
};

export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://dummyjson.com" }),
  tagTypes: ["Recipies"],
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getInitalRecipies: builder.query<RecipiesData, void>({
      query: () => "/recipes?limit=10&skip=10",
    }),
    searchRecipies: builder.query<RecipiesData, string>({
      query: (query: string) => `recipes/search?q=${query}`,
    }),
  }),
});

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetInitalRecipiesQuery, useSearchRecipiesQuery } = apiSlice;
