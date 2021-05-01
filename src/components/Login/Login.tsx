import React from "react";
import { InjectedFormProps, reduxForm } from "redux-form";
import {
  createField,
  GetStringKeys,
  Input,
} from "../common/FormControls/123";
import { required } from "../../utils/validators";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import style from "../common/FormControls/FormControls.module.css";
import s from "./Login.module.css";
import elipse from "../../assets/images/Elipse.png";
import { AppStateType } from "../../redux/redux-store";

type LoginFormOwnProps = {
  captchaUrl: string | null;
};

const LoginForm: React.FC<
  InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <p>Enter your email address and password to access admin panel</p>
        <label>
          Email address:
          {createField<LoginFormValuesTypeKeys>(
            "Email",
            "email",
            [required],
            Input
          )}
        </label>
        <label>
          Password
          {createField<LoginFormValuesTypeKeys>(
            "Password",
            "password",
            [required],
            Input,
            { type: "password" }
          )}
        </label>
        <div className={s.checkbox}>
          {createField<LoginFormValuesTypeKeys>(
            undefined,
            "rememberMe",
            [],
            Input,
            { type: "checkbox" }
          )}
          <span>Remember me</span>
        </div>
        {captchaUrl && <img src={captchaUrl} alt="captcha" />}
        {captchaUrl &&
          createField<LoginFormValuesTypeKeys>(
            "Symbols from image",
            "captcha",
            [required],
            Input,
            {}
          )}

        {error && <div className={style.formSummaryError}>{error}</div>}
        <div>
          <button>Login</button>
        </div>
      </form>
    </div>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

export type LoginFormValuesType = {
  captcha: string;
  rememberMe: boolean;
  password: string;
  email: string;
};

type LoginFormValuesTypeKeys = GetStringKeys<LoginFormValuesType>;

export const LoginPage: React.FC = () => {
  const captchaUrl = useSelector(
    (state: AppStateType) => state.auth.captchaUrl
  );
  const isAuth = useSelector((state: AppStateType) => state.auth.isAuth);
  const dispatch = useDispatch();

  const onSubmit = (formData: LoginFormValuesType) => {
    dispatch(
      login(
        formData.email,
        formData.password,
        formData.rememberMe,
        formData.captcha
      )
    );
  };

  if (isAuth) {
    return <Redirect to={"/profile"} />;
  }

  return (
    <div className={s.loginform_wrapper}>
      <img src={elipse} alt="elipse" />

      <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
  );
};
