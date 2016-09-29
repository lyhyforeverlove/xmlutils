app.directive('chooseTeacher', [function () {
    return {
        link: function ($scope, $element) {
            $element.click(function(){
                if($element.hasClass("freeTime"))
                    $element.removeClass("freeTime");
                else
                    $element.addClass("freeTime");
            });
        }
    };
  }]);
