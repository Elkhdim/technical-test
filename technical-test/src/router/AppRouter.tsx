import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const MoviesList = React.lazy(() => import("../pages/movies/MoviesList"));
const ShowMovie = React.lazy(() => import("../pages/movies/ShowMovie"));

const RouterLayout = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MoviesList />} />

          <Route path="movies/view/:id" element={<ShowMovie />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default RouterLayout;
