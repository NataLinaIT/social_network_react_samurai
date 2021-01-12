import React, { Component } from "react";
import Profile from "./Profile";
import { connect } from "react-redux";
import {
  getUserProfile,
  getStatus,
  updateStatus,
  savePhoto,
  saveProfile,
} from "../../redux/profile-reducer";
import {setUserImgInheader} from "../../redux/auth-reducer";
import { withRouter } from "react-router-dom";
import { withAuthRedirect } from "../../hoc/withAuthRedirect"
import { compose } from "redux";

class ProfileContainer extends Component {

  refreshProfile(){
    let userID = this.props.match.params.userId;
    console.log(window.location.href)
    if (!userID) {
      // userID = 13722;
      userID = this.props.authorizedUserId;
      if(!userID){
        this.props.history.push("/login");
      }
    }
    this.props.getUserProfile(userID);
    this.props.getStatus(userID);
    this.props.setUserImgInheader(this.props.authorizedUserId);
  }
  componentDidMount() {
    this.refreshProfile()
  }

  componentDidUpdate(prevProps, prevState ){
    if(this.props.match.params.userID !== prevProps.match.params.userID){
      this.refreshProfile()
    }
  }

  render() {
    return (
      <div>
        <Profile
          {...this.props}
          isOwner={this.props.match.params.userID === this.props.authorizedUserId || window.location.href === `http://localhost:3000/profile`}
          profile={this.props.profile}
          status={this.props.status}
          updateStatus={this.props.updateStatus}
        />
      </div>
    );
  }
}

let mapStateToProps = (state) => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  authorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth
});

export default compose(
  connect(mapStateToProps, { getUserProfile, getStatus, updateStatus, savePhoto, saveProfile, setUserImgInheader}),
  withRouter,
  withAuthRedirect
)(ProfileContainer);
