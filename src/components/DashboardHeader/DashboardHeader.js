import React, { Component } from "react";
import styles from "./DashboardHeader.module.css";
import icon from "../../images/search-icon.svg";
import { connect } from "react-redux";
import * as selectors from "../../redux/auth/authSelectors";
class DashboardHeader extends Component {
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
    const { isAuthendicated } = this.props;
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchWrapper}>
          <div className={styles.searchWrapperBox}>
            <h1 className={styles.searchWrapperTitle}>{this.props.title}</h1>

            <div className={styles.formBox}>
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
              {isAuthendicated && (
                <button
                  className={styles.mobileBtn}
                  type="button"
                  onClick={this.props.openCreateModal}
                >
                  <i className="fas fa-plus"></i>
                </button>
              )}
            </div>
          </div>
          {isAuthendicated && (
            <button
              className={styles.btn}
              type="button"
              onClick={this.props.openCreateModal}
            >
              Add app
            </button>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  isAuthendicated: selectors.isAuthenticated(state),
});

export default connect(mapStateToProps)(DashboardHeader);
