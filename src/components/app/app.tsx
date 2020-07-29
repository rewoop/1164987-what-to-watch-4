import * as React from "react";
import {Switch, Route, Router} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/list/list";
import {getFilmsByGenre, isMoreFilm} from "../../reducer/list/selectors";
import {getGenres, getPromoFilm, getLoadingFilmsStatus, getLoadingPromoFilmStatus, getDisableFormStatus, getFilmComments, getErrorLoadingDataStatus} from "../../reducer/data/selectors";
import {getAuthorizationStatus, getErrorAuthorizationStatus} from "../../reducer/user/selectors";
import Main from "../main/main";
import FilmPage from "../film-page/film-page";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import FullVideoPlayer from "../full-video-player/full-video-player";
import withFullVideo from "../../hocs/with-full-video/with-full-video";
import SignIn from "../sign-in/sign-in";
import {ALL_GENRES} from "../../const";
import {Operation as UserOperation} from "../../reducer/user/user";
import {Operation as DataOperation} from "../../reducer/data/data";
import {formatRunTimeDate} from "../../utils";
import Loading from "../loading/loading";
import AddReview from "../add-review/add-review";
import withReview from "../../hocs/with-review/with-review";
import history from "../../history";
import {AppRoute} from "../../const";
import PrivateRoute from "../private-route/private-route";
import MyList from "../my-list/my-list";
import withFavoriteFilm from "../../hocs/with-favorite-film/with-favorite-film";
import {Film, Films, FilmComments} from "../../types";

interface Props {
  promoFilm: Film;
  filmComments: FilmComments;
  films: Films;
  filmsByGenre: Films;
  activeGenreFilter: string;
  genresList: string[];
  onGenreClickHandler: () => void;
  onShowButtonClickHandler: () => void;
  isMoreFilms: boolean;
  showedFilmsCount: number;
  authorizationStatus: string;
  isValidAuthorization: boolean;
  isLoadingFilms: boolean;
  isLoadingPromoFilm: boolean;
  isErrorLoadingFilms: boolean;
  isDisableReviewForm: boolean;
  login: (authData: object) => Promise<object>;
  postFilmComment: (activeFilmId: number, reviewData: object) => Promise<object>;
  onMyListClickHandler: (id: number, b: boolean) => void;
  getCommentByFilmId: () => void;
}

const MainWrapped = withFavoriteFilm(Main);
const FilmPageWrapped = withFavoriteFilm(withActiveTab(FilmPage));
const FullVideoPlayerWrapped = withFullVideo(FullVideoPlayer);
const AddReviewWrapped = withReview(AddReview);

const App: React.FunctionComponent<Props> = (props: Props) => {
  const {
    isLoadingFilms,
    isLoadingPromoFilm,
    films,
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
            return <MainWrapped
              film={promoFilm}
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
                  history.goBack();
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
        <PrivateRoute exact path={AppRoute.MY_LIST} render={() => <MyList/>}> </PrivateRoute>
      </Switch>
    </Router>
  );
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
