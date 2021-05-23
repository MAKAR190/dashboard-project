import React from "react";
import { Component } from "react";
import logoIcon from "../../images/logo-icon.svg";
import dashboardIcon from "../../images/dashboard-icon.svg";
import profileIcon from "../../images/profile-icon.svg";
import settingsIcon from "../../images/settings-icon.svg";
import aboutusIcon from "../../images/about-us-icon.svg";
import logoutIcon from "../../images/logout-icon.svg";
import styles from "../Sidebar/Sidebar.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as selectors from "../../redux/auth/authSelectors";
import * as operations from "../../redux/auth/authOperations";
class Sidebar extends Component {
  render() {
    const { logout, isAuthorized } = this.props;
    return (
      <div className={styles.sidebarBody}>
        <img src={logoIcon} className={styles.sidebarLogo} alt="logo" />
        <hr width="181.83" className={styles.sidebarHr} />
        <ul className={styles.sidebarUl}>
          <li>
            <img className={styles.sidebarImg} src={dashboardIcon} alt="" />
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <img className={styles.sidebarImg} src={settingsIcon} alt="" />
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <img className={styles.sidebarImg} src={profileIcon} alt="" />
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <img className={styles.sidebarImg} src={aboutusIcon} alt="" />
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
        {isAuthorized ? (
          <div className={styles.sidebarLogout}>
            <img className={styles.sidebarImg} src={logoutIcon} alt="logout" />
            <button className={styles.button} onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <div className={styles.sidebarBtns}>
            <Link to="/login" className={styles.authBtn}>
              Login
            </Link>
            <p className={styles.or}>or</p>
            <Link to="register" className={styles.authBtn}>
              Register
            </Link>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthorized: selectors.isAuthenticated(state),
});

const mapDispatchToProps = {
  logout: operations.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
