angular.module('app')
  .directive('freeTime', [function () {
    return {
        link: function ($scope, $element, $attrs) {
            $element.click(function(){
                if($element.hasClass("freeTime"))
                    $element.removeClass("freeTime");
                else
                    $element.addClass("freeTime");
            });
        }
    };
  }]);