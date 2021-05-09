import { createAction } from "@reduxjs/toolkit";
import actions from "../../reduxActionTypes";
export const loginRequest = createAction(actions.loginRequest);
export const loginSuccess = createAction(actions.loginSuccess);
export const loginError = createAction(actions.loginError);

export const registerRequest = createAction(actions.registerRequest);
export const registerSuccess = createAction(actions.registerSuccess);
export const registerError = createAction(actions.registerError);

export const fetchUserDataRequest = createAction(actions.fetchUserDataRequest);
export const fetchUserDataSuccess = createAction(actions.fetchUserDataSuccess);
export const fetchUserDataError = createAction(actions.fetchUserDataError);

export const logoutRequest = createAction(actions.logoutRequest);
export const logoutSuccess = createAction(actions.logoutSuccess);
export const logoutError = createAction(actions.logoutError);

export const clearLoginError = createAction(actions.clearLoginError);
