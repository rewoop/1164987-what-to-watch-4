import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";

const Footer = () => {
  return (
    <React.Fragment>
      <footer className="page-footer">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default Footer;
