import {
    AppBar,
    styled,
    Toolbar,
    InputBase,
  } from "@mui/material";

  
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    width:"50%"
  });
  
  const Search = styled("div")(({ theme }) => ({
    backgroundColor: "white",
    padding: "0 15px",
    border: "1px solid #dddbdb ",
    borderRadius: theme.shape.borderRadius,
    width: "40%",
  }));
  
  const Navbar = () => {
    return (
      <AppBar position="sticky" sx={{ bgcolor: "#f7f7f7" }}>
        <StyledToolbar>
          <Search sx={{ display: "flex", width: "100%" }}>
            <InputBase placeholder="search ..." />
          </Search>
        </StyledToolbar>
      </AppBar>
    );
  };
  
  export default Navbar;
  