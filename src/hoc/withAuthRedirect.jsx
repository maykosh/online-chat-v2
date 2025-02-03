import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

// HOC - (HIGH ORDER COMPONENT)
export const withAuthRedirect = (Component) => {
  class RedirectComponent extends React.Component {
    render() {
      if (!this.props.isAuth) return <Navigate to={"/login"} replace />;
      return <Component {...this.props} />;
    }
  }

  const mapToStateToPropsForRiderect = (state) => ({
    isAuth: state.auth.isAuth,
  });
  
  const AuthRedirectContainerComponent = connect(mapToStateToPropsForRiderect)(
    RedirectComponent
  );

  return AuthRedirectContainerComponent;
};
