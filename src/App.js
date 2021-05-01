import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { Route, withRouter, Redirect} from "react-router-dom";
import "./App.css";
import { initializeApp } from "./redux/app-reducer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import Footer from "./components/Footer/Footer";
import {LoginPage} from "./components/Login/Login";
import Preloader from "./components/common/Preloader/Preloader";
import NotFound from "./components/NotFound/NotFound";
import { withSuspense } from "./hoc/withSuspence";

const DialogsContainer = React.lazy(() =>
  import("./components/Dialogs/DialogsContainer")
);
const ProfileContainer = React.lazy(() =>
  import("./components/Profile/ProfileContainer")
);

class App extends Component {
  componentDidMount() {
    this.props.initializeApp();
  }

  render() {
    if (!this.props.initialized) {
      return <Preloader />;
    }
    return (
      <div className="app-wrapper">
        <HeaderContainer />
        <Navbar />
        <div className="app-wrapper-content">
            <Route path="/" render={() => <Redirect to={"/profile"} />} />
            <Route
              path="/profile/:userId?"
              render={withSuspense(ProfileContainer)}
            />
            <Route path="/dialogs" render={withSuspense(DialogsContainer)} />
            {/* <Route path="/users" render={() => <UsersContainer />} /> */}
            <Route path="/users" render={() => <UsersContainer pageTitle={"Samurai"}/>} />
            <Route path="/login" render={() => <LoginPage />} />
            <Route path="/news" render={() => <NotFound />} />
            <Route path="/music" render={() => <NotFound />} />
            <Route path="/settings" render={() => <NotFound />} />
        </div>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

export default compose(
  withRouter,
  connect(mapStateToProps, { initializeApp })
)(App);
