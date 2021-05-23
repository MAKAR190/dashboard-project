import React from "react";
import LoginForm from "../../components/CreateAppForm/LoginForm";
import styles from './Login.module.css'
export default function Login() {
  return (
    <div className={styles.wrapper}>
      <LoginForm />
    </div>
  );
}
