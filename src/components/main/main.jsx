import React from "react";
import PropTypes from "prop-types";
import FilmsList from "../films-list/films-list.jsx";
import GenresList from "../genres-list/genres-list.jsx";
import ShowMore from "../show-more/show-more.jsx";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const Main = (props) => {
  const {promoFilm, films, genres, onTitleClickHandler, onPosterClickHandler, onGenreClickHandler, onShowButtonClickHandler, activeGenreFilter, isMoreFilms, showedFilmsCount, onPlayButtonClickHandler, isSignIn, onSignInClickHandler, loadingDataStatus} = props;
  const {filmTitle, filmVideo, filmGenre, releaseDate, filmPoster, backgroundPoster} = promoFilm;

  return (
    loadingDataStatus ? <h1>EXTERNAL SERVER ERROR</h1> :
      <React.Fragment>
        <section className="movie-card">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={filmTitle}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="user-block">
              {isSignIn === AuthorizationStatus.AUTH ?
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
                :
                <a onClick={onSignInClickHandler} style={{cursor: `pointer`}}>Sign In</a>
              }
            </div>
          </header>

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
                  <button
                    className="btn btn--play movie-card__button"
                    type="button"
                    onClick={() => onPlayButtonClickHandler({filmTitle, filmVideo})}
                  >
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"/>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"/>
                    </svg>
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

            <GenresList
              genres={genres}
              onGenreClickHandler={onGenreClickHandler}
              activeGenreFilter={activeGenreFilter}
            />

            <FilmsList
              films={films.slice(0, showedFilmsCount)}
              onTitleClickHandler={onTitleClickHandler}
              onPosterClickHandler={onPosterClickHandler}
            />

            {isMoreFilms && (films.length - showedFilmsCount) > 0 ?
              <ShowMore
                onShowButtonClickHandler={onShowButtonClickHandler}
              /> : ``}
          </section>

          <footer className="page-footer">
            <div className="logo">
              <a className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </React.Fragment>
  );
};

Main.propTypes = {
  promoFilm: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      filmTitle: PropTypes.string.isRequired,
      filmVideo: PropTypes.string.isRequired,
      filmGenre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      backgroundPoster: PropTypes.string.isRequired,
      filmPoster: PropTypes.string.isRequired,
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
  onTitleClickHandler: PropTypes.func.isRequired,
  onPosterClickHandler: PropTypes.func.isRequired,
  onGenreClickHandler: PropTypes.func.isRequired,
  onShowButtonClickHandler: PropTypes.func.isRequired,
  onPlayButtonClickHandler: PropTypes.func.isRequired,
  onSignInClickHandler: PropTypes.func.isRequired,
  isMoreFilms: PropTypes.bool.isRequired,
  loadingDataStatus: PropTypes.bool.isRequired,
  isSignIn: PropTypes.string.isRequired,
  showedFilmsCount: PropTypes.number.isRequired,
};

export default Main;
