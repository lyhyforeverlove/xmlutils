/**
 * Created by ying on 2016/9/14.
 */
//总校
app.controller("masterSchoolController",function($scope, $http ,$controller,$stateParams,$state){
    $scope.titleName = "总校";
    $scope.formData={};
    $scope.load = function(){
        $http.post($scope.app.host +'teaching/organization/list?requestId=test123456', {
            "pageSize": 100,
            "pageNumber": 1,
            "type": "1"

        }).success(function (data) {
            if(data.result) $scope.results = data.result;
        });
    }
    //查看总校详细信息
    $scope.viewMasterSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.masterSchoolDetail', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
    //修改总校信息
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
        $http.post($scope.app.host +'teaching/organization/create/main?requestId=test123456',formData)
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
    $scope.formData = V_GoodsAddJson;
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
    $scope.formData=V_GoodsAddJson;
    $scope.updateMasterSchool = function(formData){
        $http.post( $scope.app.host +'teaching/organization/update/main?requestId=test123456',formData)
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
            $http.post($scope.app.host +'teaching/organization/list?requestId=test123456', {
                "pageSize": 100,
                "pageNumber": 1,
                "type": "2",
                "schoolMainCode":data.code
            }).success(function (data) {
                if(data.result) $scope.results = data.result;
            });
        }
    };

    $scope.deleteBranchSchool = function(){
        alert("确定删除吗？");
    };
    $scope.viewBranchSchool = function(data){
        var jsonString = angular.toJson(data);
        $http.post($scope.app.host +'teaching/organization/detail?requestId=test123456',{
                "type": "2",
                "branchCode":data.code
            }
        ).success(function(data){
            jsonString = angular.toJson(data.result);
            $state.go('app.authorityManage.branchSchoolDetail', {
                jsonString : jsonString
            }, {
                reload : true
            });
        }).error(function(data){

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
        formData.provinceCode = formData.province.provinceCode;
        formData.provinceName = formData.province.provinceName;
        formData.schoolMainCode = formData.schoolMain.code;
        $http.post($scope.app.host +'teaching/organization/create/branch?requestId=test123456',formData)
            .success(function(data){
                $state.go('app.authorityManage.branchSchool');
            }).error(function(data){
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
    $scope.formData = V_GoodsAddJson;
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
    $scope.formData=V_GoodsAddJson;
    $scope.updateMasterSchool = function(formData){
        $http.post($scope.app.host +'teaching/organization/update/branch?requestId=test123456',formData)
            .success(function(data){
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

     //删除信息
    $scope.deleteDistrictSchool = function(){
        alert("确定删除此学区吗？");
    };
    $scope.viewDistrictSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host +'teaching/organization/detail?requestId=test123456',{
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
        $http.post($scope.app.host +'teaching/organization/create/district?requestId=test123456',formData)
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
        $http.post($scope.app.host +'teaching/organization/update/district?requestId=test123456',formData)
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
    $scope.deleteDepartmentSchool = function(){
        alert("确定删除此学部吗？");
    };

    $scope.viewDepartmentSchool = function(data){
        var jsonString = angular.toJson(data);
        console.log(data);
        $http.post($scope.app.host +'teaching/organization/detail?requestId=test123456',{
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
        $http.post($scope.app.host +'teaching/organization/create/division?requestId=test123456',formData)
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
    $scope.formData = V_GoodsAddJson;
    $scope.authDistrictBranchModelName = V_GoodsAddJson.authSchoolDistrictModel.name;
    $scope.name = V_GoodsAddJson.name;
    $scope.divisionType = V_GoodsAddJson.divisionType;
    switch (V_GoodsAddJson.divisionType){
        case 0:
            $scope.divisionType ="文学部";
            break;
        case 1:
            $scope.divisionType ="理学部";
            break;
    }
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
        $http.post($scope.app.host +'teaching/organization/update/division?requestId=test123456',formData)
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
    $scope.deleteCenterSchool = function(){
        alert("确定删除此中心吗？");
    };
    //查看中心
    $scope.viewCenterSchool = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.authorityManage.centreOfSchoolDetail', {
            jsonString : jsonString
        }, {
            reload : true
        });
    };
    //修改中心
    $scope.updateVCenterSchool = function(data){
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

    //获取中心负责人
    $scope.getPersonChargeList = function(){
        $http.post($scope.app.host +'teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":5
            })
            .success(function(data){
                if(data.result) $scope.personChargeList = data.result;
            }).error(function(data){
        });
    };
    //获取各科教师
    $scope.addTeacher = function(code){
        $http.post($scope.app.host +'teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":7,
                "subjectCode":code
            })
            .success(function(data){
                switch(code)
                {
                    case 1:
                        if(data.result) $scope.chineseTeacherList = data.result ;
                        break;
                    case 2:
                        if(data.result) $scope.mathTeacherList = data.result ;
                        break;
                    case 3:
                        if(data.result) $scope.englishTeacherList = data.result ;
                        break;
                    case 4:
                        if(data.result) $scope.physicsTeacherList = data.result ;
                        break;
                    case 5:
                        if(data.result) $scope.chemistryTeacherList = data.result ;
                        break;
                    case 6:
                        if(data.result) $scope.biologyTeacherList = data.result ;
                        break;
                    case 7:
                        if(data.result) $scope.historyTeacherList = data.result ;
                        break;
                    case 8:
                        if(data.result) $scope.geographyTeacherList = data.result ;
                        break;
                    case 9:
                        if(data.result) $scope.politicalTeacherList = data.result ;
                        break;
                }
            })
    }
    //添加组长
    $scope.addLeader =function(){
        $http.post($scope.app.host +'teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":6
            }).success(function(data){
              if(data.result) $scope.centerLeaderList= data.result;
        });
    }
    //保存中心信息
    $scope.saveCentreOf = function(formData){
        formData.divisionType = formData.divisionCode.divisionType;
        formData.divisionCode = formData.divisionCode.code;
        //组长
        formData.centerLeader ="AAAA";
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

        $http.post($scope.app.host+"teaching/organization/create/center?requestId=test123456",
            formData).success(function(data){
            $state.go("app.authorityManage.centreOfSchool");
        })
    };
});
//修改中心
app.controller("updateCentreOfSchoolController",function($scope,$http,$stateParams,$state){
    if ($stateParams.jsonString != '') {
        $scope.centreSchool = angular.fromJson($stateParams.jsonString);
    }

    $scope.saveUpdateCentreSchool=function(){
        $http.post($scope.app.host +"teaching/organization/update/center?requestId=test123456",
            $scope.centreSchool).success(function(date){
            $state.go("app.authorityManage.centreOfSchool");
        });
    }

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
app.controller("classAndGradeController",function($scope,$http,$controller,$state){
    $scope.titleName="班级";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.deleteClassAndGradeSchool = function(){
        alert("确定删除吗？");
    };
    //班级查看详情
    $scope.classAndGradeDetail =function(classAndGrade){
        $state.go("app.authorityManage.classAndGradeDetail",{"classAndGrade":JSON.stringify(classAndGrade)});
    };
    //修改班级
    $scope.updateClassAndGrade =function(classAndGrade){
        $state.go("app.authorityManage.updateClassAndGrade",{"classAndGrade":JSON.stringify(classAndGrade)});
    }
});
//新增班级
app.controller("addClassAndGradeController",function($scope,$http,$controller,$state){
    $scope.titleName="新增班级";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.getTeacher = function(centerCode){
        var subCode = [1,2,3];
        if($scope.departmentSchool.divisionType==0){
            subCode.push(7);
            subCode.push(8);
            subCode.push(9);
        }else{
            subCode.push(4);
            subCode.push(5);
            subCode.push(6);
        }

        for(var i=0;i<subCode.length;i++){
            var code = subCode[i];
            $scope.addTeacher(code);
        }
    };
    //获取各科教师
    $scope.addTeacher = function(code){
        $http.post($scope.app.host +'teaching/organization/teacher/list?requestId=test123456',
            {
                "type":1,
                "roleType":7,
                "subjectCode":code,
                "centerCode":$scope.classAndGrade.centerCode
            })
            .success(function(data){
                switch(code)
                {
                    case 1:
                        if(data.result) $scope.chineseTeacherList = data.result ;
                        break;
                    case 2:
                        if(data.result) $scope.mathTeacherList = data.result ;
                        break;
                    case 3:
                        if(data.result) $scope.englishTeacherList = data.result ;
                        break;
                    case 4:
                        if(data.result) $scope.physicsTeacherList = data.result ;
                        break;
                    case 5:
                        if(data.result) $scope.chemistryTeacherList = data.result ;
                        break;
                    case 6:
                        if(data.result) $scope.biologyTeacherList = data.result ;
                        break;
                    case 7:
                        if(data.result) $scope.historyTeacherList = data.result ;
                        break;
                    case 8:
                        if(data.result) $scope.geographyTeacherList = data.result ;
                        break;
                    case 9:
                        if(data.result) $scope.politicalTeacherList = data.result ;
                        break;
                }
            })
    }
    //保存班级
    $scope.saveClassAndGrade = function(){
        var authTeacherClassModels = [];
        if(typeof($scope.chineseTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.chineseTeacher.code});
        }
        if(typeof($scope.mathTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.mathTeacher.code});
        }
        if(typeof($scope.englishTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.englishTeacher.code});
        }
        if(typeof($scope.historyTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.historyTeacher.code});
        }
        if(typeof($scope.geographyTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.geographyTeacher.code});
        }
        if(typeof($scope.politicalTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.politicalTeacher.code});
        }
        if(typeof($scope.physicsTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.physicsTeacher.code});
        }
        if(typeof($scope.chemistryTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.chemistryTeacher.code});
        }
        if(typeof($scope.biologyTeacher)!=='undefined'){
            authTeacherClassModels.push({"teacherCode":$scope.biologyTeacher.code});
        }
        $scope.classAndGrade.authTeacherClassModels = authTeacherClassModels;
        $http.post($scope.app.host + "teaching/organization/create/class?requestId=test123456",
            $scope.classAndGrade).success(function(data){
                $state.go("app.authorityManage.classAndGrade");
        });
    }

});
//编辑班级
app.controller("updateClassAndGradeController",function($scope,$http,$stateParams,$state){
    $scope.titleName="编辑班级";
    //subjectCode为1时  文科
    //subjectCode为2时  理科
    $scope.subjectCode = 1;
    $scope.classAndGrade = JSON.parse($stateParams.classAndGrade);
    $scope.saveUpdateClassAndGrade = function(){
        $http.post($scope.app.host +"teaching/organization/update/class?requestId=test123456",
            $scope.classAndGrade).success(function(data){
                $state.go("app.authorityManage.classAndGrade");
        });
    };
});
//查看班级
app.controller("classAndGradeDetailController",function($scope,$stateParams){
    $scope.name="查看班级";
    $scope.classAndGrade = JSON.parse($stateParams.classAndGrade);
});





