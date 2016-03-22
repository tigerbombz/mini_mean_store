var mongoose = require('mongoose');
var Order = mongoose.model('Order');
var Product = mongoose.model('Product');

module.exports = (function() {
  return {
    show: function(req, res) {
      Order.find({}, function(err, results){
        if(err) {
          console.log(err);
        } else {
          res.json(results);
        }
      });
    },

    post: function(req, res) {
      console.log("im in my controllers");
      Order.create(req.body, function(err, results){
        if(err) {
          console.log(err);
        } else {
          // console.log("DECREMENTING PRODUCT", req.body.quantity)
          Product.findOne({ name: req.body.product }, function(err2, product) {
            // console.log('product quantity: ' + product.quantity);
            // console.log('order quantity: ' + req.body.quantity);
            product.update({ quantity: product.quantity - req.body.quantity },
              function(err3, newProd) {
                Product.findOne({ name: req.body.product }, function(err2, p) {
                  console.log('new product quantity: ' + p.quantity);
                })
              });
          });
          // console.log('PRODUCT')
          // console.log('\n')
          // console.log(product);
          // product.quantity--;

          res.json(results);
        }
      });
    },

    delete: function(req, res){
      Order.remove({_id: req.params.id}, function (err, results){
      console.log(results);
      });
    }

  };
})();


