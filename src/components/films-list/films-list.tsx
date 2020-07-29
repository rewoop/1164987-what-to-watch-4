import * as React from "react";
import FilmCard from "../film-card/film-card";
import withVideo from "../../hocs/with-video/with-video";
import {Films} from "../../types";

interface Props {
  films: Films;
}

const FilmCardWrapped = withVideo(FilmCard);

const FilmsList: React.FunctionComponent<Props> = (props: Props) => {
  const {films} = props;

  return (
    <div className="catalog__movies-list">
      {films.map((film, i) => {
        return <FilmCardWrapped
          key={`${i} - ${film.filmTitle}`}
          film={film}
        />;
      })}
    </div>
  );
};

export default FilmsList;
