import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import UpdateProfileForm from "./updateProfileForm";
import {
   getUserProfileThunkCreator,
   updateProfileThunkCreator,
} from "../../redux/profile-reducer";
import {
   getMyIdSelector,
   getProfileSelector,
} from "../../redux/selectors/profile-selector";
import { useSnackbar } from "notistack";
import { compose } from "redux";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";

const UpdateProfileContainer = (props) => {
   const {
      myId,
      profile,
      getUserProfileThunkCreator,
      updateProfileThunkCreator,
   } = props;

   const { enqueueSnackbar } = useSnackbar();

   const { register, handleSubmit, reset } = useForm({
      defaultValues: {
         fullName: "",
         aboutMe: "",
         lookingForAJob: false,
         contacts: {},
         lookingForAJobDescription: "",
      },
   });

   const onSubmit = useCallback(
      async (data) => {
         try {
            await updateProfileThunkCreator(data);
            enqueueSnackbar("Profile updated successfully", {
               variant: "success",
            });
         } catch (error) {
            enqueueSnackbar("Error updating profile", { variant: "error" });
         }
      },
      [updateProfileThunkCreator]
   );

   useEffect(() => {
      if (myId) {
         getUserProfileThunkCreator(myId);
      }
   }, [getUserProfileThunkCreator, myId]);

   useEffect(() => {
      if (profile) {
         reset({
            fullName: profile.fullName || "",
            aboutMe: profile.aboutMe || "",
            lookingForAJob: profile.lookingForAJob || false,
            contacts: profile.contacts || {},
            lookingForAJobDescription: profile.lookingForAJobDescription || "",
         });
      }
   }, [profile, reset]);

   return (
      <>
         <UpdateProfileForm
            register={register}
            handleSubmit={handleSubmit}
            profile={profile}
            onSubmit={onSubmit}
         />
      </>
   );
};

const mapStateToProps = (state) => ({
   profile: getProfileSelector(state),
   myId: getMyIdSelector(state),
});

export default compose(
   connect(mapStateToProps, {
      getUserProfileThunkCreator,
      updateProfileThunkCreator,
   }),
   withAuthRedirect
)(UpdateProfileContainer);
