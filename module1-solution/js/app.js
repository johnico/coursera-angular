(function(){
  "use strict";

  angular.module("LunchCheck",[])
  .controller('LunchCheckController',LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController ($scope){
      $scope.items ="";
      $scope.message = "";
      $scope.color = "black";
      
      $scope.lunchCheck = function(){
        if (!$scope.items || $scope.items.length === 0) {
             $scope.message  =  'Please enter data first';
             $scope.color = "red";

           }
        else {
            var seperator = ',';
            var lunchItems  = $scope.items.split(seperator);

            console.log(lunchItems);
            if(lunchItems.length <= 3 && lunchItems.length > 0)
            {
              $scope.message = "Enjoy!";
              $scope.color = "green";

            }
            else if (lunchItems.length > 3) {
              $scope.message = "Too much!";
              $scope.color = "green";

            }
            else {
              $scope.message  =  'Please enter data first';
              $scope.color = "red";

            }
          }
      }
  }


})();
