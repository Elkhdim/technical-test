import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  FetchMoviesArg,
  Movie,
  MovieState,
  MoviesApiResponse,
} from "../types/movies.types";

const BACKEND_API = import.meta.env.VITE_BACKEND_URL;

export const fetchMovies = createAsyncThunk<
  MoviesApiResponse,
  FetchMoviesArg,
  { rejectValue: string }
>("movie/fetchMovies", async ({ page }, { rejectWithValue }) => {
  try {
    const response = await fetch(`${BACKEND_API}popular-movies?page=${page}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = (await response.json()) as MoviesApiResponse;
    return data;
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchDetails",
  async (movieId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BACKEND_API}movie-details/${movieId}`);
      const data = (await response.json()) as Movie;
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data || error.message);
    }
  }
);

const initialState: MovieState = {
  movie: null,
  movies: [],
  status: "idle",
  error: null,
  currentPage: 1,
  totalPages: 1,
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setPage(state, action: { payload: number; type: string }) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchMovieDetails.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.movie = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { setPage } = movieSlice.actions;
export default movieSlice.reducer;
