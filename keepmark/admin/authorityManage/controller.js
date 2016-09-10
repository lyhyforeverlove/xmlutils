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
    $scope.load = function(){
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
    $scope.load = function(){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"

        }).success(function (data) {
            $scope.masterSchoolList = data.result;
        });
        //初始化 省份
        $http.post($scope.app.host + '/area/allProvince?requestId=test123456',null)
            .success(function (data) {
            $scope.allProvinceList = data.result;
        });
    };
    $scope.saveBranchSchool = function(formData){
        formData.provinceCode=formData.province.provinceCode;
        formData.schoolMainCode=formData.schoolMain.code;
        $http.post($scope.app.host + '/teaching/organization/create/branch?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.branchSchool');
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
                $state.go('app.authorityManage.branchSchool');
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
        }).success(function (data) {
                console.log(data);
                $scope.branchSchoolList = data.result;
            });
    };
    $scope.saveDistrictSchool = function(formData){
        formData.branchCode=formData.branchSchool.code;
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
        console.log(data);
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
        }).success(function (data) {
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
    $scope.saveDepartmentSchool = function(formData){
        console.log(formData);
        formData.districtCode=formData.districtCode.code;
//        formData.divisionType=formData.divisionType.value;
        $http.post($scope.app.host + '/teaching/organization/create/division?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.departmentSchool');
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
                $state.go('app.authorityManage.departmentSchool');
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
    //学部列表
    $scope.getDepartmentList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "4",
            "districtCode":data.code
        })
            .success(function (data) {
                console.log(data);
                $scope.departmentSchoolList = data.result;
            });
    };
    //列表
    $scope.getCenterList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "5",
            "divisionCode":data.code
        }).success(function (data) {
            console.log(data);
            $scope.results = data.result;
            $scope.totalPage = data.result.totalPage;
        });

    };
    $scope.deleteCenterSchool = function(){
        alert("确定删除此中心吗？");
    };

    $scope.viewCenterSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host + '/teaching/organization/detail?requestId=test123456',{
                "type": "5",
                "centerCode":data.code
            }
        ).success(function(data){
                console.log(data);
                jsonString = angular.toJson(data.result);
                $state.go('app.authorityManage.centreOfSchoolDetail', {
                    jsonString : jsonString
                }, {
                    reload : true
                });
            }).error(function(data){
                console.log(data);
            });
    };
    $scope.updateVCenterSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $state.go('app.authorityManage.updateCentreOfSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };

});
app.controller("addCentreOfSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "新增中心";
    $scope.formData={};
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
        }).success(function (data) {
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
    //学部列表
    $scope.getDepartmentList=function(data){
        $http.post($scope.app.host + '/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "4",
            "districtCode":data.code
        }).success(function (data) {
                console.log(data);
                $scope.departmentSchoolList = data.result;
            });
    };
    $scope.saveBranchSchool = function(formData){
        $http.post($scope.app.host + '/teaching/organization/create/center?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.centerOfSchool');
            }).error(function(data){
                console.log(data);
            });
    };

});
app.controller("centreOfSchoolDetailController",function($scope,$stateParams,$controller,CalcService){
    $scope.titleName = "中心详情";
    $controller('ParentGetDataCtrl', {$scope: $scope}); //继承

    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);

    //获取文理

    var centerLeaders,chineseTeachers,mathTeachers,englishTeachers,physicsTeachers,chemistryTeachers,biologyTeachers,politicsTeachers,historyTeachers,geographyTeachers;
    $(".artsAndScience-"+V_GoodsAddJson.authSchoolDivisionModel.divisionType).show();
    if(null != V_GoodsAddJson.authTeacherModels ||undefined!= V_GoodsAddJson.authTeacherModels ){
        V_GoodsAddJson.authTeacherModels.forEach(function(e){
            if(e.subjectCode==0){
                chineseTeachers.push(e);
            }
        });
    }
    $scope.authSchoolDivisionModelName = V_GoodsAddJson.authSchoolDivisionModel.name;
    $scope.name = V_GoodsAddJson.name;
    $scope.centerLeader = V_GoodsAddJson.centerLeader;
    $scope.goalType = V_GoodsAddJson.goalType;
    $scope.personCharge = V_GoodsAddJson.personCharge;
    $scope.createDate = V_GoodsAddJson.createDate;
});
app.controller("updateDepartmentSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑中心";
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
                $state.go('app.authorityManage.centreOfSchool');
            }).error(function(data){
                console.log(data);
            });
    };
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


