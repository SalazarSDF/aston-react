import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { getUserHistory } from "../features/users/userSlice";

import "./history-page.css";

export default function History() {
  const userHistoryList = useSelector(getUserHistory);
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
