import "./header.css";
import { Outlet, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { getUserData, removeUser } from "../features/users/userSlice";
import { useAppDispatch } from "../app/store";

export default function Header() {
  const user = useSelector(getUserData);

  const isUserExist = Boolean(user && user.email);

  const dispatch = useAppDispatch();

  function signOut() {
    void dispatch(removeUser());
  }

  return (
    <>
      <div className="header">
        <Link to="/">Logo</Link>
        <nav className="header__navigation">
          {isUserExist ? (
            <>
              <Link to="/favorites">Favorites</Link>
              <Link to="/history">History</Link>
              <Link onClick={signOut} to="/">
                Sign Out
              </Link>
            </>
          ) : (
            <>
              <Link to="/sign-in">Sign In</Link>
              <Link to="/sign-up">Sign Up</Link>
            </>
          )}
        </nav>
      </div>
      <Outlet />
    </>
  );
}
