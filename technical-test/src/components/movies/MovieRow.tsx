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
      <TableCell>{movie.release_date}</TableCell>
      <TableCell>
        <IconButton
          component={Link}
          to={`/movies/view/${movie.id}`}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            style={{
              width: "5%",
            }}
          />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
