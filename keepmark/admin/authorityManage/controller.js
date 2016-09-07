'use strict';

//总校
app.controller("masterSchoolController",function($scope, $http ,$controller){
    $scope.name = "总校";
    $controller("getSchoolInfo",{$scope:$scope});
    $http.post('', {"id":1}).success(function(data){
          $scope.list = data.list;
    });
    $scope.deleteMasterSchool = function(){
        alert("确定删除吗？");
    };
});

app.controller("addMasterSchoolController",function($scope,$http){
    $scope.name = "新增总校";
    $scope.savaMasterSchool = function(){
        $http.post("",{"name":$scope.schoolName,"code":$scope.schoolCode,"headmaster":$scope.headmaster,"viceHeadmaster":$scope.viceHeadmaster}).success(function(){

        });
    };
});

app.controller("masterSchoolDetailController",function($scope){
    $scope.name = "查看总校详情";

});
app.controller("updateMasterSchoolController",function($scope){
    $scope.name = "编辑总校";

});
//分校
app.controller("branchSchoolController",function($scope,$http,$controller){
    $scope.name = "分校";
    $controller("getSchoolInfo",{$scope:$scope});
    $http.post('',{}).success(function(data){
        $scope.list = data.list;
    });
    $scope.deletebranchSchool = function(){
        alert("确定删除此分校吗？");
    }

});
app.controller("addBranchSchoolController",function($scope){
    $scope.name = "新增分校";

});

app.controller("branchSchoolDetailController",function($scope){
    $scope.name = "分校详情";

});
app.controller("updateBranchSchoolController",function($scope){
    $scope.name = "编辑分校";

});
//学区
app.controller("districtSchoolController",function($scope,$http,$controller){
    $scope.name = "学区";
    $controller("getSchoolInfo",{$scope:$scope});
    $http.post('',{}).success(function(data){
        $scope.list = data.list;
    });
    //删除信息
    $scope.deleteDistrictSchool = function(){
        alert("确定删除此学区吗？");
    }

});
app.controller("addDistrictSchoolController",function($scope){
    $scope.name = "新增学区";

});
app.controller("updateDistrictSchoolController",function($scope){
    $scope.name = "编辑学区";

});
app.controller("districtSchoolDetailController",function($scope){
    $scope.name = "新增学区";

});
//学部
app.controller("departmentSchoolController",function($scope,$http,$controller){
    $scope.name = "学部";
    $controller("getSchoolInfo",{$scope:$scope});
    $http.post('', {"id":1}).success(function(data){
        $scope.list = data.list;
    });
    $scope.deleteDepartmentSchool = function(){
        alert("确定删除此学部吗？");
    }
});
app.controller("addDepartmentSchoolController",function($scope){
    $scope.name = "新增学部";

});
app.controller("updateDepartmentSchoolController",function($scope){
    $scope.name = "编辑学部";

});
app.controller("departmentSchoolDetailController",function($scope){
    $scope.name = "新增学部";

});
//中心
app.controller("centreOfSchoolController",function($scope,$http,$controller){
    $scope.name = "中心";
    $controller("getSchoolInfo",{$scope:$scope});
    $http.post('', {"id":1}).success(function(data){
        $scope.list = data.list;
    });
    $scope.deleteCentreOfSchool = function(){
        alert("确定删除吗？");
    }

});
app.controller("addCentreOfSchoolController",function($scope){
    $scope.name = "新增中心";
    $scope.subjectCode =2;

});
//班级
app.controller("classAndGradeController",function($scope,$http,$controller){
    $scope.name="创建班级";
    $http.post('', {"id":1}).success(function(data){
        //$scope.list = data.list;
    });
    $scope.deleteClassAndGradeSchool = function(){
        alert("确定删除吗？");
    }
    $controller("getSchoolInfo",{$scope:$scope});
});


app.controller("addClassAndGradeController",function($scope){
    $scope.name="新增班级";
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
    $scope.name="编辑班级";
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
    $scope.name="查看班级";
});
//排大班课
app.controller("largeClassesController",function($scope,$controller){
    $scope.name="排大班课";
    $controller("getSchoolInfo",{$scope:$scope});
});
app.controller("largeClassScheduleController",["$scope","$modal",function($scope,$modal){
    $scope.name = "排大班课表";
    $scope.scheduleStatus = "0";
    $scope.chooseScheduleModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg"
        });
    }
}])

//排小班课
app.controller("smallClassController",function($scope,$controller){
    $scope.name="排小班课";
    $controller("getSchoolInfo",{$scope:$scope});
});
app.controller("smallClassScheduleController",["$scope","$modal",function($scope,$modal){
    $scope.name = "排小班课表";
    $scope.scheduleStatus = "0";
    $scope.chooseScheduleModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg"
        });
    }
}])
//排一对一课
app.controller("oneToOneClassesController",function($scope){
    $scope.name="排一对一课";

});
app.controller("oneToOneClassesScheduleController",["$scope","$modal",function($scope,$modal){
    $scope.name = "排一对一课表";
    $scope.scheduleStatus = "0";
    $scope.chooseScheduleModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg"
        });
    }
}])

//兼职教师
app.controller("partTimeTeacherManageController",function($scope){
    $scope.name = "兼职教师管理";
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
    $scope.name="添加兼职教师";
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
    $scope.name="修改兼职教师";
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
    $scope.name="兼职教师查看";
    //初始化空余时间表
    $http.get("admin/json/freeTime.json").success(function(data){
        $scope.list = data.freeTime;
    });
})
//全职教师
app.controller("fullTimeTeacherManageController",function($scope){
    $scope.name = "全职教师管理";
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

app.controller("addFullTimeTeacherController",function($scope,acquireDataService){
    $scope.name="添加全职教师";
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
    $scope.name="修改全职教师";
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
    $scope.name="全职教师查看";
})

//学籍教师
app.controller("schoolRollManageController",function($scope){
    $scope.name = "学籍管理";
})

//课程表
app.controller("scheduleController",function($scope,scheduleService){
    $scope.name = "课程表";
    scheduleService.getScheduleList().then(function(data){
        $scope.courses = data.schedule;
    });
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