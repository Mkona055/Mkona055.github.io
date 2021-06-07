	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "brocoli",
		contLactose: false,
		contNut: false,
		organic: true,
		price: 2.99,
		quantity:0
	},
	
	{
		name: "pickle",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 1.59,
		quantity:0
	},
	{
		name: "apple",
		contLactose: false,
		contNut: false,
		organic: false,
		price: 0.99,
		quantity:0
	},
	{
		name: "cherry",
		contLactose: false,
		contNut: false,
		organic:false,
		price: 1.99,
		quantity:0
	},
	{
		name: "tomato (pack of 5)",
		contLactose: false,
		contNut: false,
		organic:false,
		price: 4.25,
		quantity:0
	},
	{
		name: "lettuce iceberg",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 2.69,
		quantity:0
	},
	{
		name: "banana",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 0.50,
		quantity:0
	},
	{
		name: "strawberry 400g",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 4.00,
		quantity:0
	},
	
	{
		name: "cheese 450g",
		contLactose: true,
		contNut: false,
		organic:true,
		price: 1.99,
		quantity:0
	},
	{
		name: "milk 2L",
		contLactose: true,
		contNut: false,
		organic:true,
		price: 5.19,
		quantity:0
	},
	{
		name: "yogurt 750g",
		contLactose: true,
		contNut: false,
		organic:true,
		price: 5.99,
		quantity:0
	},
	{
		name: "ice cream oreo 1.5L",
		contLactose: true,
		contNut: false,
		organic:false,
		price: 6.99,
		quantity:0
	},
	{
		name: "bread 500g",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 3.99,
		quantity:0
	},

	{
		name: "nutella 725g",
		contLactose: false,
		contNut: true,
		organic:false,
		price: 7.49,
		quantity:0
	},
	{
		name: "peanut butter 500g",
		contLactose: false,
		contNut: true,
		organic:true,
		price: 7.19,
		quantity:0
	},
	{
		name: "peanut and chocolate biscuits 10x38g",
		contLactose: false,
		contNut: true,
		organic:true,
		price: 5.49,
		quantity:0
	},
	{
		name: "egg ",
		contLactose: false,
		contNut: false,
		organic:false,
		price: 0.26,
		quantity:0
	},
	{
		name: "ground meat 100g",
		contLactose: false,
		contNut: false,
		organic:false,
		price: 6.32,
		quantity:0
	},
	{
		name: "smoked salmon 100g",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 7.00,
		quantity:0
	},
	{
		name: "sausage 100g",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 2.28,
		quantity:0
	},
	{
		name: "bacon 100g",
		contLactose: false,
		contNut: false,
		organic:true,
		price: 5.28,
		quantity:0
	}

];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restrictions, organic) {
	let products_restricted = [];
	for (let i=0; i<prods.length; i+=1) {
		if(restrictions.length == 0){
			if((organic == "Organic") && (prods[i].organic == true)){
				products_restricted.push(prods[i]);
			}else if((organic == "Non-Organic")){
				products_restricted.push(prods[i]);
			}
		}else{
			let toBeAdded = false;
			for(let j=0;j< restrictions.length; j+=1){
				var restriction = restrictions[j];
				
				if ((restriction == "LacIntolerant") && (prods[i].contLactose == false)){
					toBeAdded = true;
				}else if ((restriction == "NutAllergic") && (prods[i].contNut == false)){
					toBeAdded = true;
				}else{
					toBeAdded = false;
					break;
				}
			}

			if(toBeAdded){
					if((organic == "Organic") && (prods[i].organic == true)){
						products_restricted.push(prods[i]);
					}else if((organic == "Non-Organic")){
						products_restricted.push(prods[i]);
					}
				}		
		}

		
	}

	products_restricted = products_restricted.sort(function(a,b){
		return a.price - b.price;
	})
	return products_restricted;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price * products[i].quantity;
		}
	}
	return totalPrice;
}
