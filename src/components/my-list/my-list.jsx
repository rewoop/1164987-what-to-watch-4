import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import Footer from "../footer/footer.jsx";
import FilmCard from "../film-card/film-card.jsx";
import withVideo from "../../hocs/with-video/with-video";

const FilmCardWrapped = withVideo(FilmCard);

const MyList = (props) => {
  const {films} = props;

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">My list</h1>


        <div className="user-block">
          <Link to={AppRoute.MY_LIST}>
            <div className="user-block__avatar">
              <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </Link>
        </div>

      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <div className="catalog__movies-list">
          {films.length > 0 ?
            films.map((currentFilm) => {
              return <FilmCardWrapped
                key={currentFilm.filmTitle}
                film={currentFilm}
              />;
            }) :
            <h1 style={{marginLeft: `250px`}}>Add movies to favorites to watch later</h1>}
        </div>
      </section>

      <Footer />
    </div>
  );
};

MyList.propTypes = {
  films: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.arrayOf(
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
    )
  ]).isRequired,
};

export default MyList;
