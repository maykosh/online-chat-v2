import css from "./post.module.css";
const Post = (props) => {
  return (
    <div className={css.container}>
      <div className={css.title}>
        <img
          src="https://static.vecteezy.com/vite/assets/photo-masthead-375-BoK_p8LG.webp"
          alt=""
        />
        <span>author</span>
      </div>
      <div className={css.texts}>
        <span className={css.text}>{props.message}</span>
        <span className={css.text}>{props.likeCount}</span>
      </div>
    </div>
  );
};

export default Post;
