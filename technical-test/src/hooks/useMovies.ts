import { useEffect } from "react";
import { fetchMovies } from "../redux/movieSlice";
import { useAppSelector, useAppDispatch } from "./hooks";

export function useMovies(page: number) {
  const dispatch = useAppDispatch();
  const { movies, status, error, totalPages } = useAppSelector(
    (state) => state.movie
  );

  useEffect(() => {
    dispatch(fetchMovies({ page }));
  }, [dispatch, page]);

  return {
    movies,
    status,
    error,
    currentPage: page,
    totalPages,
  };
}
