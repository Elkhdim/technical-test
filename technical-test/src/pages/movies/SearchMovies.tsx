import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";

import { Link } from "react-router-dom";
import Layout from "../../layout/Layout";
import AppBreadcrumbs from "../../components/common/AppBreadcrumbs";
import { useMovies } from "../../hooks/useMovies";
import MovieRow from "../../components/movies/MovieRow";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const MoviesList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const query = useQuery();
  const searchQuery = query.get("query") || "";

  const { movies, status, error, totalPages } = useMovies({ page: page + 1, query: searchQuery });

  useEffect(() => {
    setPage(0); // Reset to the first page when the query changes
  }, [searchQuery]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const breadcrumbItems = [
    { label: "Movies", path: "/admin" }
  ];

  if (status === "loading") {
    return <Layout> Loading... </Layout>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <Layout>
      <Box sx={{ width: "100%", p: 3 }}>
        <AppBreadcrumbs items={breadcrumbItems} />
        <Typography variant="h4" component="h2">
          Search Results for: {searchQuery}
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Language</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.map((movie) => (
                <MovieRow key={movie.id} movie={movie} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages * rowsPerPage}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Layout>
  );
};

export default MoviesList;