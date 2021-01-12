import React from 'react';
import pen from "../../../assets/icons/pen.png";
import s from "./EditButton.module.css";

let EditButton = (props) => {
    return (
      <div>
        <div className={s.edit_btn} onClick={props.goToEditMode}>
          <img src={pen} alt="pen"/>
        </div>
      </div>
    )
}

export default EditButton;
