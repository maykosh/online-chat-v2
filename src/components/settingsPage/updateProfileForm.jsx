import React from "react";
import css from "./updateProfileForm.module.css";
import userPhoto from "../../assets/img/user-profile-img.png";
import Preloader from "../common/Preloader/Preloader";
const UpdateProfileForm = (props) => {
   const { register, handleSubmit, profile, onSubmit } = props;
   if (!profile) {
      return <Preloader isFetching={!profile} />;
   }
   return (
      <div className={css.container}>
         <div className={css.image}>
            {<img src={profile.photos?.large || userPhoto} alt="" />}
         </div>
         <form onSubmit={handleSubmit(onSubmit)} className={css.info}>
            <div className={css.line}>
               <span className={css.title}>Имя:</span>
               <input {...register("fullName")} required />
            </div>
            <div className={css.line}>
               <span className={css.title}>Обо мне:</span>
               <input {...register("aboutMe")} />
            </div>
            <div className={css.line}>
               <span className={css.title}>Ищу работу:</span>
               <select {...register("lookingForAJob")}>
                  <option value={"true"}>Да</option>
                  <option value={"false"}>Нет</option>
               </select>
            </div>
            <div className={css.line}>
               <span className={css.title}>Описание работы:</span>
               <textarea
                  {...register("lookingForAJobDescription", {
                     required: "This field is required",
                  })}
               ></textarea>
            </div>
            <div className={css.line}>
               <label htmlFor="file-upload">
                  загрузить фото
                  <input
                     type="file"
                     style={{ display: "none" }}
                     {...register("file")}
                     id="file-upload"
                  />
               </label>
            </div>
            <button type="submit">сохранить</button>
         </form>
      </div>
   );
};

export default UpdateProfileForm;
