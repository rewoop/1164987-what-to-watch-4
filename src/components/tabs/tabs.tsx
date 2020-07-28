import * as React from "react";
import {Tab} from "../../const";

interface Props {
  onLinkClickHandler: (Tab: string) => void;
  currentTab: string;
}

const Tabs: React.FunctionComponent<Props> = (props: Props) => {
  const {onLinkClickHandler, currentTab} = props;

  return (
    <ul className="movie-nav__list">
      <li className={currentTab === Tab.OVERVIEW ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`} onClick={() => onLinkClickHandler(Tab.OVERVIEW)}
      >
        <a href="#" className="movie-nav__link">Overview</a>
      </li>
      <li className={currentTab === Tab.DETAILS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`} onClick={() => onLinkClickHandler(Tab.DETAILS)}
      >
        <a href="#" className="movie-nav__link">Details</a>
      </li>
      <li className={currentTab === Tab.REVIEWS ? `movie-nav__item movie-nav__item--active` : `movie-nav__item`} onClick={() => onLinkClickHandler(Tab.REVIEWS)}
      >
        <a href="#" className="movie-nav__link">Reviews</a>
      </li>
    </ul>
  );
};

export default Tabs;
