import React, { Component } from "react";
import styles from "./LoginModalError.module.css";
import Button from "../../Button/Button";
export default class LoginModalError extends Component {
  componentDidMount() {
    window.addEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        this.props.onClose();
      }
    });
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", (e) => {
      if (e.code === "Escape") {
        this.props.onClose();
      }
    });
  }
  render() {
    return (
      <div className={styles.modal}>
        <h2 className={styles.modalTitle}>woops!</h2>
        <p className={styles.modalError}>Password or login is incorrect</p>
        <div className={styles.btnsWrapper}>
          <Button
            title="Try again"
            bg="#D8004E"
            disabled={false}
            onClick={this.props.onClose}
          />
          <Button
            title="Sign Up"
            disabled={false}
            onClick={this.props.onClose}
          />
        </div>
        <p className={styles.forgotPassword}>Forgot password?</p>
      </div>
    );
  }
}
