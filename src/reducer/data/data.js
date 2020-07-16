import {extend} from "../../utils.js";
import filmAdapter from "../../components/adapters/film-adapter.js";

const initialState = {
  films: [],
  promoFilm: {},
  filmComments: [],
  isLoading: false,
  isError: false
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILM_COMMENTS: `LOAD_FILM_COMMENTS`,
  IS_LOADING_DATA: `IS_LOADING_DATA`,
  IS_ERROR_DATA: `IS_ERROR_DATA`
};

const ActionCreator = {
  loadFilms: (films) => {
    return {
      type: ActionType.LOAD_FILMS,
      payload: films,
    };
  },
  loadPromoFilm: (promoFilm) => {
    return {
      type: ActionType.LOAD_PROMO_FILM,
      payload: promoFilm
    };
  },
  loadFilmComments: (comments) => {
    return {
      type: ActionType.LOAD_FILM_COMMENTS,
      payload: comments
    };
  },
  loadingData: (isLoading) => {
    return {
      type: ActionType.IS_LOADING_DATA,
      payload: isLoading
    };
  },
  errorLoadingData: (isError) => {
    return {
      type: ActionType.IS_ERROR_DATA,
      payload: isError
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingData(true));
    dispatch(ActionCreator.errorLoadingData(false));
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((unRowFilm) => filmAdapter(unRowFilm))));
        dispatch(ActionCreator.loadingData(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadingData(false));
        dispatch(ActionCreator.errorLoadingData(true));
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(filmAdapter(response.data)));
      })
      .catch((err) => {
        throw err;
      });
  },
  loadFilmComments: (filmId) => (dispatch, getState, api) => {
    return api.get(`/comments/${filmId}`)
      .then((response) => {
        dispatch(ActionCreator.loadFilmComments(response.data));
      })
      .catch((err) => {
        throw err;
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });
    case ActionType.LOAD_PROMO_FILM:
      return extend(state, {
        promoFilm: action.payload,
      });
    case ActionType.IS_LOADING_DATA:
      return extend(state, {
        isLoading: action.payload,
      });
    case ActionType.LOAD_FILM_COMMENTS:
      return extend(state, {
        filmComments: action.payload,
      });
    case ActionType.IS_ERROR_DATA:
      return extend(state, {
        isError: action.payload,
      });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
