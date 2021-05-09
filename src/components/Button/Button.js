import styles from "./Button.module.css";
const Button = ({ title, type, bg, disabled, onClick }) => {
  return (
    <button
      type={type}
      disabled={disabled}
      style={bg && { backgroundColor: bg }}
      className={disabled ? styles.disabledBtn : styles.btn}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
