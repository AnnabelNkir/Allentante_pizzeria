// User interface logic

const pizzaSizes = ["Small", "Medium", "Large"];
function pizzaTypes(name, image, description) {
    this.name = name;
    this.image = image;
    this.description = description;
    

    this.prices = {
        "Large": 1200,
        "Medium": 900,
        "Small": 600
    }
}
pizzaTypes.prototype.price = 0;
pizzaTypes.prototype.crust = null;
pizzaTypes.prototype.topping = [];
pizzaTypes.prototype.quantity = 0;


function crusts(name, price) {
    this.name = name;
    this.price = price;
}

function toppings(name, price) {
    this.name = name;
    this.price = price;
}

function Cart(){
    const cart = this;
    this.cartItems = [];
    this.delivery = null;
    this.addToCart = function(item){
        cart.cartItems.push(item);
        $("#cartItems").html(cartItems.length);
    }
}

function zone(zoneName, price){
    this.zoneName = zoneName;
    this.price = price;
}

let cart = new Cart();
let selectedPizza;
let cartItemHtml;

const pizzaListing = [
    new pizzaTypes("Chicken Tikka",
        "pizza8.jpeg",
        "Tantalizing Tikka"),
    new pizzaTypes("Peperoni", "pizza.jpeg", "Hot Peperoni"),
    new pizzaTypes("BBQ Chicken", "pizza5.jpeg", "Yummy BBQ"),
    new pizzaTypes("Hawaaian", "pizza3.jpeg", "Tropical Hawaaian"),
    new pizzaTypes("Veg Tikka", "p1.jpeg", "Sumptuous Veg Tikka"),
    new pizzaTypes("Boerewors Pizza", "p4.jpeg", "Finger-licking Boerewors"),

];

const crustList = [
    new crusts("Crispy", 100),
    new crusts("Stuffed", 120),
    new crusts("Glutten free", 200)
];

const topingsList = [
    new toppings("Standard", 100),
    new toppings("Diced pineapples", 120),
    new toppings("Bacon", 200),
    new toppings("Extra cheese", 100),
    new toppings("Extra dip", 150),
];

const zones = [
    new zone("Zone A- Around CBD", 100),
    new zone("Zone B- Thika road", 200),
    new zone("Zone C- Waiyaki way",250),
    new zone("Zone D- Ngong road",250),
    new zone("Zone C- Kiambu road",250),
    new zone("Zone C- Mombasa road",300),
    new zone("Zone C- Kangundo road",400),

]

function populateDropdowns(sizeElement, items, valueFiled, textField, extraField){
    for (let i = 0; i < items.length; i++) {
        let item = items[i];
        let extras = extraField ? '('+item[extraField]+')' : '';
        let value = valueFiled ? item[valueFiled] : item;
        let text = textField ? item[textField] : item;
        sizeElement.append(`<option value="` + value + `">` + text + extras+`</option>`);
    }
}

function updateUI(){
    $('#cartItems').html(cart.cartItems.length);
    if(selectedPizza){
        let pizzaPrice = 0;
        if(selectedPizza.price){
            pizzaPrice += selectedPizza.price;
            $('#addToCartBtn').removeAttr('disabled');
        }
        else{
            $('#addToCartBtn').attr('disabled', true);
        }
        if(selectedPizza.crust) pizzaPrice += selectedPizza.crust.price;
        if(selectedPizza.topping) pizzaPrice += selectedPizza.topping.reduce((a, b)=>a+b.price, 0);
                
        $('#pizzaPrice').html(pizzaPrice);

    }

    let subTotalPrice = 0;
    let totalPrice = 0;
    $('#shoppingCart ul.list-group').html('');
    for(let i=0; i<cart.cartItems.length; i++){
        const item = cart.cartItems[i];
        const crustPrice = item.crust ? item.crust.price : 0;
        let toppingPrice = 0;
        if(item.topping.length > 0){
            toppingPrice = item.topping.reduce((a, b)=>a+b.price, 0);
        }
        

        subTotalPrice += item.price + crustPrice + toppingPrice;

        $('#shoppingCart ul.list-group').append(cartItemHtml);        
        $('#shoppingCart ul.list-group li:last img').attr('src', './images/pizza.jpeg'+item.image);
        $('#shoppingCart ul.list-group li:last span.name').html(item.name);
        $('#shoppingCart ul.list-group li:last span.price').html(item.price);
        if(item.crust) 
            $('#shoppingCart ul.list-group li:last div.details')
            .append("Crust:"+item.crust.name)

        if(item.topping) $('#shoppingCart ul.list-group li:last div.details')
            .append(" Topping:"+item.topping.map(topping=>topping.name).join(','));
        
    }

    $('.checkoutBtn').each(function(){
        if(cart.cartItems.length > 0)
            $(this).removeAttr('disabled');
        else $(this).attr('disabled', true);
    });

    $('.subTotal').html(subTotalPrice);
    $('#totalPrice').html(subTotalPrice + (cart.delivery ? cart.delivery.price : 0));

}

