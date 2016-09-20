app.directive('scheduleStatus', [function () {
    return {
        link: function (scope, ele, attrs) {
            scope.update = attrs.update;//获取状态
            if(scope.update ==="true"){
                ele.on("click",function(){
                    //弹出选择老师框
                    var index = ele.index();
                    scope.eduSectionCode = ele.parent().children().eq(0).attr("eduSectionCode");
                    scope.eduDayCode = ele.parent().parent().children().eq(1).children().eq(index).attr("dayCode");
                    scope.chooseScheduleModal(scope.eduSectionCode,scope.eduDayCode);
                });
            }
        }
    }
}]);