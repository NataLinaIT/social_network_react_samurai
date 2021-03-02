const SEND_MESSAGE = "SEND-MESSAGE";

type DialogType = {
  id: number
  name: string
}

type MessagesType = {
  id: number
  message: string
  owner: boolean
}

let initialState = {
  dialogs: [
    { id: 1, name: "Max" },
    { id: 2, name: "Andy" },
    { id: 3, name: "Alex" },
    { id: 4, name: "Vikky" },
    { id: 5, name: "John" },
  ] as Array<DialogType>,
  messages: [
    { id: 1, message: "Hello, Vikky!", owner: true },
    { id: 2, message: "Hello! How are you? :)", owner: false },
    { id: 3, message: "All great! Let’s meet for coffee?!", owner: true },
    { id: 4, message: "I'm free tonight after 6 p.m. Is it fine for you?", owner: false },
  ] as Array<MessagesType>,
  newMessageBody: " ",
}

type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SEND_MESSAGE:
      let body = action.newMessageBody;
      return {
        ...state,
        newMessageBody: " ",
        messages: [...state.messages, { id: 6, message: body, owner: true }],
      };
    default:
      return state;
  }
};

type SendMessageCreatorActionType ={
  type: typeof SEND_MESSAGE
  newMessageBody: string
}

export const sendMessageCreator = (newMessageBody: string): SendMessageCreatorActionType => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
