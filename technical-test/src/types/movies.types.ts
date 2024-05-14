export interface Movie {
  id: number;
  title: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genres: { id: number; name: string }[];
  overview: string;
  release_date: string;
  runtime: number | null;
  status: string;
  original_language: string;
  production_companies: {
    name: string;
    id: number;
    logo_path: string | null;
    origin_country: string;
  }[];
  production_countries: {
    iso_3166_1: string;
    name: string;
  }[];
  budget: number;
  revenue: number;
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult: boolean;
  video: boolean;
  tagline: string | null;
  homepage: string | null;
}

export interface MoviesApiResponse {
  results: Movie[];
  total_pages: number;
}

export interface MovieState {
  movie: Movie | null;
  movies: Movie[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  currentPage: number;
  totalPages: number;
}

export interface FetchMoviesArg {
  page: number;
}
