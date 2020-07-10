import {extend} from "../../utils.js";
import {ALL_GENRES, MAX_FILMS_LENGTH} from "../../const.js";

const initialState = {
  genre: ALL_GENRES,
  showedFilmsCount: MAX_FILMS_LENGTH,
};

const ActionType = {
  SET_FILTER_BY_GENRE: `SET_FILTER_BY_GENRE`,
  SHOW_MORE_FILMS: `SHOW_MORE_FILMS`,
};

const ActionCreator = {
  setCurrentGenre: (genre) => {
    return {
      type: ActionType.SET_FILTER_BY_GENRE,
      payload: genre
    };
  },
  setFilmsByShowMoreBtnClick: () => {
    return {
      type: ActionType.SHOW_MORE_FILMS,
    };
  }
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.SET_FILTER_BY_GENRE:
      return extend(state, {
        genre: action.payload,
        showedFilmsCount: MAX_FILMS_LENGTH,
      });
    case ActionType.SHOW_MORE_FILMS:
      return extend(state, {
        showedFilmsCount: state.showedFilmsCount + MAX_FILMS_LENGTH,
      });
  }
  return state;
};


export {reducer, ActionType, ActionCreator};
