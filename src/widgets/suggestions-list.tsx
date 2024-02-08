import "./suggestions-list.css";
import { useSearchRecipesQuery } from "../app/apiSlice";
import Spinner from "../entities/spinner";
import SuggestionCard from "../entities/card-suggestion";

type Props = {
  searchValue: string;
  isBlurOrFocus: string | null;
};

export default function SuggestionsList({ searchValue, isBlurOrFocus }: Props) {
  const {
    data: recipesObj,
    isLoading,
    isFetching,
    isSuccess,
    isError,
  } = useSearchRecipesQuery(searchValue);

  const showSuggestions =
    searchValue && searchValue.length > 2 && isBlurOrFocus === "focus";
  if (!showSuggestions) {
    return;
  }

  let content;

  if (isError) {
    content = <p>Error =(</p>;
  } else if (isLoading && isFetching) {
    content = <Spinner />;
  } else if (isSuccess && recipesObj.recipes.length === 0) {
    content = (
      <div className="suggestions-item">
        <span>Nothing found =(</span>
      </div>
    );
  } else if (isSuccess) {
    content = recipesObj.recipes.map((recipe) => (
      <SuggestionCard key={recipe.id} recipe={recipe} />
    ));
  }

  return <div className="suggestions-list">{content}</div>;
}
