import { createSelector } from "reselect";
import { RootState } from "../redux-store";

const getProfile = (state: RootState) => state.profilePage.profile;
const getStatus = (state: RootState) => state.profilePage.status;
const getMyId = (state: RootState) => state.auth.id;

export const getProfileSelector = createSelector(
   [getProfile],
   (profile) => profile
);
export const getStatusSelector = createSelector(
   [getStatus],
   (status) => status
);
export const getMyIdSelector = createSelector([getMyId], (myId) => myId);
