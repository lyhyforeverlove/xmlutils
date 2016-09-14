/**
 * Created by ying on 2016/9/14.
 */
//排大班课
app.controller("largeClassesController",function($scope,$controller,$http){
    $scope.titleName="排大班课";
    $controller("getSchoolInfo",{$scope:$scope});
});
//大班课表添加
app.controller("largeClassScheduleController",["$scope","$modal",'$http','scheduleService',function($scope,$modal,$http,scheduleService){
    $scope.titleName = "排大班课表";
    $scope.scheduleStatus = "0";
    var parameters = {
        "weekTimeCode":"30A56BA2E71E4BE2BD5DD59BA044C1D6",
        "bigClassCode":"00D20E260AA74DEA822F4BD3F3171C13"
    }
    var url = "http://192.168.1.213:8080/keepMark-teacher-business/teaching/course/createBigClassSchedule?requestId=WEUOW343KL34L26NBSK3";
    scheduleService.getScheduleList(url,parameters).then(function(data){
        $scope.courses = data.result.sections;
    });

    $scope.chooseScheduleModal = function (eduSectionCode,edudayCode) {
        //星期code---edudayCode
        //节code----eduSectionCode
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg",
            scope:$scope
        });
    }

    $scope.saveCourse =function(){

    }
}])
//排小班课
app.controller("smallClassController",function($scope,$controller){
    $scope.titleName="排小班课";
    $controller("getSchoolInfo",{$scope:$scope});
});
//排小班课课表
app.controller("smallClassScheduleController",["$scope","$modal","scheduleService",function($scope,$modal,scheduleService){
    $scope.titleName = "排小班课表";
    $scope.scheduleStatus = "0";


    var parameters = {
        "smallClass":"F84251DB25484B0B82084CD637D2B43E",
        "weekTimeCode":"30A56BA2E71E4BE2BD5DD59BA044C1D6",
        "bigClassCode":"00D20E260AA74DEA822F4BD3F3171C13"
    };

    var url = "http://192.168.1.213:8080/keepMark-teacher-business/teaching/course/createSmallClassSchedule?requestId=WEUOW343KL34L26NBSK3/";

    scheduleService.getScheduleList(url,parameters).then(function(data){
        $scope.courses = data.result.sections;
    });

    //小班课弹框
    $scope.chooseScheduleModal = function (eduSectionCode,edudayCode) {
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg"
        });
    }
}]);
//排一对一课
app.controller("oneToOneClassesController",function($scope){
    $scope.titleName="排一对一课";

});
//一对一课表
app.controller("oneToOneClassesScheduleController",["$scope","$modal","scheduleService",function($scope,$modal,scheduleService){
    $scope.titleName = "排一对一课表";
    $scope.scheduleStatus = "0";
    var parameters = {
        "smallClass":"F84251DB25484B0B82084CD637D2B43E",
        "weekTimeCode":"30A56BA2E71E4BE2BD5DD59BA044C1D6",
        "bigClassCode":"00D20E260AA74DEA822F4BD3F3171C13"
    }

    scheduleService.getScheduleList(parameters).then(function(data){
        $scope.courses = data.result.sections;
    });


    $scope.chooseScheduleModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg"
        });
    }
}])
