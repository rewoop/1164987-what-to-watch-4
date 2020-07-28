import * as React from "react";
import {Subtract} from "utility-types";
import {Film} from "../../types";

interface Props {
  film: Film;
  onSubmit: ({}) => void;
  isDisable: boolean;
}

interface State {
  rating: number;
  comment: string;
}

interface InjectedProps {
  rating: number;
  comment: string;
  onSubmitHandler: (evt: React.FormEvent<HTMLFormElement>) => void;
  onChangeHandler: (evt: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const withReview = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Props & Subtract<P, InjectedProps>;

  class WithReview extends React.PureComponent<T, State> {
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

      const newState = {[name]: value} as Pick<State, keyof State>;
      this.setState(newState);
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

  return WithReview;
};

export default withReview;
