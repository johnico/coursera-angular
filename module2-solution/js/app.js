(function(){

    angular.module("ShoppingListCheckOff",[])
        .controller("ToBuyController",ToBuyController )
        .controller("AlreadyBoughtController",AlreadyBoughtController)
        .service("ShoppingListCheckOffService",ShoppingListCheckOffService);


    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuyList = this;
        toBuyList.items = ShoppingListCheckOffService.getToBuyList();

        toBuyList.checkItem = function(itemName,itemQuantity,itemIndex){
            try {
                ShoppingListCheckOffService.checkItem(itemName,itemQuantity);
                ShoppingListCheckOffService.removeItem(itemIndex);

            } catch (error) {
                //Everything is bought!
                toBuyList.errorMessage = error.message;
            }

        };
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughtList = this;
        boughtList.items = ShoppingListCheckOffService.getBoughtList();
    }

    function ShoppingListCheckOffService(){

        var service = this;
        var toBuyList =[
            {
                name: "Cookies",
                quantity: 10
            },
            {
                name: "choclate",
                quantity: 20
            },
            {
                name: "cheese",
                quantity: 30
            },
            {
                name: "kosher sushi",
                quantity: 40
            },
            {
                name: "blanket",
                quantity: 50
            }
        ];
        var boughtList =[];

        service.checkItem = function(itemName,itemQuantity)
        {
            var item ={
                name: itemName,
                quantity: itemQuantity
            };

            boughtList.push(item);

        };

        service.getToBuyList = function()
        {

            return toBuyList;

        };
        service.removeItem = function(itemIndex)
        {
            toBuyList.splice(itemIndex,1);

        };

        service.getBoughtList = function()
        {

            return boughtList;

        }


    }

})();