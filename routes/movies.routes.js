const router = require("express").Router();
const mongoose = require("mongoose");
const celebrityModel = require("./../models/Celebrity.model");
const movieModel = require("./../models/Movies.model");
const { route } = require("express/lib/application");

// this route is prefixed with /movies

// **** DISPLAY ALL MOVIES
router.get("/", async (req, res, next) => {
  try {
    const movies = await movieModel.find();
    res.render("movies/movies.hbs", {
      movies,
    });
  } catch (e) {
    next(e);
  }
});

// **** CREATE A MOVIE //
router.get("/create", async (req, res, next) => {
  try {
    const celebrities = await celebrityModel.find();
    res.render("movies/new-movie.hbs", {
      celebrities,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/create", async (req, res, next) => {
  try {
    const newMovie = { ...req.body };
    await movieModel.create(newMovie);
    console.log(newMovie);
    res.redirect("/movies");
  } catch (e) {
    next(e);
  }
});

// **** DISPLAY A MOVIE
router.get("/:id", async (req, res, next) => {
  try {
    const movie = await movieModel.findById(req.params.id).populate("cast");
    console.log(movie.cast);
    res.render("movies/movie-detail.hbs", {
      movie,
    });
  } catch (e) {
    next(e);
  }
});

// **** DELETE A MOVIE

router.get("/delete/:id", async (req, res, next) => {
  try {
    const deletedMovie = await movieModel.findByIdAndDelete(req.params.id);
    res.redirect("/movies");
  } catch (e) {
    next(e);
  }
});

// *** UPDATE A MOVIE

router.get("/edit/:id", async (req, res, next) => {
  try {
    const movieToEdit = await movieModel.findById(req.params.id);
    const celebrities = await celebrityModel.find();
    res.render("movies/edit-movie.hbs", {
      movieToEdit,
      celebrities,
    });
  } catch (e) {
    next(e);
  }
});

router.post("/edit/:id", async (req, res, next) => {
  try {
    const editedMovie = req.body;
    console.log(editedMovie);
    await movieModel.findByIdAndUpdate(req.params.id, editedMovie);
    res.redirect(`/movies/${req.params.id}`);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
