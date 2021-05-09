import { Component } from "react";
import styles from "./CreateAppForm.module.css";
import Spinner from "../Spinner/Spinner";
import modalImage from "../../images/authModalImage.png";
import FormInput from "../FormInput/FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as operations from "../../redux/auth/authOperations";
import * as selectors from "../../redux/auth/authSelectors";

class RegForm extends Component {
  render() {
    const { loading } = this.props;
    const errorsSchema = Yup.object().shape({
      name: Yup.string().required("* Обязательное поле"),
      email: Yup.string().email().required("* Обязательное поле"),
      password: Yup.string().required("* Обязательное поле"),
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
            email: "",
            password: "",
            name: "",
          }}
          validationSchema={errorsSchema}
          onSubmit={(values, actions) => {
            this.props.register(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form className={styles.form} onSubmit={props.handleSubmit}>
              <div>
                <h1 className={styles.title} style={{ textAlign: "left" }}>
                  Sign up
                </h1>
                <h5 className={styles.subtitle}>Welcome on board!</h5>
              </div>
              <FormInput
                title="Name"
                error={props.errors.name}
                touched={props.touched.name}
                onChange={props.handleChange}
                value={props.values.name}
                type="input"
                name="name"
              />
              <FormInput
                title="Email"
                error={props.errors.email}
                touched={props.touched.email}
                onChange={props.handleChange}
                value={props.values.email}
                type="input"
                name="email"
              />
              <FormInput
                title="Password"
                error={props.errors.password}
                touched={props.touched.password}
                onChange={props.handleChange}
                value={props.values.password}
                type="input"
                name="password"
                password
              />
              <button
                disabled={loading}
                className={!loading ? styles.btn : styles.disabledBtn}
                type="submit"
              >
                Join
              </button>
              {loading && <Spinner />}
            </form>
          )}
        </Formik>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  loading: selectors.getLoading(state),
});

const mapDispatchToProps = {
  register: operations.register,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegForm);
