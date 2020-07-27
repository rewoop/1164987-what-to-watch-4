export interface Film {
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
}
