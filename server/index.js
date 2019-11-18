const express = require("express");
const app = express();
const port = 3000;

let unirest = require("unirest");

let req = unirest("GET", "https://recipe-puppy.p.rapidapi.com/");

req.query({
  p: "1",
  i: "eggs",
  q: "sandwich"
});

req.headers({
  "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
  "x-rapidapi-key": "cb8c96604amsh40f56a11ab937a7p1fe68ejsn788fdccf68b1"
});

req.end(res => {
  if (res.error) throw new Error(res.error);

  console.log(res.body);
});

app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});

//first MVP will be single player, time limit or round limit

//react board, array of arrays
//app
//board
//tiles
//score

//html
//webpack babel to compile
//js game logic
//urban dictionary api
//if correct upon placement, top result displayed on bottom
//timer?
