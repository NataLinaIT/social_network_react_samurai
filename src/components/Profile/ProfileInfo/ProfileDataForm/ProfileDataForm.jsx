import React from "react";
import { reduxForm } from "redux-form";
import { createField, Input , Textarea} from "../../../common/FormControls/FormControls";
import style from "../../../common/FormControls/FormControls.module.css";
import style_local from "./ProfileDataForm.module.css";

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
  return (
    <form onSubmit={handleSubmit} className={style_local.formStyle}>
      <div>
        <button>Save</button>
      </div>

      {error && <div className={style.formsummaryError}>{error}</div>}

      <ul className={style_local.formAbout}>
          <li className={style_local.nameInput}>
            <span>Full name:</span> {createField("Full name", "fullName", Input, [] )}
          </li>
          <li>
            <span>Looking for a job:</span> {createField("", "lookingForAJob", Input, [], {type: "checkbox"} )}
          </li>
          <li>
            <span>My professional skils:</span> {createField("My professional skils", "lookingForAJobDescription", Textarea, [])}
          </li>
          <li className={style_local.aboutmeInput}>
            <span>About me:</span> {createField("About me", "aboutMe", Textarea, [])}
          </li> 
      </ul>

      <ul className={style_local.formContacts_wrapper}>
        {Object.keys(profile.contacts).map((key) => {
          return (
            <li key={key}>
              <span className={style_local.socialTitle}>{key}:</span> <span>{createField("", "contacts." + key, Input, [])}</span>
            </li>
          )
        })}
      </ul>
    </form>
  );
};

const ProfileDataFormReduxForm = reduxForm({ form: "edit-profile" })(
  ProfileDataForm
);
export default ProfileDataFormReduxForm;
