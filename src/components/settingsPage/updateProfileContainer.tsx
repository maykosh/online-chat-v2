import React, { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
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
import { ProfileType } from "@/types/types";
import { RootState } from "@/redux/redux-store";

type mapStateToPropsType = {
   profile: ProfileType | null;
   myId: number | null;
};
type mapStateToDispatchType = {
   getUserProfileThunkCreator: (myId: number) => void;
   updateProfileThunkCreator: (data: FormData) => void;
};
type TOwnProps = {};
type FormData = ProfileType;
type UpdateProfileContainerType = mapStateToPropsType &
   mapStateToDispatchType &
   TOwnProps;
   
const UpdateProfileContainer: React.FC<UpdateProfileContainerType> = (
   props
) => {
   const {
      myId,
      profile,
      getUserProfileThunkCreator,
      updateProfileThunkCreator,
   } = props;

   const { enqueueSnackbar } = useSnackbar();

   const { register, handleSubmit, reset } = useForm<FormData>({
      defaultValues: {
         fullName: "",
         aboutMe: "",
         lookingForAJob: false,
         contacts: {},
         lookingForAJobDescription: "",
         photos: {},
      },
   });

   const onSubmit: SubmitHandler<FormData> = useCallback(
      async (data) => {
         try {
            updateProfileThunkCreator(data);
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

const mapStateToProps = (state: RootState) => ({
   profile: getProfileSelector(state),
   myId: getMyIdSelector(state),
});

export default compose(
   connect<mapStateToPropsType, mapStateToDispatchType, TOwnProps, RootState>(
      mapStateToProps,
      {
         getUserProfileThunkCreator,
         updateProfileThunkCreator,
      }
   ),
   withAuthRedirect
)(UpdateProfileContainer);
