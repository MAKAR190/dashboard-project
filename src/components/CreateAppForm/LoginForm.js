import { Component } from "react";
import styles from "./CreateAppForm.module.css";
import Spinner from "../Spinner/Spinner";
import modalImage from "../../images/loginModalImage.png";
import FormInput from "../FormInput/FormInput";
import { Formik } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import * as operations from "../../redux/auth/authOperations";
import * as selectors from "../../redux/auth/authSelectors";
import { Link } from "react-router-dom";
class LoginForm extends Component {
  render() {
    const { loading } = this.props;
    const errorsSchema = Yup.object().shape({
      email: Yup.string().email().required("* Обязательное поле"),
      password: Yup.string().required("* Обязательное поле"),
    });
    return (
      <div className={styles.wrapper} id={styles.authWrapper}>
        <div className={styles.formImageWrapper}>
          <img
            className={styles.formImage}
            id={styles.authImg}
            alt="defaultImage"
            src={modalImage}
          />
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={errorsSchema}
          onSubmit={(values, actions) => {
            this.props.login(values);
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form className={styles.form} onSubmit={props.handleSubmit}>
              <div className={styles.textWrapper}>
                <h1 className={styles.loginTitle}>Login</h1>
                <h5 className={styles.subtitle}>Welcome back!</h5>
              </div>
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
                Login in
              </button>
              <Link to="/register" className={styles.subtitle} id={styles.signUp}>
                Sign Up
              </Link>
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
  loginError: selectors.getLoginError(state),
});

const mapDispatchToProps = {
  login: operations.login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
