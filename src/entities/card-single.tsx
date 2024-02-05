import { useState } from "react";
import { useParams } from "react-router-dom";

import { useSelector } from "react-redux";

import { useGetRecipeQuery } from "../app/apiSlice";

import {
  getUserFavorites,
  favoritePostHandler,
} from "../features/users/userSlice";

import { useAppDispatch } from "../app/store";

import ImageWithLoader from "./image-with-loader";

import Spinner from "./spinner";

import "./card-single.css";
type RouterParams = {
  recipeId: string;
};
export default function SingleCard() {
  const { recipeId } = useParams<keyof RouterParams>() as RouterParams;
  const {
    data: recipe,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetRecipeQuery(recipeId);

  const userFavorites = useSelector(getUserFavorites);
  const [cardFavorite, setCardFavorite] = useState(() => {
    return userFavorites && userFavorites.includes(Number(recipeId));
  });
  const dispatch = useAppDispatch();

  function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    setCardFavorite(!cardFavorite);
    dispatch(favoritePostHandler({ favoriteId: Number(recipeId) }));
  }

  let content;
  if (isLoading || isFetching) {
    content = <Spinner />;
  } else if (isSuccess && recipe) {
    content = (
      <div key={recipe.id} className="card-recipe">
        <ImageWithLoader src={recipe.image} alt={recipe.name} />
        <h2>{recipe.name}</h2>
        <ul className="card-recipe__tags">
          {recipe.tags.map((tag) => (
            <li className="card-recipe__tag" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
        <ol className="card-recipe__instructions">
          {recipe.instructions.map((instruction) => (
            <li className="card-recipe__instruction" key={instruction}>
              {instruction}
            </li>
          ))}
        </ol>
        <p>Difficulty: {recipe.difficulty}</p>
        <p>Cuisine: {recipe.cuisine}</p>
        <button
          className={`card-recipe__button ${cardFavorite ? "active_fav" : ""}`}
          onClick={(e) => handleToggleFavorite(e)}
        >
          <span role="img" aria-label="in fav">
            ⭐
          </span>
          {cardFavorite === true ? "Remove from favorites" : "Add in favorites"}
        </button>
      </div>
    );
  } else if (isError) {
    content = <div>Error =(</div>;
  }

  return <div className="single-card">{content}</div>;
}
