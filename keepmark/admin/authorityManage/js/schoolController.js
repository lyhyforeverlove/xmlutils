/**
 * Created by ying on 2016/9/14.
 */
//总校
app.controller("masterSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "总校";
    $scope.formData={};
    $scope.load = function(){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"

        }).success(function (data) {
            if(data) $scope.results = data.result;
        });
    }
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
//新增总校
app.controller("addMasterSchoolController",function($scope, $http, $resource, $stateParams, $modal, $state){
    $scope.titleName = "新增总校";
    $scope.formData={};
    $scope.saveMasterSchool = function(formData){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/main?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.masterSchool');
            }).error(function(data){
            console.log(data);
        });
    };
});
//总校查看
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
//修改总校
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
        $http.post( 'http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/update/main?requestId=test123456',formData)
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

    //列表
    $scope.getList=function(data){
        if(typeof(data) !=="undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "2",
                "schoolMainCode":data.code
            }).success(function (data) {
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
            });
        }
    };

    $scope.deleteBranchSchool = function(){
        alert("确定删除吗？");
    };
    $scope.viewBranchSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/detail?requestId=test123456',{
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
//新增分校
app.controller("addBranchSchoolController",function($scope,$state,$http,$controller){
    $scope.titleName = "新增分校";
    $scope.formData={};
    $controller("getSchoolInfo",{$scope:$scope});

    $scope.saveBranchSchool = function(formData){
        formData.provinceCode=formData.province.provinceCode;
        formData.schoolMainCode=formData.schoolMain.code;
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/branch?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.branchSchool');
            }).error(function(data){
            console.log(data);
        });
    };
});
//分校查看
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
//修改分校
app.controller("updateBranchSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑分校";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData=V_GoodsAddJson;

    $scope.updateMasterSchool = function(formData){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/update/branch?requestId=test123456',formData)
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
    //学区列表
    $scope.getList=function(data){
        if(typeof(data) !=="undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
                    "pageSize": 100,
                    "pageNumber": 1,
                    "type": "3",
                    "branchCode":data.code
                })
                .success(function (data) {
                    $scope.results = data.result;
                    $scope.totalPage = data.result.totalPage;
                });
        }
    };
    //删除信息
    $scope.deleteDistrictSchool = function(){
        alert("确定删除此学区吗？");
    };
    $scope.viewDistrictSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/detail?requestId=test123456',{
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
//新增学区
app.controller("addDistrictSchoolController",function($scope,$controller, $state,$http){
    $scope.titleName = "新增学区";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.saveDistrictSchool = function(formData){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/district?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.districtSchool');
            }).error(function(data){
            console.log(data);
        });
    };
});
//查看学区
app.controller("districtSchoolDetailController",function($scope,$stateParams){
    $scope.titleName = "学区详情";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    $scope.authSchoolBranchModelName = V_GoodsAddJson.authSchoolBranchModel.name;
    $scope.name = V_GoodsAddJson.name;
    $scope.personCharge = V_GoodsAddJson.personCharge;
    $scope.createDate = V_GoodsAddJson.createDate;
});
//编辑学区
app.controller("updateDistrictSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑学区";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData=V_GoodsAddJson;

    $scope.updateDistrictSchool = function(formData){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/update/district?requestId=test123456',formData)
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
    //列表
    $scope.getList=function(data){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "4",
            "districtCode":data.code
        }).success(function (data) {
            if(data){
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
            }
        });

    };
    $scope.deleteDepartmentSchool = function(){
        alert("确定删除此学部吗？");
    };

    $scope.viewDepartmentSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/detail?requestId=test123456',{
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
//新增学部
app.controller("addDepartmentSchoolController",function($scope,$controller, $state,$http){
    $scope.titleName = "新增学部";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.saveDepartmentSchool = function(formData){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/division?requestId=test123456',formData)
            .success(function(data){
                console.log(data);
                $state.go('app.authorityManage.departmentSchool');
            }).error(function(data){
            console.log(data);
        });
    };
});
//学部查看详细
app.controller("departmentSchoolDetailController",function($scope,$stateParams){
    $scope.titleName = "学部详情";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData = V_GoodsAddJson;
    $scope.authDistrictBranchModelName = V_GoodsAddJson.authSchoolDistrictModel.name;
    $scope.name = V_GoodsAddJson.name;
    $scope.divisionType = V_GoodsAddJson.divisionType;
    $scope.personCharge = V_GoodsAddJson.personCharge;
    $scope.createDate = V_GoodsAddJson.createDate;
});
//修改学部
app.controller("updateDepartmentSchoolController",function($scope,$stateParams, $state,$http){
    $scope.titleName = "编辑学部";
    //url参数对象
    var V_GoodsAddJson = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
    }
    console.log(V_GoodsAddJson);
    $scope.formData = V_GoodsAddJson;
    $scope.saveUpdateDepartmentSchool = function(formData){
        alert(1111);
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/update/division?requestId=test123456',formData)
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
    //列表
    $scope.getList=function(data){
        if(typeof(data)!=="undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456', {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "5",
                "divisionCode":data.code
            }).success(function (data) {
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
            });
        }

    };
    $scope.deleteCenterSchool = function(){
        alert("确定删除此中心吗？");
    };

    $scope.viewCenterSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.centreOfSchoolDetail', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
    $scope.updateVCenterSchool = function(data){
        alert(111);
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.updateCentreOfSchool', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };

});
//新增中心
app.controller("addCentreOfSchoolController",function($scope,$controller, $state,$http){
    $scope.titleName = "新增中心";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.getPersonChargeList = function(){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":5
            })
            .success(function(data){
                $scope.personChargeList = data.result;
            }).error(function(data){
        });
    };
    $scope.addTeacher = function(code){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":7,
                "subjectCode":code
            })
            .success(function(data){
                switch(code)
                {
                    case 1:
                        $scope.chineseTeacherList = data.result ;
                        break;
                    case 2:
                        $scope.mathTeacherList = data.result ;
                        break;
                    case 3:
                        $scope.englishTeacherList = data.result ;
                        break;
                    case 4:
                        $scope.physicsTeacherList = data.result ;
                        break;
                    case 5:
                        $scope.chemistryTeacherList = data.result ;
                        break;
                    case 6:
                        $scope.biologyTeacherList = data.result ;
                        break;
                    case 7:
                        $scope.historyTeacherList = data.result ;
                        break;
                    case 8:
                        $scope.geographyTeacherList = data.result ;
                        break;
                    case 9:
                        $scope.politicalTeacherList = data.result ;
                        break;
                }
            })
    }
    $scope.centerLeaderList =[]
    $scope.addLeader =function(){
        $(".teacher.freeTime").each(function(){
            var ter = $(this).attr("teacher");
            $scope.centerLeaderList.push(JSON.parse(ter));
        });
    }
    //保存中心信息
    $scope.saveCentreOf = function(formData){
        alert(formData);
        formData.divisionCode = formData.divisionCode.code;
        //老师的list
        formData.authTeacherClassModels = [];
        //所有教师
        $(".teacher.freeTime").each(function(){
            var ter = $(this).attr("teacher");
            ter = JSON.parse(ter);
            //[{"teacherCode":"test","teacherName":"test","subjectCode","test","subjectName":"test"}]
            var teacher = {};
            teacher.teacherCode = ter.code;
            teacher.teacherName = ter.name;
            teacher.subjectCode = ter.subjectCode ;
            teacher.subjectName = ter.subjectName ;
            formData.authTeacherClassModels.push(teacher);
        });
        //组长
        formData.centerLeader ="AAAA";
        console.log(formData);
        $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/center?requestId=test123456",
            formData).success(function(data){
            $state.go("app.authorityManage.centreOfSchool");
        })
    };
});
//修改中心
app.controller("updateCentreOfSchoolController",function($scope,$http,$stateParams,$state){
    if ($stateParams.jsonString != '') {
        $scope.centreShool = angular.fromJson($stateParams.jsonString);
    }
    $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/update/center?requestId=test123456",
        $scope.centreShool).success(function(date){
        $state.go("app.authorityManage.centreOfSchool");
    });

});
//中心查看
app.controller("centreOfSchoolDetailController",function($scope,$stateParams,$controller,CalcService){
    $scope.titleName = "中心详情";
    $controller('ParentGetDataCtrl', {$scope: $scope}); //继承
    var centreShool = {};
    if ($stateParams.jsonString != '') {
        centreShool = angular.fromJson($stateParams.jsonString);
    }
    //$scope.authSchoolDivisionModelName = centreShool.authSchoolDivisionModel.name;
    $scope.name = centreShool.name;
    $scope.centerLeader = centreShool.centerLeader;
    $scope.goalType = centreShool.goalType;
    $scope.personCharge = centreShool.personCharge;
    $scope.createDate = centreShool.createDate;
});


