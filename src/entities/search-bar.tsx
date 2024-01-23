import "./search-bar.css";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../shared/use-debounce";
import SuggestionsList from "../widgets/suggestions-list";

export default function SearchBar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setSearchValue] = useState(() => {
    const currentSearchParams = searchParams.get("query");
    return currentSearchParams ? currentSearchParams : "";
  });
  const debouncedSearchValue = useDebounce(searchValue, 500);
  const [showSuggestions, setShowSuggestions] = useState(() => {
    if (debouncedSearchValue && debouncedSearchValue.length > 2) {
      return true;
    }
    return false;
  });

  function handleSearchValue(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(event.target.value);
    if (event.target.value) {
      searchParams.set("query", event.target.value);
      setSearchParams(searchParams);
      setShowSuggestions(true);
      return;
    }
    setShowSuggestions(false);
  }

  return (
    <>
      <input
        className="search-bar"
        type="text"
        placeholder="Type your favorite food"
        value={searchValue}
        onChange={handleSearchValue}
        onBlur={() => setShowSuggestions(false)}
        onFocus={() => setShowSuggestions(true)}
      />
      {debouncedSearchValue.length > 0 && debouncedSearchValue.length < 3 && (
        <span className="search-bar__helper">minimum 3 letter</span>
      )}
      {showSuggestions && debouncedSearchValue.length > 2 && (
        <SuggestionsList searchValue={debouncedSearchValue} />
      )}
    </>
  );
}
