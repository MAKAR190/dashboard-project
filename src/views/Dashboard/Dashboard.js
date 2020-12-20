import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import { fetchAppsByQuery } from "../../services/appsApi";
import styles from "./Dashboard.module.css";
class Dashboard extends Component {
  state = {
    apps: [],
    appId: null,
    createModal: false,
    editModal: false,
    id: null,
  };
  componentDidMount() {
    fetchAppsByQuery("").then((res) => this.setState({ apps: res.rows }));
  }

  openCreateModal = () => {
    this.setState({
      createModal: true,
    });
  };
  openEditModal = (id) => {
    this.setState({
      editModal: true,
      id: id,
    });
  };
  onClose = () => {
    this.setState({
      createModal: false,
      editModal: false,
    });
  };

  render() {
    return (
      <div>
        <h1>Dashboard</h1>
        <button
          className={styles.btn}
          type="button"
          onClick={this.openCreateModal}
        >
          Add app
        </button>
        {this.state.apps.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => this.openEditModal(item.id)}>
              {item.title}
            </button>
          </li>
        ))}
        {this.state.createModal && (
          <Modal onClose={this.onClose}>
            <CreateAppForm close={this.onClose} />
          </Modal>
        )}
        {this.state.editModal && (
          <Modal onClose={this.onClose}>
            <EditAppForm close={this.onClose} id={this.state.id} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Dashboard;
