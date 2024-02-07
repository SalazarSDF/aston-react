import PropTypes from "prop-types";

import { useGetRecipeQuery } from "../app/apiSlice";

import Spinner from "./spinner";
import ImageWithLoader from "./image-with-loader";


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
