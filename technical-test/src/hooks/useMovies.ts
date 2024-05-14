import { useEffect } from "react";
import { fetchMovies, fetchMoviesByQuery } from "../redux/movieSlice";
import { useAppSelector, useAppDispatch } from "./hooks";

interface UseMoviesArgs {
  page: number;
  query?: string;
}

export function useMovies({ page, query }: UseMoviesArgs) {
  const dispatch = useAppDispatch();
  const { movies, status, error, totalPages } = useAppSelector(
    (state) => state.movie
  );

  useEffect(() => {
    if (query) {
      dispatch(fetchMoviesByQuery({ query, page }));
    } else {
      dispatch(fetchMovies({ page }));
    }
  }, [dispatch, page, query]);

  return {
    movies,
    status,
    error,
    currentPage: page,
    totalPages,
  };
}