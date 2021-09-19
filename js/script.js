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