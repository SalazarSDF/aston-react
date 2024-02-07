import "./header.css";
import { Outlet, Link } from "react-router-dom";

import { useSelector } from "react-redux";

import { getUserData, removeUser } from "../features/users/userSlice";
import { useAppDispatch } from "../app/store";
import { useThemeContext } from "../app/theme-context";

export default function Header() {
  const user = useSelector(getUserData);

  const isUserExist = Boolean(user && user.email);

  const dispatch = useAppDispatch();

  const { theme, setTheme } = useThemeContext();

  function signOut() {
    void dispatch(removeUser());
  }

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
      return;
    }
    setTheme("light");
  }

  return (
    <>
      <div
        className={`header ${theme === "dark" ? "header__dark" : "header__light"}`}
      >
        <Link to="/">Logo</Link>
        <nav className="header__navigation">
          <button onClick={changeTheme}>change theme</button>
          {isUserExist ? (
            <>
              <Link to="/favorites">Favorites</Link>
              <Link to="/history">History</Link>
              <Link onClick={signOut} to="/sign-in">
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
