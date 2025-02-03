import React from "react";

const LoginForm = (props) => {
  const { register, handleSubmit, onSubmit } = props;
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email")} 
          type="email" placeholder="email" />
        </div>
        <div>
          <input {...register("password")}  
          type="password" placeholder="пароль" />
        </div>
        <div>
          <input {...register("rememberMe")} 
          type="checkbox"/> запомнить
        </div>
        <div>
          <button type="submit">войти</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
