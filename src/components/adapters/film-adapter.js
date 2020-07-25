const filmAdapter = (film) => {
  return {
    id: film.id,
    filmTitle: film.name,
    backgroundColor: film.background_color,
    filmImage: film.preview_image,
    releaseDate: film.released,
    filmGenre: film.genre,
    backgroundPoster: film.background_image,
    filmPoster: film.poster_image,
    ratingScore: film.rating,
    ratingLevel: film.rating,
    ratingCount: `${film.scores_count} ratings`,
    filmDirector: film.director,
    filmStarring: film.starring,
    filmDescription: film.description,
    filmPreview: film.preview_video_link,
    filmVideo: film.video_link,
    filmRunTime: film.run_time,
    isFavoriteFilm: film.is_favorite
  };
};

export default filmAdapter;

