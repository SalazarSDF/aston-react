import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";

import Fallback from "./shared/fallback";

import App from "./app/index";
import { store } from "./app/store";
import { getCurrentUser, getUserFromBd } from "./app/firebase";
import { setUserData } from "./features/users/userSlice";
import { ThemeContextProvider } from "./app/theme-context";

async function start() {
  const user = await getCurrentUser();
  if (user && user.email) {
    const userFromBd = await getUserFromBd(user.email);
    store.dispatch(setUserData({ newUserData: userFromBd }));
  }
  ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary FallbackComponent={Fallback}>
            <ThemeContextProvider>
              <App />
            </ThemeContextProvider>
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </React.StrictMode>,
  );
}

void start();
