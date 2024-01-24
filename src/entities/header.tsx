import "./header.css";
import { Outlet, Link } from "react-router-dom";
export default function Header() {
  return (
    <>
      <div className="header">
        <Link to="/">Logo</Link>
        <nav className="header__navigation">
          <Link to="/">Sign In</Link>
          <Link to="/">Sign Out</Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
