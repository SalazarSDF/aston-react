import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  getUserFromBd,
  addUserToBd,
  signOutUser,
  addUserNewFavoriteToBd,
  removeUserFavoriteFromBd,
  addUserHistoryToBd,
  removeUserHistoryFromBd,
} from "../../app/firebase";

import getErrorMessage from "../../shared/get-error-message";

import type { FormFieldsType } from "../../pages/sign-up-page";

import type { RootState } from "../../app/store";

export type UserData = {
  email: "string";
  favorites: number[];
  history: string[];
};

export const createNewUserWithEmailAndPassword = createAsyncThunk(
  "user/createNewUserWithEmailAndPassword",
  async (data: FormFieldsType, { rejectWithValue }) => {
    try {
      const response = await createAuthUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      const user = response?.user;
      if (user) {
        await addUserToBd(data.email);
      }
      const userFromBd = await getUserFromBd(data.email);
      return userFromBd;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const createNewUserWithGoogle = createAsyncThunk(
  "user/createNewUserWithGoogle",
  async () => {
    try {
      const response = await signInWithGooglePopup();
      const email = response.user.email;
      let userFromBd = null;
      if (email) {
        await addUserToBd(email);
        userFromBd = await getUserFromBd(email);
      }
      return userFromBd;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      throw new Error(errorMessage);
    }
  },
);

type FormFieldsType2 = {
  email: string;
  password: string;
};

export const changeUserWithEmail = createAsyncThunk(
  "user/changeUserWithEmail",
  async (data: FormFieldsType2, { rejectWithValue }) => {
    try {
      await signInAuthUserWithEmailAndPassword(data.email, data.password);
      const userFromBd = await getUserFromBd(data.email);
      return userFromBd;
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const removeUser = createAsyncThunk("user/removeUser", async () => {
  try {
    await signOutUser();
    return null;
  } catch (error) {
    throw new Error("cant remove user");
  }
});

type UserInitialState = {
  status: "idle" | "loading" | "succeeded";
  userData: UserData | null;
  error: string | undefined;
};
const initialState: UserInitialState = {
  status: "idle",
  userData: null,
  error: undefined,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData(
      state,
      action: PayloadAction<{ newUserData: UserData | null }>,
    ) {
      state.userData = action.payload.newUserData;
    },
    setUserError(
      state,
      action: PayloadAction<{ newError: UserInitialState["error"] }>,
    ) {
      state.error = action.payload.newError;
    },

    favoritePostHandler(state, action: PayloadAction<{ favoriteId: number }>) {
      const { favoriteId } = action.payload;
      const favorites = state.userData?.favorites;
      if (favorites && state.userData) {
        const isRecipeInFavorites = favorites.includes(favoriteId);
        if (isRecipeInFavorites) {
          state.userData.favorites = favorites.filter(
            (el) => el !== favoriteId,
          );
          void removeUserFavoriteFromBd(state.userData.email, favoriteId);
        } else if (!isRecipeInFavorites) {
          favorites.push(favoriteId);
          void addUserNewFavoriteToBd(state.userData.email, favoriteId);
        }
      }
    },
    historyPostHandler(
      state,
      action: PayloadAction<{ historyItem: string; typeOfAction: string }>,
    ) {
      const { historyItem, typeOfAction } = action.payload;
      const history = state.userData?.history;
      if (history && state.userData) {
        if (typeOfAction === "remove") {
          state.userData.history = history.filter((el) => el !== historyItem);
          void removeUserHistoryFromBd(state.userData.email, historyItem);
        } else if (typeOfAction === "add") {
          history.push(historyItem);
          void addUserHistoryToBd(state.userData.email, historyItem);
        }
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewUserWithEmailAndPassword.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
        }
      })
      .addCase(createNewUserWithEmailAndPassword.rejected, (state, action) => {
        const errorMessage = getErrorMessage(action.payload);
        state.error = errorMessage;
      })
      .addCase(createNewUserWithGoogle.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
        }
      })
      .addCase(changeUserWithEmail.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
        }
      })
      .addCase(changeUserWithEmail.rejected, (state, action) => {
        if (action.payload) {
          const errorMessage = getErrorMessage(action.payload);
          state.error = errorMessage;
        }
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.userData = null;
      });
  },
});

export default userSlice;

export const {
  setUserData,
  setUserError,
  favoritePostHandler,
  historyPostHandler,
} = userSlice.actions;

export const getUserData = ({ user }: RootState) => {
  return user.userData;
};

export const getUserFavorites = ({ user }: RootState) => {
  if (user?.userData?.favorites) {
    return user.userData.favorites;
  }
  return null;
};

export const getUserHistory = ({ user }: RootState) => {
  if (user?.userData?.history) {
    return user.userData.history;
  }
  return null;
};

export const getUserError = ({ user }: RootState) => {
  return user.error;
};
