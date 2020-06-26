import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {Tab} from "../../const";
import Tabs from "../tabs/tabs.jsx";
import FilmPageOverview from "../film-page-overview/film-page-overview.jsx";
import FilmPageDetails from "../film-page-details/film-page-details.jsx";
import FilmPageReviews from "../film-page-reviews/film-page-reviews.jsx";

class FilmPage extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: Tab.OVERVIEW
    };

    this._setActiveTab = this._setActiveTab.bind(this);
  }

  _setActiveTab(tab) {
    return (evt) => {
      evt.preventDefault();
      this.setState({
        activeTab: tab
      });
    };
  }

  _renderActiveTab() {
    switch (this.state.activeTab) {
      case Tab.OVERVIEW:
        return <FilmPageOverview
          ratingScore={this.props.ratingScore}
          ratingLevel={this.props.ratingLevel}
          ratingCount={this.props.ratingCount}
          filmDescription={this.props.filmDescription}
          filmDirector={this.props.filmDirector}
          filmStarring={this.props.filmStarring}
        />;
      case Tab.DETAILS:
        return <FilmPageDetails
          genre={this.props.filmGenre}
          releaseDate={this.props.filmReleaseDate}
          filmDirector={this.props.filmDirector}
          filmStarring={this.props.filmStarring}
          runTime={this.props.runTime}
        />;
      case Tab.REVIEWS:
        return <FilmPageReviews
          reviews={this.props.reviews}
        />;
      default:
        return ``;
    }
  }

  render() {
    const {filmTitle: title, filmGenre: genre, filmReleaseDate: releaseDate, backgroundFilmPoster, filmPoster, sortedFilms} = this.props;

    return (
      <React.Fragment>
        <section className="movie-card movie-card--full">
          <div className="movie-card__hero">
            <div className="movie-card__bg">
              <img src={backgroundFilmPoster} alt={title}/>
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
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </div>
            </header>

            <div className="movie-card__wrap">
              <div className="movie-card__desc">
                <h2 className="movie-card__title">{title}</h2>
                <p className="movie-card__meta">
                  <span className="movie-card__genre">{genre}</span>
                  <span className="movie-card__year">{releaseDate}</span>
                </p>

                <div className="movie-card__buttons">
                  <button className="btn btn--play movie-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list movie-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                  </button>
                  <a href="add-review.html" className="btn movie-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="movie-card__wrap movie-card__translate-top">
            <div className="movie-card__info">
              <div className="movie-card__poster movie-card__poster--big">
                <img src={filmPoster} alt={title} width="218" height="327"/>
              </div>

              <div className="movie-card__desc">
                <nav className="movie-nav movie-card__nav">
                  <Tabs
                    onLinkClickHandler={this._setActiveTab}
                    currentTab={this.state.activeTab}
                  />
                </nav>

                {this._renderActiveTab()}
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            {sortedFilms}
          </section>

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
  }
}

FilmPage.propTypes = {
  filmTitle: PropTypes.string.isRequired,
  filmGenre: PropTypes.string.isRequired,
  filmReleaseDate: PropTypes.number.isRequired,
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
  sortedFilms: PropTypes.element.isRequired
};

export default FilmPage;
