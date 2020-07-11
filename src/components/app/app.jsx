import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/list/list.js";
import {getFilmsByGenre, isMoreFilm} from "../../reducer/list/selectors.js";
import {getGenres} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import FilmCard from "../film-card/film-card.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import withVideo from "../../hocs/with-video/with-video";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.js";
import {ALL_GENRES} from "../../const.js";

const FilmPageWrapped = withActiveTab(FilmPage);
const FilmCardWrapped = withVideo(FilmCard);
const FullVideoPlayerWrapped = withFullVideo(FullVideoPlayer);

class App extends PureComponent {
  constructor() {
    super();

    this._onTitleClickHandler = this._onTitleClickHandler.bind(this);
    this._onPlayButtonClickHandler = this._onPlayButtonClickHandler.bind(this);
    this._onExitButtonClickHandler = this._onExitButtonClickHandler.bind(this);

    this.state = {
      activePage: {},
      filmSource: {},
      isVideoPlayer: false
    };
  }

  _getFilmsByGenre(genre) {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.filter((film) => film.FILM_GENRE === genre).map((film) => {
          return <FilmCardWrapped
            key={film.FILM_TITLE}
            film={film}
            onTitleClickHandler={this._onTitleClickHandler}
            onPosterClickHandler={this._onTitleClickHandler}
          />;
        })}
      </div>
    );
  }

  _onTitleClickHandler(film) {
    this.setState({
      activePage: film
    });
  }

  _onPlayButtonClickHandler(filmForPlayer) {
    this.setState({
      filmSource: filmForPlayer,
      isVideoPlayer: true
    });
  }

  _onExitButtonClickHandler() {
    this.setState({
      filmSource: {},
      isVideoPlayer: false
    });
  }

  _renderApp() {
    const {activePage, filmSource, isVideoPlayer} = this.state;

    if (isVideoPlayer) {
      return this._renderFullVideoPlayer(filmSource);
    }

    return Object.keys(activePage).length === 0 ? this._renderMain() : this._renderFilmPage();
  }

  _renderMain() {
    const {filmTitle, filmSrc, filmGenre, filmReleaseDate, films, filmsByGenre, genresList, onGenreClickHandler, onShowButtonClickHandler, activeGenreFilter, isMoreFilms, showedFilmsCount} = this.props;

    return (
      <Main title={filmTitle}
        src={filmSrc}
        genre={filmGenre}
        genres={genresList}
        releaseDate={filmReleaseDate}
        films={activeGenreFilter === ALL_GENRES ? films : filmsByGenre}
        onTitleClickHandler={this._onTitleClickHandler}
        onPosterClickHandler={this._onTitleClickHandler}
        onGenreClickHandler={onGenreClickHandler}
        onShowButtonClickHandler={onShowButtonClickHandler}
        activeGenreFilter={activeGenreFilter}
        isMoreFilms={isMoreFilms}
        showedFilmsCount={showedFilmsCount}
        onPlayButtonClickHandler={this._onPlayButtonClickHandler}
      />
    );
  }

  _renderFilmPage() {
    const {filmGenre} = this.props;

    return <FilmPageWrapped
      {...this.props}
      sortedFilms={this._getFilmsByGenre(filmGenre)}
      onPlayButtonClickHandler={this._onPlayButtonClickHandler}
    />;
  }

  _renderFullVideoPlayer(film) {
    return <FullVideoPlayerWrapped
      title={film.title}
      film={film.src}
      onExitButtonClickHandler={this._onExitButtonClickHandler}
    />;
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderApp()}
          </Route>
          <Route exact path="/dev-film">
            {this._renderFilmPage()}
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}


App.propTypes = {
  activeGenreFilter: PropTypes.string.isRequired,
  filmTitle: PropTypes.string.isRequired,
  filmSrc: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmReleaseDate: PropTypes.number.isRequired,
  films: PropTypes.arrayOf(
      PropTypes.shape({
        FILM_GENRE: PropTypes.string.isRequired,
        FILM_IMAGE: PropTypes.string.isRequired,
        FILM_VIDEO: PropTypes.string.isRequired,
        FILM_TITLE: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  filmsByGenre: PropTypes.arrayOf(
      PropTypes.shape({
        FILM_GENRE: PropTypes.string.isRequired,
        FILM_IMAGE: PropTypes.string.isRequired,
        FILM_VIDEO: PropTypes.string.isRequired,
        FILM_TITLE: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  genresList: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  backgroundFilmPoster: PropTypes.string.isRequired,
  filmPoster: PropTypes.string.isRequired,
  ratingScore: PropTypes.string.isRequired,
  ratingLevel: PropTypes.string.isRequired,
  ratingCount: PropTypes.string.isRequired,
  filmDescription: PropTypes.string.isRequired,
  filmDirector: PropTypes.string.isRequired,
  filmStarring: PropTypes.arrayOf(
      PropTypes.string.isRequired
  ).isRequired,
  runTime: PropTypes.string.isRequired,
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        author: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
      }
      ).isRequired
  ).isRequired,
  onGenreClickHandler: PropTypes.func.isRequired,
  onShowButtonClickHandler: PropTypes.func.isRequired,
  isMoreFilms: PropTypes.bool.isRequired,
  showedFilmsCount: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeGenreFilter: state.LIST.genre,
    filmTitle: state.DATA.film.FILM_TITLE,
    filmSrc: state.DATA.film.FILM_SRC,
    filmGenre: state.DATA.film.FILM_GENRE,
    filmReleaseDate: state.DATA.film.RELEASE_DATE,
    films: state.DATA.films,
    filmsByGenre: getFilmsByGenre(state),
    genresList: getGenres(state),
    backgroundFilmPoster: state.DATA.film.BACKGROUND_POSTER,
    filmPoster: state.DATA.film.FILM_POSTER,
    ratingScore: state.DATA.film.RATING.SCORE,
    ratingLevel: state.DATA.film.RATING.LEVEL,
    ratingCount: state.DATA.film.RATING.COUNT,
    filmDescription: state.DATA.film.FILM_DESCRIPTION,
    filmDirector: state.DATA.film.FILM_DIRECTOR,
    filmStarring: state.DATA.film.FILM_STARRING,
    runTime: state.DATA.film.RUN_TIME,
    reviews: state.DATA.film.REVIEWS,
    isMoreFilms: isMoreFilm(state),
    showedFilmsCount: state.LIST.showedFilmsCount,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onGenreClickHandler(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
  },
  onShowButtonClickHandler() {
    dispatch(ActionCreator.setFilmsByShowMoreBtnClick());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
