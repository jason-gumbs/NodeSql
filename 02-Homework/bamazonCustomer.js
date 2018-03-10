// Load the NPM Package inquirer
var inquirer = require("inquirer");
var mysql = require("mysql");


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "rock23",
  database: "bamazon"
});
// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
   start();
  // run the start function after the connection is made to prompt the user

});


function start() {
inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "What is them the ID of the product they would like to buys?",
      name: "id"
    },
    {
      type: "input",
      message: "how many units of the product they would like to buy",
      name: "quantity"
    }

  ])
  .then(function(answer) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    var query = "SELECT * FROM products WHERE ?";
   connection.query(query, { item_id: answer.id }, function(err, results) {
    if (err) throw err;
    
    if(answer.quantity  > results[0].stock_quantity ){
      console.log("Insufficient quantity!")
     }
     else{
      removeInventory(answer);
      totalSales(answer);
      console.log("your Purchase will cost you $"+results[0].price);
     }
    connection.end();
      });
  });}

  function removeInventory(answer){
  var query = "UPDATE products SET stock_quantity = stock_quantity - "+ answer.quantity+" WHERE ?";
  connection.query(query, { item_id: answer.id }, function(err, res) {
      if (err) throw err;
     });
}

 function totalSales(answer){
  var query = "UPDATE products SET product_sales = price * "+ answer.quantity +" WHERE ?";
  connection.query(query, { item_id: answer.id }, function(err, res) {
      if (err) throw err;
  });
}
