import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import { fetchAppsByQuery } from "../../services/appsApi";
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

  openCreateModal = (id) => {
    this.setState({
      createModal: true,
      id: id,
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
        {this.state.apps.map((item) => (
          <li key={item.id}>
            <button type="button" onClick={() => this.openEditModal(item.id)}>
              {item.title}
            </button>
          </li>
        ))}
        {this.state.createModal && (
          <Modal onClose={this.onClose}>
            <CreateAppForm id={this.state.id} />
          </Modal>
        )}
        {this.state.editModal && (
          <Modal onClose={this.onClose}>
            <EditAppForm id={this.state.id} />
          </Modal>
        )}
      </div>
    );
  }
}

export default Dashboard;
