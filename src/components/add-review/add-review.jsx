import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.ratings = {
      ratingRefOne: createRef(),
      ratingRefTwo: createRef(),
      ratingRefThree: createRef(),
      ratingRefFour: createRef(),
      ratingRefFive: createRef(),
    };
    this.commentRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _getCurrentRating() {
    for (let ref in this.ratings) {
      if (this.ratings[ref].current.checked) {
        return this.ratings[ref].current.value;
      }
    }
    return this.ratings.ratingRefFive.current.value;
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;

    evt.preventDefault();

    onSubmit({
      rating: parseInt(this._getCurrentRating(), 10),
      comment: this.commentRef.current.value,
    });
  }

  render() {
    const {film} = this.props;
    const {filmTitle, backgroundPoster, filmPoster} = film;

    return (
      <section className="movie-card movie-card--full">
        <div className="movie-card__header">
          <div className="movie-card__bg">
            <img src={backgroundPoster} alt={filmTitle}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <header className="page-header">
            <div className="logo">
              <a href="main.html" className="logo__link">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{filmTitle}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>

            <div className="user-block">
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </div>
          </header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={filmPoster} alt={filmTitle} width="218"
              height="327"/>
          </div>
        </div>

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this.handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1" ref={this.ratings.ratingRefOne}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" ref={this.ratings.ratingRefTwo}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3" ref={this.ratings.ratingRefThree}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" ref={this.ratings.ratingRefFour}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" ref={this.ratings.ratingRefFive}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                minLength={50}
                maxLength={400}
                required={true}
                ref={this.commentRef}/>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit">Post</button>
              </div>

            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  film: PropTypes.oneOfType([
    PropTypes.shape({
      filmTitle: PropTypes.string,
      backgroundPoster: PropTypes.string,
      filmPoster: PropTypes.string,
    }),
    PropTypes.node
  ]).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddReview;
