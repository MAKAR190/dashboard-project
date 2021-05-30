import React, { useState } from "react";
import styles from "./MobileMenu.module.css";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as selectors from "../../redux/auth/authSelectors";
import * as operations from "../../redux/auth/authOperations";
const MobileMenu = ({ logout, isAuthenticated }) => {
  const [visible, setVisible] = useState(false);
  const toggleMenu = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <div className={styles.wrapper}>
      <div onClick={toggleMenu} className={styles.menuBtn}>
        <i className="fas fa-bars"></i>
      </div>
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.4.1/css/all.css"
      />
      {visible && (
        <div className={styles.menu}>
          <Link onClick={toggleMenu} className={styles.menuItem} to="/">
            Dashboard
          </Link>
          <Link onClick={toggleMenu} className={styles.menuItem} to="/settings">
            Settings
          </Link>
          <Link onClick={toggleMenu} className={styles.menuItem} to="/profile">
            My apps
          </Link>
          <Link onClick={toggleMenu} className={styles.menuItem} to="/about-us">
            About Us
          </Link>
          {isAuthenticated ? (
            <Link to="" className={styles.menuItem} onClick={logout}>
              Logout
            </Link>
          ) : (
            <>
              <Link
                to="/login"
                onClick={toggleMenu}
                className={styles.menuItem}
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={toggleMenu}
                className={styles.menuItem}
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};
const mapStateToProps = (state) => ({
  isAuthenticated: selectors.isAuthenticated(state),
});

const mapDispatchToProps = {
  logout: operations.logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(MobileMenu);
