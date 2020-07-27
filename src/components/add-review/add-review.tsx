import * as React from "react";
import {ReviewLength} from "../../const";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

interface Props {
  film: {
    id: number,
    filmTitle: string,
    backgroundPoster: string,
    filmPoster: string,
  },
  isDisable: boolean,
  rating: number,
  comment: string,
  onSubmitHandler: (evt: React.FormEvent<HTMLFormElement>) => void,
  onChangeHandler: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void,
}

const AddReview: React.FunctionComponent<Props> = (props: Props) => {
  const {film, isDisable, rating, comment, onSubmitHandler, onChangeHandler} = props;
  const {id, filmTitle, backgroundPoster, filmPoster} = film;
  const isInvalidData = rating === 0 || (comment.length <= ReviewLength.MIN && comment.length >= ReviewLength.MAX);

  return (
    <section className="movie-card movie-card--full">
      <div className="movie-card__header">
        <div className="movie-card__bg">
          <img src={backgroundPoster} alt={filmTitle}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`${AppRoute.FILM_PAGE}/${id}`} className="breadcrumbs__link">{filmTitle}</Link>
              </li>
              <li className="breadcrumbs__item">
                <Link to={AppRoute.FILM_REVIEW} className="breadcrumbs__link">Add review</Link>
              </li>
            </ul>
          </nav>

          <Link to={AppRoute.MY_LIST}>
            <div className="user-block__avatar">
              <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
            </div>
          </Link>
        </header>

        <div className="movie-card__poster movie-card__poster--small">
          <img src={filmPoster} alt={filmTitle} width="218"
            height="327"/>
        </div>
      </div>

      {rating === 0 ?
        <div
          style={{
            position: `absolute`,
            color: `red`,
            top: `27%`,
            left: `46%`}}
        >
          Сhoose a rating
        </div> : ``}

      <div className="add-review">
        <form action="#" className="add-review__form" onSubmit={(evt) => onSubmitHandler(evt)}>
          <div className="rating">
            <div className="rating__stars">
              <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                disabled={isDisable} onChange={(evt) => onChangeHandler(evt)}/>
              <label className="rating__label" htmlFor="star-1">Rating 1</label>

              <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                disabled={isDisable} onChange={(evt) => onChangeHandler(evt)}/>
              <label className="rating__label" htmlFor="star-2">Rating 2</label>

              <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                disabled={isDisable} onChange={(evt) => onChangeHandler(evt)}/>
              <label className="rating__label" htmlFor="star-3">Rating 3</label>

              <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                disabled={isDisable} onChange={(evt) => onChangeHandler(evt)}/>
              <label className="rating__label" htmlFor="star-4">Rating 4</label>

              <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                disabled={isDisable} onChange={(evt) => onChangeHandler(evt)}/>
              <label className="rating__label" htmlFor="star-5">Rating 5</label>
            </div>
          </div>

          <div className="add-review__text">
            <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
              minLength={ReviewLength.MIN}
              maxLength={ReviewLength.MAX}
              required
              disabled={isDisable}
              onChange={(evt) => onChangeHandler(evt)}/>
            <div className="add-review__submit">
              <button className="add-review__btn" type="submit"
                disabled={isDisable || isInvalidData}
                style={{cursor: `${isDisable || isInvalidData ? `default` : `pointer`}`,
                }}>Post</button>
            </div>

          </div>
        </form>
      </div>
    </section>
  );
};

export default AddReview;
