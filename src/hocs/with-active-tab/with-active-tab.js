import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {Tab} from "../../const";
import FilmPageOverview from "../../components/film-page-overview/film-page-overview.jsx";
import FilmPageDetails from "../../components/film-page-details/film-page-details.jsx";
import FilmPageReviews from "../../components/film-page-reviews/film-page-reviews.jsx";

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
    sortedFilms: PropTypes.element.isRequired,
  };

  return WithActiveTab;
};

export default withActiveTab;
