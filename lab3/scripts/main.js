var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    /* Toggle between adding and removing the "active" class,
    to highlight the button that controls the panel */
    this.classList.toggle("active");

    /* Toggle between hiding and showing the active panel */
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}
// This function is called when any of the tab is clicked
// It is adapted from https://www.w3schools.com/howto/howto_js_tabs.asp

function openInfo(evt, tabName) {

	// Get all elements with class="tabcontent" and hide them
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}

	// Get all elements with class="tablinks" and remove the class "active"
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}

	// Show the current tab, and add an "active" class to the button that opened the tab
	document.getElementById(tabName).style.display = "block";
	evt.currentTarget.className += " active";

}


function checkInputs(slct1, slct2,slct3){
	 //var s1 = document.getElementById(slct1);
    var s1 = document.getElementsByName(slct1);
    var s3 = document.getElementsByName(slct3);
    var indexOfNone = 2;
    if(s1[indexOfNone].checked){
			for(let i = 0; i < s1.length-1; i++) {
				s1[i].checked = false;
			}
		}
}
// generate a checkbox list from a list of products
// it makes each product name as the label for the checkbos

function populateListProductChoices(slct1, slct2,slct3) {
    //var s1 = document.getElementById(slct1);
    var s1 = document.getElementsByName(slct1);
    var s2 = document.getElementById(slct2);
    var s3 = document.getElementsByName(slct3);
    var indexOfNone = 2;
	
	// s2 represents the <div> in the Products tab, which shows the product list, so we first set it empty
    s2.innerHTML = "";
		
	// obtain a reduced list of products based on restrictions
	let restrictions = [];
	for(let i = 0; i < s1.length-1; i++) {
		if(s1[i].checked){
			restrictions.push(s1[i].value);
		}
		if(i == s1.length - 1 && restrictions.length == 0){
			s1[i].checked = true;
		}
	}
	
	var optionArray;
	for (i = 0; i <s3.length; i++){
		if(s3[i].checked){
			optionArray = restrictListProducts(products, restrictions,s3[i].value);
			alert("PREFERENCES SAVED SUCCESFULLY !");
			break;
		}
		if(i == s3.length-1){
			alert("Please specify if you want only organic products to be displayed");
			exit();
			break;
		}
	}
	
    

	// for each item in the array, create a checkbox element, each containing information such as:
	// <input type="checkbox" name="product" value="Bread">
	// <label for="Bread">Bread/label><br>
		
	for (i = 0; i < optionArray.length; i++) {
			
		var product = optionArray[i];
		// create the checkbox and add in HTML DOM
		var checkbox = document.createElement("input");
		checkbox.type = "checkbox";
		checkbox.name = "product";
		checkbox.value = product.name + "Unit price:" + product.price + "$";
		s2.appendChild(checkbox);
		
		/*
		var img = document.createElement("img");
		img.id = "checkboxIcon"
		img.src = "assets/shopping_cart.png";
		s2.appendChild(img);
		*/


		// create a label for the checkbox, and also add in HTML DOM
		var label = document.createElement('label')
		label.id = "prod";
		label.htmlFor = product.name;
		label.appendChild(document.createTextNode(product.name));
		label.appendChild(document.createElement("br"));
		s2.appendChild(label);

		var label = document.createElement('label')
		label.id = "price";
		label.htmlFor = product.price;
		label.appendChild(document.createTextNode("Price: "+ product.price + "$"));
		label.appendChild(document.createElement("br"));
		s2.appendChild(label);

		var label = document.createElement('label')
		label.id = "qtty";
		label.htmlFor = product.name;
		label.appendChild(document.createTextNode("quantity:"));
		//label.appendChild(document.createElement("br"));
		s2.appendChild(label);

		var quantity = document.createElement("input");
		quantity.type = "number";
		quantity.id = "quantity"+product.name;
		quantity.value = 1;
		s2.appendChild(quantity);
		
		// create a breakline node and add in HTML DOM
		s2.appendChild(document.createElement("br"));
		s2.appendChild(document.createElement("br"));     
	}
}
	
