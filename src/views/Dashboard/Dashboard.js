import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import { fetchAppsByQuery, deleteApp } from "../../services/appsApi";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import styles from "./Dashboard.module.css";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import close from "../../images/close-icon.svg";
import edit from "../../images/edit-icon.svg";
class Dashboard extends Component {
  state = {
    apps: [],
    appId: null,
    createModal: false,
    editModal: false,
    id: null,
    filter: "",
    page: 1,
    appsCount: 0,
    query: "",
    loading: false,
  };
  componentDidMount() {
    fetchAppsByQuery(this.state.query, this.state.page).then((res) =>
      this.setState((prevState) => {
        return {
          apps: [...prevState.apps, ...res.rows],
          page: prevState.page + 1,
          appsCount: res.count,
        };
      })
    );
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
  loadMore = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    fetchAppsByQuery(this.state.query, this.state.page)
      .then((res) =>
        this.setState((prevState) => {
          return {
            apps: [...prevState.apps, ...res.rows],
            page: prevState.page + 1,
            appsCount: res.count,
          };
        })
      )
      .finally(this.setState({ loading: false }));
  };

  handleEditApp = (data) => {
    toast.success("Приложение успешно изменено!");

    this.setState((prevState) => {
      return {
        apps: prevState.apps.map((app) => (app.id === data.id ? data : app)),
      };
    });
  };
  handleAddApp = (data) => {
    toast.success("Приложение успешно создано!");
    this.setState((prevState) => {
      return {
        apps: [data, ...prevState.apps],
      };
    });
  };
  handleDeleteApp = (data) => {
    toast.success("Приложение успешно удалено!");
    console.log(data);
    this.setState((prevState) => {
      return {
        apps: prevState.apps.filter((el) => {
          if (el.id === data.id) {
            return false;
          } else {
            return true;
          }
        }),
      };
    });
  };
  render() {
    const { filter, apps, loading, appsCount } = this.state;
    const filterApps = apps.filter((el) =>
      el.title.toUpperCase().includes(filter.toUpperCase())
    );
    return (
      <div className={styles.container}>
        <DashboardHeader
          value={filter}
          handleChange={this.handleChange}
          openCreateModal={this.openCreateModal}
        />
        <ul className={styles.list}>
          {filterApps.map((item) => (
            <li className={styles.item} key={item.id}>
              <img
                className={styles.deleteButton}
                onClick={() =>
                  deleteApp(item.id).then(this.handleDeleteApp(item))
                }
                alt="close"
                src={close}
              />
              <img
                className={styles.editButton}
                onClick={() => this.openEditModal(item.id)}
                alt="edit"
                src={edit}
              />
              <img
                src={"https://goiteens-dashboard.herokuapp.com/" + item.image}
                alt={item.description}
                className={styles.image}
              />
              <a
                rel="noreferrer"
                target="_blank"
                href={item.link}
                className={styles.link}
              >
                <h2 className={styles.title}>{item.title}</h2>
              </a>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
        {loading && (
          <Loader
            className={styles.loader}
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        {!loading && apps.length !== appsCount && (
          <button className={styles.loadMoreBtn} onClick={this.loadMore}>
            Load more
          </button>
        )}

        {this.state.createModal && (
          <Modal onClose={this.onClose}>
            <CreateAppForm onSuccess={this.handleAddApp} close={this.onClose} />
          </Modal>
        )}
        {this.state.editModal && (
          <Modal onClose={this.onClose}>
            <EditAppForm
              onSuccess={this.handleEditApp}
              close={this.onClose}
              id={this.state.id}
            />
          </Modal>
        )}
      </div>
    );
  }
}

export default Dashboard;
