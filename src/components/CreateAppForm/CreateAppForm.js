import { Component } from "react";
import { createApp } from "../../services/appsApi";
import styles from "./CreateAppForm.module.css";
import Spinner from "../Spinner/Spinner";
import { toast } from "react-toastify";
import modalImage from "../../images/modalImage.png";
import FormInput from "../FormInput/FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
export default class CreateAppForm extends Component {
  state = {
    loading: false,
  };
  handleCreateApp = (data) => {
    this.setState({
      loading: true,
    });

    createApp(data)
      .then((res) => this.props.onSuccess(res))
      .catch(() => toast.error("Что то пошло не так..."))
      .finally(() => this.setState({ loading: false }));
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
            <form className={styles.form} onSubmit={props.handleSubmit}>
              <h1 className={styles.title}>Добавить ссылку</h1>
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
                Добавить
              </button>
              {loading && <Spinner />}
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
