const pizzaSizes = ["Small", "Medium", "Large"];
function pizzaTypes(name, image, description) {
    this.name = name;
    this.image = image;
    this.description = description;

    this.prices = {
        "Large": 1000,
        "Medium": 800,
        "Small": 500
    }
}
pizzaTypes.prototype.price = 0;
pizzaTypes.prototype.crust = null;
pizzaTypes.prototype.topping = [];

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
    new pizzaTypes("BBQ Chicken",
        "p1.jpeg",
        "This is BBQ Chicken pizza"),
    new pizzaTypes("Peperoni", "p2.jpeg", "This is Peperoni"),
    new pizzaTypes("Chicken Tikka", "p3.jpeg", "This is Chicken Tikka")
    
];
const crustList = [
    new crusts("Crispy", 150),
    new crusts("stuffed", 250),
    new crusts("Glutten free", 200)
];

const topingsList = [
    new toppings("Bacon", 120),
    new toppings("Chicken", 150),
    new toppings("Extra cheese", 200)

];

const zones = [
    new zone("Zone A", 150),
    new zone("Zone B", 200),
    new zone("Zone C", 250)
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
             // const toppingPrice = item.topping ? item.topping.price : 0;
        subTotalPrice += item.price + crustPrice + toppingPrice;

        $('#shoppingCart ul.list-group').append(cartItemHtml);        
        $('#shoppingCart ul.list-group li:last img').attr('src', './images/'+item.image);
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
  /* Populating pizza list */
  
  const pizzaListDiv = $('#pizzalisting');
  let pizzaItems = '';

  for (let i = 0; i < pizzaListing.length; i++) {
      let pizzaItem = pizzaListing[i];

      pizzaItems += `<div class="col-md-4 p-3">
      <div class="card" style="width: 18rem;">
      <div class="pizzaImage">
      <img src="./images/p2.jpeg"${pizzaItem.image}" class="card-img-top" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-title">`+ pizzaItem.name + `</h5>
        <p class="card-text">`+ pizzaItem.description + `</p>
        <a href="#" data-index="`+ i + `" 
          class="btn btn-primary orderBtn"
          data-bs-toggle="offcanvas"
          data-bs-target="#pizzaCustomization"
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
          $('#pizzaCustomization img').attr('src', './images/p4.jpeg' + selectedPizza.image);
          
          $('select#size').val('');
          $('select#toppings').val('');
          $('select#crust').val('');
          $('#pizzaPrice').html('');
      });
  });
  /* end of Populating pizza list */
}
}

