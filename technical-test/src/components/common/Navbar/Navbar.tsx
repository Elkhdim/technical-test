import React, { useState } from 'react';
import { AppBar, styled, Toolbar, InputBase } from "@mui/material";
import { useNavigate } from 'react-router-dom';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "auto",
  marginRight: "auto",
  width: "40%"
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 15px",
  border: "1px solid #dddbdb",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
}));

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();  // Prevent default form submission behavior
    if (searchQuery.trim()) {
      navigate(`/movies/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#f7f7f7" }}>
      <StyledToolbar>
        <form onSubmit={handleSearchSubmit} style={{ width: "100%" }}>
          <Search sx={{ display: "flex" }}>
            <InputBase
              placeholder="search ..."
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
            />
          </Search>
        </form>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;