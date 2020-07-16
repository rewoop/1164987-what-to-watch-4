import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Tab} from "../../const";
import FilmPageOverview from "../../components/film-page-overview/film-page-overview.jsx";
import FilmPageDetails from "../../components/film-page-details/film-page-details.jsx";
import FilmPageReviews from "../../components/film-page-reviews/film-page-reviews.jsx";
import {formatRunTimeDate} from "../../utils";

const withActiveTab = (Component) => {
  class WithActiveTab extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: Tab.OVERVIEW
      };

      this._setActiveTab = this._setActiveTab.bind(this);
      this._renderActiveTab = this._renderActiveTab.bind(this);
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
            ratingScore={this.props.film.ratingScore}
            ratingLevel={this.props.film.ratingLevel}
            ratingCount={this.props.film.ratingCount}
            filmDescription={this.props.film.filmDescription}
            filmDirector={this.props.film.filmDirector}
            filmStarring={this.props.film.filmStarring}
          />;
        case Tab.DETAILS:
          return <FilmPageDetails
            genre={this.props.film.filmGenre}
            releaseDate={this.props.film.releaseDate}
            filmDirector={this.props.film.filmDirector}
            filmStarring={this.props.film.filmStarring}
            runTime={formatRunTimeDate(this.props.film.filmRunTime)}
          />;
        case Tab.REVIEWS:
          this.props.getCommentByFilmId(this.props.film.id);
          return <FilmPageReviews
            reviews={this.props.comments}
          />;
        default:
          return ``;
      }
    }

    render() {
      const {activeTab} = this.state;

      return <Component
        {...this.props}
        activeTab={activeTab}
        setActiveTab={this._setActiveTab}
        renderActiveTab={this._renderActiveTab}
      />;
    }
  }

  WithActiveTab.propTypes = {
    film: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.shape({
        filmTitle: PropTypes.string.isRequired,
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
        filmRunTime: PropTypes.number.isRequired,
      })
    ]).isRequired,
    sortedFilms: PropTypes.array.isRequired,
    getCommentByFilmId: PropTypes.func.isRequired,
    comments: PropTypes.oneOfType([
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
  };

  return WithActiveTab;
};

export default withActiveTab;
