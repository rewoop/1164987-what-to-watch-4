export interface Film {
  id: number;
  filmTitle: string;
  filmVideo: string;
  filmGenre: string;
  releaseDate: number;
  backgroundPoster: string;
  filmPoster: string;
  ratingScore: number;
  ratingLevel: number;
  ratingCount: string;
  filmDescription: string;
  filmDirector: string;
  filmStarring: string[];
  filmRunTime: string;
  isFavoriteFilm: boolean;
}

export type Films = Film[];

export interface FilmComment {
  id: number;
  user: {
    id: number;
    name: string;
  };
  comment: string;
  date: string;
  rating: number;
}

export type FilmComments = FilmComment[];

export interface PostReview {
  rating: number;
  comment: string;
}
