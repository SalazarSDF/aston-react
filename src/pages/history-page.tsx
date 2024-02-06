import { useSelector } from "react-redux";

import { Link, Navigate } from "react-router-dom";

import { getUserHistory, getUserData } from "../features/users/userSlice";

import "./history-page.css";

export default function History() {
  const userHistoryList = useSelector(getUserHistory);
  const user = useSelector(getUserData);

  if (!user || !user.email) {
    return <Navigate to="/sign-up" />;
  }

  if (!userHistoryList || userHistoryList.length === 0) {
    return <h1>No History! =(</h1>;
  }
  return (
    <div className="history">
      {userHistoryList.map((userHistory) => (
        <Link
          className="history__link"
          key={userHistory}
          to={`/?query=${userHistory}`}
        >
          {userHistory}
        </Link>
      ))}
    </div>
  );
}
