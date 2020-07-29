import * as React from "react";
import FilmPageReview from "../film-page-review/film-page-review";
import Loader from 'react-loader-spinner';


interface Props {
  reviews: {
    id: number;
    user: {
      id: number;
      name: string;
    };
    comment: string;
    date: string;
    rating: number;
  }[];
}

const FilmPageReviews: React.FunctionComponent<Props> = (props: Props) => {
  const {reviews} = props;
  const commentsHalfLength = parseInt(String(reviews.length / 2), 10) + 1;
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

  return reviews.length === 0 ?
    <div style={{
      marginLeft: `220px`,
      marginTop: `100px`
    }}>
      <Loader
        type="Hearts"
        color="#150202"
        height={200}
        width={200}
        timeout={3000} // 3 secs
      />
    </div>
    :
    <div className="movie-card__reviews movie-card__row">

      {getReviews(col1)}
      {getReviews(col2)}

    </div>;
};

export default FilmPageReviews;
