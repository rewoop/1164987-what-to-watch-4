import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import FilmCard from "../film-card/film-card.jsx";
import withActiveTab from "../../hocs/with-active-tab/with-active-tab";
import withVideo from "../../hocs/with-video/with-video";
import FullVideoPlayer from "../full-video-player/full-video-player.jsx";

const FilmPageWrapped = withActiveTab(FilmPage);
const FilmCardWrapped = withVideo(FilmCard);

class App extends PureComponent {
  constructor() {
    super();

    this._onTitleClickHandler = this._onTitleClickHandler.bind(this);
    this._onPlayButtonClickHandler = this._onPlayButtonClickHandler.bind(this);

    this.state = {
      activePage: {id: 0},
    };
  }

  _getFilmsByGenre(genre) {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.filter((film) => film.genre === genre).map((film) => {
          return <FilmCardWrapped
            key={film.title}
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
      activePage: filmForPlayer
    });
  }

  _renderApp() {
    const {activePage} = this.state;

    if (activePage.id === 1) {
      return this._renderFilmPage();
    } else if (activePage.id === 2) {
      return this._renderFullVideoPlayer(activePage.film);
    } else {
      return this._renderMain();
    }
  }

  _renderMain() {
    const {filmTitle, filmSrc, filmGenre, filmReleaseDate, films, genresList, onGenreClickHandler, onShowButtonClickHandler, activeGenreFilter, isMoreFilms, showedFilmsCount} = this.props;

    return (
      <Main title={filmTitle}
        src={filmSrc}
        genre={filmGenre}
        genres={genresList}
        releaseDate={filmReleaseDate}
        films={films}
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
    />;
  }

  _renderFullVideoPlayer(film) {
    return <FullVideoPlayer
      film={film}
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
        title: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
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

const mapStateToProps = (state) => ({
  activeGenreFilter: state.genre,
  filmTitle: state.film.FILM_TITLE,
  filmSrc: state.film.FILM_SRC,
  filmGenre: state.film.FILM_GENRE,
  filmReleaseDate: state.film.RELEASE_DATE,
  films: state.films,
  genresList: state.genresList,
  backgroundFilmPoster: state.film.BACKGROUND_POSTER,
  filmPoster: state.film.FILM_POSTER,
  ratingScore: state.film.RATING.SCORE,
  ratingLevel: state.film.RATING.LEVEL,
  ratingCount: state.film.RATING.COUNT,
  filmDescription: state.film.FILM_DESCRIPTION,
  filmDirector: state.film.FILM_DIRECTOR,
  filmStarring: state.film.FILM_STARRING,
  runTime: state.film.RUN_TIME,
  reviews: state.film.REVIEWS,
  isMoreFilms: state.isMoreFilms,
  showedFilmsCount: state.showedFilmsCount,
});

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
