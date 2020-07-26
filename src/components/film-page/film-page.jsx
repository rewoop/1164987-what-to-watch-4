import React from "react";
import PropTypes from "prop-types";
import Tabs from "../tabs/tabs.jsx";
import FilmCard from "../film-card/film-card.jsx";
import withVideo from "../../hocs/with-video/with-video";
import Header from "../header/header.jsx";
import Footer from "../footer/footer.jsx";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";

const FilmCardWrapped = withVideo(FilmCard);

const FilmPage = (props) => {
  const {film,
    sortedFilms,
    activeTab,
    setActiveTab,
    renderActiveTab,
    isSignIn,
    onMyListClickHandler,
    isFavoriteStatus
  } = props;

  const {id, filmTitle, filmGenre, releaseDate, backgroundPoster, filmPoster} = film;

  const filteredFilms = sortedFilms.filter((currentFilm) => currentFilm.id !== id);

  return (
    <React.Fragment>
      <section className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={filmTitle}/>
          </div>

          <Header isSignIn={isSignIn}/>

          <div className="movie-card__wrap">
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

                <Link to={`${AppRoute.FILM_PAGE}/${id}${AppRoute.FILM_REVIEW}`}
                  className="btn movie-card__button">
                    Add review
                </Link>

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
                />;
              })}
            </div>
          </section>
        ) : ``
        }

        <Footer />
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
  isFavoriteStatus: PropTypes.bool.isRequired,
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  renderActiveTab: PropTypes.func.isRequired,
  onMyListClickHandler: PropTypes.func.isRequired,
  sortedFilms: PropTypes.arrayOf(
      PropTypes.shape({
        filmTitle: PropTypes.string.isRequired,
        filmVideo: PropTypes.string.isRequired,
        filmGenre: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  isSignIn: PropTypes.string.isRequired,
};

export default FilmPage;
