import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

import FavoritesList from "../widgets/favorites-list";

import { getUserData } from "../features/users/userSlice";


export default function Favorites() {
  const user = useSelector(getUserData);

  if (!user || !user.email) {
    return <Navigate to="/sign-up" />;
  }
  return (
    <div className="cards-list">
      <FavoritesList />
    </div>
  );
}
