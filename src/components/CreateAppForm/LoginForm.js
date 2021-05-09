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
import LoginModalError from "../Modal/LoginErrorModal/LoginModalError";
class LoginForm extends Component {
  state = {
    showModal: true,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevLoginError = prevProps.loginError;
    const nextLoginError = this.props.loginError;
    if (prevLoginError !== nextLoginError) {
      if (nextLoginError && nextLoginError.length > 0) this.openModal();
    }
  }

  openModal = () => {
    this.setState({
      showModal: true,
    });
  };
  closeModal = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    const { loading, loginError } = this.props;
    const { showModal } = this.state;
    const errorsSchema = Yup.object().shape({
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
          }}
          validationSchema={errorsSchema}
          onSubmit={(values, actions) => {
            this.props.login(values);
            if (loginError.length > 0) {
              this.openModal();
            }
            actions.setSubmitting(false);
          }}
        >
          {(props) => (
            <form className={styles.form} onSubmit={props.handleSubmit}>
              <div>
                <h1 className={styles.title} style={{ textAlign: "left" }}>
                  Login
                </h1>
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
              {loading && <Spinner />}
              {showModal && <LoginModalError onClose={this.closeModal} />}
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