//学习小组
app.controller("studyGroupController",function($scope,$http,$controller,$state){
    $scope.titleName="学习小组";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.getList = function(classCode){
        if(typeof(classCode) !== "undefined"){
            $http.post($scope.app.host +'teaching/organization/list?requestId=test123456',
                {
                    "pageSize":20,
                    "pageNumber":1,
                    "type":7,
                    "classCode":classCode

                }).success(function(data){
                  if(data.result) $scope.list = data.result;
            });
        }
    };
    $scope.deleteClassAndGradeSchool = function(){
        alert("确定删除吗？");
    };
    $scope.studyGroupDetail = function(studyGroup){
        $state.go("app.authorityManage.studyGroupDetail",{"studyGroup":JSON.stringify(studyGroup)});
    };
    $scope.updateStudyGroup = function(studyGroup){
        $state.go("app.authorityManage.updateStudyGroup",{"studyGroup":JSON.stringify(studyGroup)});
    };
});
//新增学习小组
app.controller("addStudyGroupController",function($scope,$http,$controller,$state){
    $scope.titleName="新增学习小组";
    $scope.studentsStatus =false;
    $controller("getSchoolInfo",{$scope:$scope});
    //获取未被分组的学生
    $scope.getStudents = function(classCode){
        if(typeof(classCode) !== "undefined"){
            $http.post($scope.app.host +"teaching/course/findAllStudentNoGroupByClassCode?requestId=WEUOW343KL34L26NBSK3",
                {
                    "classCode":classCode
                }
            ).success(function(data){
                if(data.result) $scope.list= data.result.students;
            });
        }
    };
    //保存小组信息
    $scope.saveStudyGroup =function(){
        $scope.studentsStatus = !$scope.studentsStatus;
        $scope.selected = [];
        //复选框是否被选中
        var updateSelected = function(action,id,name){
            if(action == 'add' && $scope.selected.indexOf(id) == -1){
                $scope.selected.push(id);
            }
            if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
                var idx = $scope.selected.indexOf(id);
                $scope.selected.splice(idx,1);
            }
        }
        $scope.updateSelection = function($event, id){
            var checkbox = $event.target;
            var action = (checkbox.checked?'add':'remove');
            updateSelected(action,id,checkbox.name);
        }
        $scope.isSelected = function(id){
            return $scope.selected.indexOf(id)>=0;
        }

        $http.post($scope.app.host +"teaching/course/createAuthSchoolGroupModel?requestId=WEUOW343KL34L26NBSK3",
            {
                "name":$scope.studyGroup.name,
                "classCode":$scope.studyGroup.classAndGrade
            }
        ).success(function(data){
            if(data.result) $scope.groupCode = data.result.groupCode;
        });
    };

    //向小组内添加学生
    $scope.addStudentIntoGroup = function(){
        var students = [];
        if($scope.selected.length>0){
            for(var i=0;i<$scope.selected.length;i++){
                students.push({"studentCode":$scope.selected[i]});
            }
        }
        if(students.length>5){
            alert("小组最多只能添加5个学生");
        }
        else{
            $http.post($scope.app.host +"teaching/course/groupStudents?requestId=WEUOW343KL34L26NBSK3",
                {
                    "groupCode":$scope.groupCode,
                    "students":students
                }
            ).success(function(data){
                $state.go("app.authorityManage.studyGroup");
            });
        }
    }


});
//编辑学习小组
app.controller("updateStudyGroupController",function($scope,$http,$stateParams,$state){
    $scope.titleName ="编辑小组";
    $scope.studyGroup = JSON.parse($stateParams.studyGroup);
    $scope.saveUpdateStudyGroup = function(){
        $http.post($scope.app.host+"teaching/organization/update/group?requestId=test123456",
            $scope.studyGroup
         ).success(function(){
            $state.go("app.authorityManage.studyGroup");
        });
    };
});
//查看学习小组
app.controller("studyGroupControllerDetailController",function($scope,$stateParams){
    $scope.titleName="查看班级";
    $scope.studyGroup= JSON.parse($stateParams.studyGroup);
});