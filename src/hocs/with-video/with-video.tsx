import * as React from "react";
import {Subtract} from "utility-types";
import {Film} from "../../types";

interface Props {
  film: Film;
}

interface State {
  isPlaying: boolean;
}

interface InjectedProps {
  isPlaying: boolean;
  setPlayingFilm: (isPlaying: boolean) => void;
}

const withVideo = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithVideo extends React.PureComponent<T, State> {
    constructor(props) {
      super(props);

      this.state = {
        isPlaying: false,
      };

      this._setPlayingFilm = this._setPlayingFilm.bind(this);
    }

    _setPlayingFilm(isPlaying) {
      this.setState({
        isPlaying
      });
    }

    render() {
      const {isPlaying} = this.state;

      return <Component
        {...this.props}
        isPlaying={isPlaying}
        setPlayingFilm={this._setPlayingFilm}
      />;
    }
  }

  return WithVideo;
};

export default withVideo;
