import React from "react";
import { Component } from "react";
import logoIcon from "../../images/logo-icon.svg";
import dashboardIcon from "../../images/dashboard-icon.svg";
import profileIcon from "../../images/profile-icon.svg";
import settingsIcon from "../../images/settings-icon.svg";
import aboutusIcon from "../../images/about-us-icon.svg";
import logoutIcon from "../../images/logout-icon.svg";
import styles from "../Sidebar/Sidebar.module.css";

const Link = ({ imgUrl, name, altName }) => (
  <>
    <img className={styles.sidebarImg} src={imgUrl} alt={altName} />
    <a href="#">{name}</a>
  </>
);
export default class Sidebar extends Component {
  state = {};

  render() {
    return (
      <div className={styles.sidebarBody}>
        <img src={logoIcon} className={styles.sidebarLogo} alt="logo" />
        <hr width="181.83" className={styles.sidebarHr} />
        <ul className={styles.sidebarUl}>
          <li>
            <Link
              imgUrl={dashboardIcon}
              name="Dashboard"
              altName="dashboardicon"
            />
          </li>
          <li>
            <Link
              imgUrl={settingsIcon}
              name="Settings"
              altName="Settingsicon"
            />
          </li>
          <li>
            <Link imgUrl={profileIcon} name="Profile" altName="profileicon" />
          </li>
          <li>
            <Link imgUrl={aboutusIcon} name="About us" altName="aboutusicon" />
          </li>
        </ul>
        <div className={styles.sidebarLogout}>
          <Link imgUrl={logoutIcon} name="Logout" altName="logouticon" />
        </div>
      </div>
    );
  }
}
