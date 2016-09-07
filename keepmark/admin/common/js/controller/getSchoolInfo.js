/**
 * Created by ying on 2016/9/7.
 */
app.controller("getSchoolInfo",function($scope,$http){

    $http.get("admin/json/school.json").success(function(data){
        $scope.masterSchoolList =data.masterSchool;
    });

    //总校监听
    $scope.$watch("masterSchool",function(newVal,oldVal){
        if(newVal != oldVal){
            $http.get("admin/json/school.json").success(function(data){
                var branchSchoolList =data.branchSchool;
                for(var i=0;i<branchSchoolList.length;i++){
                    if(branchSchoolList[i].masterId == newVal.masterId){
                        $scope.branchSchoolList = branchSchoolList[i].branchSchoolList;
                    }
                };
            });
        }
    });

    //分校监听
    $scope.$watch("branchSchool",function(newVal,oldVal){
        if(newVal != oldVal){
            $http.get("admin/json/school.json").success(function(data){
                var districtSchoolList =data.districtSchool;
                for(var i=0;i<districtSchoolList.length;i++){
                    if(districtSchoolList[i].branchId == newVal.branchId){
                        $scope.districtSchoolList = districtSchoolList[i].districtSchoolList;
                    }
                };
            });
        }
    });

    //学区
    $scope.$watch("districtSchool",function(newVal,oldVal){
        if(newVal != oldVal){
            $http.get("admin/json/school.json").success(function(data){
                var departmentSchoolList =data.departmentSchool;
                for(var i=0;i<departmentSchoolList.length;i++){
                    if(departmentSchoolList[i].districtId == newVal.districtId){
                        $scope.departmentSchoolList = departmentSchoolList[i].departmentSchoolList;
                    }
                };
            });
        }
    });

    //学部
    $scope.$watch("departmentSchool",function(newVal,oldVal){
        if(newVal != oldVal){
            $http.get("admin/json/school.json").success(function(data){
                var centreOfSchoolList =data.centreOfSchool;
                for(var i=0;i<centreOfSchoolList.length;i++){
                    if(centreOfSchoolList[i].departmentId == newVal.departmentId){
                        $scope.centreOfSchoolList = centreOfSchoolList[i].centreOfSchoolList;
                    }
                };
            });
        }
    });

    //中心
    $scope.$watch("centreOfSchool",function(newVal,oldVal){
        if(newVal != oldVal){
            $http.get("admin/json/school.json").success(function(data){
                var classAndGradeList =data.classAndGrade;
                for(var i=0;i<classAndGradeList.length;i++){
                    if(classAndGradeList[i].centreOfId == newVal.centreOfId){
                        $scope.classAndGradeList = classAndGradeList[i].classAndGradeList;
                    }
                };
            });
        }
    });

});