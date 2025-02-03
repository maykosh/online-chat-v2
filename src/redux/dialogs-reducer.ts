//action type
const SEND_MESSAGE = "dialogsReducer/SEND-MESSAGE";

type messageType ={
   id: number
   message: string
}
type dialogType ={
   id: number
   name: string
}

const initialState = {
   messagesData: [
      { id: 1, message: "hello" },
      { id: 2, message: "bye" },
      { id: 3, message: "qalay" },
      { id: 4, message: "ok" },
   ] as Array<messageType>,

   dialogsData: [
      { id: 1, name: "Salamat" },
      { id: 2, name: "Andrey" },
      { id: 3, name: "Sveta" },
      { id: 4, name: "Sasha" },
   ] as Array<dialogType>,
};
export type DialogsReducerType =  typeof initialState;

//reducers
const dialogsReducer = (state: DialogsReducerType = initialState, action: ActionType):DialogsReducerType => {
   switch (action.type) {
      case SEND_MESSAGE: {
         let message = action.payload;
         return {
            ...state,
            messagesData: [
               ...state.messagesData,
               { id: Date.now(), message: message },
            ],

         };
      }
      default:
         return state;
   }
};


type ActionType = sendMessageCreatorType
//action creators
export type sendMessageCreatorType = {
   type: typeof SEND_MESSAGE
   payload: string
}
export const sendMessageCreator = (newMessage: string):sendMessageCreatorType => ({
   type: SEND_MESSAGE,
   payload: newMessage,
});

export default dialogsReducer;
