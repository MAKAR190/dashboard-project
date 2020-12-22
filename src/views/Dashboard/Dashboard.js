import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import { fetchAppsByQuery } from "../../services/appsApi";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
class Dashboard extends Component {
  state = {
    apps: [],
    appId: null,
    createModal: false,
    editModal: false,
    id: null,
    filter: "",
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
  handleChange = ({ target }) => {
    this.setState({
      filter: target.value,
    });
  };
  render() {
    const { filter, apps } = this.state;
    const filterApps = apps.filter((el) =>
      el.title.toUpperCase().includes(filter.toUpperCase())
    );
    return (
      <div>
        <DashboardHeader
          value={filter}
          handleChange={this.handleChange}
          openCreateModal={this.openCreateModal}
        />
        {filterApps.map((item) => (
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
