import { useForm } from "react-hook-form";

import { useSelector } from "react-redux";

import { useAppDispatch } from "../app/store";
import {
  changeUserWithEmail,
  createNewUserWithGoogle,
  getUserError,
} from "../features/users/userSlice";
import Modal from "../widgets/modal";

import "./sign-in-page.css";

export type FormFieldsType = {
  email: string;
  password: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFieldsType>();
  const dispatch = useAppDispatch();

  function logInUserWithGoogle() {
    void dispatch(createNewUserWithGoogle());
  }

  function onSubmit(data: FormFieldsType) {
    void dispatch(changeUserWithEmail(data));
    reset();
  }

  const signInError = useSelector(getUserError);

  return (
    <div className="sign-up-form__container">
      <h2 className="sign-up-form__heading">I already have an account</h2>
      <span>Sign in with your email and password</span>
      {/* I don't know how to fix this*/}
      <form className="sign-in-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            type="email"
            required
            {...register("email", { required: "email is required" })}
          />
          Email
        </label>
        {errors.email?.type === "required" && (
          <p role="alert">{errors.email.message}</p>
        )}
        <label>
          <input
            type="password"
            {...register("password", {
              required: "password is required",
              minLength: 6,
            })}
          />
          Password
        </label>
        {errors.password?.type === "required" && (
          <p role="alert">{errors.password.message}</p>
        )}
        {errors.password?.type === "minLength" && (
          <p role="alert">Min length 6!</p>
        )}
        <input type="submit" />
      </form>
      <button onClick={() => void logInUserWithGoogle()}>
        Sign In with Google
      </button>

      {signInError && <Modal />}
    </div>
  );
}
