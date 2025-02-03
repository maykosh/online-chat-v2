import React from "react";
import css from "./myposts.module.css";
import Post from "./Post/Post";
import { useForm } from "react-hook-form";

const MyPosts = React.memo((props) => {
  // debugger
  let postElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likeCount={p.likeCount} />
  ));

  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data) => {
    props.addPost(data.message);
  };

  // const newPostElement = React.createRef();

  // const onAddPost = () => {
  //   props.addPost();
  // };

  // const onPostChange = () => {
  //   let text = newPostElement.current.value;
  //   props.updateNewPostText(text);
  // };

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

const MyPostForm = (props) => {
  const { register, handleSubmit, onSubmitForm } = props;
  return (
    <form className={css.addPost} onSubmit={handleSubmit(onSubmitForm)}>
      <textarea placeholder="enter your message" {...register("message")} />
      <button>add post</button>
    </form>
  );
};

export default MyPosts;
