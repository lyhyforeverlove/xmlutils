/**
 * Created by ying on 2016/9/7.
 */
app.controller("getSchoolInfo",function($scope,$http){

    //总校列表
    $scope.initMasterSchool =function(){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456',
            {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "1"

            }).success(function (data) {
                if(data) $scope.masterSchoolList = data.result;
            });
    };
    //获取分校
    $scope.getBranchSchoolList = function(masterSchoolCode){
        if(typeof(masterSchoolCode) !=="undefined"){
            $http.post( 'http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456',
                {
                    "pageSize": 100,
                    "pageNumber": 1,
                    "type": "2",
                    "schoolMainCode":masterSchoolCode
                })
                .success(function (data) {
                    if(data) $scope.branchSchoolList = data.result;
                });
        }
    };

    //获取学区
    $scope.getDistrictSchoolList = function(branchSchoolCode){
        if(typeof(branchSchoolCode) !== "undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456',
                {
                    "pageSize": 100,
                    "pageNumber": 1,
                    "type": "3",
                    "branchCode":branchSchoolCode
                })
                .success(function (data) {
                    if(data) $scope.districtSchoolList = data.result;
                });
        }
    };

    //获取学部
    $scope.getDepartmentSchoolList = function(districtSchoolCode){
        if(typeof(districtSchoolCode) !== "undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "4",
                "districtCode":districtSchoolCode
            }).success(function (data) {
                if(data) $scope.departmentSchoolList = data.result;
            });
        }
    };

    //获取中心
    $scope.getCentreSchoolList = function(departmentSchoolCode){
        if(typeof(departmentSchoolCode) !== "undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "5",
                "divisionCode":departmentSchoolCode
            }).success(function (data) {
                if(data) $scope.centreOfSchoolList = data.result;
            });
        }
    };

    //获取班级
    $scope.getClassAndGrade= function(centreSchoolCode){
        if(typeof(centreSchoolCode) !== "undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "6",
                "centerCode":centreSchoolCode
            }).success(function (data) {
                if(data) $scope.classAndGradeList = data.result;
            });
        }
    };

    //获取学习小组
    $scope.getStudyGroup = function(classCode){
        if(typeof(classCode) !== "undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456',
                {
                    "pageSize":20,
                    "pageNumber":1,
                    "type":7,
                    "classCode":classCode
                }).success(function(data){
                if(data) $scope.studyGroupList = data.result;
            });
        }
    };

    //获取所有的教学周期
    $scope.getWeekTimes = function(){
        $http.post("http://192.168.1.213:8080/keepMark-teacher-business/teaching/course/getWeekTimes?requestId=WEUOW343KL34L26NBSK3",
            {}).success(function(data){
            $scope.weekTimes = data.result.weekTimes;
        });
    };
});