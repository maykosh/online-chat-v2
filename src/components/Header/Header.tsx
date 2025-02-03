import { NavLink } from "react-router-dom";
import css from "./header.module.css";
import React from "react";
type IProps = {
   isAuth: boolean;
   login: string | null;
   logoutThunkCreator: () => any;
};
const Header: React.FC<IProps> = (props) => {
   return (
      <div className={css.container}>
         <h1>logo</h1>
         <div className={css.login}>
            {props.isAuth ? (
               <div>
                  <span>{props.login}</span>
                  <button onClick={props.logoutThunkCreator}>logout</button>
               </div>
            ) : (
               <NavLink to={"/login"}>Login</NavLink>
            )}
         </div>
      </div>
   );
};

export default Header;
