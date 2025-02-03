import React from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
   getStatusProfileThunkCreator,
   getUserProfileThunkCreator,
   savePhotoProfileThunkCreator,
   updateStatusProfileThunkCreator,
} from "../../redux/profile-reducer";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { ProfileType } from "../../types/types";
import { RootState } from "../../redux/redux-store";
import { withRouter } from "../../hoc/withRouter";

type TStateProps = {
   profile: ProfileType | null;
   status: string;
   myId: number | null;
};

type TDispatchProps = {
   getUserProfileThunkCreator: (myId: number) => void;
   getStatusProfileThunkCreator: (myId: number) => void;
   updateStatusProfileThunkCreator: (status: string) => void;
   savePhotoProfileThunkCreator: (file: string) => void;
};
type TOwnProps = {
   userId?: string;
};

type TProfileContainer = TStateProps & TDispatchProps & TOwnProps;

class ProfileContainer extends React.Component<TProfileContainer> {
   componentDidMount() {
      this.fetchUser();
   }
   componentDidUpdate(prevProps: Readonly<TProfileContainer>): void {
      if (prevProps.userId !== this.props.userId) {
         this.fetchUser();
         console.log("render")
      }
   }
   fetchUser = () => {
      const id = this.props.userId
         ? Number(this.props.userId)
         : this.props.myId;
      if (id) {
         this.props.getUserProfileThunkCreator(id);
         this.props.getStatusProfileThunkCreator(id);
      }
   };

   render() {
      return <Profile {...(this.props as TProfileContainer)} />;
   }
}

const mapToStateToProps = (state: RootState): TStateProps => ({
   profile: state.profilePage.profile,
   status: state.profilePage.status,
   myId: state.auth.id,
});

export default compose(
   connect<TStateProps, TDispatchProps, TOwnProps, RootState>(
      mapToStateToProps,
      {
         getUserProfileThunkCreator,
         getStatusProfileThunkCreator,
         updateStatusProfileThunkCreator,
         savePhotoProfileThunkCreator,
      }
   ),
   withAuthRedirect,
   withRouter
)(ProfileContainer);
