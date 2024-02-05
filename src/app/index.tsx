import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "../entities/header";
import Main from "../pages/main-page";
import Favorites from "../pages/favorites-page";
import "./index.css";
import SignIn from "../pages/sign-in-page";
import SignUpForm from "../pages/sign-up-page";
import History from "../pages/history-page";
import SingleCard from "../entities/card-single";

function App() {
  return (
    <Suspense fallback={"loading..."}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUpForm />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/history" element={<History />} />
          <Route path="recipe/:recipeId" element={<SingleCard />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
