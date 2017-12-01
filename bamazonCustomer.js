// -create mysql database called 'bamazon'
// -create table inside bamazon called 'products'
// -populate table with values
// -create bamazonCustomer.js
// -display all items available for sale (table form)
// 	-inclue ids, names, department, and prices
// -prompt users with two messages
// 	-first promp should ask user what they want to buy
// 	-second prompt should ask user how many units they want to buy
// 		-check if store has enough product to meet customer request
// 			-if not console log Insufficient quantity 
// 		-if store has enough stock update sql database with the remaining quantity
// 		- after order goes through show customer the total cost of purchase		



var mysql = require("mysql");
var inq = require("inquirer");
var table = require("console.table");

var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "",
	database: "bamazon"
});

connection.connect(function(err) {
	if(!err){
		mainMenu();
		// mainMenu();
	};
});

var resultsArr = [];
function mainMenu() {
	connection.query("SELECT * FROM products", function(err, results){
		console.log("You are connected!");
		for(var i = 0; i < results.length; i++){
			var innerArr = [];
			innerArr.push(results[i].item_id);
			innerArr.push(results[i].product_name);
			innerArr.push(results[i].department_name);
			innerArr.push(results[i].price);
			innerArr.push(results[i].stock_quantity);
			resultsArr.push(innerArr);
		}
		console.table(["Item ID", "Product Name", "Department Name", "Price", "Stock"], resultsArr);
		itemSelect();
	});
	
};


// ===============================================
// 				Main Menu
// ===============================================	
function itemSelect(){
	inq.prompt([
	{
		type: "input",
		message: "Please enter the Item ID of the item you wish to purchase",
		name: "buy"
	},
	{
		type: "input",
		message: "How many would you like to purchase?",
		name: "amount"
	}
	]).then(function(userInput) {
		connection.query("UPDATE products SET stock_quantity = stock_quantity -? WHERE item_id = ?", [userInput.amount, userInput.buy], function (err, res){
			console.log("Order Complete, Stock Updated");
		})
	})
};



// =====================================================================
// 	then(function(userChoice) {
// 		var buy = userChoice.buy;
// 		connection.query(
// 			"SELECT * FROM products WHERE item_id = ?", buy, function(err, response) {
				
// 					inq.prompt([{
// 		type: "input",
//  		message: "How many would you like to purchase?",
//  		name: "amount"
//  	}
//  	]).then(function(userAmount) {
//  		var amount = userAmount.amount;
//  		connection.query("UPDATE products WHERE item_id = ?, SET stock_quantity = - ?",[buy, amount], function(err, response) {
//  			console.log("Stock Updated");

//  		})
//  	})
// 				// console.log(JSON.stringify(response));
// 			})
// 	});
// };




// ========================================================
// 			"UPDATE products SET? WHERE?", [stock_quantity, userChoice]
// 			[
// 				{
// 					stock_quantity: -userChoice

// 			}]



// 			)
// 		var itemUpdate =  
// 	})
// }			


// function updateItemCount() {
// 	inq.prompt([{
// 		type: "input",
// 		message: "How many would you like to purchase?",
// 		name: "amount"
// 	}
// 	]).then(function(userAmount) {
// 		var numberOfItem = userAmount.amount;
// 		var query = connection.query(
// 			"UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",[buy, numberOfItem], function(err, response) {
// 				console.log(response);
// 			} )

// 	});

// };

// function addPriceTotal() {

// };