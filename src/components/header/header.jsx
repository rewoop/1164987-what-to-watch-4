import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const.js";
import {AuthorizationStatus} from "../../reducer/user/user.js";

const Header = (props) => {
  const {isSignIn} = props;

  return (
    <Fragment>
      <h1 className="visually-hidden">WTW</h1>

      <header className="page-header movie-card__head">
        <div className="logo">
          <Link to={AppRoute.ROOT} className="logo__link">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <div className="user-block">
          {isSignIn === AuthorizationStatus.AUTH ?
            <Link to={AppRoute.MY_LIST}>
              <div className="user-block__avatar">
                <img src="/img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </Link>
            :
            <Link to={AppRoute.LOGIN} style={{cursor: `pointer`, textDecoration: `none`, color: `inherit`}}>Sign In</Link>
          }
        </div>
      </header>
    </Fragment>
  );
};

Header.propTypes = {
  isSignIn: PropTypes.string.isRequired,
};

export default Header;
