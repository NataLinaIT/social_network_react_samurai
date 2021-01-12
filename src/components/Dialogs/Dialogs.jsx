import React from "react";
import s from "./Dialogs.module.css";
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import {reduxForm, Field} from "redux-form";
import { Textarea } from "../common/FormControls/FormControls";
import { required, maxLengthCreator } from "../../utils/validators";

const maxLength10 = maxLengthCreator(100);

const Dialogs = (props) => {
  let state = props.dialogsPage;

  let dialogsElements = state.dialogs.map((dialog, index) => (
    <DialogItem id={dialog.id} name={dialog.name} key={index}  />
  ));

  let messagesElements = state.messages.map((mess, index) => (
    <Message message={mess.message} key={index} owner={mess.owner}/>
  ));

  let addNewMessage = (values) => {
    props.sendMessage(values.newMessageBody);
  }

  return (
    <div className={s.dialogs}> 
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        <div>{messagesElements}</div>
      </div>
      <AddMessageFormRedux onSubmit={addNewMessage}/>
    </div>
  );
};

const AddMessageForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field
        component={Textarea}
        name="newMessageBody"
        placeholder="Enter your message"
        validate={[required, maxLength10]}
      ></Field>
      <div>
        <button>Send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm({form: "dialogAddMessageForm"})(AddMessageForm)

export default Dialogs;
