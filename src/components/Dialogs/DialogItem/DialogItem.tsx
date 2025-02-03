import { NavLink } from "react-router-dom";
import css from "./dialogItem.module.css";
import React from "react";
type IProps = {
   id: number;
   name: string;
};
const DialogsItem: React.FC<IProps> = (props) => {
   return (
      <div className={css.dialog}>
         <NavLink
            to={"/message/" + props.id}
            className={({ isActive }) => (isActive ? css.active : "")}
         >
            {props.name}
         </NavLink>
      </div>
   );
};
export default DialogsItem;
