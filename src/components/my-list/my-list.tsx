import * as React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import Footer from "../footer/footer";
import FilmCard from "../film-card/film-card";
import withVideo from "../../hocs/with-video/with-video";
import {Operation as DataOperation} from "../../reducer/data/data";
import {getFavoriteFilms} from "../../reducer/data/selectors";
import {connect} from "react-redux";

interface Props {
  films: {
    id: number,
    filmTitle: string,
    filmVideo: string,
    filmGenre: string,
    releaseDate: number,
    backgroundPoster: string,
    filmPoster: string,
    ratingScore: number,
    ratingLevel: number,
    ratingCount: string,
    filmDescription: string,
    filmDirector: string,
    filmStarring: string[],
    runTime: string,
    isFavoriteFilm: boolean
  }[],
  loadFavoriteFilms: () => void,
}

const FilmCardWrapped = withVideo(FilmCard);

class MyList extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.loadFavoriteFilms();
  }

  render() {
    const {films} = this.props;

    return (
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={AppRoute.ROOT} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">My list</h1>


          <div className="user-block">
            <Link to={AppRoute.MY_LIST}>
              <div className="user-block__avatar">
                <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
              </div>
            </Link>
          </div>

        </header>

        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <div className="catalog__movies-list">
            {films.length > 0 ?
              films.map((currentFilm) => {
                return <FilmCardWrapped
                  key={currentFilm.filmTitle}
                  film={currentFilm}
                />;
              }) :
              <h1 style={{marginLeft: `250px`}}>Add movies to favorites to watch later</h1>}
          </div>
        </section>

        <Footer />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {
    films: getFavoriteFilms(state),
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadFavoriteFilms() {
    dispatch(DataOperation.loadFavoriteFilms());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
