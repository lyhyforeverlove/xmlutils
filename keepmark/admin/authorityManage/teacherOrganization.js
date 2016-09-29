'use strict';

//总校
app.controller("masterSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "总校";
    $scope.formData={};
    $controller("getSchoolInfo",{$scope:$scope});

    //列表

    $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
        "pageSize": 100,
        "pageNumber": 1,
        "type": "1"
    })
        .success(function (data) {
            console.log(data);
            $scope.results = data.result;
            $scope.totalPage = data.result.totalPage;

        });

    $scope.deleteMasterSchool = function(){
        alert("确定删除吗？");
    };
    $scope.viewMasterSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.masterSchoolDetail', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
    $scope.updateVMasterSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.updateMasterSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
});

app.controller("addMasterSchoolController",function($scope, $http, $resource, $stateParams, $modal, $state){
    $scope.titleName = "新增总校";
    $scope.formData={};
    $scope.saveMasterSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/create/main?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.masterSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});

app.controller("masterSchoolDetailController",function($scope,$stateParams){
    $scope.titleName = "查看总校详情";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.name = V_GoodsAddJson.name;
    $scope.schoolNum = V_GoodsAddJson.schoolNum;
    $scope.president = V_GoodsAddJson.president;
    $scope.vicePresident = V_GoodsAddJson.vicePresident;
    $scope.createDate = V_GoodsAddJson.createDate;
});
app.controller("updateMasterSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑总校";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData={};
    $scope.formData.name = V_GoodsAddJson.name;
    $scope.formData.schoolNum = V_GoodsAddJson.schoolNum;
    $scope.formData.president = V_GoodsAddJson.president;
    $scope.formData.vicePresident = V_GoodsAddJson.vicePresident;
    $scope.formData.createDate = V_GoodsAddJson.createDate;
    $scope.formData.code = V_GoodsAddJson.code;
    $scope.updateMasterSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/update/main?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.masterSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});
//分校
app.controller("branchSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "分校";
    $scope.formData={};
    $controller("getSchoolInfo",{$scope:$scope});
    //总校列表
    var masterName;
    $scope.load = function(callback){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"

        }).success(function (data) {
            $scope.masterSchoolList = data.result;
//            $scope.School=data.result[0].name;
//            masterName=data.result[0].name;
//            $scope.getList(data.result[0]);
            /*  $scope.selectDefault();
             callback(function(){
             $scope.selectDefault();
             });*/
        });
    };
    /*    $scope.selectDefault =function(){
     alert("jaj");
     $scope.School=masterName;
     };*/


    //列表
    $scope.getList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "2",
            "schoolMainCode":data.code
        }).success(function (data) {
            console.log(data);
            $scope.results = data.result;
            $scope.totalPage = data.result.totalPage;
        });
    };


    $scope.deleteBranchSchool = function(){
        alert("确定删除吗？");
    };
    $scope.viewBranchSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host + '/teaching/organization/detail?requestId=test123456',{
                "type": "2",
                "branchCode":data.code
            }
        ).success(function(data){
                console.log(data);
                jsonString = angular.toJson(data.result);
                $state.go('app.authorityManage.branchSchoolDetail', {
                    jsonString : jsonString
                }, {
                    reload : true
                });
            }).error(function(data){
                console.log(data);
            });
    };
    $scope.updateVBranchSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.updateBranchSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
});
app.controller("addBranchSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "新增分校";
    $scope.formData={};
    $scope.saveBranchSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/create/branch?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.masterSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});

