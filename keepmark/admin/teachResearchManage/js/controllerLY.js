/**
 * Created by ying on 2016/9/9.
 */
//总校列表
app.controller("headSchoolController",function($scope,$http,$state){
    $http.post('http://192.168.1.201:7777/keepMark-teacher-business/section/organization/list?requestId=test123456', {
        "pageSize":20,
        "pageNumber":1,
        "type":1
    }).success(function(data){
        $scope.list = data.result;
    });

    $scope.updateHeadSchool = function(headSchool){
        $state.go("app.teachResearchManage.updateHeadSchool",
            {"headSchool":JSON.stringify(headSchool)});
    }
});

//新增总校
app.controller("addHeadSchoolController",function($scope,$http,$state){
    $scope.saveHeadSchool = function(){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/section/organization/create/main?requestId=test123456',$scope.formData).success(function(data){
            $state.go('app.teachResearchManage.headSchool');
        });
    }
});

//修改总校
app.controller("updateHeadSchoolController", function($scope,$http,$stateParams,$state){
    $scope.headSchool = JSON.parse($stateParams.headSchool);

    $scope.saveUpdateHeadSchool = function(){
        $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/update/main?requestId=test123456",
            {
                "code":$scope.headSchool.code,
                "name":$scope.headSchool.name,
                "personCharge":$scope.headSchool.personCharge
            }
            ).success(function(data){
                $state.go("app.teachResearchManage.headSchool");
        });
    }
})

//分校列表
app.controller("branchSchoolController",function($scope,$http,$controller,$state){
    $controller("headSchoolSelectController",{$scope:$scope});
    $scope.seacherBranchByHeadSchool =function(code){
        if(typeof(code)!=="undefined"){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/list?requestId=test123456",
                {
                    "pageSize": 20,
                    "pageNumber": 1,
                    "type": 2,
                    "monitorMianCode": code
                }).success(function (data) {
                $scope.list = data.result;
            });
        }
    }
    //进入修改页面
    $scope.updateSchoolBranch = function(schoolBranch){
        $state.go("app.teachResearchManage.updateSchoolBranch",{"schoolBranch":JSON.stringify(schoolBranch)});
    }
});

//新增分校
app.controller("addSchoolBranchController",function($scope,$http,$state,$controller){
    $controller("headSchoolSelectController",{$scope:$scope});
    $scope.saveSchoolBranch = function(){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/create/branch?requestId=test123456",
                $scope.schoolBranch).success(function(data){
                    $state.go("app.teachResearchManage.schoolBranch");
            });
        }
});

//修改分校
app.controller("updateSchoolBranchController",function($scope,$http,$state,$controller,$stateParams){
    $controller("headSchoolSelectController",{$scope:$scope});
    $scope.schoolBranch = JSON.parse($stateParams.schoolBranch);
    $scope.saveUpdateSchoolBranch = function(){
        $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/update/branch?requestId=test123456",
            $scope.schoolBranch).success(function(data){
            $state.go("app.teachResearchManage.schoolBranch");
        });
    }
});


//中心列表
app.controller("subjectCentreController",function($scope,$http,$state,$controller){
    $controller("headSchoolSelectController",{$scope:$scope});
    $scope.updateCentreSchool = function(centreSchool){
        $state.go("app.teachResearchManage.updateCentreSchool",
            {centreSchool:JSON.stringify(centreSchool)})
    }
});

//新增中心
app.controller("addCentreSchoolController",function($scope,$http,$state,$controller){
    $controller("headSchoolSelectController",{$scope:$scope});

    $scope.saveCentreSchool = function(){
        $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/create/center?requestId=test123456",
            $scope.centreSchool).success(function(data){
            $state.go("app.teachResearchManage.subjectCenter");
        });
    }
});
//修改中心
app.controller("updateCentreSchoolController",function($scope,$http,$state,$controller,$stateParams){
    $controller("headSchoolSelectController",{$scope:$scope});
    $scope.centreSchool = JSON.parse($stateParams.centreSchool);
    //保存修改
    $scope.saveUpdateCentreSchool = function(){
        $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/update/center?requestId=test123456",
            $scope.centreSchool).success(function(data){
                $state.go("app.teachResearchManage.subjectCenter");
        });
    }
});

//下拉框
app.controller("headSchoolSelectController",function($scope,$http){
    $http.post('http://192.168.1.12:7777/keepMark-teacher-business/section/organization/list?requestId=test123456', {
        "pageSize":20,
        "pageNumber":1,
        "type":1
    }).success(function(data){
        $scope.headSchoolList = data.result;
    });

    //根据主校获取分校
    $scope.seacherBranchByHeadSchool = function(headCode){
        if(typeof(headCode) !== "undefined"){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/list?requestId=test123456",
                {
                    "pageSize": 20,
                    "pageNumber": 1,
                    "type": 2,
                    "monitorMianCode": headCode
                }).success(function (data) {
                $scope.schoolBranchList = data.result;
            });
        }
    };
    //根据分校获取中心
    $scope.seacherCentreBySchoolBranch = function(branchCode){
        if(typeof(branchCode) !== "undefined" && branchCode){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/list?requestId=test123456",
                {
                    "pageSize":20,
                    "pageNumber":1,
                    "type":3,
                    "monitorBranchCode":branchCode
                }).success(function (data) {
                $scope.list = data.result;
            });
        }
    }

});
//教师管理列表
app.controller("teacherManageController",function($scope,$http,$controller,$state){
    //根据主校获取分校
    $scope.seacherBranchByHeadSchool = function(headCode){
        if(typeof(headCode) !== "undefined"){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/list?requestId=test123456",
                {
                    "pageSize": 20,
                    "pageNumber": 1,
                    "type": 2,
                    "monitorMianCode": headCode
                }).success(function (data) {
                $scope.schoolBranchList = data.result;
            });
        }
    };
    //根据分校获取中心
    $scope.seacherCentreBySchoolBranch = function(branchCode){
        if(typeof(branchCode) !== "undefined" && branchCode){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/section/organization/list?requestId=test123456",
                {
                    "pageSize":20,
                    "pageNumber":1,
                    "type":3,
                    "monitorBranchCode":branchCode
                }).success(function (data) {
                $scope.list = data.result;
            });
        }
    }
/*获得教研中心下的教研教师*/    
$scope.myChanger = function(code){
    console.log("-----------------------code="+code);
    if(typeof(code) !== "undefined" && code){
            $http.post("http://192.168.1.35:8070/keepMark-teacher-business/section/organization/teacher/list?requestId=test123456",
                {
                    "monitorCenterCode":code
                }).success(function (data) {
                $scope.lists = data.result;
            });
        }
    }
});
//添加教師管理-教研老師
app.controller("addTeacherController",function($scope,$http,$state,$controller,$stateParams,acquireDataService){

    $scope.level =[
                 {id:1,value: "da42abd78c3a4a039e09eba32d0b0acc" , name: "总校长" },
                 {id:2,value: "6804d2181c604aa1926ff7a75a297749" , name: "分校长" },
                 {id:3,value: "1be524ec9845465da072638089c37f66" , name: "中心主管" }
             ];
  //获取学科
    $scope.getSubject = function(){
        $http.get("admin/json/subject.json").success(function(data){
            $scope.subjectList = data.subject;
        });
    };
  //学历类型
    $scope.seacherTeacherEducation = function(){     
        acquireDataService.getTeacherEducationList().then(function(data){
               console.log("data"+data)
            $scope.teacherEducationList = data.teacherEducationList;
        });
    };

});


