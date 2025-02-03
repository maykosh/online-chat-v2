import css from "./dialogs.module.css";
import DialogsItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { useForm } from "react-hook-form";

const Dialogs = (props) => {
  // debugger;
  const dialogsElement = props.dialogsPage.dialogsData.map((dialog) => (
    <DialogsItem key={dialog.id} id={dialog.id} name={dialog.name} />
  ));

  const messagesElement = props.dialogsPage.messagesData.map((message) => (
    <Message key={message.id} message={message.message} />
  ));

  const { register, handleSubmit } = useForm();

  // const newMessageText = props.dialogsPage.newMessageText;

  // const onSendMessageClick = () => {
  //   props.onSendMessageClick();
  // };

  // const onNewMessageChange = (e) => {
  //   let newMessage = e.target.value;
  //   props.onNewMessageChange(newMessage);
  // };

  const onSubmitForm = (data) => {
    props.onSendMessageClick(data.message);
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

const AddMessageForm = (props) => {
  const { register, handleSubmit, onSubmitForm } = props;
  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <textarea placeholder="enter your message" {...register("message")} />
      <button>send</button>
    </form>
  );
};

export default Dialogs;
