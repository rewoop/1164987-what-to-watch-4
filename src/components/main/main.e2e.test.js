import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Main from "./main";

const Settings = {
  FILM_TITLE: `The Rock`,
  FILM_GENRE: `Action`,
  RELEASE_DATE: 1996
};

const filmsInfo = [
  {
    title: `Fantastic Beasts`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Bohemian Rhapsody`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Macbeth`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `The Shawshank Redemption`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `The Green Mile`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Forrest Gump`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Schindler's List`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  },
  {
    title: `Intouchables`,
    image: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    link: `movie-page.html`
  }
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should film title be pressed`, () => {
  const onTitleClickHandler = jest.fn();
  const onPosterClickHandler = jest.fn();

  const main = shallow(
      <Main
        title={Settings.FILM_TITLE}
        genre={Settings.FILM_GENRE}
        releaseDate={Settings.RELEASE_DATE}
        films={filmsInfo}
        onTitleClickHandler={onTitleClickHandler}
        onPosterClickHandler={onPosterClickHandler}
      />
  );

  const filmPosters = main.find(`.small-movie-card`);
  const filmTitles = main.find(`.small-movie-card__link`);

  filmPosters.forEach((filmPoster) => filmPoster.props().onClick());
  filmTitles.forEach((filmTitle) => filmTitle.props().onClick());

  expect(onTitleClickHandler.mock.calls.length).toBe(filmTitles.length);
  expect(onPosterClickHandler.mock.calls.length).toBe(filmPosters.length);
});
