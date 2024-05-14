import { IconButton, TableCell, TableRow } from "@mui/material";
import { Movie } from "../../types/movies.types";
import { Link } from "react-router-dom";

interface MovieRowProps {
  movie: Movie;
}
export default function MovieRow({ movie }: MovieRowProps) {
  return (
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
          View
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
