import React from "react";
import {
   FieldErrors,
   SubmitHandler,
   UseFormHandleSubmit,
   UseFormRegister,
} from "react-hook-form";
import { FormData } from "./types";

interface IProps {
   register: UseFormRegister<FormData>;
   handleSubmit: UseFormHandleSubmit<FormData, undefined>;
   onSubmit: SubmitHandler<FormData>;
   formState: FieldErrors<FormData>;
}

const LoginForm: React.FC<IProps> = (props) => {
   const { register, handleSubmit, onSubmit } = props;
   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <div>
               <input {...register("email")} type="email" placeholder="email" />
            </div>
            <div>
               <input
                  {...register("password")}
                  type="password"
                  placeholder="пароль"
               />
            </div>
            <div>
               <input {...register("rememberMe")} type="checkbox" /> запомнить
            </div>
            <div>
               <button type="submit">войти</button>
            </div>
         </form>
      </>
   );
};

export default LoginForm;
