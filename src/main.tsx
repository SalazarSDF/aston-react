import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./app/index";
import { store } from "./app/store";
import { getCurrentUser, getUserFromBd } from "./app/firebase";
import { setUserData } from "./features/users/userSlice";
import Modal from "./widgets/modal";

async function start() {
  const user = await getCurrentUser();
  if (user && user.email) {
    const userFromBd = await getUserFromBd(user.email);
    console.log("userfrombd", userFromBd);
    store.dispatch(setUserData({ newUserData: userFromBd }));
  }
  console.log("just user: ", user);
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}

void start();
