import * as React from "react";

interface Props {
  onShowButtonClickHandler: () => void,
}

const ShowMore: React.FunctionComponent<Props> = (props: Props) => {
  const {onShowButtonClickHandler} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button"
        onClick={onShowButtonClickHandler}>
        Show more
      </button>
    </div>
  );
};

export default ShowMore;
