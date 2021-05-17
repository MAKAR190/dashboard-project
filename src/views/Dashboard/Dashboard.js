import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import queryString from "query-string";
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
    page: 0,
    appsCount: 0,
    totalPages: 1,
    loading: false,
    error: false,
  };
  componentDidMount() {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query } = getCategoryFromProps(this.props.location.search);
    const { page } = getCategoryFromProps(this.props.location.search);
    if (query) {
      this.handleSubmit(query, page);
      this.setState({ page });
    } else {
      this.handleSubmit("", 1);
      this.setState({ page: 1 });
    }
  }
  componentDidUpdate(prevProps, prevState) {
    const getCategoryFromProps = (string) => queryString.parse(string);
    const { query: prevQuery } = getCategoryFromProps(
      prevProps.location.search
    );
    const { query: nextQuery } = getCategoryFromProps(
      this.props.location.search
    );
    const { page: prevPage } = getCategoryFromProps(prevProps.location.search);
    const { page: nextPage } = getCategoryFromProps(this.props.location.search);
    if (prevQuery !== nextQuery) {
      this.handleSubmit(nextQuery, 1);
    }
    if (prevPage !== nextPage) {
      this.handleSubmit(nextQuery, nextPage);
      this.setState({ page: nextPage });
    }
    if (prevState.apps !== this.state.apps) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
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
    if (value) {
      this.props.history.push({
        ...this.props.location,
        search: `page=${1}&query=${value}`,
      });
    } else if (value === "") {
      this.props.history.push({
        ...this.props.location,
        search: "",
      });
    }
  };
  handleSubmit = (query, page) => {
    this.setState({
      loading: true,
    });
    fetchAppsByQuery(query, page, 11)
      .then((res) =>
        this.setState((prevState) => {
          return {
            apps: res.apps,
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
    const { apps, loading, appsCount, error, totalPages, page } = this.state;
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
        {loading && (
          <Loader
            className={styles.loader}
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
          />
        )}
        {!loading && apps.length !== appsCount && totalPages !== page && (
          <button className={styles.loadMoreBtn} onClick={this.handleSubmit}>
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
