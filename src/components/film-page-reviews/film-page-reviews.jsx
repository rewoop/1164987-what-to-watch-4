import React from "react";
import PropTypes from "prop-types";
import FilmPageReview from "../film-page-review/film-page-review.jsx";

const FilmPageReviews = (props) => {
  const {reviews} = props;
  const commentsHalfLength = parseInt(reviews.length / 2, 10) + 1;
  const col1 = reviews.slice(0, commentsHalfLength);
  const col2 = reviews.slice(commentsHalfLength);

  const getReviews = (filmReviews) => {
    return (
      <div className="movie-card__reviews-col">
        {filmReviews.map((review) => {
          return <FilmPageReview
            key={review.id}
            review={review}
          />;
        })}
      </div>
    );
  };

  return (
    <div className="movie-card__reviews movie-card__row">

      {getReviews(col1)}
      {getReviews(col2)}

    </div>
  );
};

FilmPageReviews.propTypes = {
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

export default FilmPageReviews;