app.controller("branchSchoolDetailController",function($scope,$stateParams){
    $scope.titleName = "分校详情";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.authSchoolMainModelName = V_GoodsAddJson.authSchoolMainModel.name;
    $scope.authSchoolMainModelSchoolNum = V_GoodsAddJson.authSchoolMainModel.schoolNum;
    $scope.authSchoolMainModelVicePresident = V_GoodsAddJson.authSchoolMainModel.vicePresident;
    $scope.authSchoolMainModelPresident = V_GoodsAddJson.authSchoolMainModel.president;
    $scope.name = V_GoodsAddJson.name;
    $scope.province = V_GoodsAddJson.province;
    $scope.branchNum = V_GoodsAddJson.branchNum;
    $scope.president = V_GoodsAddJson.president;
    $scope.vicePresident = V_GoodsAddJson.vicePresident;
    $scope.createDate = V_GoodsAddJson.createDate;
});
app.controller("updateBranchSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑分校";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData={};
    $scope.formData.name = V_GoodsAddJson.name;
    $scope.formData.province = V_GoodsAddJson.province;
    $scope.formData.branchNum = V_GoodsAddJson.branchNum;
    $scope.formData.president = V_GoodsAddJson.president;
    $scope.formData.vicePresident = V_GoodsAddJson.vicePresident;
    $scope.formData.createDate = V_GoodsAddJson.createDate;
    $scope.formData.code = V_GoodsAddJson.code;
    $scope.updateMasterSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/update/branch?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.masterSchool');
            }).error(function(data){
                console.log(data);
            });
    };

});
//学区
app.controller("districtSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "学区";
    $scope.formData={};
    $controller("getSchoolInfo",{$scope:$scope});

    //总校列表
    $scope.load = function(){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"

        }).success(function (data) {
            $scope.masterSchoolList = data.result;
        });
    };
    //分校列表
    $scope.getBranchMainList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "2",
            "schoolMainCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.branchSchoolList = data.result;
            });
    };
    //学区列表
    $scope.getDistrictList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "3",
            "branchCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
            });
    };
    //删除信息
    $scope.deleteDistrictSchool = function(){
        alert("确定删除此学区吗？");
    };
    $scope.viewDistrictSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host + '/teaching/organization/detail?requestId=test123456',{
                "type": "3",
                "districtCode":data.code
            }
        ).success(function(data){
                console.log(data);
                jsonString = angular.toJson(data.result);
                $state.go('app.authorityManage.districtSchoolDetail', {
                    jsonString : jsonString
                }, {
                    reload : true
                });
            }).error(function(data){
                console.log(data);
            });
    };
    $scope.updateVDistrictSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.updateDistrictSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
});
app.controller("addDistrictSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "新增学区";
    $scope.formData={};
    $scope.saveBranchSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/create/district?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.districtSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});
app.controller("districtSchoolDetailController",function($scope,$stateParams){
    $scope.titleName = "学区详情";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
//    $scope.authSchoolMainModelName = V_GoodsAddJson.authSchoolMainModel.name;
//    $scope.authSchoolMainModelSchoolNum = V_GoodsAddJson.authSchoolMainModel.schoolNum;
//    $scope.authSchoolMainModelVicePresident = V_GoodsAddJson.authSchoolMainModel.vicePresident;
//    $scope.authSchoolMainModelPresident = V_GoodsAddJson.authSchoolMainModel.president;

    $scope.authSchoolBranchModelName = V_GoodsAddJson.authSchoolBranchModel.name;
//    $scope.authSchoolBranchModelSchoolNum = V_GoodsAddJson.authSchoolBranchModel.branchNum;
//    $scope.authSchoolBranchModelVicePresident = V_GoodsAddJson.authSchoolBranchModel.vicePresident;
//    $scope.authSchoolBranchModelPresident = V_GoodsAddJson.authSchoolBranchModel.president;
//    $scope.authSchoolBranchModelProvince = V_GoodsAddJson.authSchoolBranchModel.province;

    $scope.name = V_GoodsAddJson.name;
    $scope.personCharge = V_GoodsAddJson.personCharge;
    $scope.createDate = V_GoodsAddJson.createDate;
});
app.controller("updateDistrictSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑学区";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData={};
    $scope.formData.name = V_GoodsAddJson.name;
    $scope.formData.personCharge = V_GoodsAddJson.personCharge;
    $scope.formData.code = V_GoodsAddJson.code;
    $scope.updateDistrictSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/update/district?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.districtSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});

