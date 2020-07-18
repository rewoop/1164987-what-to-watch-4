import React from "react";
import renderer from "react-test-renderer";
import FilmPage from "./film-page.jsx";
import FilmPageOverview from "../film-page-overview/film-page-overview";

const noop = () => {};

const films = [
  {
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];


const Settings = {
  id: 1,
  filmTitle: `The Rock`,
  filmGenre: `Thriller`,
  filmVideo: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  releaseDate: 1996,
  filmRunTime: 356,
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
  reviews: [
    {
      id: 1,
      user: {
        id: 2,
        name: `Valera`,
      },
      comment: `lalala`,
      date: `12 July 1996`,
      rating: 5,
    }
  ]
};

const renderActiveTab = () => {
  return <FilmPageOverview
    ratingScore={Settings.ratingScore}
    ratingLevel={Settings.ratingLevel}
    ratingCount={Settings.ratingCount}
    filmDescription={Settings.filmDescription}
    filmDirector={Settings.filmDirector}
    filmStarring={Settings.filmStarring}
  />;
};

it(`Should FilmPage render correctly`, () => {
  const tree = renderer
    .create(<FilmPage
      film={Settings}
      comments={Settings.reviews}
      getCommentByFilmId={noop}
      sortedFilms={films}
      activeTab={`overview`}
      renderActiveTab={renderActiveTab}
      setActiveTab={noop}
      onPlayButtonClickHandler={noop}
      onPosterClickHandler={noop}
      onTitleClickHandler={noop}
      onAddReviewClickHandler={noop}
      onSignInClickHandler={noop}
      isSignIn={`NO_AUTH`}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
