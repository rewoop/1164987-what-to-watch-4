import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/list/list.js";
import {getFilmsByGenre, isMoreFilm} from "../../reducer/list/selectors.js";
import {getGenres, getPromoFilm} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getErrorAuthorizationStatus} from "../../reducer/user/selectors.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import FilmCard from "../film-card/film-card.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import withVideo from "../../hocs/with-video/with-video";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.js";
import SignIn from "../sign-in/sign-in.jsx";
import {ALL_GENRES} from "../../const.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";

const FilmPageWrapped = withActiveTab(FilmPage);
const FilmCardWrapped = withVideo(FilmCard);
const FullVideoPlayerWrapped = withFullVideo(FullVideoPlayer);

class App extends PureComponent {
  constructor() {
    super();

    this._onTitleClickHandler = this._onTitleClickHandler.bind(this);
    this._onPlayButtonClickHandler = this._onPlayButtonClickHandler.bind(this);
    this._onExitButtonClickHandler = this._onExitButtonClickHandler.bind(this);
    this._onSignInClickHandler = this._onSignInClickHandler.bind(this);

    this.state = {
      activePage: {},
      filmSource: {},
      isVideoPlayer: false,
      isSignIn: false
    };
  }

  _getFilmsByGenre(genre) {
    const {films} = this.props;
    const {activePage} = this.state;
    const filteredFilms = films.filter((film) => film.filmGenre === genre && activePage.id !== film.id);

    return filteredFilms.length > 0 ? (
      <section className="catalog catalog--like-this">
        <h2 className="catalog__title">More like this</h2>
        <div className="catalog__movies-list">
          {filteredFilms.map((film) => {
            return <FilmCardWrapped
              key={film.filmTitle}
              film={film}
              onTitleClickHandler={this._onTitleClickHandler}
              onPosterClickHandler={this._onTitleClickHandler}
            />;
          })}
        </div>
      </section>
    ) : <div />;
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

  _onSignInClickHandler() {
    this.setState({
      isSignIn: true,
    });
  }

  _renderApp() {
    const {activePage, filmSource, isVideoPlayer, isSignIn} = this.state;
    const {errorAuthorizationStatus} = this.props;

    if (isVideoPlayer) {
      return this._renderFullVideoPlayer(filmSource);
    }

    if (isSignIn || errorAuthorizationStatus) {
      return this._renderSignInPage();
    }

    return Object.keys(activePage).length === 0 ? this._renderMain() : this._renderFilmPage();
  }

  _renderMain() {
    const {filmTitle, filmSrc, filmGenre, filmReleaseDate, films, filmsByGenre, genresList, onGenreClickHandler, onShowButtonClickHandler, activeGenreFilter, isMoreFilms, showedFilmsCount, authorizationStatus} = this.props;

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
        isSignIn={authorizationStatus}
        onSignInClickHandler={this._onSignInClickHandler}
      />
    );
  }

  _renderFilmPage() {
    const {activePage} = this.state;

    return <FilmPageWrapped
      {...this.props}
      sortedFilms={this._getFilmsByGenre(activePage.filmGenre)}
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

  _renderSignInPage() {
    const {login, errorAuthorizationStatus} = this.props;
    return <SignIn
      onSubmit={(authData) => {
        this.setState({
          isSignIn: false,
        });
        login(authData);
      }}
      error={errorAuthorizationStatus}
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
          <Route exact path="/dev-auth">
            {this._renderSignInPage()}
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
        filmGenre: PropTypes.string.isRequired,
        filmImage: PropTypes.string.isRequired,
        filmVideo: PropTypes.string.isRequired,
        filmTitle: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
  filmsByGenre: PropTypes.arrayOf(
      PropTypes.shape({
        filmGenre: PropTypes.string.isRequired,
        filmImage: PropTypes.string.isRequired,
        filmVideo: PropTypes.string.isRequired,
        filmTitle: PropTypes.string.isRequired,
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
  authorizationStatus: PropTypes.string.isRequired,
  errorAuthorizationStatus: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    activeGenreFilter: state.LIST.genre,
    filmTitle: getPromoFilm(state).FILM_TITLE,
    filmSrc: getPromoFilm(state).FILM_SRC,
    filmGenre: getPromoFilm(state).FILM_GENRE,
    filmReleaseDate: getPromoFilm(state).RELEASE_DATE,
    films: state.DATA.films,
    filmsByGenre: getFilmsByGenre(state),
    genresList: getGenres(state),
    backgroundFilmPoster: getPromoFilm(state).BACKGROUND_POSTER,
    filmPoster: getPromoFilm(state).FILM_POSTER,
    ratingScore: getPromoFilm(state).RATING.SCORE,
    ratingLevel: getPromoFilm(state).RATING.LEVEL,
    ratingCount: getPromoFilm(state).RATING.COUNT,
    filmDescription: getPromoFilm(state).FILM_DESCRIPTION,
    filmDirector: getPromoFilm(state).FILM_DIRECTOR,
    filmStarring: getPromoFilm(state).FILM_STARRING,
    runTime: getPromoFilm(state).RUN_TIME,
    reviews: getPromoFilm(state).REVIEWS,
    isMoreFilms: isMoreFilm(state),
    showedFilmsCount: state.LIST.showedFilmsCount,
    authorizationStatus: getAuthorizationStatus(state),
    errorAuthorizationStatus: getErrorAuthorizationStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  },
  onGenreClickHandler(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
  },
  onShowButtonClickHandler() {
    dispatch(ActionCreator.setFilmsByShowMoreBtnClick());
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
