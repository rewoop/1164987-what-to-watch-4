import * as React from "react";
import FilmsList from "../films-list/films-list";
import GenresList from "../genres-list/genres-list";
import ShowMore from "../show-more/show-more";
import Header from "../header/header";
import Footer from "../footer/footer";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {Film, Films} from "../../types";

interface Props {
  film: Film;
  films: Films;
  genres: string[];
  isFavoriteStatus: boolean;
  activeGenreFilter: string;
  onGenreClickHandler: () => void;
  onShowButtonClickHandler: () => void;
  onMyListClickHandler: () => void;
  isMoreFilms: boolean;
  isErrorLoadingFilms: boolean;
  isSignIn: string;
  showedFilmsCount: number;
}

const Main: React.FunctionComponent<Props> = (props: Props) => {
  const {
    film,
    films,
    genres,
    onGenreClickHandler,
    onShowButtonClickHandler,
    activeGenreFilter,
    isMoreFilms,
    showedFilmsCount,
    isSignIn,
    isErrorLoadingFilms,
    onMyListClickHandler,
    isFavoriteStatus
  } = props;

  const {id, filmTitle, filmGenre, releaseDate, filmPoster, backgroundPoster} = film;

  return (
    <React.Fragment>
      <section className="movie-card">
        <div className="movie-card__bg">
          <img src={backgroundPoster} alt={filmTitle}/>
        </div>

        <Header isSignIn={isSignIn}/>

        <div className="movie-card__wrap">
          <div className="movie-card__info">
            <div className="movie-card__poster">
              <img src={filmPoster} alt={filmTitle} width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <h2 className="movie-card__title">{filmTitle}</h2>
              <p className="movie-card__meta">
                <span className="movie-card__genre">{filmGenre}</span>
                <span className="movie-card__year">{releaseDate}</span>
              </p>

              <div className="movie-card__buttons">
                <Link to={`${AppRoute.FILM_PAGE}/${id}${AppRoute.VIDEO_PLAYER}`}
                  className="btn btn--play movie-card__button"
                  type="button"
                >
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"/>
                  </svg>
                  <span>Play</span>
                </Link>
                <button className="btn btn--list movie-card__button" type="button"
                  onClick={onMyListClickHandler}>
                  {isFavoriteStatus ?
                    <svg viewBox="0 0 18 14" width="18" height="14">
                      <use xlinkHref="#in-list"/>
                    </svg> :
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
                  }
                  <span>My list</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          {isErrorLoadingFilms ? `` :
            <GenresList
              genres={genres}
              onGenreClickHandler={onGenreClickHandler}
              activeGenreFilter={activeGenreFilter}
            />}

          <FilmsList
            films={films.slice(0, showedFilmsCount)}
          />

          {isMoreFilms && (films.length - showedFilmsCount) > 0 ?
            <ShowMore
              onShowButtonClickHandler={onShowButtonClickHandler}
            /> : ``}
        </section>

        <Footer />
      </div>
    </React.Fragment>
  );
};

export default Main;
