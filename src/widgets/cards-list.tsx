import "./cards-list.css";

import Card from "../entities/card";
import { useGetInitialRecipesQuery } from "../app/apiSlice";
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
export default function CardsList() {
  const {
    data: recipesObj,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetInitialRecipesQuery();

  let content;
  if (isLoading || isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    const recipes = recipesObj.recipes;
    content = (
      <>
        {recipes.map((recipe) => (
          <Card
            key={recipe.id}
            recipe={recipe}
          />
        ))}
      </>
    );
  } else if (isError) {
    content = <div>Error! =( </div>;
  }

  return <div className="cards-list">{content}</div>;
}
