/**
 * Created by ying on 2016/9/14.
 */



//兼职教师
app.controller("partTimeTeacherManageController",function($scope,$http,$state){
    $scope.titleName = "兼职教师管理";
    //查看兼职教师
    $scope.partTimeTeacherDetail = function(partTimeTeacher){
        $state.go("app.authorityManage.partTimeTeacherDetail",{partTeacher:JSON.stringify(partTimeTeacher)});
    }

    $scope.tabs = [{
        title: '在职员工名单',
        url: 'onJobTeacher.tpl.html'
    }, {
        title: '离职员工名单',
        url: 'dimissionTeacher.tpl.html'
    }];
    $scope.currentTab = 'onJobTeacher.tpl.html';
    $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456",
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
            $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456",
                {
                    "type":0,
                    "roleType":7,
                    "state":2
                }).success(function(data){
                $scope.list = data.result;
            });
        }else{
            $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456",
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
            console.log(free_time);
        });
        var partTimeTeacher = {"teacherModel":$scope.teacher,"freeTimes":free_time};
        $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/partTeacher?requestId=test123456",
            partTimeTeacher).success(function(data){
                $state.go("app.teachResearchManage.updateCentreOfSchool");
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

    $scope.partTeacher =JSON.parse($stateParams.partTeacher);
    alert($scope.partTeacher);
});




//全职教师
app.controller("fullTimeTeacherManageController",function($scope,$http,$state){
    $scope.titleName = "全职教师管理";
    $scope.fullTimeTeacherDetail = function(fullTeacher){
        $state.go("app.authorityManage.fullTimeTeacherDetail",{fullTeacher:JSON.stringify(fullTeacher)});
    }
    $scope.tabs = [{
        title: '在职员工名单',
        url: 'onJobTeacher.tpl.html'
    }, {
        title: '离职员工名单',
        url: 'dimissionTeacher.tpl.html'
    }];

    $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456",
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
            $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456",
                {
                    "type":1,
                    "roleType":7,
                    "state":2
                }).success(function(data){
                $scope.list = data.result;
            });
        }else{
            $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/teacher/list?requestId=test123456",
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
        $scope.teacher.subjectName = $scope.subject.subjectName;
        $scope.teacher.subjectCode  = $scope.subject.subjectCode;
        $scope.teacher.type = 1;
        $scope.teacher.state = 2;
        $http.post("http://192.168.1.201:7777/keepMark-teacher-business/teaching/organization/create/fullTeacher?requestId=test123456",
            $scope.teacher).success(function(data){
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

})
//学籍教师
app.controller("schoolRollManageController",function($scope){
    $scope.titleName = "学籍管理";
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