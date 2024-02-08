type PropsType = {
  isCardFavorite: boolean | null;
  toggle: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

export default function FavoriteButton({ toggle, isCardFavorite }: PropsType) {
  return (
    <button
      className={`card-recipe__button ${isCardFavorite ? "active_fav" : ""}`}
      onClick={(e) => toggle(e)}
    >
      <span role="img" aria-label="in fav">
        ⭐
      </span>
      {isCardFavorite ? "Remove from favorites" : "Add in favorites"}
    </button>
  );
}
