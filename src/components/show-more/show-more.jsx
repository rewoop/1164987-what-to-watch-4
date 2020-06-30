import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
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

ShowMore.propTypes = {
  onShowButtonClickHandler: PropTypes.func.isRequired,
};

export default ShowMore;
