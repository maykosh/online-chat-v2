import React from "react";
import LoginForm from "./LoginForm";
import { SubmitHandler, useForm } from "react-hook-form";
import { connect } from "react-redux";
import { loginThunkCreator } from "../../redux/auth-reducer";
import { Navigate } from "react-router-dom";
import { RootState } from "@/redux/redux-store";
import { FormData } from "./types";

type mapStateToPropsType = {
   isAuth: boolean;
};
type mapDispatchToPropsType = {
   loginThunkCreator: (
      email: string,
      password: string,
      rememberMe: boolean
   ) => void;
};
type TOwnProps = {};
type LoginPropsType = mapStateToPropsType & mapDispatchToPropsType & TOwnProps;

const Login: React.FC<LoginPropsType> = (props) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FormData>();

   const onSubmit: SubmitHandler<FormData> = (data) => {
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

const mapStateToProps = (state: RootState) => ({
   isAuth: state.auth.isAuth,
});

export default connect<
   mapStateToPropsType,
   mapDispatchToPropsType,
   TOwnProps,
   RootState
>(mapStateToProps, { loginThunkCreator })(Login);
