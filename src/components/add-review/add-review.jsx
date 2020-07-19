import React, {PureComponent} from "react";
import PropTypes from "prop-types";

class AddReview extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      rating: 0,
      comment: ``
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(evt) {
    const target = evt.target;
    const value = target.name === `rating` ? parseInt(target.value, 10) : target.value;
    const name = target.name === `rating` ? `rating` : `comment`;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(evt) {
    const {onSubmit} = this.props;
    const {rating, comment} = this.state;

    evt.preventDefault();

    onSubmit({
      rating,
      comment
    });
  }

  render() {
    const {rating} = this.state;
    const {film, isDisable} = this.props;
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

        {rating === 0 ?
          <div
            style={{
              position: `absolute`,
              color: `red`,
              top: 27 + `%`,
              left: 46 + `%`}}
          >
          Сhoose a rating
          </div> : ``}

        <div className="add-review">
          <form action="#" className="add-review__form" onSubmit={this.handleSubmit}>
            <div className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"
                  disabled={isDisable} onChange={this.handleChange}/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2"
                  disabled={isDisable} onChange={this.handleChange}/>
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"
                  disabled={isDisable} onChange={this.handleChange}/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4"
                  disabled={isDisable} onChange={this.handleChange}/>
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5"
                  disabled={isDisable} onChange={this.handleChange}/>
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
                minLength={50}
                maxLength={400}
                required={true}
                disabled={isDisable}
                onChange={this.handleChange}/>
              <div className="add-review__submit">
                <button className="add-review__btn" type="submit"
                  disabled={isDisable || rating === 0}
                  style={{cursor: `${isDisable || rating === 0 ? `default` : `pointer`}`,
                  }}>Post</button>
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
  isDisable: PropTypes.bool.isRequired,
};

export default AddReview;
