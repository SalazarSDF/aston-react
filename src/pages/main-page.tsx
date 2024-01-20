import "./main-page.css";
import SearchBar from "../entities/search-bar";
import CardsList from "../widgets/cards-list";

export default function Main() {
  return (
    <div className="main__container">
      <SearchBar />
      <CardsList />
    </div>
  );
}
