import React from "react";
import styles from "./FormInput.module.css";
const FormInput = ({
  title,
  onChange,
  error,
  touched,
  value,
  password,
  name,
  type,
}) => {
  return (
    <>
      {type === "input" ? (
        <label className={styles.label}>
          {title}
          <input
            value={value}
            onChange={onChange}
            className={styles.input}
            name={name}
            type={password ? "password" : "text"}
          />
          {touched && error && <span className={styles.error}>{error}</span>}
        </label>
      ) : (
        <label className={styles.label}>
          {title}
          <textarea
            value={value}
            onChange={onChange}
            className={styles.description}
            name={name}
          />
          {touched && error && (
            <span className={styles.errorDescr}>{error}</span>
          )}
        </label>
      )}
    </>
  );
};

export default FormInput;
