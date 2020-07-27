import * as React from "react";
import FilmCard from "../film-card/film-card";
import withVideo from "../../hocs/with-video/with-video";

interface Props {
  films: {
    id: number,
    filmTitle: string,
    filmVideo: string,
    filmGenre: string,
    releaseDate: number,
    backgroundPoster: string,
    filmPoster: string,
    ratingScore: number,
    ratingLevel: number,
    ratingCount: string,
    filmDescription: string,
    filmDirector: string,
    filmStarring: string[],
    runTime: string,
    isFavoriteFilm: boolean
  }[]
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
