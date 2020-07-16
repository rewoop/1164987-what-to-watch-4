import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/list/list.js";
import {getFilmsByGenre, isMoreFilm} from "../../reducer/list/selectors.js";
import {getGenres, getPromoFilm, getErrorDataStatus, getFilmComments} from "../../reducer/data/selectors.js";
import {getAuthorizationStatus, getErrorAuthorizationStatus} from "../../reducer/user/selectors.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";
import withFullVideo from "../../hocs/with-full-video/with-full-video.js";
import SignIn from "../sign-in/sign-in.jsx";
import {ALL_GENRES} from "../../const.js";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";
import {formatRunTimeDate} from "../../utils";

const FilmPageWrapped = withActiveTab(FilmPage);
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

  _getFilmsByGenre() {
    const {films} = this.props;
    const {activePage} = this.state;

    return films.filter((film) => film.filmGenre === activePage.filmGenre);
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
    const {promoFilm, films, filmsByGenre, genresList, onGenreClickHandler, onShowButtonClickHandler, activeGenreFilter, isMoreFilms, showedFilmsCount, authorizationStatus, errorDataStatus} = this.props;

    return (
      <Main
        promoFilm={promoFilm}
        genres={genresList}
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
        errorDataStatus={errorDataStatus}
      />
    );
  }

  _renderFilmPage() {
    const {activePage} = this.state;
    const {filmComments, getCommentByFilmId} = this.props;

    return <FilmPageWrapped
      film={activePage}
      sortedFilms={this._getFilmsByGenre()}
      onPlayButtonClickHandler={this._onPlayButtonClickHandler}
      onTitleClickHandler={this._onTitleClickHandler}
      onPosterClickHandler={this._onTitleClickHandler}
      comments={filmComments}
      getCommentByFilmId={getCommentByFilmId}
    />;
  }

  _renderFullVideoPlayer(film) {
    return <FullVideoPlayerWrapped
      title={film.filmTitle}
      film={film.filmVideo}
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
  promoFilm: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.shape({
      filmTitle: PropTypes.string.isRequired,
      filmVideo: PropTypes.string.isRequired,
      filmGenre: PropTypes.string.isRequired,
      releaseDate: PropTypes.number.isRequired,
      backgroundPoster: PropTypes.string.isRequired,
      filmPoster: PropTypes.string.isRequired,
      ratingScore: PropTypes.number.isRequired,
      ratingLevel: PropTypes.number.isRequired,
      ratingCount: PropTypes.string.isRequired,
      filmDescription: PropTypes.string.isRequired,
      filmDirector: PropTypes.string.isRequired,
      filmStarring: PropTypes.arrayOf(
          PropTypes.string.isRequired
      ).isRequired,
      runTime: PropTypes.string.isRequired,
    })
  ]).isRequired,
  filmComments: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(
        PropTypes.shape({
          filmGenre: PropTypes.string,
          filmImage: PropTypes.string,
          filmVideo: PropTypes.string,
          filmTitle: PropTypes.string,
        })
    )
  ]).isRequired,
  activeGenreFilter: PropTypes.string.isRequired,
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
  onGenreClickHandler: PropTypes.func.isRequired,
  onShowButtonClickHandler: PropTypes.func.isRequired,
  isMoreFilms: PropTypes.bool.isRequired,
  showedFilmsCount: PropTypes.number.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  errorAuthorizationStatus: PropTypes.bool.isRequired,
  errorDataStatus: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  getCommentByFilmId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    promoFilm: getPromoFilm(state),
    filmComments: getFilmComments(state),
    activeGenreFilter: state.LIST.genre,
    films: state.DATA.films,
    filmsByGenre: getFilmsByGenre(state),
    genresList: getGenres(state),
    runTime: formatRunTimeDate(getPromoFilm(state).filmRunTime),
    isMoreFilms: isMoreFilm(state),
    showedFilmsCount: state.LIST.showedFilmsCount,
    authorizationStatus: getAuthorizationStatus(state),
    errorAuthorizationStatus: getErrorAuthorizationStatus(state),
    errorDataStatus: getErrorDataStatus(state),
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
  },
  getCommentByFilmId(filmId) {
    dispatch(DataOperation.loadFilmComments(filmId));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
