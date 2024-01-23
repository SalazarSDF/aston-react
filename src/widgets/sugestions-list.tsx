import "./sugestions-list.css";
import { useSearchRecipiesQuery } from "../app/apiSlice";
import { Spinner } from "../entities/spiner";
import ImageWithLoader from "../entities/image-with-loader";
export default function SuggestionsList({
  searchValue,
}: {
  searchValue: string;
}) {
  const {
    data: recipesObj,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error,
  } = useSearchRecipiesQuery(searchValue);
  let content;

  if (isError) {
    content = <p>{error.toString()}</p>;
  } else if (isLoading && isFetching) {
    content = <Spinner />;
  } else if (isSuccess && recipesObj.recipes.length === 0) {
    content = (
      <div className="sugestion-item">
        <span>Nothing found =(</span>
      </div>
    );
  } else if (isSuccess) {
    content = recipesObj.recipes.map((recipe) => (
      <div key={recipe.id} className="sugestion-item">
        <div className="sugestion-item__img">
          <ImageWithLoader src={recipe.image} alt={recipe.name} />
        </div>
        <span>{recipe.name}</span>
      </div>
    ));
  }

  return <div className="sugestions-list">{content}</div>;
}
