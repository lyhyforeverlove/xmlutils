/**
 * Created by ying on 2016/9/9.
 */
//总校列表
app.controller("headSchoolController",function($scope,$http,$state){
    $http.post($scope.app.host +'section/organization/list?requestId=test123456', {
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
        $http.post($scope.app.host +'section/organization/create/main?requestId=test123456',$scope.formData).success(function(data){
            $state.go('app.teachResearchManage.headSchool');
        });
    }
});

//修改总校
app.controller("updateHeadSchoolController", function($scope,$http,$stateParams,$state){
    $scope.headSchool = JSON.parse($stateParams.headSchool);

    $scope.saveUpdateHeadSchool = function(){
        $http.post($scope.app.host +"section/organization/update/main?requestId=test123456",
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
            $http.post($scope.app.host +"section/organization/list?requestId=test123456",
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
            $http.post($scope.app.host +"section/organization/create/branch?requestId=test123456",
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
        $http.post($scope.app.host +"section/organization/update/branch?requestId=test123456",
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
        $http.post($scope.app.host +"section/organization/create/center?requestId=test123456",
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
        $http.post($scope.app.host +"section/organization/update/center?requestId=test123456",
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
            $http.post($scope.app.host +"section/organization/list?requestId=test123456",
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
            $http.post($scope.app.host +"section/organization/list?requestId=test123456",
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
    var host = $scope.app.host;
    //根据主校获取分校
    $scope.seacherBranchByHeadSchool = function(headCode){
        if(typeof(headCode) !== "undefined"){
            $http.post(host+"section/organization/list?requestId=test123456",
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
            $http.post(host+"section/organization/list?requestId=test123456",
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
            $http.post(host+"section/organization/teacher/list?requestId=test123456",
                {
                    "monitorCenterCode":code
                }).success(function (data) {
                    $scope.lists = data.result;
                });
        }
    }
//教研教师管理详情
    /* $scope.TeacherAndResearchDetail = function(teacher){
     var teacherAndResearch={};
     teacherAndResearch.name = teacher.name;
     $state.go("app.teachResearchManage.TeacherAndResearchDetail",{partTeacher:JSON.stringify(teacherAndResearch)});
     }*/


});
//添加教師管理-教研老師
app.controller("addTeacherController",function($scope,$http,$state,$controller,$stateParams,acquireDataService){

    $controller("headSchoolSelectController",{$scope:$scope});

    var host = $scope.app.host;
    $scope.levels =[
        {id:1,code: "da42abd78c3a4a039e09eba32d0b0acc" , name: "总校长",type:"1"},
        {id:2,code: "6804d2181c604aa1926ff7a75a297749" , name: "分校长",type:"2" },
        {id:3,code: "1be524ec9845465da072638089c37f66" , name: "中心主管",type:"3"},
        {id:4,code: "e7bf61eaf5c44028a9c536f236d896f6" , name: "普通教师",type:"4"}
    ];
    // //点击级别弹出相应列表
    // $scope.changeList = function(jsonData){
    //     console.log(jsonData);
    // }
    //获取学科
    $scope.getSubject = function(){
        $http.get("admin/json/subject.json").success(function(data){
            $scope.subjectList = data.subject;
        });
    };
    //学历类型
    $scope.seacherTeacherEducation = function(){
        acquireDataService.getTeacherEducationList().then(function(data){
            $scope.teacherEducationList = data.teacherEducationList;
        });
    };
    //获取地区列表
    $scope.loadStuAreaList = function() {
        $http.post(host + 'area/allProvince?requestId=test123456', "").success(function (data) {
            $scope.areaResults = data.result;
        });
    };

    $scope.formData={}

    //保存教研教师
    $scope.saveTeacherAndResearch = function(){
        if ($scope.formData.subjectCenter!=undefined) {
            var authTeachMonitorCenterModel={"code":$scope.formData.subjectCenter.code};
            $scope.teacher.authTeachMonitorCenterModel=authTeachMonitorCenterModel;
        }
        if ($scope.role!=undefined) {
            $scope.teacher.resRoleType =  $scope.role.type;
            $scope.teacher.resRoleCode  = $scope.role.code;
        }
        if ($scope.subject!=undefined) {
            $scope.teacher.subjectName =  $scope.subject.subjectName;
            $scope.teacher.subjectCode  = $scope.subject.subjectCode;
        }
        $http.post(host+"section/organization/create/teacher?requestId=test123456",
            $scope.teacher).success(function(data){
                console.log("------------data"+data);
                $state.go("app.teachResearchManage.teacherManage");
            });
    };

});


