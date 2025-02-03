import React from "react";
import LoginForm from "./LoginForm";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    props.loginThunkCreator(data.email, data.password, data.rememberMe);
  };

  if (props.isAuth) {
    return <Navigate to={"/profile"} replace />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginForm
        register={register}
        handleSubmit={handleSubmit}
        formState={errors}
        onSubmit={onSubmit}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { loginThunkCreator })(Login);
