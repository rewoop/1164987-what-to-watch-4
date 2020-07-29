export const TestFilm = {
  id: 1,
  filmTitle: `The Rock`,
  filmGenre: `Thriller`,
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  releaseDate: 1996,
  isFavoriteFilm: true,
  runTime: `356`,
  backgroundPoster: `img/bg-the-grand-budapest-hotel.jpg`,
  filmPoster: `img/the-grand-budapest-hotel-poster.jpg`,
  ratingScore: 9,
  ratingLevel: 9,
  ratingCount: `1337 ratings`,
  filmDescription: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege.
  Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
  filmDirector: `Wes Andreson`,
  filmStarring: [
    `Bill Murray`,
    `Edward Norton`,
    `Jude Law`,
    `Willem Dafoe`,
    `Tom Cruz`
  ],
};

export const TestFilms = [TestFilm];

export const TestComment = {
  id: 0,
  user: {
    id: 1,
    name: `Kate Muir`,
  },
  comment: `Discerning travellers and Wes Anderson fans will luxuriate in the glorious Mittel-European kitsch of one of the director's funniest and most exquisitely designed movies in years.`,
  date: `December 24, 2016`,
  rating: 9,
};

export const TestComments = [TestComment];
