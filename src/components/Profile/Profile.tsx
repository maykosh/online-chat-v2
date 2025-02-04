import React from "react";
import MyPostsContainer from "./MyPost/MyPostContainer";
import css from "./profile.module.css";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import { Photos, ProfileType } from "../../types/types";

interface IProps {
   profile: ProfileType | null;
   status: string;
   updateStatusProfileThunkCreator: (status: string) => void;
   myId: number | null;
   savePhotoProfileThunkCreator: (file: Photos) => void;
}

const Profile: React.FC<IProps> = (props) => {
   return (
      <div className={css.container}>
         <ProfileInfo
            profile={props.profile}
            status={props.status}
            updateStatusProfileThunkCreator={
               props.updateStatusProfileThunkCreator
            }
            userId={props.myId}
            savePhoto={props.savePhotoProfileThunkCreator}
         />
         <MyPostsContainer />
      </div>
   );
};

export default Profile;
