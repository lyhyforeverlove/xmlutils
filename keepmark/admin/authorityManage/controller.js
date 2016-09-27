/**
 * Created by ying on 2016/9/14.
 */



//兼职教师
app.controller("partTimeTeacherManageController",function($scope,$http,$state){
    $scope.titleName = "兼职教师管理";
    //查看兼职教师
    $scope.partTimeTeacherDetail = function(partTimeTeacher){
        var partTeacher={};
        partTeacher.userName = partTimeTeacher.userName;
        partTeacher.name = partTimeTeacher.name;
        partTeacher.password = partTimeTeacher.password;
        partTeacher.teacherNum = partTimeTeacher.teacherNum;
        partTeacher.lectureType = partTimeTeacher.lectureType;
        partTeacher.invigilator = partTimeTeacher.invigilator;
        partTeacher.subjectName = partTimeTeacher.subjectName;
        partTeacher.teacherShip = partTimeTeacher.teacherShip;
        $state.go("app.authorityManage.partTimeTeacherDetail",{partTeacher:JSON.stringify(partTeacher)});
    }

    $scope.tabs = [{
        title: '在职员工名单',
        url: 'onJobTeacher.tpl.html'
    }, {
        title: '离职员工名单',
        url: 'dimissionTeacher.tpl.html'
    }];
    $scope.currentTab = 'onJobTeacher.tpl.html';
    $http.post($scope.app.host +"teaching/organization/teacher/list?requestId=test123456",
        {
            "type":0,
            "roleType":7,
            "state":2
        }).success(function(data){
        $scope.list = data.result;
    });
    $scope.onClickTab = function(tab) {
        // 1是离职 2 是在职
        if($scope.currentTab === "dimissionTeacher.tpl.html"){
            $http.post($scope.app.host +"teaching/organization/teacher/list?requestId=test123456",
                {
                    "type":0,
                    "roleType":7,
                    "state":2
                }).success(function(data){
                $scope.list = data.result;
            });
        }else{
            $http.post($scope.app.host +"teaching/organization/teacher/list?requestId=test123456",
                {
                    "type":0,
                    "roleType":7,
                    "state":1
                }).success(function(data){
                $scope.list = data.result;
            });
        }
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
});
//增加兼职教师
app.controller("addPartTimeTeacherController",function($scope,$http,acquireDataService,$state){
    $scope.titleName="添加兼职教师";
    $scope.spareTimeShow = false;
    $scope.isSubmitted = false;
    $scope.chooseSpareTime = function(){
        //初始化空余时间表
        $http.get("admin/json/freeTime.json").success(function(data){
            $scope.list = data.freeTime;
        });
        $scope.spareTimeShow = !($scope.spareTimeShow);

    };
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
    //获取学科
    $scope.getSubject = function(){
        $http.get("admin/json/subject.json").success(function(data){
            $scope.subjectList = data.subject;
        });
    };
    var free_time =[];
    $scope.savePartTimeTeacher = function(){
        $scope.isSubmitted = true;
        $scope.teacher.subjectName = $scope.subject.subjectName;
        $scope.teacher.subjectCode  = $scope.subject.subjectCode;
        $scope.teacher.roleType = 7;
        $scope.teacher.type = 0;
        $scope.teacher.state = 2;
        $("td.freeTime").each(function(){
            //td_code星期  tr_code是时间段
            var td_code = $(this).attr("td_code");
            var tr_code =$(this).parent().attr("tr_code");
            var hourType = [];
            hourType.push(tr_code);
            free_time.push({"weekDay":td_code,"hourTypes":hourType});
        });
        var partTimeTeacher = {"teacherModel":$scope.teacher,"freeTimes":free_time};
        $http.post($scope.app.host +"teaching/organization/create/partTeacher?requestId=test123456",
            partTimeTeacher).success(function(data){
                $state.go("app.authorityManage.partTimeTeacherManage");
        });
    };
});
//修改兼职教师
app.controller("updatePartTimeTeacherController",function($scope,$http,acquireDataService){
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


    //初始化空余时间表
    $http.get("admin/json/freeTime.json").success(function(data){
        $scope.list = data.freeTime;
    });

});
//查看兼职教师
app.controller("partTimeTeacherDetailController",function($scope,$stateParams){
    $scope.partTeacher = JSON.parse($stateParams.partTeacher);
    //授课类型
    switch ($scope.partTeacher.lectureType)
    {
        case 1:
            $scope.partTeacher.lectureType ="易";
            break;
        case 2:
            $scope.partTeacher.lectureType ="中";
            break;
        case 3:
            $scope.partTeacher.lectureType ="难";
            break;
    };
    //职称
    switch ($scope.partTeacher.invigilator)
    {
        case 0:
            $scope.partTeacher.invigilator ="初级";
            break;
        case 1:
            $scope.partTeacher.invigilator ="中级";
            break;
        case 2:
            $scope.partTeacher.invigilator ="高级";
            break;
        case 3:
            $scope.partTeacher.invigilator ="特级";
            break;
        case 4:
            $scope.partTeacher.invigilator ="教授";
            break;
    };
    //合作关系
    switch ($scope.partTeacher.teacherShip)
    {
        case 1:
            $scope.partTeacher.teacherShip ="临时合作";
            break;
        case 2:
            $scope.partTeacher.teacherShip ="签约协议";
            break;
        case 3:
            $scope.partTeacher.teacherShip ="储备";
            break;
    };

});




//全职教师
app.controller("fullTimeTeacherManageController",function($scope,$http,$state){
    $scope.titleName = "全职教师管理";
    $scope.fullTimeTeacherDetail = function(fullTimeTeacher){
        var fullTeacher={};
        fullTeacher.userName = fullTimeTeacher.userName;
        fullTeacher.name = fullTimeTeacher.name;
        fullTeacher.password = fullTimeTeacher.password;
        fullTeacher.teacherNum = fullTimeTeacher.teacherNum;
        fullTeacher.lectureType = fullTimeTeacher.lectureType;
        fullTeacher.invigilator = fullTimeTeacher.invigilator;
        fullTeacher.subjectName = fullTimeTeacher.subjectName;
        fullTeacher.roleType = fullTimeTeacher.roleType;
        $state.go("app.authorityManage.fullTimeTeacherDetail",{fullTeacher:JSON.stringify(fullTeacher)});
    }
    $scope.tabs = [{
        title: '在职员工名单',
        url: 'onJobTeacher.tpl.html'
    }, {
        title: '离职员工名单',
        url: 'dimissionTeacher.tpl.html'
    }];

    $http.post($scope.app.host +"teaching/organization/teacher/list?requestId=test123456",
        {
            "type":1,
            "roleType":7,
            "state":2
        }).success(function(data){
        $scope.list = data.result;
    });

    // 1是离职 2 是在职
    $scope.currentTab = 'onJobTeacher.tpl.html';
    $scope.onClickTab = function(tab) {
        // 1是离职 2 是在职
        if($scope.currentTab === "dimissionTeacher.tpl.html"){
            $http.post($scope.app.host +"teaching/organization/teacher/list?requestId=test123456",
                {
                    "type":1,
                    "roleType":7,
                    "state":2
                }).success(function(data){
                $scope.list = data.result;
            });
        }else{
            $http.post($scope.app.host +"teaching/organization/teacher/list?requestId=test123456",
                {
                    "type":1,
                    "roleType":7,
                    "state":1
                }).success(function(data){
                $scope.list = data.result;
            });
        }
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
});
//增加全职教师
app.controller("addFullTimeTeacherController",function($scope,acquireDataService,$http,$state){
    $scope.isSubmitted = false;
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
    //获取学科
    $scope.getSubject = function(){
        $http.get("admin/json/subject.json").success(function(data){
            $scope.subjectList = data.subject;
        });
    };

    //职称
    $scope.seacherTeacherPro = function(){
        acquireDataService.getTeacherProList().then(function(data){
            $scope.teacherProList = data.teacherProList;
        });
    };

    //获取职务
    $scope.getDutyList = function(){
        acquireDataService.getDutyList().then(function(data){
            $scope.dutyList = data.teacherDutyList;
        });
    };

    $scope.deleteFullTimeTeacher = function(){
        alert("删除全职教师");
    }

    $scope.saveFullTimeTeacher = function(){
        $scope.isSubmitted = true;
        $scope.teacher.subjectName = $scope.subject.subjectName;
        $scope.teacher.subjectCode  = $scope.subject.subjectCode;
        $scope.teacher.type = 1;
        $scope.teacher.state = 2;
        $http.post($scope.app.host +"teaching/organization/create/fullTeacher?requestId=test123456",
            $scope.teacher).success(function(data){
                $state.go("app.authorityManage.fullTimeTeacherManage");
        });
    }
});
//修改全职教师
app.controller("updateFullTimeTeacherController",function($scope,acquireDataService){
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
});
//全职教师查看
app.controller("fullTimeTeacherDetailController",function($scope,$stateParams){
    $scope.titleName="全职教师查看";
    $scope.fullTeacher = JSON.parse($stateParams.fullTeacher);

    //授课类型
    switch ($scope.fullTeacher.lectureType)
    {
        case 1:
            $scope.fullTeacher.lectureType ="易";
            break;
        case 2:
            $scope.fullTeacher.lectureType ="中";
            break;
        case 3:
            $scope.fullTeacher.lectureType ="难";
            break;
    };
    //职称
    switch ($scope.fullTeacher.invigilator)
    {
        case 0:
            $scope.fullTeacher.invigilator ="初级";
            break;
        case 1:
            $scope.fullTeacher.invigilator ="中级";
            break;
        case 2:
            $scope.fullTeacher.invigilator ="高级";
            break;
        case 3:
            $scope.fullTeacher.invigilator ="特级";
            break;
        case 4:
            $scope.fullTeacher.invigilator ="教授";
            break;
    };

    //职务
    switch ($scope.fullTeacher.roleType)
    {
        case 1:
            $scope.fullTeacher.roleType ="总校校长";
            break;
        case 2:
            $scope.fullTeacher.roleType ="分校校长";
            break;
        case 3:
            $scope.fullTeacher.roleType ="学区长";
            break;
        case 4:
            $scope.fullTeacher.roleType ="学部长";
            break;
        case 5:
            $scope.fullTeacher.roleType ="中心主管";
            break;
        case 6:
            $scope.fullTeacher.roleType ="班主任";
            break;
        case 7:
            $scope.fullTeacher.roleType ="普通教师";
            break;
    }
});



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





//学生管理
app.controller("schoolRollManageController",function($controller,$scope,$http,acquireDataService){
    $scope.titleName = "学生管理";
    $controller("getSchoolInfo",{$scope:$scope});

    //获取目标类型
    $scope.getAimType = function(){
        acquireDataService.getGoalType().then(function(data){
            $scope.aimList = data.aimData;
        });
    };

    //获取学生类型
    $scope.getStudentType = function(){
        acquireDataService.getStudentType().then(function(data){
            $scope.studentTypeList = data.studentType;
        });
    };

    //获取班级信息
    $scope.getClasses = function(){
        $http.post($scope.app.host+"teaching/organization/classes?requestId=test123456",{}
        ).success(function(data){
            $scope.classList = data.result;
        });
    };

    //查询按钮
    $scope.searchStudent = function(page, size, callback){
        $http.post($scope.app.host+"/teaching/organization/student/page?requestId=test123456",
            {
                "pageNumber":page,
                "pageSize":size,
                "name":$scope.name,
                "accessionYear":"2016",
                "goalType":$scope.goalType,
                "type":$scope.studentType,
                "classCode":$scope.class
            }
        ).success(function(data){
           if(data.result){
               $scope.studentList = data.result.list;
               $scope.totalPage = data.result.totalPage;
               callback && callback(data.result);
           }
        });
    };
    $scope.selected = [];
    //复选框是否被选中
    var updateSelected = function(action,id,name){
        if(action == 'add' && $scope.selected.indexOf(id) == -1){
            $scope.selected.push({"code":id});
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
    //graduated 毕业属性(0没有，1已毕业)
    //delFlag 删除属性 （0未删除，1已删除）
    $scope.graduate =function(){
        console.log($scope.selected);
        $http.post($scope.app.host+"/teaching/organization/update/students?requestId=test123456",
            {
                "graduated":1,
                "delFlag":0,
                "authStudentModels":$scope.selected
            }).success(function(){

        });

    };

    $scope.deleteStudent =function(){
        console.log($scope.selected);
        $http.post($scope.app.host+"/teaching/organization/update/students?requestId=test123456",
            {
                "graduated":0,
                "delFlag":1,
                "authStudentModels":$scope.selected
            }).success(function(){

        });
    };
});













