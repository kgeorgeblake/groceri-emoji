// Requiring path to so we can use relative routes to our HTML files
const path = require("path");
const db = require("../models");
// const axios = require("axios");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  // ROUTE FOR FRUIT EMOJIS
  app.get("/fruit-emojis", (req, res) => {
    db.Food.findAll({
      where: {
        subgroup: "food-fruit"
      }
    }).then(results => {
      // noSpaces adds classes to each emoji
      results.forEach(result => {
        result.noSpaces = result.description.replace(/\s/g, "");
        result.price = (Math.random(5.99 - 0.5) + 0.5).toFixed(2);
      });
      const obj = {
        fruit: results
      };
      res.render("fruit", obj);
      console.log(obj.fruit);
    });
  });

  app.get("/vegetables-emojis", (req, res) => {
    db.Food.findAll({
      where: {
        subgroup: "food-vegetable"
      }
    }).then(results => {
      results.forEach(result => {
        result.noSpaces = result.description.replace(/\s/g, "");
        result.price = (Math.random(5.99 - 0.5) + 0.5).toFixed(2);
      });
      //console.log(emoji);
      // const key = "36c98c9c42a94c718bb0011d58688bea";
      // const foodItem = emoji.noSpaces;
      // console.log(foodItem);
      // axios
      //   .get(
      //     `https://api.spoonacular.com/food/ingredients/autocomplete?query=${foodItem}&apiKey=${key}`
      //   )
      //   .then(foodResult => {
      //     const item = foodResult;
      //     console.log(item);
      //     axios
      //       .get(
      //         `https://api.spoonacular.com/food/ingredients/${item.id}/information&apiKey=${key}`
      //       )
      //       .then(foodPrice => {
      //         console.log(foodPrice.estimatedCost.value);
      //         const price = foodPrice.estimatedCost.value;
      //         // return {...emoji, price };
      //         console.log("TEST", price);
      //       });
      //   });
      // console.log(priceResults);
      // Using map, loop through the results and call the spoonacular API to add the price
      const obj = {
        vegetables: results
      };
      res.render("vegetables", obj);
      // console.log(obj.vegetables);
    });
  });
};
