import {extend} from "../../utils.js";

const AuthorizationStatus = {
  AUTH: `AUTH`,
  NO_AUTH: `NO_AUTH`,
};

const initialState = {
  authorizationStatus: AuthorizationStatus.NO_AUTH,
  isValidAuthorization: true,
  isError: false,
};

const ActionType = {
  REQUIRED_AUTHORIZATION: `REQUIRED_AUTHORIZATION`,
  IS_INVALID_AUTHORIZATION: `IS_INVALID_AUTHORIZATION`,
  IS_ERROR_AUTHORIZATION: `IS_ERROR_AUTHORIZATION`,
};

const ActionCreator = {
  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
  },
  requireValidAuthorization: (isValid) => {
    return {
      type: ActionType.IS_INVALID_AUTHORIZATION,
      payload: isValid,
    };
  },
  errorAuthorization: (isError) => {
    return {
      type: ActionType.IS_ERROR_AUTHORIZATION,
      payload: isError
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.REQUIRED_AUTHORIZATION:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });
    case ActionType.IS_INVALID_AUTHORIZATION:
      return Object.assign({}, state, {
        isValidAuthorization: action.payload,
      });
    case ActionType.IS_ERROR_AUTHORIZATION:
      return extend(state, {
        isError: action.payload,
      });
  }
  return state;
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.errorAuthorization(false));
    return api.get(`/login`)
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
        dispatch(ActionCreator.errorAuthorization(false));
      })
      .catch(() => {
        dispatch(ActionCreator.errorAuthorization(true));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    dispatch(ActionCreator.requireValidAuthorization(true));
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then(() => {
        dispatch(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH));
      })
      .catch(() => {
        dispatch(ActionCreator.requireValidAuthorization(false));
      });
  },
};


export {
  ActionCreator,
  ActionType,
  AuthorizationStatus,
  Operation,
  reducer,
};
