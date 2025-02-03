// import React from "react";
// import css from "./users.module.css";
// import Preloader from "../common/Preloader/Preloader";
// import Paginator from "../common/Paginator/Paginator";
// import UserCart from "./UserCart";
// import { useAppSelector } from "../../hooks/useAppSelector";
// import {
//    followThunkCreator,
//    getUsersThunkCreator,
//    unFollowThunkCreator,
// } from "../../redux/users-reducer";
// import { useAppDispatch } from "../../hooks/useAppDispatch";
// import { setPaginator } from "../../redux/paginator-reducer";
// import { withAuthRedirect } from "../../hoc/withAuthRedirect";

// const UsersFC = () => {
//    const {
//       users,
//       pageSize,
//       totalCount,
//       currentPage,
//       isFetching,
//       followingInProgress,
//       paginatorKey,
//    } = useAppSelector((state) => state.usersPage);
//    const isMounted = React.useRef(false)
//    const paginator = useAppSelector((state) => state.paginator);
//    const dispatch = useAppDispatch();

//    const unFollowHandler = React.useCallback((userId:number) => {
//       dispatch(unFollowThunkCreator(userId));
//    }, [dispatch]);
   
//    const followHandler = React.useCallback((userId: number) => {
//       dispatch(followThunkCreator(userId));
//    }, [dispatch]);

//    const onPageChanged = (pageNumber: number) => {
//       dispatch(getUsersThunkCreator(pageNumber, pageSize));
//    }

//    const onSetPaginator = React.useCallback((paginatorKey: string| number, portionNumber: number) => {
//       dispatch(setPaginator(paginatorKey, portionNumber));
//    }, [dispatch])

//    React.useEffect(() => {
//       if(!isMounted.current && users.length === 0) dispatch(getUsersThunkCreator(currentPage, pageSize));
//       isMounted.current = true
//    }, [currentPage, pageSize, dispatch, users.length]);
//    return (
//       <div className={css.container}>
//          <Preloader isFetching={isFetching} />
//          <>
//             {users?.map((user) => (
//                <UserCart
//                   key={user.id}
//                   user={user}
//                   followingInProgress={followingInProgress}
//                   followHandler={followHandler}
//                   unFollowHandler={unFollowHandler}
//                />
//             ))}
//             <Paginator
//                currentPage={currentPage}
//                onPageChanged={onPageChanged}
//                totalCount={totalCount}
//                pageSize={pageSize}
//                paginatorKey={paginatorKey}
//                paginator={paginator}
//                onSetPaginator={onSetPaginator} portionSize={10} />
//          </>
//       </div>
//    );
// };

// export default withAuthRedirect(UsersFC);
