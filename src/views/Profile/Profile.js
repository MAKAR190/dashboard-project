import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import queryString from "query-string";
import { fetchAppsByQueryProfile, deleteApp } from "../../services/appsApi";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import styles from "./Profile.module.css";
import { toast } from "react-toastify";
import Spinner from "../../components/Spinner/Spinner";
import edit from "../../images/edit-icon.svg";
import close from "../../images/close-icon.svg";
import UserProfile from "../../components/UserProfile/UserProfile";
class Dashboard extends Component {
  state = {
    apps: [],
    appId: null,
    createModal: false,
    editModal: false,
    id: null,
    page: 1,
    appsCount: 0,
    perPage: 12,
    totalPages: null,
    loading: false,
    error: false,
  };
  componentDidMount() {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query = "" } = getCategoryFromProps(this.props.location.search);
    this.props.history.push({
      ...this.props.location,
      search: `query=${query}`,
    });
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.location !== this.props.location) {
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
    this.setState(
      {
        apps: [],
        page: 1,
      },
      () => {
        this.props.history.push({
          ...this.props.location,
          search: `query=${value}`,
        });
      }
    );
  };
  handleSubmit = () => {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query = "" } = getCategoryFromProps(this.props.location.search);
    const { page } = this.state;
    this.setState({
      loading: true,
    });
    fetchAppsByQueryProfile(query, page, this.state.perPage)
      .then((res) =>
        this.setState((prevState) => {
          return {
            apps: [...prevState.apps, ...res.apps],
            page: prevState.page + 1,
            appsCount: res.total,
            totalPages: res.totalPages,
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
    const { apps, loading, appsCount, error, page } = this.state;
    return (
      <div className={styles.container}>
        {window.innerWidth < 1024 && <UserProfile />}

        <DashboardHeader
          title="My apps"
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
              <img src={item.image} alt={item.title} className={styles.image} />
              <a
                rel="noreferrer"
                target="_blank"
                href={item.link}
                className={styles.link}
              >
                <h2 className={styles.title}>{item.title}</h2>
              </a>
              <div className={styles.description}>
                <p>{item.description}</p>
              </div>
            </li>
          ))}
        </ul>
        {!loading && apps.length !== appsCount && (
          <button
            className={styles.loadMoreBtn}
            onClick={() => this.handleSubmit(page)}
          >
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
        {loading && <Spinner />}
      </div>
    );
  }
}

export default Dashboard;
