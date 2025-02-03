import { createSelector } from "reselect";
import { RootState } from "../redux-store";

//selectors
const getUsersSelector = (state: RootState) => state.usersPage.users;
export const getPageSize = (state: RootState) => state.usersPage.pageSize;
export const getTotalCount = (state: RootState) => state.usersPage.totalCount;
export const getCurrentPage = (state: RootState) => state.usersPage.currentPage;
export const getIsFetching = (state: RootState) => state.usersPage.isFetching;
export const getFollowingInProgress = (state: RootState) =>
   state.usersPage.followingInProgress;

//reselect
export const getUsers = createSelector([getUsersSelector], (user) => {
   return user.filter((u) => true);
});
