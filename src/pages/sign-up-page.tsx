import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

import { useAppDispatch } from "../app/store";

import {
  createNewUserWithEmailAndPassword,
  getUserError,
} from "../features/users/userSlice";
import "./sign-up-page.css";
import Modal from "../widgets/modal";
export type FormFieldsType = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function isPasswordsEqual(_: string, formValues: FormFieldsType) {
  return (
    formValues.password === formValues.confirmPassword ||
    "passwords should be equal!"
  );
}

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormFieldsType>();

  const dispatch = useAppDispatch();
  function onSubmit(data: FormFieldsType) {
    void dispatch(createNewUserWithEmailAndPassword(data));
    reset();
  }

  const signUpError = useSelector(getUserError);
  return (
    <div className="sign-up-form__container">
      <h2 className="sign-up-form__heading">Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      {/* I don't know how to fix this error*/}
      <form className="sign-up-form" onSubmit={handleSubmit(onSubmit)}>
        <label>
          <input
            type="text"
            required
            {...register("displayName", { required: "name is required" })}
          />
          Display Name
        </label>
        {errors.displayName?.type === "required" && (
          <p role="alert">{errors.displayName.message}</p>
        )}
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
        <label>
          <input
            type="password"
            required
            {...register("confirmPassword", {
              required: "confirm password",
              validate: isPasswordsEqual,
            })}
          />
          Confirm Password
        </label>
        {errors.confirmPassword?.type === "required" && (
          <p role="alert">{errors.confirmPassword.message}</p>
        )}
        {errors.confirmPassword?.type === "validate" && (
          <p className="alert" role="alert">
            {errors.confirmPassword.message}
          </p>
        )}
        <input type="submit" />
      </form>
      {signUpError && <Modal />}
    </div>
  );
}
