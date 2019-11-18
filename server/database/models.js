const db = require("./index.js");

module.exports = {
  recipes: {
    get: callback => {
      db.Recipe.find({}, (err, result) => {
        callback(err, result);
      });
    },
    save: (rec, callback) => {
      db.Recipe.create(rec, (err, result) => {
        callback(err, result);
      });
    },
    delete: (rec, callback) => {
      db.Recipe.deleteOne(rec, (err, result) => {
        callback(err, result);
      });
    }
  }
};
