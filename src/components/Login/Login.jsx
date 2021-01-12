import React from "react";
import { reduxForm } from "redux-form";
import { Input, createField } from "../common/FormControls/FormControls";
import {required } from "../../utils/validators"
import {login} from "../../redux/auth-reducer"
import {connect} from "react-redux"
import {Redirect} from "react-router-dom"
import style from "./../common/FormControls/FormControls.module.css"
import s from "./Login.module.css"
import elipse from "../../assets/images/Elipse.png"

const LoginForm = ({handleSubmit, error, captchaUrl}) => {
  return (
    <div >
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Enter your email address and password to access admin panel</p>
        
        <label> Email address:
        {createField("Email", "email", Input, [required])}
        </label>
        
        <label> Password
        {createField("Password", "password", Input, [required], {type:"password"})}
        </label>
        
        <div className={s.checkbox}>
          {createField(null, "rememberMe", Input, [], {type:"checkbox"})}
          <span>Remember me</span>
        </div>

        {captchaUrl && <img src={captchaUrl} alt="img"/>}
        {captchaUrl && createField("Symbols from image", "captcha", Input, [required])}

        {error && <div className={style.formsummaryError}>{error}</div>}

        <div> <button>Login</button> </div>
      </form>
    </div>
  );
};

const LoginReduxForm = reduxForm({ form: "login" })(LoginForm);

const Login = (props) => {
  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };

  if(props.isAuth){
    return <Redirect to={"/profile"}/>
  }

  return (
    <div className={s.loginform_wrapper}>
      <img src={elipse} alt="elipse"/>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth
})

export default connect(mapStateToProps, {login})(Login);
