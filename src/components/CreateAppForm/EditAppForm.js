import { Component } from "react";
import { editApp, fetchAppDetails } from "../../services/appsApi";
import styles from "./CreateAppForm.module.css";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import FormInput from "../FormInput/FormInput";
import modalImage from "../../images/modalImage.png";
import { Formik } from "formik";
import * as Yup from "yup";
export default class CreateAppForm extends Component {
  state = {
    loading: false,
  };
  componentDidMount() {
    this.setState({
      loading: true,
    });
    fetchAppDetails(this.props.id)
      .then((res) =>
        this.setState({
          title: res.title,
          description: res.description,
          link: res.link,
        })
      )
      .finally(() =>
        this.setState({
          loading: false,
        })
      );
  }
  handleCreateApp = (data) => {
    this.setState({
      loading: true,
    });
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);
    formData.append("image", data.image);

    editApp(this.props.id, formData)
      .then((res) => this.props.onSuccess(res))
      .catch(() => toast.error("Что то пошло не так..."))
      .finally(() =>
        this.setState({
          loading: false,
        })
      );
  };
  render() {
    const { loading } = this.state;
    const errorsSchema = Yup.object().shape({
      title: Yup.string()
        .min(3, "Название должно быть от 3 символов.")
        .max(255, "Название должно быть до 255 символов.")
        .required("* Обязательное поле"),
      link: Yup.string().url().required("* Обязательное поле"),
      description: Yup.string()
        .min(3, "Описание должно быть от 3 символов.")
        .required("* Обязательное поле"),
      image: Yup.string().url().required("* Обязательное поле"),
    });
    return (
      <div className={styles.wrapper}>
        <div className={styles.formImageWrapper}>
          <img
            className={styles.formImage}
            alt="defaultImage"
            src={modalImage}
          />
        </div>
        <Formik
          initialValues={{
            image: "",
            title: "",
            link: "",
            description: "",
          }}
          validationSchema={errorsSchema}
          onSubmit={(values, actions) => {
            this.handleCreateApp(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form className={styles.form} onSubmit={this.handleCreateApp}>
              <h1 className={styles.title}>Изменить ссылку</h1>
              <FormInput
                title="Название"
                error={props.errors.title}
                touched={props.touched.title}
                onChange={props.handleChange}
                value={props.values.title}
                type="input"
                name="title"
              />
              <FormInput
                title="Ссылка"
                error={props.errors.link}
                touched={props.touched.link}
                onChange={props.handleChange}
                value={props.values.link}
                type="input"
                name="link"
              />
              <FormInput
                title="Картинка"
                error={props.errors.image}
                touched={props.touched.image}
                onChange={props.handleChange}
                value={props.values.image}
                type="input"
                name="image"
              />
              <FormInput
                title="Описание"
                error={props.errors.description}
                touched={props.touched.description}
                onChange={props.handleChange}
                value={props.values.description}
                name="description"
              />
              <button
                disabled={loading}
                className={!loading ? styles.btn : styles.disabledBtn}
                type="submit"
              >
                Изменить
              </button>
            </form>
          )}
        </Formik>
        {loading && (
          <Loader
            className={styles.loader}
            type="Puff"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
      </div>
    );
  }
}
