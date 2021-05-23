import React from "react";
import RegForm from "../../components/CreateAppForm/RegForm";
import styles from "./Reg.module.css";
export default function Login() {
  return (
    <div className={styles.wrapper}>
      <RegForm />
    </div>
  );
}
