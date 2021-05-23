import React, { Component } from "react";
import styles from "./DashboardHeader.module.css";
import icon from "../../images/search-icon.svg";
export default class DashboardHeader extends Component {
  state = {
    value: "",
  };
  handleChange = ({ target }) => {
    this.setState({
      value: target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.submit(this.state.value);
  };
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchWrapperBox}>
            <h1 className={styles.searchWrapperTitle}>{this.props.title}</h1>

            <form className={styles.form} onSubmit={this.handleSubmit}>
              <input
                value={this.state.value}
                onChange={this.handleChange}
                className={styles.searchInput}
                placeholder="Search"
              />
              <div className={styles.icon}>
                <img src={icon} alt="icon" />
              </div>
            </form>
          </div>
          <button
            className={styles.btn}
            type="button"
            onClick={this.props.openCreateModal}
          >
            Add app
          </button>
        </div>
      </div>
    );
  }
}
