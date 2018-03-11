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
   runSearch();
  // run the start function after the connection is made to prompt the user

});

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "rawlist",
      message: "What would you like to do?",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Products for Sale":
          productLookup();
          break;

        case "View Low Inventory":
          lowInventory();
          break;

        case "Add to Inventory":
          addtoInventory();
          break;

        case "Add New Product":
          newProduct();
          break;

      }
    });
}
  function productLookup() {
  var query = "Select * FROM products ";
  connection.query(query, function(err, res) {
      if (err) throw err;
      for(x in res){
      console.log(res[x].item_id);
      console.log(res[x].product_name);
      console.log(res[x].department_name);
      console.log(res[x].price);
      console.log(res[x].stock_quantity +"\n");
        console.log("-----------------------");

    }
         connection.end();
     
   
  });
}
  function lowInventory() {
  var query = "SELECT product_name, stock_quantity FROM products Where stock_quantity < 5 ";
  connection.query(query, function(err, res) {
      if (err) throw err;
      for(x in res){
          console.log(res[x].product_name);
      console.log(res[x].stock_quantity +"\n");
        console.log("-----------------------");


      }
        connection.end();
     
   
  });
}
  function addtoInventory() {

inquirer
  .prompt([
    {
      type: "input",
      message: "What is them the ID of the product they would like to Update?",
      name: "id"
    },
    
    {
      type: "input",
      message: "how many units of the product they would like to update",
      name: "quantity"
    }

  ])
  .then(function(answer) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    var query = "UPDATE products SET stock_quantity = stock_quantity + "+ answer.quantity+" WHERE ?";
   connection.query(query, { item_id: answer.id }, function(err, results) {
    if (err) throw err;
    
   console.log("Inventory updated");
    connection.end();
      });
  });}
  
  function newProduct() {
inquirer
  .prompt([
   
    {
      type: "input",
      message: "What is them the name of the product you would like to create?",
      name: "product_name"
    },
    {
      type: "input",
      message: "What is them the department name of the product you would like to Create?",
      name: "department_name"
    },
    {
      type: "input",
      message: "What is the the price of the product you would like to Create?",
      name: "price"
    },
    {
      type: "input",
      message: "how many units of the product they would like to create",
      name: "quantity"
    }

  ])
  .then(function(answer) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    var query = connection.query(
    "INSERT INTO products SET ?",
    {
      product_name: answer.product_name,
      department_name: answer.department_name,
      price: answer.price,
      stock_quantity: answer.quantity,
      product_sales: 0
    },
    function(err, res) {
      console.log(" product Created!\n");
      // Call updateProduct AFTER the INSERT completes
      
   
     console.log(query.sql);
      connection.end();
 })
});}