module.exports = function Cart(oldCart){
    this.items = oldCart.items || {};
    this.quantity = oldCart.quantity || 0;
    this.price = oldCart.price || 0;

    this.add = function(item, id){
        var storedItem = this.items[id];
        if (!storedItem){
            storedItem = this.items[id] = {item: item, qty:0, pri:0 };
        }
        storedItem.qty++;
        storedItem.pri = storedItem.item.price * storedItem.qty;
        this.quantity++;
        this.price += storedItem.item.price;
    }

    this.removeItem = function(id){
        this.quantity -= this.items[id].qty;
        this.price -= this.items[id].pri;
        delete this.items[id];
    };

    this.generateArray = function(){
        var arr = [];
        for(var id in this.items){
            arr.push(this.items[id]);
        }
        return arr;
    };
};