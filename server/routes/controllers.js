const mongoose = require("mongoose");
const Recipe = require("../database/index.js");
const models = require("../database/models.js");

module.exports = {
  recipes: {
    get: (req, res) => {
      models.recipes.get((err, result) => {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      });
    },
    save: (req, res) => {
      models.recipes.save(req.query, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      });
    },
    delete: (req, res) => {
      models.recipes.delete(req.body, (err, result) => {
        if (err) {
          throw err;
        } else {
          res.json(result);
        }
      });
    }
  }
};

// module.exports = {
//   recipes: {
//     get: async (req, res) => {
//       let result = await models.recipes.get();
//       if (!result) {
//         res.send("No saved recipes found");
//       } else {
//         res.json(result);
//       }
//     },
//     save: async (req, res) => {
//       try {
//         let result = await models.recipes.save(req.query);
//       } catch (err) {
//         throw err;
//       }
//     },
//     delete: async (req, res) => {
//       try {
//         let recipe = await this.model.deleteOne(req.body);
//       } catch (err) {
//         throw err;
//       }
//     }
//   }
// };
