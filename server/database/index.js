const mongoose = require("mongoose");
const autoIncrement = require("mongoose-auto-increment");

mongoose.connect("mongodb://localhost:27017/recipes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
mongoose.set("useFindAndModify", false);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

autoIncrement.initialize(mongoose);

let recipeSchema = new mongoose.Schema({
  title: String,
  ingredients: String,
  link: String
});

recipeSchema.plugin(autoIncrement.plugin, "Recipe");

let Recipe = mongoose.model("Recipe", recipeSchema);

module.exports.Recipe = Recipe;
