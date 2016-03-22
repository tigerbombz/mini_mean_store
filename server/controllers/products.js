var mongoose = require('mongoose');
var Product = mongoose.model('Product');

module.exports = (function() {
  return {
    show: function(req, res) {
      Product.find({}, function(err, results){
        if(err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    post: function(req, res) {
      console.log("im in my controllers");
      Product.create(req.body, function(err, results){
        console.log(req.body);
        if(err) {
          console.log(err);
        } else {
          console.log(results);
          res.json(results);
        }
      });
    },

    delete: function(req, res){
      Product.remove({_id: req.params.id}, function (err, results){
      console.log(results);
      });
    }

  };
})();

