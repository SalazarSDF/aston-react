import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import {
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  getUserFromBd,
  addUserToBd,
  signOutUser,
} from "../../app/firebase";

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // я не нашел все типы ошибок from firebase, оставлю пока что так.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return rejectWithValue(error.code);
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
      throw new Error("Error When set new user!");
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // я не нашел все типы ошибок from firebase, оставлю пока что так.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return rejectWithValue(error.code);
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
  },

  extraReducers: (builder) => {
    builder
      .addCase(createNewUserWithEmailAndPassword.fulfilled, (state, action) => {
        if (action.payload) {
          state.userData = action.payload;
        }
      })
      .addCase(createNewUserWithEmailAndPassword.rejected, (state, action) => {
        // я не нашел все типы ошибок from firebase, оставлю пока что так.
        state.error = action.payload as string;
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
          // я не нашел все типы ошибок from firebase, оставлю пока что так.
          state.error = action.payload as string;
        }
      })
      .addCase(removeUser.fulfilled, (state) => {
        state.userData = null;
      });
  },
});

export default userSlice;

export const { setUserData, setUserError } = userSlice.actions;

export const getUserData = ({ user }: RootState) => {
  //TODO: remove it's for testing
  //console.log(user.userData);
  return user.userData;
};

export const getUserError = ({ user }: RootState) => {
  return user.error;
};
