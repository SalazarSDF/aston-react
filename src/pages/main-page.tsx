import "./main-page.css";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../entities/search-bar";
import CardsList from "../widgets/cards-list";

export default function Main() {
  const [searchParams] = useSearchParams();
  const currentSearchParams = searchParams.get("query") || "";

  return (
    <div className="main__container">
      <SearchBar />
      {currentSearchParams.length > 2 && (
        <CardsList currentSearchParams={currentSearchParams} />
      )}
    </div>
  );
}
