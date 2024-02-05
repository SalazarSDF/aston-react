import "./search-bar.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import useDebounce from "../shared/use-debounce";
import SuggestionsList from "../widgets/suggestions-list";

import { historyPostHandler } from "../features/users/userSlice";
import { useAppDispatch } from "../app/store";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    const currentSearchParams = searchParams.get("query") || "";
    return currentSearchParams;
  });
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const dispatch = useAppDispatch();

  const [isBlurOrFocus, setIsBlurOrFocus] = useState<string | null>(null);

  function handleSearchValue(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    if (event.target.value) {
      searchParams.set("query", event.target.value);
      setSearchParams(searchParams);
      return;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(
      historyPostHandler({ historyItem: searchValue, typeOfAction: "add" }),
    );
  }

  function handleOnBlurAndOnFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsBlurOrFocus(event.type);
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="search-bar__container">
          <input
            name="search-recipe"
            className="search-bar"
            type="text"
            placeholder="Type your favorite food"
            value={searchValue}
            onChange={handleSearchValue}
            onBlur={handleOnBlurAndOnFocus}
            onFocus={handleOnBlurAndOnFocus}
          />
          <button className="search-bar__button" type="submit">
            Search
          </button>
        </div>
      </form>
      {debouncedSearchValue.length > 0 && debouncedSearchValue.length < 3 && (
        <span className="search-bar__helper">minimum 3 letter</span>
      )}
      {debouncedSearchValue.length > 2 && (
        <SuggestionsList
          searchValue={debouncedSearchValue}
          isBlurOrFocus={isBlurOrFocus}
        />
      )}
    </>
  );
}
