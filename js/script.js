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