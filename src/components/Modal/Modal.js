import React from "react";
import styles from "./Modal.module.css";
export default class Modal extends React.Component {
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
      <div className={styles.overlay}>
        <div className={styles.modal}>
          {this.props.children}
          <div onClick={this.props.onClose} className={styles.closeIconWrapper}>
            <svg
              width="24"
              height="25"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15ZM10.5071 4.70711C10.8976 5.09763 10.8976 5.7308 10.5071 6.12132L8.97843 7.65L10.364 9.03554C10.7545 9.42606 10.7545 10.0592 10.364 10.4497C9.97344 10.8403 9.34027 10.8403 8.94975 10.4497L7.56422 9.06422L6.26447 10.364C5.87395 10.7545 5.24078 10.7545 4.85026 10.364C4.45973 9.97344 4.45973 9.34027 4.85026 8.94975L6.15 7.65L4.70711 6.20711C4.31658 5.81658 4.31658 5.18342 4.70711 4.79289C5.09763 4.40237 5.7308 4.40237 6.12132 4.79289L7.56422 6.23579L9.0929 4.70711C9.48342 4.31658 10.1166 4.31658 10.5071 4.70711Z"
                fill="gray"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}
