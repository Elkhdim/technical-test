import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovieDetails } from '../../redux/movieSlice';
import { RootState } from '../../redux/store';
import {
  Container, Typography, Grid, Paper, CircularProgress, Box, ThemeProvider
} from '@mui/material';
import Layout from '../../layout/Layout';
import { useAppDispatch } from '../../hooks/hooks';

function ShowMovie() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { movie, status, error } = useSelector((state: RootState) => state.movie);

  useEffect(() => {
    if(id){
        dispatch(fetchMovieDetails(id));
    }
  }, [dispatch, id]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  if (!movie) return null;

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Paper elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 3 }}>
                <img src={imageUrl} alt={movie.title} style={{ width: '100%', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>{movie.title}</Typography>
              <Typography variant="subtitle1"><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</Typography>
              <Typography variant="subtitle1"><strong>Release Date:</strong> {movie.release_date}</Typography>
              <Typography variant="subtitle1"><strong>Runtime:</strong> {movie.runtime} minutes</Typography>
              <Typography variant="subtitle1"><strong>Status:</strong> {movie.status}</Typography>
              <Typography variant="subtitle1"><strong>Original Language:</strong> {movie.original_language}</Typography>
              <Typography variant="body1">{movie.overview}</Typography>
              <Typography variant="subtitle1"><strong>Production Companies:</strong> {movie.production_companies.map(pc => pc.name).join(', ')}</Typography>
              <Typography variant="subtitle1"><strong>Production Countries:</strong> {movie.production_countries.map(country => country.name).join(', ')}</Typography>
              <Typography variant="subtitle1"><strong>Budget:</strong> ${movie.budget.toLocaleString()}</Typography>
              <Typography variant="subtitle1"><strong>Revenue:</strong> ${movie.revenue.toLocaleString()}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Layout>
  );
}

export default ShowMovie;