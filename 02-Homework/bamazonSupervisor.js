var inquirer = require("inquirer");
var mysql = require("mysql");
const cTable = require('console.table');


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
        "View Product Sales by Department",
        "Create New Department"
       
        
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
        case "View Product Sales by Department":
        departmentLookup();
          break;

        case "Create New Department":
         newDepartment()
          break;

      }
    });
}
  function departmentLookup() {
  var query = "SELECT products.item_id, departments.department_name,departments.over_head_costs, products.product_sales,  products.product_sales-departments.over_head_costs AS profit FROM products INNER JOIN departments ON products.department_name =departments.department_name ";
  connection.query(query, function(err, res) {
      if (err) throw err;
      console.table(res);
 connection.end();
});}
  function newDepartment() {
inquirer
  .prompt([
   
    {
      type: "input",
      message: "What is the the name of the department you would like to create?",
      name: "department_name"
    },
    {
      type: "input",
      message: "What is the  overhead cost of the product you would like to Create?",
      name: "over_head_costs"
    }

  ])
  .then(function(answer) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    var query = connection.query(
    "INSERT INTO departments SET ?",
    {
      
      department_name: answer.department_name,
      over_head_costs: answer.over_head_costs
     
    },
    function(err, res) {
      console.log(res.affectedRows + " product Created!\n");
      // Call updateProduct AFTER the INSERT completes
      
   
     console.log(query.sql);
     connection.end();
 })
});}