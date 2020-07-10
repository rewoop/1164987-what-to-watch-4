const filmAdapter = (film) => {
  return {
    ID: film.id,
    FILM_TITLE: film.name,
    BACKGROUND_COLOR: film.background_color,
    FILM_IMAGE: film.preview_image,
    RELEASE_DATE: film.released,
    FILM_GENRE: film.genre,
    BACKGROUND_POSTER: film.background_image,
    FILM_POSTER: film.poster_image,
    RATING: {
      SCORE: film.rating,
      LEVEL: film.rating,
      COUNT: `${film.scores_count} ratings`,
    },
    FILM_DIRECTOR: film.director,
    FILM_STARRING: film.starring,
    FILM_DESCRIPTION: film.description,
    FILM_PREVIEW: film.preview_video_link,
    FILM_VIDEO: film.video_link,
    RUN_TIME: film.run_time,
    IS_FAVORITE: film.isFavorite
  };
};

export default filmAdapter;

