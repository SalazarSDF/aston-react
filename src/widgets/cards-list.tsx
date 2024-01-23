import "./cards-list.css";
import { useGetInitalRecipiesQuery } from "../app/apiSlice";
import { Spinner } from "../entities/spiner";
import Card from "../entities/card";

export type Recepie = {
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
    error,
  } = useGetInitalRecipiesQuery();

  let content;
  if (isLoading || isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    const recipes = recipesObj.recipes;
    content = (
      <>
        {recipes.map((recipe) => (
          <Card key={recipe.id} recipe={recipe} />
        ))}
      </>
    );
  } else if (isError) {
    content = <div>{error.toString()}</div>;
  }

  return <div className="cards-list">{content}</div>;
}
