import React, { useState } from "react";
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

const MoviesList: React.FC = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { movies, status, error, totalPages } = useMovies(page + 1);  // API is likely 1-indexed for pages

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
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

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
                <TableCell>Language</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movies.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((movie) => (
                  <TableRow
                    key={movie.id}
                    hover
                    sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" } }}
                  >
                    <TableCell>{movie.id}</TableCell>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.original_language}</TableCell>
                    <TableCell>
                      <IconButton
                        component={Link}
                        to={`/movies/view/${movie.id}`}
                        color="info"
                      >
                        {/* Visibility Icon or similar */}
                        View
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalPages * rowsPerPage}  // Adjust as per your total data count
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