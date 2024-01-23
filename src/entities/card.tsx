import type { Recepie } from "../widgets/cards-list";
import "./card.css";
import  ImageWithLoader from "./image-with-loader";
export default function Card({ recipe }: { recipe: Recepie }) {
  return (
    <>
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
        <ol className="card-recipe__instrictions">
          {recipe.instructions.map((instruction) => (
            <li className="card-recipe__instriction" key={instruction}>
              {instruction}
            </li>
          ))}
        </ol>
        <p>Difficulty: {recipe.difficulty}</p>
        <p>Cuisine: {recipe.cuisine}</p>
      </div>
    </>
  );
}
