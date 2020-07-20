import React, {PureComponent} from 'react';
import PropTypes from "prop-types";

const withReview = (Component) => {
  class WithReview extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        rating: 0,
        comment: ``,
      };

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
      const target = evt.target;
      const value = target.name === `rating` ? parseInt(target.value, 10) : target.value;
      const name = target.name === `rating` ? `rating` : `comment`;

      this.setState({
        [name]: value,
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
      const {rating, comment} = this.state;

      return <Component
        {...this.props}
        rating={rating}
        comment={comment}
        onSubmitHandler={this.handleSubmit}
        onChangeHandler={this.handleChange}
      />;
    }
  }

  WithReview.propTypes = {
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

  return WithReview;
};

export default withReview;
