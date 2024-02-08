export default function FavoritesButton() {
  return (
    <button
      className={`card-recipe__button ${cardFavorite ? "active_fav" : ""}`}
      onClick={(e) => handleToggleFavorite(e)}
    >
      <span role="img" aria-label="in fav">
        ⭐
      </span>
      {cardFavorite === true ? "Remove from favorites" : "Add in favorites"}
    </button>
  );
}
