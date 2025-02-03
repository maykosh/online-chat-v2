import { connect } from "react-redux";
import {
  sendMessageCreator,
  // updateNewMessageTextCreator,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";

const mapStateToProps = (state) => {
  return {
    dialogsPage: state.dialogsPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onNewMessageChange: (newMessage) => {
    //   dispatch(updateNewMessageTextCreator(newMessage));
    // },
    onSendMessageClick: (newMessage) => {
      dispatch(sendMessageCreator(newMessage));
    },
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withAuthRedirect
)(Dialogs);
