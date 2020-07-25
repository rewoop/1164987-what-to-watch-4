import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const Main = (props) => {
  const {
    promoFilm,
    films,
    genres,
    onGenreClickHandler,
    onShowButtonClickHandler,
    activeGenreFilter,
    isMoreFilms,
    showedFilmsCount,
    isSignIn,
    isErrorLoadingFilms,
    onMyListClickHandler
  } = props;

  const {id, filmTitle, filmGenre, releaseDate, filmPoster, backgroundPoster, isFavoriteFilm} = promoFilm;

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
                  onClick={() => onMyListClickHandler(id, !isFavoriteFilm)}>
                  {isFavoriteFilm ?
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

Main.propTypes = {
  promoFilm: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      filmTitle: PropTypes.string.isRequired,
      filmVideo: PropTypes.string.isRequired,
      filmGenre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      backgroundPoster: PropTypes.string.isRequired,
      filmPoster: PropTypes.string.isRequired,
      isFavoriteFilm: PropTypes.bool.isRequired,
    })
  ]).isRequired,
  activeGenreFilter: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        filmTitle: PropTypes.string.isRequired,
        filmImage: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  genres: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  onGenreClickHandler: PropTypes.func.isRequired,
  onShowButtonClickHandler: PropTypes.func.isRequired,
  onMyListClickHandler: PropTypes.func.isRequired,
  isMoreFilms: PropTypes.bool.isRequired,
  isErrorLoadingFilms: PropTypes.bool.isRequired,
  isSignIn: PropTypes.string.isRequired,
  showedFilmsCount: PropTypes.number.isRequired,
};

export default Main;
