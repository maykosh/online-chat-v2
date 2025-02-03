import React from "react";
import { NavLink } from "react-router-dom";
import css from "./css/users.module.css";
import userImage from "../../assets/img/user-profile-img.png";
import { Item } from "../../types/types";

interface IProps {
   user: Item;
   followingInProgress: number[];
   followHandler: any;
   unFollowHandler: any;
}

const UserCart: React.FC<IProps> = React.memo(
   ({ user, followingInProgress, followHandler, unFollowHandler }) => {
      return (
         <div key={user.id} className={css.user}>
            <div className={css.image}>
               <img
                  src={user.photos.small ? user.photos.small : userImage}
                  alt="фото пользователя"
               />
            </div>
            <div className={css.info}>
               <div className={css.fullName}>
                  <NavLink to={`/profile/${user.id}`}>{user.name}</NavLink>
               </div>
               <div className={css.status}>{user.status}</div>
            </div>
            <div className={css.btn}>
               {user.followed ? (
                  <button
                     disabled={followingInProgress.some((id) => id === user.id)}
                     onClick={() => {
                        unFollowHandler(user.id);
                     }}
                  >
                     unfollow
                  </button>
               ) : (
                  <button
                     disabled={followingInProgress.some((id) => id === user.id)}
                     onClick={() => {
                        followHandler(user.id);
                     }}
                  >
                     follow
                  </button>
               )}
            </div>
         </div>
      );
   }
);

export default UserCart;
