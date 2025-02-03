import { connect } from "react-redux";
import {
   DialogsReducerType,
   sendMessageCreator,
   sendMessageCreatorType,
} from "../../redux/dialogs-reducer";
import Dialogs from "./Dialogs";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { RootState } from "@/redux/redux-store";

type mapStateToPropsType = {
   dialogsPage: DialogsReducerType;
};
type mapStateToDispatchType = {
   sendMessageCreator: (newMessage: string) => sendMessageCreatorType;
};

type TOwnProps = {};

const mapStateToProps = (state: RootState) => {
   return {
      dialogsPage: state.dialogsPage,
   };
};

export default compose(
   connect<mapStateToPropsType, mapStateToDispatchType, TOwnProps, RootState>(
      mapStateToProps,
      { sendMessageCreator }
   ),
   withAuthRedirect
)(Dialogs);