//学部
app.controller("departmentSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "学部";
    $scope.formData={};
    $controller("getSchoolInfo",{$scope:$scope});
    //总校列表
    $scope.load = function(){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"
        }).success(function (data) {
            $scope.masterSchoolList = data.result;
        });
    };
    //分校列表
    $scope.getBranchList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "2",
            "schoolMainCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.branchSchoolList = data.result;
            });
    };
    //学区列表
    $scope.getDistrictList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "3",
            "branchCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.districtSchoolList = data.result;
            });
    };
    //列表
    $scope.getDepartmentList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "4",
            "districtCode":data.code
        }).success(function (data) {
            console.log(data);
            $scope.results = data.result;
            $scope.totalPage = data.result.totalPage;
        });

    };
    $scope.deleteDepartmentSchool = function(){
        alert("确定删除此学部吗？");
    };

    $scope.viewDepartmentSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host + '/teaching/organization/detail?requestId=test123456',{
                "type": "4",
                "divisionCode":data.code
            }
        ).success(function(data){
                console.log(data);
                jsonString = angular.toJson(data.result);
                $state.go('app.authorityManage.departmentSchoolDetail', {
                    jsonString : jsonString
                }, {
                    reload : true
                });
            }).error(function(data){
                console.log(data);
            });
    };
    $scope.updateVDepartmentSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data)
        $state.go('app.authorityManage.updateDepartmentSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
});
app.controller("addDepartmentSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "新增学部";
    $scope.formData={};
    $scope.saveBranchSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/create/division?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.departmentDistrictSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});
app.controller("departmentSchoolDetailController",function($scope,$stateParams){
    $scope.titleName = "学部详情";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);

    $scope.authDistrictBranchModelName = V_GoodsAddJson.authSchoolDistrictModel.name;
    $scope.name = V_GoodsAddJson.name;
    $scope.divisionType = V_GoodsAddJson.divisionType;
    $scope.personCharge = V_GoodsAddJson.personCharge;
    $scope.createDate = V_GoodsAddJson.createDate;
});
app.controller("updateDepartmentSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑学部";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData={};
    $scope.formData.name = V_GoodsAddJson.name;
    $scope.formData.divisionType = V_GoodsAddJson.divisionType;
    $scope.formData.personCharge = V_GoodsAddJson.personCharge;
    $scope.formData.code = V_GoodsAddJson.code;
    $scope.updateDistrictSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/update/division?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.departmentDistrictSchool');
            }).error(function(data){
                console.log(data);
            });
    };
});

//中心
app.controller("centreOfSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "中心";
    $scope.formData={};
    $controller("getSchoolInfo",{$scope:$scope});
    //总校列表
    $scope.load = function(){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"
        }).success(function (data) {
            $scope.masterSchoolList = data.result;
        });
    };
    //分校列表
    $scope.getBranchList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "2",
            "schoolMainCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.branchSchoolList = data.result;
            });
    };
    //学区列表
    $scope.getDistrictList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "3",
            "branchCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.districtSchoolList = data.result;
            });
    };
    //列表
    $scope.getDepartmentList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "4",
            "districtCode":data.code
        }).success(function (data) {
            console.log(data);
            $scope.results = data.result;
            $scope.totalPage = data.result.totalPage;
        });

    };
    $scope.deleteDepartmentSchool = function(){
        alert("确定删除此学部吗？");
    };

    $scope.viewDepartmentSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host + '/teaching/organization/detail?requestId=test123456',{
                "type": "4",
                "divisionCode":data.code
            }
        ).success(function(data){
                console.log(data);
                jsonString = angular.toJson(data.result);
                $state.go('app.authorityManage.departmentSchoolDetail', {
                    jsonString : jsonString
                }, {
                    reload : true
                });
            }).error(function(data){
                console.log(data);
            });
    };
    $scope.updateVDepartmentSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data)
        $state.go('app.authorityManage.updateDepartmentSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };

});
app.controller("addCentreOfSchoolController",function($scope){
    $scope.titleName = "新增中心";
    $scope.subjectCode =2;

});
//班级
app.controller("classAndGradeController",function($scope,$http,$controller){
    $scope.titleName="创建班级";
    $http.post('', {"id":1}).success(function(data){
        //$scope.list = data.list;
    });
    $scope.deleteClassAndGradeSchool = function(){
        alert("确定删除吗？");
    }
    $controller("getSchoolInfo",{$scope:$scope});
});


