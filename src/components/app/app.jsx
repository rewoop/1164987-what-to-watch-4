import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import FilmCard from "../film-card/film-card.jsx";

class App extends PureComponent {
  constructor() {
    super();

    this._onTitleClickHandler = this._onTitleClickHandler.bind(this);

    this.state = {
      activePage: {},
    };
  }

  _getFilmsByGenre(genre) {
    const {films} = this.props;

    return (
      <div className="catalog__movies-list">
        {films.filter((film) => film.genre === genre).map((film) => {
          return <FilmCard
            key={film.title}
            film={film}
            onTitleClickHandler={this._onTitleClickHandler}
            onPosterClickHandler={this._onTitleClickHandler}
            onCardHover={(currentFilm) => {
              this.setState({
                activeCard: currentFilm,
              });
            }}/>;
        })}
      </div>
    );
  }

  _onTitleClickHandler(film) {
    this.setState({
      activePage: film
    });
  }

  _renderApp() {
    const {activePage} = this.state;

    return Object.keys(activePage).length === 0 ? this._renderMain() : this._renderFilmPage();
  }

  _renderMain() {
    const {filmTitle, filmGenre, filmReleaseDate, films, genresList, onGenreClickHandler, onShowButtonClickHandler, activeGenreFilter, isMoreFilms, showedFilmsCount} = this.props;

    return (
      <Main title={filmTitle}
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
      />
    );
  }

  _renderFilmPage() {
    const {filmGenre} = this.props;

    return <FilmPage
      {...this.props}
      sortedFilms={this._getFilmsByGenre(filmGenre)}
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
