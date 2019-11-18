const controller = require("./controllers.js");
const router = require("express").Router();

router.get("/recipes", controller.recipes.get);
router.post("/recipes", controller.recipes.save);
router.delete("/recipes", controller.recipes.delete);

module.exports = router;
