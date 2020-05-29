const express = require("express"),
  router = express.Router(),
  passport = require("passport"),
  User = require("../models/user"),
  ArtEntry = require("../models/artEntry"),
  Category = require("../models/category"),
  GeneralScore = require("../models/score_general"),
  auth = require("../routes/auth");
const { isLoggedIn } = require("../middleware");

//==============
//RESTful routes
//==============

//INDEX route
router.get("/index", function (req, res) {
  ArtEntry.find({}, function (err, artentries) {
    if (err) {
      console.log(err);
    }
    res.render("index", { artentries: artentries });
  });
});

//===========
//SHOW Routes
//===========

// Home
router.get("/home", (req, res) => res.render("home"));

// guidelines
router.get("/generalGuidelines", isLoggedIn, (req, res) =>
  res.render("generalGuidelines")
);
router.get("/guidelinesPrejudging", isLoggedIn, (req, res) =>
  res.render("guidelinesPrejudging")
);

// Judging Groups
router.get("/judgingGroups", isLoggedIn, (req, res) =>
  res.render("judgingGroups")
);
// create POST route

// Award Winners
router.get("/awardWinners", isLoggedIn, (req, res) =>
  res.render("awardWinnersFinal")
);

// appendix A
router.get("/appendixA", (req, res) => res.render("appendixA"));

// appendix B
router.get("/appendixB", (req, res) => res.render("appendixB"));

// My Judging Categories
router.get("/artentries", isLoggedIn, function (req, res) {
  ArtEntry.find({}, function (err, artentries) {
    if (err) {
      console.log(err);
    }
    res.render("artentries", { artentries: artentries });
    // console.log(ArtEntry.find({ category: "A-1" }));
  });
});

// idividual art entries

// router.get("/artentries/:id", isLoggedIn, async (req, res) => {
//   try {
//     const score = await GeneralScore.findById({
//       judge: req.user,
//       entryID: `${entryID._id}`,
//     });
//     console.log("score: " + score);
//     const {
//       gnrl_part1_1_message,
//       gnrl_part1_2_audience,
//       gnrl_part1_3_problemSolving,
//       gnrl_part1_4_accuracy,
//       gnrl_part1_5_clarity,
//     } = score;

//     const foundPage = await GeneralScore.findById(req.params.id);
//     res.render("show", {
//       artentries: foundPage,
//       score: Score,
//     });
//     console.log("found page: " + foundPage);
//   } catch (err) {
//     console.log("catch err: " + err.message);
//     res.redirect("/artentries");
//   }
// });

router.get("/artentries/:id", isLoggedIn, function (req, res) {
  ArtEntry.findById(req.params.id, function (err, foundPage) {
    if (err) {
      console.log("redirect show route");
      res.redirect("/artentries");
    }
    console.log(foundPage);
    res.render("show", { artentries: foundPage });
  });
});

//   try {
//     User.find({ assignedCategories }, function (err, AssignedCategories) {
//       if (err) {
//         console.log("error: " + err.message);
//       }
//       res.render("show", { AssignedCategories });
//     });

//   } catch (err) {
//     console.log("error message: " + err.message);
//   }
// });

//EDIT ROUTE
router.get("/artentries/:id/edit", function (req, res) {
  ArtEntry.findById(req.params.id, function (err, foundPage) {
    if (err) {
      console.log("redirect id edit");
      res.redirect("/artentries");
    }

    res.render("edit", { artentries: foundPage });
  });
});

//Update route
router.put("/artentries/:id", function (req, res) {
  // (id, new data, callback )
  ArtEntry.findByIdAndUpdate(req.params.id, req.body.artentries, function (
    err,
    foundPage
  ) {
    if (err) {
      console.log("error");
      res.render("/");
    }

    res.redirect("/artentries/" + req.params.id);
  });
});

//Destroy route
router.delete("/artentries/:id", function (req, res) {
  //destroy
  ArtEntry.deleteOne(req.params.id, function (err) {
    if (err) {
      res.redirect("/artentries");
    }

    console.log("Deleted entry");
    res.redirect("/artentries");
  });
});

module.exports = router;
