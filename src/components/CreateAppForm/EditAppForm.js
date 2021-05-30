import { useState, useEffect } from "react";
import { editApp, fetchAppDetails } from "../../services/appsApi";
import styles from "./CreateAppForm.module.css";
import { toast } from "react-toastify";
import Loader from "react-loader-spinner";
import FormInput from "../FormInput/FormInput";
import modalImage from "../../images/modalImage.png";
import { useFormik } from "formik";
import * as Yup from "yup";
export default function CreateAppForm({ id, onSuccess }) {
  const [loading, setLoading] = useState(false);
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
  const handleCreateApp = (data) => {
    setLoading(true);

    editApp(id, data)
      .then((res) => onSuccess(res))
      .catch(() => toast.error("Что то пошло не так..."))
      .finally(() => setLoading(false));
  };
  const formik = useFormik({
    initialValues: {
      image: "",
      title: "",
      link: "",
      description: "",
    },
    onSubmit: (values, actions) => {
      handleCreateApp(values);
      actions.setSubmitting(false);
    },
    validationSchema: errorsSchema,
  });
  useEffect(() => {
    setLoading(true);
    fetchAppDetails(id)
      .then((res) =>
        formik.setValues({
          ...formik.values,
          image: res.image,
          title: res.title,
          description: res.description,
          link: res.link,
        })
      )
      .finally(() => setLoading(false));
  }, [id]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.formImageWrapper}>
        <img className={styles.formImage} alt="defaultImage" src={modalImage} />
      </div>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <h1 className={styles.title}>Изменить ссылку</h1>
        <FormInput
          title="Название"
          error={formik.errors.title}
          touched={formik.touched.title}
          onChange={formik.handleChange}
          value={formik.values.title}
          type="input"
          name="title"
        />
        <FormInput
          title="Ссылка"
          error={formik.errors.link}
          touched={formik.touched.link}
          onChange={formik.handleChange}
          value={formik.values.link}
          type="input"
          name="link"
        />
        <FormInput
          title="Картинка"
          error={formik.errors.image}
          touched={formik.touched.image}
          onChange={formik.handleChange}
          value={formik.values.image}
          type="input"
          name="image"
        />
        <FormInput
          title="Описание"
          error={formik.errors.description}
          touched={formik.touched.description}
          onChange={formik.handleChange}
          value={formik.values.description}
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
      {loading && (
        <Loader
          className="loader"
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )}
    </div>
  );
}
