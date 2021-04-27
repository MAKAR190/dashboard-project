export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;
export const getLoading = (state) => state.auth.loading;
export const getLoginError = (state) => state.auth.errorsLogin;
export const getRegError = (state) => state.auth.errorsRegister;
export const getUserDataError = (state) => state.auth.errorsUserData;
export const isAuthenticated = (state) => !!state.auth.token;
