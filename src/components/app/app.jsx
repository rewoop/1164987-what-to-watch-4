import React, {PureComponent} from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import PropTypes from "prop-types";
import Main from "../main/main.jsx";
import FilmPage from "../film-page/film-page.jsx";
import FilmCard from "../film-card/film-card.jsx";

class App extends PureComponent {
  constructor(props) {
    super(props);

    this._onTitleClickHandler = this._onTitleClickHandler.bind(this);

    this.state = {
      activePage: {},
    };
  }

  _getSortedFilms(genre) {
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
    const {filmTitle, filmGenre, filmReleaseDate, films} = this.props;

    return (
      <Main title={filmTitle}
        genre={filmGenre}
        releaseDate={filmReleaseDate}
        films={films}
        onTitleClickHandler={this._onTitleClickHandler}
        onPosterClickHandler={this._onTitleClickHandler}
      />
    );
  }

  _renderFilmPage() {
    const {filmTitle, filmGenre, filmReleaseDate, backgroundFilmPoster, filmPoster, ratingScore, ratingLevel, ratingCount, filmDescription, filmDirector, filmStarring, runTime, reviews} = this.props;

    return <FilmPage
      title={filmTitle}
      genre={filmGenre}
      releaseDate={filmReleaseDate}
      backgroundFilmPoster={backgroundFilmPoster}
      filmPoster={filmPoster}
      ratingScore={ratingScore}
      ratingLevel={ratingLevel}
      ratingCount={ratingCount}
      filmDescription={filmDescription}
      filmDirector={filmDirector}
      filmStarring={filmStarring}
      runTime={runTime}
      reviews={reviews}
      sortedFilms={this._getSortedFilms(filmGenre)}
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
};

export default App;
