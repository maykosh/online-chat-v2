import css from "./dialogs.module.css";
import DialogsItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {
   SubmitHandler,
   useForm,
   UseFormHandleSubmit,
   UseFormRegister,
} from "react-hook-form";
import {
   DialogsReducerType,
   sendMessageCreatorType,
} from "@/redux/dialogs-reducer";
import React from "react";

type IProps = {
   dialogsPage: DialogsReducerType;
   sendMessageCreator: (newMessage: string) => sendMessageCreatorType;
};

const Dialogs: React.FC<IProps> = (props) => {
   // debugger;
   const dialogsElement = props.dialogsPage.dialogsData.map((dialog) => (
      <DialogsItem key={dialog.id} id={dialog.id} name={dialog.name} />
   ));

   const messagesElement = props.dialogsPage.messagesData.map((message) => (
      <Message key={message.id} message={message.message} />
   ));

   const { register, handleSubmit } = useForm<{ message: string }>();

   const onSubmitForm: SubmitHandler<{ message: string }> = (data) => {
      props.sendMessageCreator(data.message);
   };
   return (
      <div className={css.container}>
         <div className={css.dialogs}>{dialogsElement}</div>
         <div className={css.messages}>
            <div>{messagesElement}</div>
            {
               <AddMessageForm
                  register={register}
                  handleSubmit={handleSubmit}
                  onSubmitForm={onSubmitForm}
               />
            }
         </div>
      </div>
   );
};
type AddMessageFormType = {
   register: UseFormRegister<{ message: string }>;
   handleSubmit: UseFormHandleSubmit<{ message: string }>;
   onSubmitForm: (data: { message: string }) => void;
};
const AddMessageForm: React.FC<AddMessageFormType> = (props) => {
   const { register, handleSubmit, onSubmitForm } = props;
   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <textarea placeholder="enter your message" {...register("message")} />
         <button>send</button>
      </form>
   );
};

export default Dialogs;
