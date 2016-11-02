(function(){

    angular.module("ShoppingListCheckOff",[])
        .controller("ToBuyController",ToBuyController )
        .controller("AlreadyBoughtController",AlreadyBoughtController)
        .service("ShoppingListCheckOffService",ShoppingListCheckOffService);


    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService){
        var toBuyList = this;
        toBuyList.errorMessage = "Already Bought";
        toBuyList.items = ShoppingListCheckOffService.getToBuyList();

        toBuyList.checkItem = function(itemName,itemQuantity,itemIndex){
            try {
                ShoppingListCheckOffService.checkItem(itemName,itemQuantity);
                ShoppingListCheckOffService.removeItem(itemIndex);

            } catch (error) {
                // log error if any problem with array- not present it to the client
                console.log(error.message);
            }

        };
    }

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var boughtList = this;
        boughtList.errorMessage = "Nothing bought yet";
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

        /**
         * Get name and quantity and pust it to the second array
         * @param itemName
         * @param itemQuantity
         */
        service.checkItem = function(itemName,itemQuantity)
        {
            if(itemName !== "undefined" || itemQuantity !== "undefined")
            {

                var item ={
                    name: itemName,
                    quantity: itemQuantity
                };

                boughtList.push(item);
            }
            else
            {
                throw new Error("Server error, pleas try again");
            }


        };


        /**
         *  return array of To buy list objects
         * @returns {{name: string, quantity: number}[]}
         */
        service.getToBuyList = function()
        {

            return toBuyList;

        };
        /**
         * remove iteme from tobuy array
         * @param itemIndex
         */
        service.removeItem = function(itemIndex)
        {
            if(itemIndex !== "undefined")
            {
                toBuyList.splice(itemIndex,1);
            }
            else
            {
                throw new Error("The index is not a number:" +itemIndex );
            }



        };

        /**
         * Get the bought list
         * @returns {Array}
         */
        service.getBoughtList = function()
        {

            return boughtList;

        }


    }

})();