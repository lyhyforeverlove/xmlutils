angular.module('app')
.directive('detailMessage', function() {
    return {
        restrict: 'EC',
        templateUrl: 'admin/common/tpl/filter.html',
        transclude: true,
        replace: true
    };
})
.filter('limitToNum', function() {  
   return function(input, num) {  
      if(input.length>num){
        input = input.substring(0,num)+"...";
      }
      return input;  
   };  
});