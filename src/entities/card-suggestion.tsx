import { useNavigate } from "react-router-dom";

import ImageWithLoader from "./image-with-loader";
import "../widgets/suggestions-list";

import type { Recipe } from "../widgets/cards-list";

type PropsType = {
  recipe: Recipe;
};
export default function SuggestionCard({ recipe }: PropsType) {
  const navigate = useNavigate();
  function openSingleCard() {
    navigate(`recipe/${recipe.id}`);
  }
  return (
    <div onClick={openSingleCard} key={recipe.id} className="suggestion-item">
      <div className="suggestion-item__img">
        <ImageWithLoader src={recipe.image} alt={recipe.name} />
      </div>
      <span>{recipe.name}</span>
    </div>
  );
}
