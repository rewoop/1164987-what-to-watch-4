import * as React from "react";
import {Subtract} from "utility-types";
import {Tab} from "../../const";
import FilmPageOverview from "../../components/film-page-overview/film-page-overview";
import FilmPageDetails from "../../components/film-page-details/film-page-details";
import FilmPageReviews from "../../components/film-page-reviews/film-page-reviews";
import {formatRunTimeDate} from "../../utils";

interface Props {
  film: {
    id: number,
    filmTitle: string,
    filmGenre: string,
    releaseDate: number,
    backgroundPoster: string,
    filmPoster: string,
    ratingScore: number,
    ratingLevel: number,
    ratingCount: string,
    filmDescription: string,
    filmDirector: string,
    filmStarring: string[],
    filmRunTime: number,
  },
  sortedFilms: {
    filmTitle: string,
    filmVideo: string,
    filmGenre: string,
    releaseDate: number,
    backgroundPoster: string,
    filmPoster: string,
    ratingScore: number,
    ratingLevel: number,
    ratingCount: string,
    filmDescription: string,
    filmDirector: string,
    filmStarring: string[],
  }[],
  getCommentByFilmId: (id: number) => void,
  comments: {
    id: number,
    user: {
      id: number,
      name: string,
    },
    comment: string,
    date: string,
    rating: number,
  }[],
}

interface State {
  activeTab: string;
}

interface InjectedProps {
  activeTab: string,
  setActiveTab: (tab: string) => void;
  renderActiveTab: () => void;
}

const withActiveTab = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithActiveTab extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeTab: Tab.OVERVIEW
      };

      this._setActiveTab = this._setActiveTab.bind(this);
      this._renderActiveTab = this._renderActiveTab.bind(this);
    }

    _setActiveTab(tab) {
      this.setState({
        activeTab: tab
      });
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

  return WithActiveTab;
};

export default withActiveTab;
