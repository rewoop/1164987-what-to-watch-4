import React, {PureComponent} from 'react';
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import history from "../../history.js";
import {AppRoute} from "../../const.js";

const withFavoriteFilm = (Component) => {
  class WithFavoriteFilm extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: this.props.film.isFavoriteFilm,
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
      const {film, isSignIn, onMyListClickHandler} = this.props;

      this.setState((prevState) => {
        return {
          isFavorite: !prevState.isFavorite
        };
      });

      return isSignIn === AuthorizationStatus.AUTH ?
        onMyListClickHandler(film.id, !this.state.isFavorite)
        :
        history.push(AppRoute.LOGIN);
    }

    render() {
      return <Component
        {...this.props}
        isFavoriteStatus={this.state.isFavorite}
        onMyListClickHandler={this._handleClick}
      />;
    }
  }

  WithFavoriteFilm.propTypes = {
    film: PropTypes.shape({
      id: PropTypes.number.isRequired,
      isFavoriteFilm: PropTypes.bool.isRequired,
    }).isRequired,
    isSignIn: PropTypes.string.isRequired,
    onMyListClickHandler: PropTypes.func.isRequired,
  };

  return WithFavoriteFilm;
};

export default withFavoriteFilm;
