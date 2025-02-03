import React from "react";
import css from "./css/users.module.css";
import Preloader from "../common/Preloader/Preloader";
import Paginator from "../common/Paginator/Paginator";
import UserCart from "./UserCart";
import { Item } from "../../types/types";
import { PaginatorType } from "../../redux/paginator-reducer";

type IProps = {
   followHandler: (userId: number) => void;
   unFollowHandler: (userId: number) => void;
   onPageChanged: (pageNumber: number) => void;
   users: Item[];
   pageSize: number;
   totalCount: number;
   currentPage: number;
   isFetching: boolean;
   followingInProgress: number[];
   setPaginator: (paginatorKey: string | number, portionNumber: number) => void;
   paginator: PaginatorType;
};

const Users: React.FC<IProps> = (props) => {
   return (
      <div className={css.container}>
         <Preloader isFetching={props.isFetching} />
         <>
            {props.users?.map((user) => (
               <UserCart
                  key={user.id}
                  user={user}
                  followingInProgress={props.followingInProgress}
                  followHandler={props.followHandler}
                  unFollowHandler={props.unFollowHandler}
               />
            ))}
            <Paginator
               currentPage={props.currentPage}
               onPageChanged={props.onPageChanged}
               totalCount={props.totalCount}
               pageSize={props.pageSize}
               paginatorKey={"usersComponent"}
               paginator={props.paginator}
               onSetPaginator={props.setPaginator}
               portionSize={10}
            />
         </>
      </div>
   );
};

export default Users;
