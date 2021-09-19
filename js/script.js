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