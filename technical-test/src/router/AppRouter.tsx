import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "../layout/Layout";

const PopularMovies = React.lazy(() => import("../pages/movies/PopularMovies"));
const ShowMovie = React.lazy(() => import("../pages/movies/ShowMovie"));
const SearchMovies = React.lazy(() => import("../pages/movies/SearchMovies"));  

const RouterLayout = () => {
  return (
    <Router>
      <Suspense fallback={<Layout> Loading... </Layout>}>
        <Routes>
          <Route path="/" element={<PopularMovies />} />
        
          <Route path="movies/view/:id" element={<ShowMovie />} />
          <Route path="/movies/search" element={<SearchMovies />}/>
          <Route path="/films" element={<PopularMovies />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterLayout;
