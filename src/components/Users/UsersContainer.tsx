import React from "react";
import { connect } from "react-redux";
import {
   getUsersThunkCreator,
   followThunkCreator,
   unFollowThunkCreator,
} from "../../redux/users-reducer";
import Users from "./Users";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import {
   getCurrentPage,
   getFollowingInProgress,
   getIsFetching,
   getPageSize,
   getTotalCount,
   getUsers,
} from "../../redux/selectors/users-selectors";
import { PaginatorType, setPaginator } from "../../redux/paginator-reducer";
import { Item } from "../../types/types";
import { RootState } from "../../redux/redux-store";

type mapStateToPropsType = {
   users: Item[];
   pageSize: number;
   totalCount: number;
   currentPage: number;
   isFetching: boolean;
   followingInProgress: number[];
   paginator: PaginatorType;
};

type mapStateToDispatchType = {
   getUsersThunkCreator: (currentPage: number, pageSize: number) => void;
   followThunkCreator: (userId: number) => void;
   unFollowThunkCreator: (userId: number) => void;
   setPaginator: (paginatorKey: string | number, portionNumber: number) => void;
};
type TOwnProps = {};

type UsesContainerType = mapStateToPropsType &
   mapStateToDispatchType &
   TOwnProps;

class UsersContainer extends React.Component<UsesContainerType> {
   componentDidMount() {
      this.props.getUsersThunkCreator(
         this.props.currentPage,
         this.props.pageSize
      );
   }

   unFollowHandler = (userId: number) => {
      this.props.unFollowThunkCreator(userId);
   };

   followHandler = (userId: number) => {
      this.props.followThunkCreator(userId);
   };

   onPageChanged = (pageNumber: number) => {
      this.props.getUsersThunkCreator(pageNumber, this.props.pageSize);
   };

   render() {
      return (
         <Users
            followHandler={this.followHandler}
            unFollowHandler={this.unFollowHandler}
            onPageChanged={this.onPageChanged}
            users={this.props.users}
            pageSize={this.props.pageSize}
            totalCount={this.props.totalCount}
            currentPage={this.props.currentPage}
            isFetching={this.props.isFetching}
            followingInProgress={this.props.followingInProgress}
            setPaginator={this.props.setPaginator}
            paginator={this.props.paginator}
         />
      );
   }
}

const mapStateToProps = (state: RootState) => {
   return {
      users: getUsers(state),
      pageSize: getPageSize(state),
      totalCount: getTotalCount(state),
      currentPage: getCurrentPage(state),
      isFetching: getIsFetching(state),
      followingInProgress: getFollowingInProgress(state),
      paginator: state.paginator,
   };
};

export default compose(
   connect<mapStateToPropsType, mapStateToDispatchType, TOwnProps, RootState>(
      mapStateToProps,
      {
         getUsersThunkCreator,
         followThunkCreator,
         unFollowThunkCreator,
         setPaginator,
      }
   ),
   withAuthRedirect
)(UsersContainer);
