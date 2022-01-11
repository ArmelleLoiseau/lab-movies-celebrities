const router = require("express").Router();
const celebrityModel = require("./../models/Celebrity.model");
const mongoose = require("mongoose");

// this route is prefixed with /celebrities

router.get("/", async (req, res, next) => {
  try {
    const celebrities = await celebrityModel.find();
    res.render("celebrities/celebrities.hbs", {
      celebrities,
    });
  } catch (e) {
    next(e);
  }
});

router.get("/create", (req, res, next) => {
  res.render("celebrities/new-celebrity.hbs");
});

router.post("/create", async (req, res, next) => {
  try {
    const newCeleb = await celebrityModel.create(req.body);
    console.log(newCeleb);
    res.redirect("/celebrities");
  } catch (e) {
    res.render("celebrities/new-celebrity.hbs");
  }
});

module.exports = router;
