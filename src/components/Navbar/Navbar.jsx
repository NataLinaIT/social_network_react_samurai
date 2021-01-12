import React, { Component } from "react";
import s from "./Navbar.module.css";
import { NavLink } from "react-router-dom";
import UserIcon from "../common/Icons/UserIcon";
import MessageIcon from "../common/Icons/MessageIcon";
import UsersIcon from "../common/Icons/UsersIcon";
import NewsIcon from "../common/Icons/NewsIcon";
import MusicIcon from "../common/Icons/MusicIcon";
import SettingsIcon from "../common/Icons/SettingsIcon";

export class Navbar extends Component {
  render() {
    return (
      <nav className={s.nav}>
        <li>
          <NavLink to="/profile" className={s.item} activeClassName={s.active}>
              <UserIcon />
              <div>Profile</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/dialogs/4" className={s.item} activeClassName={s.active}>
              <MessageIcon />
              <div>Messages</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" className={s.item} activeClassName={s.active}>
              <UsersIcon />
              <div>Users</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/news" className={s.item} activeClassName={s.active}>
              <NewsIcon />
              <div>News</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/music" className={s.item} activeClassName={s.active}>
              <MusicIcon />
              <div>Music</div>
          </NavLink>
        </li>
        <li>
          <NavLink to="/settings" className={s.item} activeClassName={s.active}>
              <SettingsIcon />
              <div>Settings</div>
          </NavLink>
        </li>
      </nav>
    );
  }
}

export default Navbar;
