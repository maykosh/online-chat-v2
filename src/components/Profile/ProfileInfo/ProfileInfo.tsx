import css from "./css/profileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import userPhoto from "../../../assets/img/user-profile-img.png";
import { useParams } from "react-router-dom";
import {  ProfileType } from "../../../types/types";

type TProps = {
  profile: ProfileType | null
  status: string
  updateStatusProfileThunkCreator: (status: string) => void
  userId: number | null
  savePhoto: (file: any) => void
}

const ProfileInfo: React.FC<TProps> = (props) => {
  const { userId } = useParams();

  if (!props.profile) {
    return <Preloader isFetching={!props.profile} />;
  }

  const onChangePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
   const files =  e.target.files
    if (files?.length) {
      props.savePhoto({large: files[0]});
    }
  };

  return (
    <div className={css.container}>
      <div className={css.image}>
        {<img src={props.profile.photos?.large || userPhoto} alt="" />}
      </div>
      <div className={css.info}>
        <div className={css.line}>
          <div className={css.smallImage}>
            {<img src={props.profile.photos?.small || userPhoto} alt="" />}
            <ProfileStatus
              updateStatusProfileThunkCreator={
                props.updateStatusProfileThunkCreator
              }
              status={props.status}
            />
          </div>
          <span className={css.title}>Имя:</span>
          <span>{props.profile.fullName}</span>
        </div>
        <div className={css.line}>
          <span className={css.title}>Обо мне:</span>
          <span>{props.profile.aboutMe}</span>
        </div>
        <div className={css.line}>
          <span className={css.title}>Ищу работу:</span>
          <span>{props.profile.lookingForAJob ? "да" : "нет"}</span>
        </div>
        <div className={css.line}>
          <span className={css.title}>Описание работы:</span>
          <span>{props.profile.lookingForAJobDescription}</span>
        </div>
        {!userId && (
          <div className={css.line}>
            <input type="file" onChange={(e) => onChangePhoto(e)} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileInfo;
