import React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/list/list.js";
import {getFilmsByGenre, isMoreFilm} from "../../reducer/list/selectors.js";
import {getGenres, getPromoFilm, getLoadingFilmsStatus, getLoadingPromoFilmStatus, getFavoriteFilms, getDisableFormStatus, getFilmComments, getErrorLoadingDataStatus} from "../../reducer/data/selectors.js";
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
import Loading from "../loading/loading.jsx";
import AddReview from "../add-review/add-review.jsx";
import withReview from "../../hocs/with-review/with-review.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";
import PrivateRoute from "../private-route/private-route.jsx";
import MyList from "../my-list/my-list.jsx";

const FilmPageWrapped = withActiveTab(FilmPage);
const FullVideoPlayerWrapped = withFullVideo(FullVideoPlayer);
const AddReviewWrapped = withReview(AddReview);

const App = (props) => {
  const {
    isLoadingFilms,
    isLoadingPromoFilm,
    films,
    favoriteFilms,
    login,
    isValidAuthorization,
    filmComments,
    getCommentByFilmId,
    authorizationStatus,
    postFilmComment,
    isDisableReviewForm,
    promoFilm,
    filmsByGenre,
    genresList,
    onGenreClickHandler,
    onShowButtonClickHandler,
    activeGenreFilter,
    isMoreFilms,
    showedFilmsCount,
    isErrorLoadingFilms,
    onMyListClickHandler
  } = props;

  if (isLoadingFilms || isLoadingPromoFilm) {
    return <Loading />;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={AppRoute.ROOT}
          render={() => {
            return <Main
              promoFilm={promoFilm}
              genres={genresList}
              films={activeGenreFilter === ALL_GENRES ? films : filmsByGenre}
              onGenreClickHandler={onGenreClickHandler}
              onShowButtonClickHandler={onShowButtonClickHandler}
              activeGenreFilter={activeGenreFilter}
              isMoreFilms={isMoreFilms}
              showedFilmsCount={showedFilmsCount}
              isSignIn={authorizationStatus}
              isErrorLoadingFilms={isErrorLoadingFilms}
              onMyListClickHandler={onMyListClickHandler}
            />;
          }}>
        </Route>
        <Route exact path={AppRoute.LOGIN}
          render={() => {
            return <SignIn
              onSubmit={(authData) => {
                login(authData).then(() => {
                  history.push(AppRoute.ROOT);
                });
              }}
              isValid={isValidAuthorization}
            />;
          }}>
        </Route>
        <Route exact path={`${AppRoute.FILM_PAGE}/:id`}
          render={(routeProps) => {
            const currentFilmId = Number(routeProps.match.params.id);
            const activeFilm = films.find((film) => film.id === currentFilmId);
            const sortedFilms = films.filter((film) => film.filmGenre === activeFilm.filmGenre);

            return <FilmPageWrapped
              film={activeFilm}
              sortedFilms={sortedFilms}
              comments={filmComments}
              getCommentByFilmId={getCommentByFilmId}
              isSignIn={authorizationStatus}
              onMyListClickHandler={onMyListClickHandler}
            />;
          }}>
        </Route>
        <Route exact path={`${AppRoute.FILM_PAGE}/:id${AppRoute.VIDEO_PLAYER}`}
          render={(routeProps) => {
            const currentFilmId = Number(routeProps.match.params.id);
            const activeFilm = films.find((film) => film.id === currentFilmId);

            return <FullVideoPlayerWrapped
              title={activeFilm.filmTitle}
              film={activeFilm.filmVideo}
            />;
          }}>
        </Route>
        <PrivateRoute exact path={`${AppRoute.FILM_PAGE}/:id${AppRoute.FILM_REVIEW}`}
          render={(routeProps) => {
            const currentFilmId = Number(routeProps.match.params.id);
            const activeFilm = films.find((film) => film.id === currentFilmId);

            return <AddReviewWrapped
              film={activeFilm}
              isDisable={isDisableReviewForm}
              onSubmit={(reviewData) => {
                postFilmComment(activeFilm.id, reviewData).then(() => {
                  history.push(`${AppRoute.FILM_PAGE}/${activeFilm.id}`);
                });
              }}
            />;
          }}>
        </PrivateRoute>
        <PrivateRoute exact path={AppRoute.MY_LIST}
          render={() => {
            return <MyList
              films={favoriteFilms}
              isSignIn={authorizationStatus}
            />;
          }}>
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

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
  favoriteFilms: PropTypes.oneOfType([
    PropTypes.array,
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
  isValidAuthorization: PropTypes.bool.isRequired,
  isLoadingFilms: PropTypes.bool.isRequired,
  isLoadingPromoFilm: PropTypes.bool.isRequired,
  isErrorLoadingFilms: PropTypes.bool.isRequired,
  isDisableReviewForm: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  postFilmComment: PropTypes.func.isRequired,
  onMyListClickHandler: PropTypes.func.isRequired,
  getCommentByFilmId: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    promoFilm: getPromoFilm(state),
    filmComments: getFilmComments(state),
    activeGenreFilter: state.LIST.genre,
    films: state.DATA.films,
    favoriteFilms: getFavoriteFilms(state),
    filmsByGenre: getFilmsByGenre(state),
    genresList: getGenres(state),
    runTime: formatRunTimeDate(getPromoFilm(state).filmRunTime),
    isMoreFilms: isMoreFilm(state),
    showedFilmsCount: state.LIST.showedFilmsCount,
    authorizationStatus: getAuthorizationStatus(state),
    isValidAuthorization: getErrorAuthorizationStatus(state),
    isLoadingFilms: getLoadingFilmsStatus(state),
    isLoadingPromoFilm: getLoadingPromoFilmStatus(state),
    isDisableReviewForm: getDisableFormStatus(state),
    isErrorLoadingFilms: getErrorLoadingDataStatus(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    return dispatch(UserOperation.login(authData));
  },
  onGenreClickHandler(genre) {
    dispatch(ActionCreator.setCurrentGenre(genre));
  },
  onShowButtonClickHandler() {
    dispatch(ActionCreator.setFilmsByShowMoreBtnClick());
  },
  getCommentByFilmId(filmId) {
    dispatch(DataOperation.loadFilmComments(filmId));
  },
  postFilmComment(filmId, comment) {
    return dispatch(DataOperation.postFilmComment(filmId, comment));
  },
  onMyListClickHandler(filmId, isFavorite) {
    dispatch(DataOperation.postFavoriteFilm(filmId, isFavorite));
  }
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
