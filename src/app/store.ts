import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { useDispatch } from "react-redux";

import { userReducer } from "../features/users/userSlice";

import loggerMiddleware from "../features/middleware-logger";

import { apiSlice } from "./apiSlice";

const rootReducer = combineReducers({
  user: userReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware).concat(loggerMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
