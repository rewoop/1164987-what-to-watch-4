import {extend} from "../../utils.js";
import filmAdapter from "../../components/adapters/film-adapter.tsx";

const initialState = {
  films: [],
  promoFilm: {},
  filmComments: [],
  favoriteFilms: [],
  isLoadingFilms: false,
  isLoadingPromoFilm: false,
  isError: false,
  isDisableForm: false,
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
  LOAD_FILM_COMMENTS: `LOAD_FILM_COMMENTS`,
  LOAD_FAVORITE_FILMS: `LOAD_FAVORITE_FILMS`,
  SET_FAVORITE_FILMS: `SET_FAVORITE_FILMS`,
  IS_LOADING_FILMS: `IS_LOADING_FILMS`,
  IS_LOADING_PROMO_FILM: `IS_LOADING_PROMO_FILM`,
  IS_ERROR_DATA: `IS_ERROR_DATA`,
  IS_DISABLE_FORM: `IS_DISABLED_FORM`
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
  loadFavoriteFilms: (films) => {
    return {
      type: ActionType.LOAD_FAVORITE_FILMS,
      payload: films
    };
  },
  setFavoriteFilms: (filmId, isFavorite) => {
    return {
      type: ActionType.SET_FAVORITE_FILMS,
      payload: filmId,
      isFavorite,
    };
  },
  loadingFilms: (isLoadingFilms) => {
    return {
      type: ActionType.IS_LOADING_FILMS,
      payload: isLoadingFilms
    };
  },
  loadingPromoFilm: (isLoadingPromoFilm) => {
    return {
      type: ActionType.IS_LOADING_PROMO_FILM,
      payload: isLoadingPromoFilm
    };
  },
  errorLoadingData: (isError) => {
    return {
      type: ActionType.IS_ERROR_DATA,
      payload: isError
    };
  },
  disableForm: (isDisable) => {
    return {
      type: ActionType.IS_DISABLE_FORM,
      payload: isDisable
    };
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingFilms(true));
    dispatch(ActionCreator.errorLoadingData(false));
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((unRowFilm) => filmAdapter(unRowFilm))));
        dispatch(ActionCreator.loadingFilms(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadingFilms(false));
        dispatch(ActionCreator.errorLoadingData(true));
      });
  },
  loadPromoFilm: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.loadingPromoFilm(true));
    dispatch(ActionCreator.errorLoadingData(false));
    return api.get(`/films/promo`)
      .then((response) => {
        dispatch(ActionCreator.loadPromoFilm(filmAdapter(response.data)));
        dispatch(ActionCreator.loadingPromoFilm(false));
      })
      .catch(() => {
        dispatch(ActionCreator.loadingPromoFilm(false));
        dispatch(ActionCreator.errorLoadingData(true));
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
  postFilmComment: (filmId, comment) => (dispatch, getState, api) => {
    dispatch(ActionCreator.errorLoadingData(false));
    dispatch(ActionCreator.disableForm(true));
    return api.post(`/comments/${filmId}`, {
      rating: comment.rating,
      comment: comment.comment,
    })
      .then(() => {
        dispatch(ActionCreator.errorLoadingData(false));
        dispatch(ActionCreator.disableForm(false));
      })
      .catch(() => {
        dispatch(ActionCreator.errorLoadingData(true));
        dispatch(ActionCreator.disableForm(false));
      });
  },
  loadFavoriteFilms: () => (dispatch, getState, api) => {
    dispatch(ActionCreator.errorLoadingData(false));
    return api.get(`/favorite`)
      .then((response) => {
        dispatch(ActionCreator.loadFavoriteFilms(response.data.map((unRowFilm) => filmAdapter(unRowFilm))));
        dispatch(ActionCreator.errorLoadingData(false));
      })
      .catch(() => {
        dispatch(ActionCreator.errorLoadingData(true));
      });
  },
  postFavoriteFilm: (filmId, isFavorite) => (dispatch, getState, api) => {
    dispatch(ActionCreator.errorLoadingData(false));
    const status = isFavorite ? 1 : 0;
    return api.post(`/favorite/${filmId}/${status}`, {
      isFavoriteFilm: status,
    })
      .then(() => {
        dispatch(ActionCreator.errorLoadingData(false));
        dispatch(ActionCreator.setFavoriteFilms(filmId, isFavorite));
      })
      .catch(() => {
        dispatch(ActionCreator.errorLoadingData(true));
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
    case ActionType.LOAD_FAVORITE_FILMS:
      return extend(state, {
        favoriteFilms: action.payload,
      });
    case ActionType.IS_LOADING_FILMS:
      return extend(state, {
        isLoadingFilms: action.payload,
      });
    case ActionType.IS_LOADING_PROMO_FILM:
      return extend(state, {
        isLoadingPromoFilm: action.payload,
      });
    case ActionType.LOAD_FILM_COMMENTS:
      return extend(state, {
        filmComments: action.payload,
      });
    case ActionType.IS_ERROR_DATA:
      return extend(state, {
        isError: action.payload,
      });
    case ActionType.IS_DISABLE_FORM:
      return extend(state, {
        isDisableForm: action.payload,
      });
    case ActionType.SET_FAVORITE_FILMS:
      const filmIndex = state.films
        .findIndex((film) => film === state.films.find((currentFilm) => {
          return currentFilm.id === action.payload;
        }));

      return state.promoFilm.id === action.payload ?
        extend(state, {
          promoFilm: Object.assign({}, state.promoFilm, {
            isFavoriteFilm: action.isFavorite
          }),
        })
        :
        extend(state, {
          films: []
            .concat(state.films.slice(0, filmIndex),
                Object.assign({}, state.films[filmIndex], {isFavoriteFilm: action.isFavorite}),
                state.films.slice(filmIndex + 1)),
        });
  }
  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
