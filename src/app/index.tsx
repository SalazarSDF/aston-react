import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

import "./index.css";

import Header from "../entities/header";
const Main = lazy(() => import("../pages/main-page"));
const Favorites = lazy(() => import("../pages/favorites-page"));
const SignIn = lazy(() => import("../pages/sign-in-page"));
const SignUpForm = lazy(() => import("../pages/sign-up-page"));
const History = lazy(() => import("../pages/history-page"));
const SingleCard = lazy(() => import("../entities/card-single"));

import Spinner from "../entities/spinner";

function App() {
  return (
    <Suspense fallback={"loading..."}>
      <Suspense fallback={<Spinner />}>
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
    </Suspense>
  );
}

export default App;
