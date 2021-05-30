import React from "react";
import { connect } from "react-redux";
import * as selectors from "../../redux/auth/authSelectors";
import styles from "./UserProfile.module.css";
const UserProfile = ({ email }) => {
  return (
    <div className={styles.wrapper}>
      <i className="fas fa-user" id={styles.img}></i>
      <h2 className={styles.email}>{email}</h2>
    </div>
  );
};
const mapStateToProps = (state) => ({
  email: selectors.getUser(state).email,
});

export default connect(mapStateToProps)(UserProfile);
