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