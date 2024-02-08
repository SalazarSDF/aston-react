import "./cards-list.css";
import { useSearchParams } from "react-router-dom";

import Card from "../entities/card";
import { useSearchRecipesQuery } from "../app/apiSlice";
import Spinner from "../entities/spinner";

export type Recipe = {
  id: number;
  name: string;
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  difficulty: string;
  cuisine: string;
  tags: string[];
  image: string;
};

type PropsType = {
  currentSearchParams: string;
};
export default function CardsList({ currentSearchParams }: PropsType) {
  const {
    data: recipesObj,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useSearchRecipesQuery(currentSearchParams);

  let content;
  if (isLoading || isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    const recipes = recipesObj.recipes;
    content =
      recipes.length > 0 ? (
        <>
          {recipes.map((recipe) => (
            <Card key={recipe.id} recipe={recipe} />
          ))}
        </>
      ) : (
        <p>Nothing found =(</p>
      );
  } else if (isError) {
    content = <div>Error! =( </div>;
  }
  return <div className="cards-list">{content}</div>;
}
