import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import FilmCard from "../film-card/film-card.jsx";
import withVideo from "../../hocs/with-video/with-video";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const FilmCardWrapped = withVideo(FilmCard);

const FilmPage = (props) => {
  const {film,
    sortedFilms,
    onPlayButtonClickHandler,
    activeTab,
    setActiveTab,
    renderActiveTab,
    onTitleClickHandler,
    onPosterClickHandler,
    onAddReviewClickHandler,
    onSignInClickHandler,
    isSignIn} = props;

  const {id, filmTitle, filmGenre, releaseDate, filmVideo, backgroundPoster, filmPoster} = film;

  const filteredFilms = sortedFilms.filter((currentFilm) => currentFilm.id !== id);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={filmTitle}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header movie-card__head">
            <div className="logo">
              <a href="main.html" className="logo__link">
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
                  onClick={() => onPlayButtonClickHandler({filmTitle, filmVideo})}>
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
                {isSignIn === AuthorizationStatus.AUTH ?
                  <a href="add-review.html" className="btn movie-card__button" onClick={(evt) => onAddReviewClickHandler(evt)}>Add review</a>
                  : ``}
              </div>
            </div>
          </div>
        </div>

        <div className="movie-card__wrap movie-card__translate-top">
          <div className="movie-card__info">
            <div className="movie-card__poster movie-card__poster--big">
              <img src={filmPoster} alt={filmTitle} width="218" height="327"/>
            </div>

            <div className="movie-card__desc">
              <nav className="movie-nav movie-card__nav">
                <Tabs
                  onLinkClickHandler={setActiveTab}
                  currentTab={activeTab}
                />
              </nav>

              {renderActiveTab()}
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">

        {filteredFilms.length > 0 ? (
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>
            <div className="catalog__movies-list">
              {filteredFilms.map((currentFilm) => {
                return <FilmCardWrapped
                  key={currentFilm.filmTitle}
                  film={currentFilm}
                  onTitleClickHandler={onTitleClickHandler}
                  onPosterClickHandler={onPosterClickHandler}
                />;
              })}
            </div>
          </section>
        ) : ``
        }

        <footer className="page-footer">
          <div className="logo">
            <a href="main.html" className="logo__link logo__link--light">
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

FilmPage.propTypes = {
  film: PropTypes.shape({
    id: PropTypes.number.isRequired,
    filmTitle: PropTypes.string.isRequired,
    filmGenre: PropTypes.string.isRequired,
    filmVideo: PropTypes.string.isRequired,
    releaseDate: PropTypes.number.isRequired,
    backgroundPoster: PropTypes.string.isRequired,
    filmPoster: PropTypes.string.isRequired,
  }),
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  renderActiveTab: PropTypes.func.isRequired,
  sortedFilms: PropTypes.array.isRequired,
  onPlayButtonClickHandler: PropTypes.func.isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onPosterClickHandler: PropTypes.func.isRequired,
  onAddReviewClickHandler: PropTypes.func.isRequired,
  onSignInClickHandler: PropTypes.func.isRequired,
  isSignIn: PropTypes.string.isRequired,
};

export default FilmPage;
