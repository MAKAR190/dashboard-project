import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import LoginForm from "../../components/CreateAppForm/LoginForm";
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
    page: 1,
    appsCount: 0,
    query: "",
    loading: false,
    error: false,
  };
  componentDidMount() {
    this.handleSubmit();
  }
  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.query;
    const nextQuery = this.state.query;
    if (prevQuery !== nextQuery) {
      this.handleSubmit();
    }
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
  handleFormSubmit = (value) => {
    this.setState({
      query: value,
      page: 1,
      apps: [],
    });
  };
  handleSubmit = () => {
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
      .catch(this.setState({ error: true }))
      .finally(this.setState({ loading: false, error: false }));
  };

  handleEditApp = (data) => {
    toast.success("Приложение успешно изменено!");

    this.setState((prevState) => {
      return {
        apps: prevState.apps.map((app) => (app.id === data.id ? data : app)),
      };
    });
    this.onClose();
  };
  handleAddApp = (data) => {
    toast.success("Приложение успешно создано!");
    this.setState((prevState) => {
      return {
        apps: [data, ...prevState.apps],
        appsCount: prevState.appsCount + 1,
      };
    });
    this.onClose();
  };
  handleDeleteApp = (data) => {
    toast.success("Приложение успешно удалено!");
    this.setState((prevState) => {
      return {
        apps: prevState.apps.filter((el) => {
          if (el.id === data.id) {
            return false;
          } else {
            return true;
          }
        }),
        appsCount: prevState.appsCount - 1,
      };
    });
  };
  render() {
    const { apps, loading, appsCount, error } = this.state;
    return (
      <div className={styles.container}>
        <DashboardHeader
          submit={this.handleFormSubmit}
          openCreateModal={this.openCreateModal}
        />
        {error && <h1>Error</h1>}
        <ul className={styles.list}>
          {this.state.apps.map((item) => (
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
                src={
                  item.image
                    ? "https://goiteens-dashboard.herokuapp.com/" + item.image
                    : "https://запорожье.ремонт-холодильников.org/wp-content/uploads/2014/09/default-placeholder.png"
                }
                alt={item.title}
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
          <button className={styles.loadMoreBtn} onClick={this.handleSubmit}>
            Load more
          </button>
        )}

        {this.state.createModal && (
          <Modal onClose={this.onClose}>
            {/* <LoginForm /> */}
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
