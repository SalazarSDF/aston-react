import { useState, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../entities/header";
import Main from "../pages/main-page";
import Favorites from "../pages/favorites-page";
import "./index.css";

function App() {
  return (
    <Suspense fallback={"loading..."}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Main />} />
          <Route path="/favorites" element={<Favorites />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
