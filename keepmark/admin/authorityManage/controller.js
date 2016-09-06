'use strict';

//总校
app.controller("masterSchoolController",['$rootScope', '$scope', '$http',function($rootScope, $scope, $http){
    $scope.name = "总校";
    $http.post('admin/json/test.json', {"id":1}).success(function(data){
          $scope.list = data.list;
    });
    $scope.deleteMasterSchool = function(){
        alert("确定删除吗？");
    };
}]);

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
app.controller("branchSchoolController",function($scope,$http){
    $scope.name = "分校";
    $http.post('admin/json/test.json',{}).success(function(data){
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
app.controller("districtSchoolController",function($scope,$http){
    $scope.name = "学区";
    $http.post('admin/json/test.json',{}).success(function(data){
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
app.controller("departmentSchoolController",function($scope,$http){
    $scope.name = "学部";
    $http.post('admin/json/test.json', {"id":1}).success(function(data){
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
app.controller("centreOfSchoolController",function($scope,$http){
    $scope.name = "中心";
    $http.post('admin/json/test.json', {"id":1}).success(function(data){
        $scope.list = data.list;
    });
    $scope.deleteCentreOfSchool = function(){
        alert("确定删除吗？");
    }

});
app.controller("addCentreOfSchoolController",function($scope){
    $scope.name = "新增中心";

});
//班级
app.controller("classAndGradeController",function($scope,$http){
    $scope.name="创建班级";
    $http.post('admin/json/test.json', {"id":1}).success(function(data){
        $scope.list = data.list;
    });
    $scope.deleteClassAndGradeSchool = function(){
        alert("确定删除吗？");
    }
});
app.controller("addClassAndGradeController",function($scope){
    $scope.name="新增班级";
})
app.controller("updateClassAndGradeController",function($scope){
    $scope.name="编辑班级";
})
app.controller("classAndGradeDetailController",function($scope){
    $scope.name="查看班级";
})
//排大班课
app.controller("largeClassesController",function($scope){
    $scope.name="排大班课";
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
app.controller("smallClassController",function($scope){
    $scope.name="排小班课";
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
})
app.controller("addPartTimeTeacherController",function($scope,$http){
    $scope.name="添加兼职教师";
    $scope.spareTimeShow = false;
    $scope.chooseSpareTime = function(){
        //初始化空余时间表
        $http.get("admin/json/freeTime.json").success(function(data){
            //alert(data.freeTime);
            $scope.list = data.freeTime;
        });
        $scope.spareTimeShow = !($scope.spareTimeShow);
    }

    $scope.provinces = ['黑龙江', '吉林', '辽宁', '河北'];
    $scope.$watch('province', function(newVal) {
        if (newVal) $scope.cities = ['大连', '长春'];
    });
    $scope.$watch('city', function(newVal) {
        if (newVal) $scope.suburbs = ['鸡冠区', '隶属', 'A区'];
    });
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
})
app.controller("updatePartTimeTeacherController",function($scope,$http){
    $scope.name="修改兼职教师";
    $scope.province='吉林';
    $scope.city="长春";
    $scope.suburb="鸡冠区";
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

app.controller("addFullTimeTeacherController",function($scope){
    $scope.name="添加全职教师";

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
app.controller("updateFullTimeTeacherController",function($scope){
    $scope.name="修改全职教师";
    $scope.province='吉林';
    $scope.city="长春";
    $scope.suburb="鸡冠区";
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