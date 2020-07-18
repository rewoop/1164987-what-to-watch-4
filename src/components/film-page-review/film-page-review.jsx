import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {formatReviewDate} from "../../utils";

const FilmPageReview = (props) => {
  const {review} = props;

  return (
    <Fragment>
      <div className="review" key={review.id}>
        <blockquote className="review__quote">
          <p className="review__text" style={{overflow: `hidden`, textOverflow: `ellipsis`}}>{review.comment}</p>
          <footer className="review__details">
            <cite className="review__author">{review.user.name}</cite>
            <time className="review__date" dateTime={formatReviewDate(review.date, false)}>{formatReviewDate(review.date, true)}</time>
          </footer>
        </blockquote>
        <div className="review__rating">{review.rating}</div>
      </div>
    </Fragment>
  );
};
FilmPageReview.propTypes = {
  review: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }
  ).isRequired
};
export default FilmPageReview;
