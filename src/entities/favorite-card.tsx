import PropTypes from "prop-types";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../app/store";
import { useGetRecipeQuery } from "../app/apiSlice";

import {
  getUserData,
  getUserFavorites,
  favoritePostHandler,
} from "../features/users/userSlice";

import Spinner from "./spinner";
import ImageWithLoader from "./image-with-loader";
import FavoriteButton from "./button-favorites";

import "./card.css";

type PropsType = {
  recipeId: string;
};
export default function FavoriteCard({ recipeId }: PropsType) {
  const {
    data: recipe,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useGetRecipeQuery(recipeId);

  const userFavorites = useSelector(getUserFavorites);

  const user = useSelector(getUserData);
  const [cardFavorite, setCardFavorite] = useState(() => {
    return userFavorites && userFavorites.includes(Number(recipeId));
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function handleToggleFavorite(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) {
    e.stopPropagation();
    if (!user || !user.email) {
      navigate("/sign-up");
    }
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
        <FavoriteButton
          toggle={handleToggleFavorite}
          isCardFavorite={cardFavorite}
        />
      </div>
    );
  } else if (isError) {
    return <div>Error =(</div>;
  }

  return <div>{content}</div>;
}

FavoriteCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    prepTimeMinutes: PropTypes.number.isRequired,
    cookTimeMinutes: PropTypes.number.isRequired,
    difficulty: PropTypes.string.isRequired,
    cuisine: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    image: PropTypes.string.isRequired,
  }),
};
