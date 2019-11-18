const express = require("express");
const app = express();
const port = 3000;
const Model = require("./routes/controllers.js");
const router = require("./routes/routes");
const cors = require("cors");
require("babel-core/register");
require("babel-polyfill");

// let unirest = require("unirest");

// let req = unirest("GET", "https://recipe-puppy.p.rapidapi.com/");

// req.query({
//   p: "1",
//   i: "eggs",
//   q: "sandwich"
// });

// req.headers({
//   "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
//   "x-rapidapi-key": "cb8c96604amsh40f56a11ab937a7p1fe68ejsn788fdccf68b1"
// });

//on button click, do above. while typing, update state which fills in query data

// req.end(res => {
//   if (res.error) throw new Error(res.error);

//   console.log(res.body);
// });
app.use(cors());
app.use(express.static("client/dist/"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", router);

// app.get("/api/recipes", (req, res) => {
//   Model.getRecipes()
//     .then(recipes => res.json(recipes))
//     .catch(() => {
//       res.status(404);
//       res.send("No saved recipes found.");
//     });
// });

// app.post("/api/recipes", (req, res) => {
//   Model.saveRecipe(req.query)
//     .then(res.send(req.query))
//     .catch(() => {
//       res.send("Could not post");
//     });
// });

//todo
// app.delete('/api/recipes', (req, res) => {
//   Model.deleteRecipe(???)
// })

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
