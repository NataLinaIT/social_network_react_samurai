import React from "react";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import Preloader  from "../common/Preloader/Preloader"

const Profile = (props) => {
  if(!props.profile){
    return <Preloader/>
  }
  return (
    <div>
      <div>
        <ProfileInfo 
          savePhoto={props.savePhoto}
          isOwner={props.isOwner}
          profile={props.profile} 
          status={props.status} 
          updateStatus={props.updateStatus}
          saveProfile={props.saveProfile}
        />
        <MyPostsContainer/>
      </div>
    </div>
  );
};

export default Profile;
