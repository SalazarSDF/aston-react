// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  User,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayRemove,
  arrayUnion,
} from "firebase/firestore";

//TODO: use from firebase/firestore"
//
//query,
//getDocs,
import type { UserData } from "../features/users/userSlice";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhzehbK3CkgkM_YuJLjW40WnVDGbmXbj4",
  authDomain: "aston-react-db.firebaseapp.com",
  projectId: "aston-react-db",
  storageBucket: "aston-react-db.appspot.com",
  messagingSenderId: "318771214673",
  appId: "1:318771214673:web:e2b042e0cbe0811b40bb70",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const addUserToBd = async (email: string) => {
  const userDocRef = doc(db, "users", email);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        favorites: [],
        history: [],
      });
    } catch {
      throw new Error("Error can't add user");
    }
  }
  return userSnapshot;
};

export const getUserFromBd = async (email: string) => {
  const userDocRef = doc(db, "users", email);

  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const user = userSnapshot.data();
    const userData: UserData = {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      email: user.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      favorites: user.favorites,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      history: user.history,
    };
    return userData;
  }
  return null;
};

export const addUserNewFavoriteToBd = async (
  email: string,
  newFavorite: number,
) => {
  const userDocRef = doc(db, "users", email);

  await updateDoc(userDocRef, {
    favorites: arrayUnion(newFavorite),
  });
};

export const removeUserFavoriteFromBd = async (
  email: string,
  favoriteToRemove: number,
) => {
  const userDocRef = doc(db, "users", email);

  await updateDoc(userDocRef, {
    favorites: arrayRemove(favoriteToRemove),
  });
};


export const addUserHistoryToBd = async (
  uid: string,
  newHistory: UserData["history"],
) => {
  const userDocRef = doc(db, "users", uid);
  try {
    await updateDoc(userDocRef, {
      history: newHistory,
    });
  } catch {
    throw new Error("Error can't add history");
  }
};

//additionalInformation = {} as AdditionalInformation,
export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) {
    return;
  }
  return await signInWithEmailAndPassword(auth, email, password);
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  if (!email || !password) {
    return;
  }
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const getCurrentUser = (): Promise<User | null> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject,
    );
  });
};
