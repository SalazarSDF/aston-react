import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

import "./card.css";
import {
  getUserData,
  getUserFavorites,
  favoritePostHandler,
} from "../features/users/userSlice";

import { useAppDispatch } from "../app/store";

import ImageWithLoader from "./image-with-loader";

import type { Recipe } from "../widgets/cards-list";
type PropsType = {
  recipe: Recipe;
};

export default function Card({ recipe }: PropsType) {
  const userFavorites = useSelector(getUserFavorites);
  const user = useSelector(getUserData);
  const [cardFavorite, setCardFavorite] = useState(() => {
    return userFavorites && userFavorites.includes(recipe.id);
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
    dispatch(favoritePostHandler({ favoriteId: recipe.id }));
  }

  function openSingleCard() {
    navigate(`recipe/${recipe.id}`);
  }
  return (
    <div key={recipe.id} className="card-recipe" onClick={openSingleCard}>
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
}

Card.propTypes = {
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
