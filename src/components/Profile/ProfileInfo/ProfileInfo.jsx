import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import "../../../App.css"
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatus";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import userPhoto from "../../../assets/images/user_default.png";
import bgPhoto from "../../../assets/images/profile-bg.jpg";
import EditButton from "../../common/EditButton/EditButton"

const ProfileInfo = ({
  profile,
  status,
  updateStatus,
  isOwner,
  savePhoto,
  saveProfile,
}) => {
  let [editMode, setEditMode] = useState(false);
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelect = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
    saveProfile(formData).then(() => {
      setEditMode(false);
    });
  };

  return (
    <div>
      <div className={s.profileTop_wrapper}>
        <div className={s.profile_background}>
          <img src={bgPhoto} alt="bg" />
        </div>
        <div className={s.description_block}>
          <div className={s.profile_img}>
            {profile.photos.large === null ? (
              <img src={userPhoto} alt="img" />
            ) : (
              <img src={profile.photos.large} alt="img" />
            )}
          </div>

          {isOwner &&  (
            <div className={s.editButtonImage}>
              <EditButton/>
                <label>
                  <input
                  type="file"
                  placeholder="Change profile image"
                  onChange={onMainPhotoSelect}
                  />
                </label>
            </div>
          )}
      </div>

        <div className={s.status_wrapper}>
          <div>Status:</div>
          <ProfileStatus status={status} updateStatus={updateStatus} />
        </div>

        {editMode ? (
          <ProfileDataForm
            initialValues={profile}
            profile={profile}
            onSubmit={onSubmit}
          />
        ) : (
          <ProfileData
            goToEditMode={() => setEditMode(true)}
            profile={profile}
            isOwner={isOwner}
          />
        )}

        
      </div>
    </div>
  );
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
  return (
    <div className={s.profileData}>
      {isOwner && (
        <div className={s.profileData_editbtn}>
          <EditButton goToEditMode={goToEditMode}/>
        </div>
      )}

      <div className={s.profileInfo_wrapper}>
        <ul className={s.profile_userabout}>
          <li>
            <span>Full name:</span> 
            <span className="hilightText">{profile.fullName}</span>
          </li>
          <li>
            <span>Looking for a job:</span> 
            <span className="hilightText">{profile.lookingForAJob ? "yes" : "no"}</span>
          </li>
          {profile.lookingForAJob && (
            <li>
              <div>My professional skils:</div> 
              <div className="hilightText">{profile.lookingForAJobDescription}</div>
            </li>
          )}
          <li>
            <div>About me:</div> 
            <div className="hilightText">{profile.aboutMe}</div>
          </li>
        </ul>

        <div className={s.user_contacts}>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <Contact
                key={key}
                contactTitle={key}
                contactValue={profile.contacts[key]}
              />
            );
          })}
        </div>

      </div>

    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div className={s.contact}>
      {/* <img src={`../../../assets/icons/social/${contactTitle}.png`} alt="img"/> */}
      <span>{contactTitle}</span>: <span className="hilightText">{contactValue}</span>
    </div>
  );
};

export default ProfileInfo;
