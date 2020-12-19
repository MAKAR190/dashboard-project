import React from "react";
import { Component } from "react";
import logoIcon from "../../images/logo-icon.svg";
import dashboardIcon from "../../images/dashboard-icon.svg";
import profileIcon from "../../images/profile-icon.svg";
import settingsIcon from "../../images/settings-icon.svg";
import aboutusIcon from "../../images/about-us-icon.svg";
import logoutIcon from "../../images/logout-icon.svg";
import styles from "../Sidebar/Sidebar.module.css";

export default class Sidebar extends Component {
  state = {};
  render() {
    return (
      <div className={styles.sidebarBody}>
        <img src={logoIcon} className={styles.sidebarLogo} />
        <hr width="181.83" className={styles.sidebarHr} />
        <ul className={styles.sidebarUl}>
          <li>
            <img className={styles.sidebarImg} src={dashboardIcon} />
            <a href="#">Dashboard</a>
          </li>
          <li>
            <img className={styles.sidebarImg} src={settingsIcon} />
            <a href="#">Settings</a>
          </li>
          <li>
            <img className={styles.sidebarImg} src={profileIcon} />
            <a href="#">Profile</a>
          </li>
          <li>
            <img className={styles.sidebarImg} src={aboutusIcon} />
            <a href="#">About us</a>
          </li>
        </ul>
        <div className={styles.sidebarLogout}>
          <img className={styles.sidebarImg} src={logoutIcon} />
          <a href="#">Logout</a>
        </div>
      </div>
    );
  }
}
