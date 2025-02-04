import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HeaderContainer from "./components/Header/HeaderContainer";
import React from "react";
import { connect, Provider } from "react-redux";
import { authMeThunkCreator } from "./redux/auth-reducer";
import { withSuspens } from "./hoc/withSuspens";
import store from "./redux/redux-store";
import UpdateProfileContainer from "./components/settingsPage/updateProfileContainer";
import { SnackbarProvider } from "notistack";
import UsersContainer from "./components/Users/UsersContainer";

const DialogsContainer = React.lazy(() => import("./components/Dialogs/DialogContainer"));
const ProfileContainerHook = React.lazy(() =>import("./components/Profile/ProfileContainer"));
const Login = React.lazy(() => import("./components/Login/Login"));

const DialogsContainerWithSuspens = withSuspens(DialogsContainer);
const ProfileContainerWithSuspens = withSuspens(ProfileContainerHook);
const LoginWithSuspens = withSuspens(Login);

interface IProps{
  authMeThunkCreator: () => void
}

class App extends React.Component<IProps> {
  componentDidMount() {
    this.props.authMeThunkCreator();
  }

  render() {
    return (
        <div className="App">
            <HeaderContainer />
        <div className="navbar">
          <Navbar />
        </div>
        <div className="app-content">
          <Routes>
            <Route path="/" element={<div>welcome</div>}/>
            <Route
              path={"/message/*"}
              element={<DialogsContainerWithSuspens />}
            />
            <Route
              index
              path={"/profile/:userId?"}
              element={<ProfileContainerWithSuspens />}
            />
            <Route path={"/users"} element={<UsersContainer />} />
            <Route path={"/login"} element={<LoginWithSuspens />} />
            <Route path={"/settings"} element={<UpdateProfileContainer/>}/>
            <Route path="*" element={<div>page not found 404</div>}/>
          </Routes>
        </div>
      </div>
    );
  }
}

const AppContainer = connect(null, { authMeThunkCreator })(App);

const AppProvider = () => (
  <BrowserRouter>
    <SnackbarProvider maxSnack={3}>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </SnackbarProvider>
  </BrowserRouter>
);
export default AppProvider;
