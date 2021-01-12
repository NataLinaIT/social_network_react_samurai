import profileReduser from "./profile-reduser";
import dialogsReduser from "./dialogs-reduser";

let store = {
  _state: {
    profilePage: {
      posts: [
        { id: 1, message: "Hi, how are you?", likesCount: 0 },
        { id: 2, message: "It's my first post", likesCount: 20 },
      ],
      newPostText: "Add post",
    },
    dialogsPage: {
      dialogs: [
        { id: "1", name: "Max" },
        { id: "2", name: "Andy" },
        { id: "3", name: "Alex" },
        { id: "4", name: "Vikky" },
        { id: "5", name: "John" },
      ],
      message: [
        { id: "1", message: "Hi" },
        { id: "2", message: "How are you?" },
        { id: "3", message: "Yo" },
        { id: "4", message: "Yo" },
        { id: "5", message: "Yo" },
      ],
      newMessageBody: "",
    },
  },
  _callSubscriber() {
    console.log("State changed");
  },

  getState() {
    return this._state;
  },
  subscribe(observer) {
    this._callSubscriber = observer;
  },

  dispatch(action) {
    this._state.profilePage = profileReduser(this._state.profilePage, action);
    this._state.dialogsPage = dialogsReduser(this._state.dialogsPage, action);

    this._callSubscriber(this._state);
  },
};

export default store;
window.store = store;
