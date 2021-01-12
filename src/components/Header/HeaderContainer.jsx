import React, { Component } from "react";
import Header from "./Header"
import { connect } from "react-redux";
import {logout} from '../../redux/auth-reducer'


class HeaderContainer extends Component {
  render() {
    return (
      <Header {...this.props}/>
    );
  }
}

let mapStateToProps = (state) => ({ 
  isAuth: state.auth.isAuth,
  userImg: state.auth.userImg,
  login: state.auth.login,
  profile: state.profilePage.profile,
})
 
export default connect(mapStateToProps, {logout})(HeaderContainer)