$(document).ready(function () {

    cartItemHtml = $('#shoppingCart .cartItem').prop('outerHTML');
    $('#shoppingCart .cartItem').remove();

    /* Populating pizza list */
    const pizzaListDiv = $('#pizzalisting');
    let pizzaItems = '';

    for (let i = 0; i < pizzaListing.length; i++) {
        let pizzaItem = pizzaListing[i];

        pizzaItems += `<div class="col-md-4 p-3">
        <div class="card" style="width: 18rem;">
        <div class="pizzaImage">
        <img src="./images/${pizzaItem.image}" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-title">`+ pizzaItem.name + `</h5>
          <p class="card-text">`+ pizzaItem.description + `</p>
          <a href="#" data-index="`+ i + `" 
            class="btn btn-primary orderBtn"
            data-bs-toggle="offcanvas"
            data-bs-target="#pizzaCustomazation"
            aria-controls="offcanvasBottom">Order</a>
        </div>
      </div>
        </div>`;
        pizzaItem = undefined;
    }

    pizzaListDiv.html(pizzaItems);
    pizzaListDiv.find('a.orderBtn').each(function () {
        $(this).on('click', function () {
            let pizzaIndex = $(this).data('index');
            selectedPizza = pizzaListing[pizzaIndex];
            $('#pizzaCustomazation img').attr('src', './images/p4.jpeg' + selectedPizza.image);
            
            $('select#size').val('');
            $('select#toppings').val('');
            $('select#crust').val('');
            $('#pizzaPrice').html('');
        });
    });
    /* end of Populating pizza list */

    /* Populate sizes */
    populateDropdowns($('select#size'), pizzaSizes);
    $('select#size').on('change', function(){
        const size =$(this).val();
        if(selectedPizza){
            selectedPizza.price = selectedPizza.prices[size];
        }
        updateUI()
    });
    /* end of Populate sizes */

    /* Populate Toppings */
    
    for(let i=0; i<topingsList.length; i++){
        let topping = topingsList[i];
        $('#toppings').append(`<div class="form-check">
        <input class="form-check-input" type="checkbox" value="`+topping.name+`" id="flexCheckDefault`+i+`">
        <label class="form-check-label" for="flexCheckDefault`+i+`">
          `+topping.name+`
        </label>
      </div>`);
        
    }

    $('#toppings .form-check-input').on('change', function(){
        const isCheck = this.checked;
        
        const selectedToppingValue = $(this).val();
        let topping = topingsList.find(function(topping){
            if(topping.name == selectedToppingValue) return true;
            else return false;
        });
        const indexOfSelectedTopping = selectedPizza.topping.findIndex(function(toppingItem){ 
            return toppingItem.name == topping.name;
         });

        if(indexOfSelectedTopping == -1 && isCheck) selectedPizza.topping.push(topping);
        else if(indexOfSelectedTopping > -1 && !isCheck){
            selectedPizza.topping.splice(indexOfSelectedTopping, 1);
        }
        updateUI()
    });
    /* end of Populate sizes */

    /* Populate crust */
    populateDropdowns($('select#crust'), crustList, 'name', 'name', 'price');
    $('select#crust').on('change', function(){
        const selectedCrustValue = $(this).val();
        let crust = crustList.find(function(crust){
            if(crust.name == selectedCrustValue) return true;
            else return false;
        });
        selectedPizza.crust = crust;
        updateUI();
    });
    /* end of crust population */

    /* Populate delivery zones */
    populateDropdowns($('select#deliveryZones'), zones, 'zoneName', 'zoneName', 'price');
    $('select#deliveryZones').on("change", function(){
        cart.delivery = zones.find(z=>z.zoneName == $(this).val());
        // console.log(cart.delivery);
        updateUI();
    });
    /* End of populate delivery zones */

    /* add to cart action */
    const addToCartBtn = $('#addToCartBtn');
    addToCartBtn.click(function(){        
        cart.addToCart(selectedPizza);
        alert(selectedPizza.name +' has been added to cart,click on the shopping cart above to proceed to choose a delivery or pick-up option');
        updateUI();
    });

    $('#shoppingCartBtn').on('click', function(){
        $('#shoppingCart').toggle();
    });

    $('.checkoutBtn').click(function(){
        alert('Thank you for placing an order with Allentante Pizzeria, Your order will be delivered to your location.');
        cart = new Cart();
        updateUI();
    });

});
