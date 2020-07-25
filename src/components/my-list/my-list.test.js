import React from "react";
import renderer from "react-test-renderer";
import MyList from "./my-list.jsx";

jest.mock(`react-router-dom`);

const films = [
  {
    id: 666,
    filmTitle: `Fantastic Beasts`,
    filmImage: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    filmVideo: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    filmGenre: `Comedy`
  }
];

it(`Should MyList component render correctly`, () => {
  const tree = renderer.create(
      <MyList
        films={films}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
