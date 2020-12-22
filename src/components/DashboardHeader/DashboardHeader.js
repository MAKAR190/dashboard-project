import React, { Component } from "react";
import styles from "./DashboardHeader.module.css";
import icon from "../../images/search-icon.svg";
export default class DashboardHeader extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchWrapper}>
          <h1 className={styles.searchWrapperTitle}>Dashboard</h1>
          <div className={styles.icon}>
            <img src={icon} alt="icon" />
          </div>
          <input
            value={this.props.value}
            onChange={this.props.handleChange}
            className={styles.searchInput}
            placeholder="Search"
          />
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
