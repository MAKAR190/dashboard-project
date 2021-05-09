import axios from "axios";
import * as actions from "./authActions";
import * as selectors from "./authSelectors";
const token = {
  set(value) {
    axios.defaults.headers.common.Authorization = `Bearer ${value}`;
  },
  unset() {
    axios.defaults.headers.common.Authorization = null;
  },
};
export const login = (userData) => (dispatch) => {
  dispatch(actions.loginRequest());
  axios
    .post("/auth/login", userData)
    .then((res) => {
      dispatch(actions.clearLoginError());
      token.set(res.data.token);
      dispatch(actions.loginSuccess(res.data));
    })
    .catch((error) => dispatch(actions.loginError(error)));
};
export const register = (userData) => (dispatch) => {
  dispatch(actions.registerRequest());
  axios
    .post("/auth/register", userData)
    .then((res) => {
      token.set(res.data.token);
      dispatch(actions.registerSuccess(res.data));
    })
    .catch((error) => dispatch(actions.registerError(error)));
};
export const logout = () => (dispatch) => {
  dispatch(actions.logoutRequest());
  try {
    token.unset();
    dispatch(actions.logoutSuccess());
  } catch (error) {
    dispatch(actions.logoutError(error));
  }
};
export const fetchUserData = () => (dispatch, getState) => {
  const stateToken = selectors.getToken(getState());
  if (!stateToken) {
    return;
  }
  token.set(stateToken);
  dispatch(actions.fetchUserDataRequest());
  axios
    .get("/auth/me")
    .then((res) => {
      dispatch(actions.fetchUserDataSuccess(res.data));
    })
    .catch((error) => {
      token.unset();
      dispatch(actions.fetchUserDataError(error));
    });
};
