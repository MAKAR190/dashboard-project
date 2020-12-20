import PropTypes from "prop-types";

import styles from "./Layout.module.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "../Sidebar/Sidebar";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <ToastContainer />
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.main}>{children}</div>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
