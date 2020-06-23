import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import VideoPlayer from "../video-player/video-player.jsx";

class FilmCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isPlaying: false,
    };
  }

  render() {
    const {film, onTitleClickHandler, onPosterClickHandler, onCardHover} = this.props;
    const {isPlaying} = this.state;

    return (
      <article
        className="small-movie-card catalog__movies-card"
        onClick={() => onPosterClickHandler(film)}
        onMouseEnter={() => {
          onCardHover(film);
          this.setState({
            isPlaying: true
          });
        }}
        onMouseLeave={() => {
          onCardHover({});
          this.setState({
            isPlaying: false
          });
        }}>
        <div className="small-movie-card__image">
          <VideoPlayer isPlaying={isPlaying} src={film.src} poster={film.image}/>
          <img src={film.image} alt={film.title} width="280" height="175"/>
        </div>
        <h3 className="small-movie-card__title">
          <a onClick={(evt) => {
            evt.preventDefault();
            onTitleClickHandler(film);
          }} className="small-movie-card__link" href={film.link}>{film.title}</a>
        </h3>
      </article>
    );
  }
}

FilmCard.propTypes = {
  film: PropTypes.shape({
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    src: PropTypes.string.isRequired,
  }).isRequired,
  onTitleClickHandler: PropTypes.func.isRequired,
  onPosterClickHandler: PropTypes.func.isRequired,
  onCardHover: PropTypes.func.isRequired,
};

export default FilmCard;