// This function is called when the "Add selected items to cart" button in clicked
// The purpose is to build the HTML to be displayed (a Paragraph) 
// We build a paragraph to contain the list of selected items, and the total price

function selectedItems(){
	
	var ele = document.getElementsByName("product");

	var chosenProducts = [];
	
	var c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	
	var para = document.createElement("P");
	para.innerHTML = "You selected : ";
	para.appendChild(document.createElement("br"));
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {

			var val = ele[i].value;
			var name = val.slice(0,val.indexOf("Unit"));
			var price = val.slice(val.indexOf("Unit"), val.length);

			var quantity = document.getElementById("quantity"+name).value;
			for (j = 0 ; j < products.length ; j++){
				if (products[j].name == name){
					products[j].quantity = quantity;
					break; 
				}
			}
			
			var labelForName = document.createElement("label");
				labelForName.id = "prodName";
			var labelForPrice = document.createElement("label");
				labelForPrice.id = "price";
			var labelForQuantity = document.createElement("label");
				labelForQuantity.id = "qtty";
			
			labelForName.appendChild(document.createTextNode("- " + name));
			labelForName.appendChild(document.createElement("br"));
			para.appendChild(labelForName);

			labelForPrice.appendChild(document.createTextNode(price));
			labelForPrice.appendChild(document.createElement("br"));
			para.appendChild(labelForPrice);

			labelForQuantity.appendChild(document.createTextNode("quantity: "+quantity));
			labelForQuantity.appendChild(document.createElement("br"));
			para.appendChild(labelForQuantity);

			chosenProducts.push(name);
		}
	}
	para.appendChild(document.createElement("br"));
	para.appendChild(document.createTextNode("Total price is " + getTotalPrice(chosenProducts).toPrecision(3) + " $"));
	para.appendChild(document.createElement("br"));
	para.appendChild(document.createElement("br"));
	para.appendChild(document.createTextNode("How would you like to receive your products ?"));
	para.appendChild(document.createElement("br"));

	var pickup = document.createElement("button");
	pickup.id = "pickup";
	pickup.appendChild(document.createTextNode("PICKUP"));

	// Get the modal
	var modal = document.getElementById("modalPickup");
	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks on the button, open the modal
	pickup.onclick = function() {
	  modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	  modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal) {
	    modal.style.display = "none";
	  }
	}
	para.appendChild(pickup);

	var delivery = document.createElement("button");
	delivery.id = "delivery";
	delivery.appendChild(document.createTextNode("DELIVERY"));
	// Get the modal
	var modal2 = document.getElementById("modalDelivery");
	// Get the <span> element that closes the modal
	var span2 = document.getElementsByClassName("close")[1];

	// When the user clicks on the button, open the modal
	delivery.onclick = function() {
	  modal2.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span2.onclick = function() {
	  modal2.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	  if (event.target == modal2) {
	    modal2.style.display = "none";
	  }
	}
	para.appendChild(delivery);

	// add paragraph and total price
	c.appendChild(para);


	alert("YOUR ITEMS WERE SUCCESFULLY ADDED TO YOUR CART")	;
}
function checkOrderInfos(slct1,slct2,slct3,slct4){
	var s1 = document.getElementById(slct1);
	var s2 = document.getElementById(slct2);
	var s3 = document.getElementById(slct3);
	var modal = document.getElementById(slct4);
	if (s1.value == "" || s2.value == "" || s3.value == ""){
		alert("Please fill all fields of informations");
	}else{
		modal.style.display = "none";
	  alert("YOUR ORDER WAS SUCCESFULLY PLACED! \n THIS PAGE WILL BE RELOADED ONCE YOU PRESS OK")
	  window.location.reload()
	}
}


var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

