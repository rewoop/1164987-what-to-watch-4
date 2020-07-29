import * as React from "react";

interface Props {
  activeGenreFilter: string;
  genres: string[];
  onGenreClickHandler: (genre: string) => void;
}

const GenresList: React.FunctionComponent<Props> = (props: Props) => {
  const {genres, onGenreClickHandler, activeGenreFilter} = props;

  return (
    <React.Fragment>
      <ul className="catalog__genres-list">
        {genres.map((genre) => {
          return (
            <li key={genre} className={ activeGenreFilter === genre ?
              `catalog__genres-item catalog__genres-item--active` : `catalog__genres-item`}
            onClick={() => onGenreClickHandler(genre)}
            >
              <a href="#" className="catalog__genres-link">{genre}</a>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

export default GenresList;
