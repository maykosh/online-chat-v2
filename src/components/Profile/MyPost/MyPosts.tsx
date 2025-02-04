import React from "react";
import css from "./myposts.module.css";
import Post from "./Post/Post";
import {
   SubmitHandler,
   useForm,
   UseFormHandleSubmit,
   UseFormRegister,
} from "react-hook-form";
import { PostType } from "@/redux/profile-reducer";

type PropsType = {
   posts: PostType[];
   addPost: (message: string) => void;
};
type FormData = { message: string };

const MyPosts: React.FC<PropsType> = React.memo((props) => {
   let postElements = props.posts.map((p) => (
      <Post key={p.id} message={p.message} likeCount={p.likeCount} />
   ));

   const { register, handleSubmit } = useForm<FormData>();

   const onSubmitForm: SubmitHandler<FormData> = (data) => {
      props.addPost(data.message);
   };

   return (
      <div className={css.container}>
         my posts
         <MyPostForm
            register={register}
            handleSubmit={handleSubmit}
            onSubmitForm={onSubmitForm}
         />
         <div className={css.posts}>{postElements}</div>
      </div>
   );
});

type MyPostFormType = {
   register: UseFormRegister<FormData>;
   handleSubmit: UseFormHandleSubmit<FormData, undefined>;
   onSubmitForm: SubmitHandler<FormData>;
};

const MyPostForm: React.FC<MyPostFormType> = (props) => {
   const { register, handleSubmit, onSubmitForm } = props;
   return (
      <form className={css.addPost} onSubmit={handleSubmit(onSubmitForm)}>
         <textarea placeholder="enter your message" {...register("message")} />
         <button>add post</button>
      </form>
   );
};

export default MyPosts;
