import React from "react";
import PropTypes from "prop-types";
import {Tab} from "../../const";

const Tabs = (props) => {
  const {onLinkClickHandler} = props;

  return (
    <ul className="movie-nav__list">
      <li className="movie-nav__item movie-nav__item--active" onClick={onLinkClickHandler(Tab.OVERVIEW)}
      >
        <a href="#" className="movie-nav__link">Overview</a>
      </li>
      <li className="movie-nav__item" onClick={onLinkClickHandler(Tab.DETAILS)}
      >
        <a href="#" className="movie-nav__link">Details</a>
      </li>
      <li className="movie-nav__item" onClick={onLinkClickHandler(Tab.REVIEWS)}
      >
        <a href="#" className="movie-nav__link">Reviews</a>
      </li>
    </ul>
  );
};

Tabs.propTypes = {
  onLinkClickHandler: PropTypes.func.isRequired
};

export default Tabs;
