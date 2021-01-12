const SEND_MESSAGE = "SEND-MESSAGE";

let initialState = {
  dialogs: [
    { id: "1", name: "Max" },
    { id: "2", name: "Andy" },
    { id: "3", name: "Alex" },
    { id: "4", name: "Vikky" },
    { id: "5", name: "John" },
  ],
  messages: [
    { id: "1", message: "Hello, Vikky!", owner: true },
    { id: "2", message: "Hello! How are you? :)", owner: false },
    { id: "3", message: "All great! Let’s meet for coffee?!", owner: true },
    { id: "4", message: "I'm free tonight after 6 p.m. Is it fine for you?", owner: false },
  ],
};

const dialogsReducer = (state = initialState, action) => {
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

export const sendMessageCreator = (newMessageBody) => ({
  type: SEND_MESSAGE,
  newMessageBody,
});

export default dialogsReducer;
