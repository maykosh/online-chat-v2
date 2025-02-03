import React from "react";
import Header from "./Header";
import { connect } from "react-redux";
import { logoutThunkCreator } from "../../redux/auth-reducer";
import { RootState } from "@/redux/redux-store";

type mapStateToPropsType = {
   isAuth: boolean;
   login: string | null;
};
type mapStateToDispatchType = {
   logoutThunkCreator: () => any;
};
type TOwnProps = {};
type HeaderContainerType = mapStateToPropsType &
   mapStateToDispatchType &
   TOwnProps;

class HeaderContainer extends React.Component<HeaderContainerType> {
   render() {
      return <Header {...this.props} />;
   }
}

const mapStateToProps = (state: RootState) => ({
   isAuth: state.auth.isAuth,
   login: state.auth.login,
});

export default connect<
   mapStateToPropsType,
   mapStateToDispatchType,
   TOwnProps,
   RootState
>(mapStateToProps, { logoutThunkCreator })(HeaderContainer);
