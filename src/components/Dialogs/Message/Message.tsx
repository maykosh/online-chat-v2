import css from "./message.module.css";
type IProps = {
   message: string;
};
const Message: React.FC<IProps> = (props) => {
   return (
      <div className={css.message}>
         {props.message}
         <></>
      </div>
   );
};

export default Message;
