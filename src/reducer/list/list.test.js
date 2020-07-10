import {reducer, ActionType} from "./list.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    showedFilmsCount: 8,
  });
});

it(`Reducer should set current filter by a given value`, () => {
  expect(reducer({
    genre: `All genres`,
  }, {
    type: ActionType.SET_FILTER_BY_GENRE,
    payload: `Action`,
  })).toEqual({
    genre: `Action`,
    showedFilmsCount: 8,
  });

  expect(reducer({
    genre: `All genres`,
  }, {
    type: ActionType.SET_FILTER_BY_GENRE,
    payload: `Comedy`,
  })).toEqual({
    genre: `Comedy`,
    showedFilmsCount: 8,
  });
});

it(`Reducer should show more films by a press the button`, () => {
  expect(reducer({
    showedFilmsCount: 8,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
  })).toEqual({
    showedFilmsCount: 16,
  });

  expect(reducer({
    showedFilmsCount: 8,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
  })).toEqual({
    showedFilmsCount: 16,
  });
});