app.controller("smallClassScheduleController",["$scope","$modal","scheduleService",function($scope,$modal,scheduleService){
    $scope.titleName = "排小班课表";
    $scope.scheduleStatus = "0";


    var parameters = {
        "smallClass":"F84251DB25484B0B82084CD637D2B43E",
        "weekTimeCode":"30A56BA2E71E4BE2BD5DD59BA044C1D6",
        "bigClassCode":"00D20E260AA74DEA822F4BD3F3171C13"
    }

    var url = " http://192.168.1.213:8080/keepMark-teacher-business/teaching/course/createSmallClassSchedule?requestId=WEUOW343KL34L26NBSK3/";

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

//兼职教师
app.controller("partTimeTeacherManageController",function($scope){
    $scope.titleName = "兼职教师管理";
    //删除兼职教师
    $scope.deletePartTimeTeacher = function(){
        alert("确定删除？");
    }
    $scope.tabs = [{
        title: '在职员工名单',
        url: 'onJobTeacher.tpl.html'
    }, {
        title: '离职员工名单',
        url: 'dimissionTeacher.tpl.html'
    }];
    $scope.currentTab = 'onJobTeacher.tpl.html';
    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
});

//增加兼职教师
app.controller("addPartTimeTeacherController",function($scope,$http,acquireDataService){
    $scope.titleName="添加兼职教师";
    $scope.spareTimeShow = false;
    $scope.teachingType = "";
    $scope.teacherEducation = "";
    $scope.teacherShip = "";
    $scope.teacherPro = "";
    $scope.chooseSpareTime = function(){
        //初始化空余时间表
        $http.get("admin/json/freeTime.json").success(function(data){
            $scope.list = data.freeTime;
        });
        $scope.spareTimeShow = !($scope.spareTimeShow);

    };

    //省市区三级联动
    $scope.provinces = ['黑龙江', '吉林', '辽宁', '河北'];
    $scope.$watch('province', function(newVal) {
        if (newVal) $scope.cities = ['大连', '长春'];
    });
    $scope.$watch('city', function(newVal) {
        if (newVal) $scope.suburbs = ['鸡冠区', '隶属', 'A区'];
    });

    //授课类型
    $scope.seacherTeachingType = function(){
        acquireDataService.getTeachingTypeList().then(function(data){
            $scope.teachingTypeList = data.teachingTypeList;
        });
    };
    //学历类型
    $scope.seacherTeacherEducation = function(){
        acquireDataService.getTeacherEducationList().then(function(data){
            $scope.teacherEducationList = data.teacherEducationList;
        });
    };
    //合作关系
    $scope.seacherTeacherShip = function(){
        acquireDataService.getTeacherShipList().then(function(data){
            $scope.teacherShipList = data.teacherShipList;
        });
    };
    //职称
    $scope.seacherTeacherPro = function(){
        acquireDataService.getTeacherProList().then(function(data){
            $scope.teacherProList = data.teacherProList;
        });
    };

    var free_time =[];
    $scope.savePartTimeTeacher = function(){
        $("td.freeTime").each(function(){
            //td_code星期  tr_code是时间段
            var td_code = $(this).attr("td_code");
            var tr_code =$(this).parent().attr("tr_code");
            free_time.push({"weekDay":td_code,"hourType":tr_code});
        });
    }
    var ss = {"teacherModel":{},"freeTimes":free_time};
});


//修改兼职教师
app.controller("updatePartTimeTeacherController",function($scope,$http,acquireDataService){
    $scope.titleName="修改兼职教师";
    $scope.province='吉林';
    $scope.city="长春";
    $scope.suburb="鸡冠区";
    $scope.teachingType = "";
    $scope.teacherEducation = "";
    $scope.teacherShip = "";
    $scope.teacherPro = "";
    //授课类型
    $scope.seacherTeachingType = function(){
        acquireDataService.getTeachingTypeList().then(function(data){
            $scope.teachingTypeList = data.teachingTypeList;
        });
    };
    //学历类型
    $scope.seacherTeacherEducation = function(){
        acquireDataService.getTeacherEducationList().then(function(data){
            $scope.teacherEducationList = data.teacherEducationList;
        });
    };
    //合作关系
    $scope.seacherTeacherShip = function(){
        acquireDataService.getTeacherShipList().then(function(data){
            $scope.teacherShipList = data.teacherShipList;
        });
    };
    //职称
    $scope.seacherTeacherPro = function(){
        acquireDataService.getTeacherProList().then(function(data){
            $scope.teacherProList = data.teacherProList;
        });
    };


    $scope.provinces = ['黑龙江', '吉林', '辽宁', '河北'];
    $scope.$watch('province', function(newVal) {
        if (newVal) $scope.cities = ['大连', '长春'];
    });
    $scope.$watch('city', function(newVal) {
        if (newVal) $scope.suburbs = ['鸡冠区', '隶属', 'A区'];
    });

    //初始化空余时间表
    $http.get("admin/json/freeTime.json").success(function(data){
        $scope.list = data.freeTime;
    });

})
app.controller("partTimeTeacherDetailController",function($scope,$http){
    $scope.titleName="兼职教师查看";
    //初始化空余时间表
    $http.get("admin/json/freeTime.json").success(function(data){
        $scope.list = data.freeTime;
    });
})
//全职教师
app.controller("fullTimeTeacherManageController",function($scope){
    $scope.titleName = "全职教师管理";
    $scope.tabs = [{
        title: '在职员工名单',
        url: 'onJobTeacher.tpl.html'
    }, {
        title: '离职员工名单',
        url: 'dimissionTeacher.tpl.html'
    }];

    $scope.currentTab = 'onJobTeacher.tpl.html';
    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }


})

app.controller("addFullTimeTeacherController",function($scope,acquireDataService,$http){
    $scope.titleName="添加全职教师";
    $scope.teachingType = "";
    $scope.teacherEducation = "";
    //授课类型
    $scope.seacherTeachingType = function(){
        acquireDataService.getTeachingTypeList().then(function(data){
            $scope.teachingTypeList = data.teachingTypeList;
        });
    };
    //学历类型
    $scope.seacherTeacherEducation = function(){
        acquireDataService.getTeacherEducationList().then(function(data){
            $scope.teacherEducationList = data.teacherEducationList;
        });
    };

    $scope.provinces = ['黑龙江', '吉林', '辽宁', '河北'];
    $scope.$watch('province', function(newVal) {
        if (newVal) $scope.cities = ['大连', '长春'];
    });
    $scope.$watch('city', function(newVal) {
        if (newVal) $scope.suburbs = ['鸡冠区', '隶属', 'A区'];
    });

    $scope.deleteFullTimeTeacher = function(){
        alert("删除全职教师");
    }

})
app.controller("updateFullTimeTeacherController",function($scope,acquireDataService){
    $scope.titleName="修改全职教师";
    $scope.province='吉林';
    $scope.city="长春";
    $scope.suburb="鸡冠区";
    $scope.teachingType = "";
    $scope.teacherEducation = "";

    //授课类型
    $scope.seacherTeachingType = function(){
        acquireDataService.getTeachingTypeList().then(function(data){
            $scope.teachingTypeList = data.teachingTypeList;
        });
    };
    //学历类型
    $scope.seacherTeacherEducation = function(){
        acquireDataService.getTeacherEducationList().then(function(data){
            $scope.teacherEducationList = data.teacherEducationList;
        });
    };

    $scope.provinces = ['黑龙江', '吉林', '辽宁', '河北'];
    $scope.$watch('province', function(newVal) {
        if (newVal) $scope.cities = ['大连', '长春'];
    });
    $scope.$watch('city', function(newVal) {
        if (newVal) $scope.suburbs = ['鸡冠区', '隶属', 'A区'];
    });
})
app.controller("fullTimeTeacherDetailController",function($scope){
    $scope.titleName="全职教师查看";
})

//学籍教师
app.controller("schoolRollManageController",function($scope){
    $scope.titleName = "学籍管理";
})

//选择课程弹框
app.controller("chooseScheduleController",function($scope){
    //列表隐藏
    $scope.courseList = false;
    $scope.chooseTeacher = function(){
        $scope.courseList = !($scope.courseList);
    };
    $scope.saveCourse = function(){

    }
});