import { useSelector } from "react-redux";

import { getUserFavorites } from "../features/users/userSlice";
import FavoriteCard from "../entities/favorite-card";

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
export default function FavoritesList() {
  const userFavorites = useSelector(getUserFavorites);
  if (!userFavorites || userFavorites.length === 0) {
    return <div>No Favorites</div>;
  }

  return (
    <>
      {userFavorites.map((recipe) => (
        <FavoriteCard key={recipe} recipeId={String(recipe)} />
      ))}
    </>
  );
}