//班级
app.controller("classAndGradeController",function($scope,$http,$controller){
    $scope.titleName="创建班级";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.getList = function(centreCode){
        if(typeof(centreCode) !== "undefined"){
            $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/list?requestId=test123456',
                {
                    "pageSize":20,
                    "pageNumber":1,
                    "type":6,
                    "centerCode":centreCode

                }).success(function(data){
                $scope.list = data.list;
            });
        }
    };
    $scope.deleteClassAndGradeSchool = function(){
        alert("确定删除吗？");
    }
});
//新增班级
app.controller("addClassAndGradeController",function($scope,$http,$controller){
    $scope.titleName="新增班级";
    //subjectCode为1时  文科
    //subjectCode为2时  理科
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.getTeacher =function(code){
        $http.post('http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":7,
                "subjectCode":code
            })
            .success(function(data){
                switch(code)
                {
                    case 1:
                        $scope.chineseTeacherList = data.result ;
                        break;
                    case 2:
                        $scope.mathTeacherList = data.result ;
                        break;
                    case 3:
                        $scope.englishTeacherList = data.result ;
                        break;
                    case 4:
                        $scope.physicsTeacherList = data.result ;
                        break;
                    case 5:
                        $scope.chemistryTeacherList = data.result ;
                        break;
                    case 6:
                        $scope.biologyTeacherList = data.result ;
                        break;
                    case 7:
                        $scope.historyTeacherList = data.result ;
                        break;
                    case 8:
                        $scope.geographyTeacherList = data.result ;
                        break;
                    case 9:
                        $scope.politicalTeacherList = data.result ;
                        break;
                }
            })
    };

});
//编辑班级
app.controller("updateClassAndGradeController",function($scope){
    $scope.titleName="编辑班级";
    //subjectCode为1时  文科
    //subjectCode为2时  理科
    $scope.subjectCode = 1;
});
//查看班级
app.controller("classAndGradeDetailController",function($scope){
    $scope.titleName="查看班级";
});