app.controller("addClassAndGradeController",function($scope){
    $scope.titleName="新增班级";
    //subjectCode为1时  文科
    //subjectCode为2时  理科
    $scope.subjectCode = 1;
    $scope.chineseTeacherList = [{"teacherId":"1","teacherName":"语文老师"},{"teacherId":"2","teacherName":"语文老师2"},{"teacherId":"3","teacherName":"语文老师3"}];
    $scope.mathTeacherList = [{"teacherId":"1","teacherName":"数学老师"},{"teacherId":"2","teacherName":"数学老师2"},{"teacherId":"3","teacherName":"数学老师3"}];
    $scope.englishTeacherList = [{"teacherId":"1","teacherName":"英语老师"},{"teacherId":"2","teacherName":"语文老师2"},{"teacherId":"3","teacherName":"英语老师3"}];
    $scope.historyTeacherList = [{"teacherId":"1","teacherName":"历史老师"},{"teacherId":"2","teacherName":"历史老师2"},{"teacherId":"3","teacherName":"历史老师3"}];
    $scope.geographyTeacherList = [{"teacherId":"1","teacherName":"地理老师"},{"teacherId":"2","teacherName":"地理老师2"},{"teacherId":"3","teacherName":"地理老师3"}];
    $scope.politicalTeacherList = [{"teacherId":"1","teacherName":"政治老师"},{"teacherId":"2","teacherName":"政治老师2"},{"teacherId":"3","teacherName":"政治老师3"}];
    $scope.chemistryTeacherList = [{"teacherId":"1","teacherName":"物理老师"},{"teacherId":"2","teacherName":"物理老师2"},{"teacherId":"3","teacherName":"物理老师3"}];
    $scope.physicsTeacherList = [{"teacherId":"1","teacherName":"化学老师"},{"teacherId":"2","teacherName":"化学老师2"},{"teacherId":"3","teacherName":"化学老师3"}];
    $scope.biologyTeacherList = [{"teacherId":"1","teacherName":"生物老师"},{"teacherId":"2","teacherName":"生物老师2"},{"teacherId":"3","teacherName":"生物老师3"}];


});

app.controller("updateClassAndGradeController",function($scope){
    $scope.titleName="编辑班级";
    //subjectCode为1时  文科
    //subjectCode为2时  理科
    $scope.subjectCode = 1;

    $scope.chineseTeacherList = [{"teacherId":"1","teacherName":"语文老师"},{"teacherId":"2","teacherName":"语文老师2"},{"teacherId":"3","teacherName":"语文老师3"}];
    $scope.mathTeacherList = [{"teacherId":"1","teacherName":"数学老师"},{"teacherId":"2","teacherName":"数学老师2"},{"teacherId":"3","teacherName":"数学老师3"}];
    $scope.englishTeacherList = [{"teacherId":"1","teacherName":"英语老师"},{"teacherId":"2","teacherName":"语文老师2"},{"teacherId":"3","teacherName":"英语老师3"}];
    $scope.historyTeacherList = [{"teacherId":"1","teacherName":"历史老师"},{"teacherId":"2","teacherName":"历史老师2"},{"teacherId":"3","teacherName":"历史老师3"}];
    $scope.geographyTeacherList = [{"teacherId":"1","teacherName":"地理老师"},{"teacherId":"2","teacherName":"地理老师2"},{"teacherId":"3","teacherName":"地理老师3"}];
    $scope.politicalTeacherList = [{"teacherId":"1","teacherName":"政治老师"},{"teacherId":"2","teacherName":"政治老师2"},{"teacherId":"3","teacherName":"政治老师3"}];
    $scope.chemistryTeacherList = [{"teacherId":"1","teacherName":"物理老师"},{"teacherId":"2","teacherName":"物理老师2"},{"teacherId":"3","teacherName":"物理老师3"}];
    $scope.physicsTeacherList = [{"teacherId":"1","teacherName":"化学老师"},{"teacherId":"2","teacherName":"化学老师2"},{"teacherId":"3","teacherName":"化学老师3"}];
    $scope.biologyTeacherList = [{"teacherId":"1","teacherName":"生物老师"},{"teacherId":"2","teacherName":"生物老师2"},{"teacherId":"3","teacherName":"生物老师3"}];
});
app.controller("classAndGradeDetailController",function($scope){
    $scope.titleName="查看班级";
});
