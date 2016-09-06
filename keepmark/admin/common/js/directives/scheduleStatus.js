app.directive('scheduleStatus', [function () {
    return {
        link: function (scope, ele, attrs) {
            scope.update = attrs.update;//获取状态
            if(scope.update ==="true"){
                ele.on("click",function(){
                    //弹出选择老师框
                    scope.$apply("chooseScheduleModal()");
                });
            }
        }
    }
}]);