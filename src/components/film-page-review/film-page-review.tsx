import * as React from "react";
import {formatReviewDate} from "../../utils";

interface Props {
  review: {
    id: number,
    user: {
      id: number,
      name: string,
    },
    comment: string,
    date: string,
    rating: number,
  }
}

const FilmPageReview: React.FunctionComponent<Props> = (props: Props) => {
  const {review} = props;

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default FilmPageReview;
