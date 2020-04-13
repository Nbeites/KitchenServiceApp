class Order {

    //products tem product e extra

    constructor(name) {
        this.id = new Date().getTime();
        this.name = name;
        this.products = [];
    }

    addProductToArray(product) {
        this.products.push(product);
    }

    setName(name){
        this.name = name;
    }

}

class Product {

    constructor(product, extra) {

        this.product = product;
        this.extra = extra;
    }
}