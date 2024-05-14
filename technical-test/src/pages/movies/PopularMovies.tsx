import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Typography,
  TablePagination,
} from "@mui/material";
import Layout from "../../layout/Layout";
import AppBreadcrumbs from "../../components/common/AppBreadcrumbs";
import { useMovies } from "../../hooks/useMovies";
import MovieRow from "../../components/movies/MovieRow";

const MoviesList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { movies, status, error, totalPages } = useMovies({ page: page + 1 }); // API is likely 1-indexed for pages

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const breadcrumbItems = [{ label: "Movies", path: "/films" }];

  if (status === "loading") {
    return <Layout> Loading... </Layout>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }
console.log('movie : ',movies)
  return (
    <Layout>
      <Box sx={{ width: "100%", p: 3 }}>
        <AppBreadcrumbs items={breadcrumbItems} />
        <Typography variant="h4" component="h2">
          List of Popular Movies:
        </Typography>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Release date</TableCell>
                <TableCell>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <MovieRow movie={movie} />
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages * rowsPerPage} // Adjust as per your total data count
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
