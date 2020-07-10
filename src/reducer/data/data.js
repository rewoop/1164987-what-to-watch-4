import {extend} from "../../utils.js";
import film from "../../mocks/film.js";
import filmAdapter from "../../components/adapters/film-adapter.js";

const initialState = {
  films: [],
  film
};

const ActionType = {
  LOAD_FILMS: `LOAD_FILMS`,
  LOAD_PROMO_FILM: `LOAD_PROMO_FILM`,
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
  }
};

const Operation = {
  loadFilms: () => (dispatch, getState, api) => {
    return api.get(`/films`)
      .then((response) => {
        dispatch(ActionCreator.loadFilms(response.data.map((unRowFilm) => filmAdapter(unRowFilm))));
      })
      .catch((err) => {
        throw err;
      });
  },
  // loadPromoFilm: () => (dispatch, getState, api) => {
  //   return api.get(`/films/promo`)
  //     .then((response) => {
  //       dispatch(ActionCreator.loadPromoFilm(response.data));
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_FILMS:
      return extend(state, {
        films: action.payload,
      });
    // case ActionType.LOAD_PROMO_FILM:
    //   return extend(state, {
    //     film: action.payload,
    //   });
  }

  return state;
};


export {reducer, ActionType, ActionCreator, Operation};
