import * as React from "react";
import {Subtract} from "utility-types";
import {AuthorizationStatus} from "../../reducer/user/user";
import {AppRoute} from "../../const";
import {Film} from "../../types";

interface Props {
  film: Film;
  isSignIn: string;
}

interface State {
  isFavorite: boolean;
}

interface InjectedProps {
  isFavoriteStatus: boolean;
  onMyListClickHandler: (id: number, b: boolean) => void;
}

const withFavoriteFilm = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithFavoriteFilm extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isFavorite: this.props.film.isFavoriteFilm,
      };

      this._handleClick = this._handleClick.bind(this);
    }

    _handleClick() {
      const {film, isSignIn, onMyListClickHandler, history} = this.props;

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

  return WithFavoriteFilm;
};

export default withFavoriteFilm;
