import {reducer, ActionType} from "./reducer.js";

const getGenresList = (films) => {
  return [`All genres`].concat(Array.from(new Set(films.map((film) => film.genre))));
};

const filterFilms = (films, genre) => {
  return films.filter((film) => film.genre === genre);
};

const film = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Thriller`,
  RELEASE_DATE: 1996,
  RUN_TIME: `1h 39m`,
  BACKGROUND_POSTER: `img/bg-the-grand-budapest-hotel.jpg`,
  FILM_POSTER: `img/the-grand-budapest-hotel-poster.jpg`,
  RATING: {
    SCORE: `9.0`,
    LEVEL: `Very good`,
    COUNT: `1337 ratings`
  },
  FILM_DESCRIPTION: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
  Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  FILM_DIRECTOR: `Wes Andreson`,
  FILM_STARRING: [
    `Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Tom Cruz`
  ],
  REVIEWS: [
    {
      id: `0`,
      author: `Kate Muir`,
      text: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
      date: `December 24, 2016`,
      rating: `8,9`,
    },
    {
      id: `1`,
      author: `Bill Goodykoontz`,
      text: `Anderson's films are too precious for some, but for those of us willing to lose ourselves in them, they're a delight. "The Grand Budapest Hotel" is no different, except that he has added a hint of gravitas to the mix, improving the recipe.`,
      date: `November 18, 2015`,
      rating: `8,0`,
    },
    {
      id: `2`,
      author: `Amanda Greever`,
      text: `I didn't find it amusing, and while I can appreciate the creativity, it's an hour and 40 minutes I wish I could take back.`,
      date: `November 18, 2015`,
      rating: `8,0`,
    },
  ],
};

const films = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Comedy`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `img/bohemian-rhapsody.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Crime`
  },
  {
    title: `Macbeth`,
    image: `img/macbeth.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Documentary`
  },
  {
    title: `Aviator`,
    image: `img/aviator.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Drama`
  },
  {
    title: `We need to talk about Kevin`,
    image: `img/we-need-to-talk-about-kevin.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Thriller`
  },
  {
    title: `What We Do in the Shadows`,
    image: `img/what-we-do-in-the-shadows.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Horror`
  },
  {
    title: `Revenant`,
    image: `img/revenant.jpg`,
    link: `movie-page.html`,
    src: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    genre: `Thriller`
  },
  {
    title: `Johnny English`,
    image: `img/johnny-english.jpg`,
    link: `movie-page.html`,
    src: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    genre: `Romance`
  }
];

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    genre: `All genres`,
    genresList: getGenresList(films),
    film,
    films: films.slice(0, 8),
    filmsByGenre: null,
    isMoreFilms: true,
    isGenreSort: false
  });
});

it(`Reducer should set current filter by a given value`, () => {
  expect(reducer({
    genre: `All genres`,
  }, {
    type: ActionType.SET_FILTER_BY_GENRE,
    genre: `Action`,
    films,
  })).toEqual({
    genre: `Action`,
    films,
    isMoreFilms: false,
    isGenreSort: true,
  });

  expect(reducer({
    genre: `All genres`,
  }, {
    type: ActionType.SET_FILTER_BY_GENRE,
    genre: `Comedy`,
    films,
  })).toEqual({
    genre: `Comedy`,
    films,
    isMoreFilms: false,
    isGenreSort: true,
  });
});

it(`Reducer should render filtered films by a given current genre`, () => {
  expect(reducer({
    genre: `All genres`,
    films,
  }, {
    type: ActionType.SET_FILTER_BY_GENRE,
    genre: `Drama`,
    films: filterFilms(films, `Drama`),
    filmsByGenre: filterFilms(films, `Drama`),
  })).toEqual({
    genre: `Drama`,
    films: filterFilms(films, `Drama`),
    filmsByGenre: filterFilms(films, `Drama`),
    isMoreFilms: false,
    isGenreSort: true,
  });

  expect(reducer({
    genre: `All genres`,
    films,
  }, {
    type: ActionType.SET_FILTER_BY_GENRE,
    genre: `Horror`,
    films: filterFilms(films, `Horror`),
    filmsByGenre: filterFilms(films, `Horror`),
  })).toEqual({
    genre: `Horror`,
    films: filterFilms(films, `Horror`),
    filmsByGenre: filterFilms(films, `Horror`),
    isMoreFilms: false,
    isGenreSort: true,
  });
});

it(`Reducer should show more films by a press the button`, () => {
  expect(reducer({
    genre: `All genres`,
    films,
    filmsByGenre: films,
    isMoreFilms: true,
    isGenreSort: false,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
    films,
  })).toEqual({
    genre: `All genres`,
    films,
    filmsByGenre: films,
    isMoreFilms: false,
    isGenreSort: false,
  });

  expect(reducer({
    genre: `Horror`,
    films: filterFilms(films, `Horror`),
    filmsByGenre: filterFilms(films, `Horror`),
    isMoreFilms: true,
    isGenreSort: true,
  }, {
    type: ActionType.SHOW_MORE_FILMS,
    films,
  })).toEqual({
    genre: `Horror`,
    films: filterFilms(films, `Horror`),
    filmsByGenre: filterFilms(films, `Horror`),
    isMoreFilms: false,
    isGenreSort: false,
  });
});
