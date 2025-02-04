import { RootState } from "@/redux/redux-store";
import { PostType, profileActions } from "../../../redux/profile-reducer";
import MyPosts from "./MyPosts";
import { connect } from "react-redux";

type mapStateToPropsType = {
   posts: PostType[];
};
type mapDispatchToPropsType = {
   addPost: (message: string) => void;
};
type TOwnProps = {};

const mapStateToProps = (state: RootState) => {
   return {
      posts: state.profilePage.posts,
   };
};

const MyPostsContainer = connect<
   mapStateToPropsType,
   mapDispatchToPropsType,
   TOwnProps,
   RootState
>(mapStateToProps, {
   addPost: profileActions.addPostCreator,
})(MyPosts);

export default MyPostsContainer;
