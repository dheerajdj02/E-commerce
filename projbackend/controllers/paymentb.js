var braintree = require("braintree");

var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: "npndz8bs728tnf56",
  publicKey: "d5t6rw473y64ts36",
  privateKey: "3075df85cfbc2bcd54253ab35423640d"
});


exports.getToken = (req,res) => {
    gateway.clientToken.generate({}, function (err, response) {
        if(err){
            require.status(500).send(err)
        }else{
            res.send(response)
        }
      });
};
exports.processPayment = (req,res) => {
    let nonceFromTheClient = req.body.paymentMethodNonce
    let amountFromTheClient = req.body.amount
    gateway.transaction.sale({
        amount: amountFromTheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err) {
              res.status(500).json(err)
          }else{
              res.json(result)
          }
      });

};