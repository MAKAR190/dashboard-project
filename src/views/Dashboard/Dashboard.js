import { Component } from "react";
import Modal from "../../components/Modal/Modal";
import CreateAppForm from "../../components/CreateAppForm/CreateAppForm";
import EditAppForm from "../../components/CreateAppForm/EditAppForm";
import { fetchAppsByQuery } from "../../services/appsApi";
import DashboardHeader from "../../components/DashboardHeader/DashboardHeader";
import styles from './Dashboard.module.css';
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
  loadMore = e =>{
    e.preventDefault();
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
  render() {
    const { filter, apps } = this.state;
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
          <li onClick={(e) => {console.log(e.target.nodeName); if((e.target.nodeName!=='A') || (e.target.nodeName!=='H2')){this.openEditModal(item.id)}}} className={styles.item} key={item.id}>
            <img src={item.image} alt={item.description} className={styles.image}/>
            <a href={item.link} className={styles.link}><h2>{item.title}</h2></a>
            <p className={styles.description}>{item.description}</p>
            {/* <button type="button" onClick={() => this.openEditModal(item.id)}>
              {item.title}
            </button> */}
          </li>
        ))}
        </ul>
        <button onClick={this.loadMore}>Load more</button>
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
