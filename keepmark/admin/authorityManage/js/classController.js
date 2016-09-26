/**
 * Created by ying on 2016/9/14.
 */
//排大班课
app.controller("largeClassesController",function($scope,$controller,$http,$state){
    var host = $scope.app.host;
    $scope.titleName="排大班课";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.formData = {};
    //大班课课程表
    $scope.largeClassSchedule = function(){
        if($scope.formData.centreOfSchool){
            $state.go("app.authorityManage.largeClassSchedule",{"centreOfSchool":JSON.stringify($scope.formData.centreOfSchool)});
        }else{
            alert("请选择一个中心");
        }
    }
});
//大班课课程表
app.controller("largeClassScheduleController",["$scope","$modal",'$http','scheduleService','$stateParams','$controller',"$rootScope",function($scope,$modal,$http,scheduleService,$stateParams,$controller,$rootScope){
    $scope.titleName = "排大班课表";

    $controller("getSchoolInfo",{$scope:$scope});
    $scope.scheduleStatus = "0";
    $rootScope.centreOfSchool =JSON.parse( $stateParams.centreOfSchool);

    //根据教学周期获取课程表
    $scope.getLargeClassSchedule = function(weekTimeCode){
        var centreOfSchool = $rootScope.centreOfSchool;
            centreOfSchool = JSON.parse(centreOfSchool);
        if(typeof(weekTimeCode)!=="undefined"){
            var parameters = {
                "weekTimeCode":weekTimeCode,
                "bigClassCode":centreOfSchool.code
            };
            $scope.weekTimeCode = weekTimeCode;
            var url = "http://192.168.1.12:7777/keepMark-teacher-business/teaching/course/createBigClassSchedule?requestId=WEUOW343KL34L26NBSK3";
            scheduleService.getScheduleList(url,parameters).then(function(data){
                if(data.result !== null){
                    $scope.scheduleUrl ='admin/common/tpl/schedule.html';
                    $scope.courses = data.result.sections;
                    $rootScope.eduScheduleCode = data.result.eduScheduleCode;

                }else{
                    $scope.scheduleUrl ="";
                }
            });
        }
    };

    //课表弹框
    $scope.chooseScheduleModal = function(eduSectionCode,eduDayCode) {
        $scope.info = {
                        "eduSectionCode":eduSectionCode,
                        "eduDayCode":eduDayCode
                      };
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg",
            controller: largeClassesModalCtrl,
            resolve: {
                info: function () {
                    return $scope.info;
                }
            }
        });
        //模态框关闭时返回数据
        modalInstance.result.then(function() {
            $scope.getLargeClassSchedule($scope.weekTimeCode);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    }
}]);
//弹框数据
var largeClassesModalCtrl = function($scope,$modalInstance,info,$http,$rootScope,$controller,$state){
    $controller("largeClassScheduleController",{$scope:$scope});
    $scope.teacherDiv = false;
    var centreOfSchool = $rootScope.centreOfSchool;
        centreOfSchool = JSON.parse(centreOfSchool);
    $scope.formData = {};
    //根据学部获取学科
    $scope.getSubjectByDivisionType = function(){
        $http.get("admin/json/subject.json").success(function(data){
            if(centreOfSchool.divisionType ===0){
                $scope.subjectList = data.artsSubject;
            }else{
                $scope.subjectList = data.scienceSubject;
            }
        });
    };
    //根据中心code和学科获取课程
    $scope.getCourseList = function(subjectCode){
        if(typeof(subjectCode)!=="undefined"){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/course/getCourseForTimeTable?requestId=1",
                {
                    "classType": "0",//班级上课类型 大班是“0” 小班是“1”  1对1是“2”
                    "subjectCode": subjectCode,//学科code
                    "aimType":centreOfSchool.goalType//学科code
                }).success(function(data){
                    if(data.result) $scope.courseList = data.result;
            });
        }
    };
    //根据学科中心获取教师
    $scope.getTeacherByCourse = function(courseCode){
        if(typeof(courseCode) !== "undefined"){
            $http.post("http://192.168.1.12:7777/keepMark-teacher-business/teaching/course/getBigClassTeacher?requestId=WEUOW343KL34L26NBSK3",
                {
                    "centerCode":centreOfSchool.code,
                    "subjectCode":""+$scope.subject.subjectCode+""
                }).success(function(data){
                    if(data.result) $scope.teacherList = data.result.teachers;
                    $scope.teacherDiv = !$scope.teacherDiv;
            });
        }
    };
    //保存课程信息
    $scope.saveCourse = function(){
        var formData = {
             "eduScheduleCode":$rootScope.eduScheduleCode,//课程表的code
             "eduDayCode":info.eduDayCode,//天
             "eduSectionCode":info.eduSectionCode,//节
             "subjectCode":""+$scope.subject.subjectCode+"",//学科code
             "subjectName":$scope.subject.subjectName,//学科名称
             "auditTeacherCode":$scope.formData.teacherCode,//旁听老师code
             "curriculumCode":$scope.course.code,//课程体系code
             "mainTeacherCode":$scope.formData.teacherCode,//主讲教师code
             "lessonType":"0",
             "courseType":"0"//0为大班课，1是小班课，2是1对1
         };
        $http.post("http://192.168.1.12:7777/keepMark-teacher-business/teaching/course/addLesson?requestId=WEUOW343KL34L26NBSK3",
            formData).success(function(data){
                if(data.result.isAddLesson){
                    alert("添加成功！");
                    $modalInstance.close();
                }else{
                    alert("添加失败！");
                    $modalInstance.close();
                }
        });
    };
};





//排小班课
app.controller("smallClassController",function($scope,$controller,$http,$state){
    $scope.titleName="排小班课";
    var host = "http://192.168.1.12:7777/keepMark-teacher-business/";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.formData = {};
    $scope.getList = function(classCode){
        if(typeof(classCode) !== "undefined"){
            $http.post(host +'teaching/organization/list?requestId=test123456',
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
    //小班课表
    $scope.smallClassSchedule = function(weekTimeCode){
        var data = {
            "centreCode": $scope.centreOfSchool.code,
            "groupCode":JSON.parse($scope.formData.studyGroup).code,
            "divisionType":$scope.departmentSchool.code,
            "goalType":$scope.centreOfSchool.goalType
        };
        if(data.divisionType){
            $state.go("app.authorityManage.smallClassSchedule",{"studyGroup":JSON.stringify(data)});
        }else{
            alert("请选择一个学习小组");
        }
    };
});
//排小班课课表
app.controller("smallClassScheduleController",["$scope","$modal","scheduleService","$controller","$rootScope","$stateParams",function($scope,$modal,scheduleService,$controller,$rootScope,$stateParams){
    $scope.titleName = "排小班课表";
    var host = "http://192.168.1.12:7777/keepMark-teacher-business/";
    $scope.scheduleStatus = "0";
    $controller("getSchoolInfo",{$scope:$scope});
    $rootScope.studyGroup =JSON.parse($stateParams.studyGroup);

    //根据教学周期获取课程表
    $scope.getSmallClassesSchedule = function(weekTimeCode){
        var studyGroup = $rootScope.studyGroup;
        $scope.weekTimeCode = weekTimeCode;
        if(typeof(weekTimeCode)!=="undefined"){
            var parameters = {
                "smallClass":studyGroup.groupCode,//组code
                "weekTimeCode":weekTimeCode,
                "bigClassCode":studyGroup.centreCode//中心code
            };
            var url = host +"teaching/course/createSmallClassSchedule?requestId=WEUOW343KL34L26NBSK3";
            scheduleService.getScheduleList(url,parameters).then(function(data){
                if(data.result !== null){
                    $scope.courses = data.result.sections;
                    $scope.scheduleUrl ='admin/common/tpl/schedule.html';
                    $rootScope.eduScheduleCode = data.result.eduScheduleCode;
                }else{
                    $scope.scheduleUrl ="";
                }
            });
        }
    };

    //小班课课表课表弹框
    $scope.chooseScheduleModal = function(eduSectionCode,eduDayCode) {
        $scope.info = {
            "eduSectionCode":eduSectionCode,
            "eduDayCode":eduDayCode
        };
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg",
            controller: smallClassesModalCtrl,
            resolve: {
                info: function () {
                    return $scope.info;
                }
            }
        });

        //模态框关闭时返回数据
        modalInstance.result.then(function() {
            $scope.getSmallClassesSchedule($scope.weekTimeCode);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    }
}]);
//弹框数据
var smallClassesModalCtrl = function($scope,$modalInstance,info,$http,$rootScope){
    $scope.teacherDiv = false;
    var studyGroup = $rootScope.studyGroup;
    var host = "http://192.168.1.12:7777/keepMark-teacher-business/";
    $scope.formData = {};
    //根据学部获取学科
    $scope.getSubjectByDivisionType = function(){
        $http.get("admin/json/subject.json").success(function(data){
            if(studyGroup.divisionType ===0){
                $scope.subjectList = data.artsSubject;
            }else{
                $scope.subjectList = data.scienceSubject;
            }
        });
    };
    //根据中心code和学科获取课程
    $scope.getCourseList = function(subjectCode){
        if(typeof(subjectCode)!=="undefined"){
            $http.post(host+"course/getCourseForTimeTable?requestId=1",
                {
                    "classType": "1",//班级上课类型 大班是“0” 小班是“1”  1对1是“2”
                    "subjectCode": subjectCode,//学科code
                    "aimType":studyGroup.goalType//学科code
                }).success(function(data){
                    if(data.result) $scope.courseList = data.result;
            });
        }
    };
    //根据学科中心获取教师
    $scope.getTeacherByCourse = function(courseCode){
        if(typeof(courseCode) !== "undefined"){
            $http.post(host+"teaching/course/findTeacherByFreeTimeAndCourseCode?requestId=WEUOW343KL34L26NBSK3",
                {
                    "weekTimeCode":$rootScope.weekTimeCode,
                    "dayCode":info.eduDayCode,
                    "sectionCode":info.eduSectionCode,
                    "courseCode":courseCode
                }
            ).success(function(data){
                    if(data.result)
                    {
                        $scope.teacherList = data.result.teachers;
                        $scope.teacherDiv = !$scope.teacherDiv;
                    }
            });
        }
    };
    //保存课程信息
    $scope.saveCourse = function(){
        var formData = {
            "eduScheduleCode":$rootScope.eduScheduleCode,//课程表的code
            "eduDayCode":info.eduDayCode,//天
            "eduSectionCode":info.eduSectionCode,//节
            "subjectCode":""+$scope.subject.subjectCode+"",//学科code
            "subjectName":$scope.subject.subjectName,//学科名称
            "auditTeacherCode":$scope.formData.teacherCode,//旁听老师code
            "curriculumCode":$scope.course.code,//课程体系code
            "mainTeacherCode":$scope.formData.teacherCode,//主讲教师code
            "lessonType":"1",
            "courseType":"1"//0为大班课，1是小班课，2是1对1
        };
        console.log(formData);
        $http.post(host+"teaching/course/addLesson?requestId=WEUOW343KL34L26NBSK3",
            formData).success(function(data){
            if(data.result.isAddLesson){
                alert("添加成功！");
                $modalInstance.close();
            }else{
                alert("添加失败！");
                $modalInstance.close();
            }
        });
    };
};



//排一对一课
app.controller("oneToOneClassesController",function($scope,$controller,$http,$state){
    $scope.titleName="排一对一课";
    var host = "http://192.168.1.12:7777/keepMark-teacher-business/";
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.formData = {};
    //获取小组下的学生
    $scope.getList = function(studyGroupCode){
        if(typeof(studyGroupCode) !=="undefined"){
            $http.post(host+"teaching/course/getStudents?requestId=WEUOW343KL34L26NBSK3",
                {
                    "groupCode":studyGroupCode
                }).success(function(data){
                   if(data.result) $scope.list = data.result.students;
            });
        }
    };
    //一对一课表
    $scope.oneToOneClassSchedule = function(weekTimeCode){
        if($scope.formData.student){
            var data = {
                "smallClassCode":$scope.studyGroup.code,
                "studentCode":JSON.parse($scope.formData.student).code,
                "divisionType":$scope.departmentSchool.code,
                "goalType":$scope.centreOfSchool.goalType,
                "bigClassCode":$scope.classAndGrade.code
            };
            $state.go("app.authorityManage.oneToOneClassesSchedule",{"oneToOneClass":JSON.stringify(data)});
        }else{
            alert("请选择一个学生");
        }
    };
});
//一对一课表
app.controller("oneToOneClassesScheduleController",["$scope","$modal","scheduleService",'$rootScope',"$stateParams","$controller",function($scope,$modal,scheduleService,$rootScope,$stateParams,$controller){
    $scope.titleName = "排一对一课表";
    $scope.scheduleStatus = "0";
    $controller("getSchoolInfo",{$scope:$scope});
    $rootScope.oneToOneClass =JSON.parse($stateParams.oneToOneClass);

    //根据教学周期获取课程表
    $scope.getOneToOneClassesSchedule = function(weekTimeCode){
        var oneToOneClass = $rootScope.oneToOneClass;
        $scope.weekTimeCode = weekTimeCode;
        if(typeof(weekTimeCode)!=="undefined"){
            var parameters = {
                "weekTimeCode":weekTimeCode,
                "smallClassCode":oneToOneClass.smallClassCode,
                "studentCode":oneToOneClass.studentCode

            }
            var url = $scope.app.host +"teaching/course/createStudentSchedule?requestId=WEUOW343KL34L26NBSK3";
            scheduleService.getScheduleList(url,parameters).then(function(data){
                if(data.result !== null){
                    $scope.scheduleUrl = 'admin/common/tpl/schedule.html';
                    $scope.courses = data.result.sections;
                    $rootScope.eduScheduleCode = data.result.eduScheduleCode;
                }else{
                    $scope.scheduleUrl = "";
                }
            });
        }
    };

    //一对一课表弹框
    $scope.chooseScheduleModal = function(eduSectionCode,eduDayCode) {
        $scope.info = {
            "eduSectionCode":eduSectionCode,
            "eduDayCode":eduDayCode
        };
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg",
            controller: oneToOneClassesModalCtrl,
            resolve: {
                info: function () {
                    return $scope.info;
                }
            }
        });

        //模态框关闭时返回数据
        modalInstance.result.then(function() {
            $scope.getOneToOneClassesSchedule($scope.weekTimeCode);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    };
}]);
//弹框数据
var oneToOneClassesModalCtrl = function($scope,$modalInstance,info,$http,$rootScope){
    $scope.teacherDiv =false;
    var oneToOneClass = $rootScope.oneToOneClass;
    var host ="http://192.168.1.12:7777/keepMark-teacher-business/";
    $scope.scheduleStatus = "0";
    $scope.formData = {};
    //根据学部获取学科
    $scope.getSubjectByDivisionType = function(){
        $http.get("admin/json/subject.json").success(function(data){
            if(oneToOneClass.divisionType ===0){
                $scope.subjectList = data.artsSubject;
            }else{
                $scope.subjectList = data.scienceSubject;
            }
        });
    };
    //根据中心code和学科获取课程
    $scope.getCourseList = function(subjectCode){
        if(typeof(subjectCode)!=="undefined"){
            $http.post(host+"course/getCourseForTimeTable?requestId=1",
                {
                    "classType": "2",//班级上课类型 大班是“0” 小班是“1”  1对1是“2”
                    "subjectCode": subjectCode,//学科code
                    "aimType":oneToOneClass.goalType//学科code
                }).success(function(data){
                    if(data.result) $scope.courseList = data.result;
            });
        }
    };
    //根据学科中心获取教师
    $scope.getTeacherByCourse = function(courseCode){
    };
    //保存课程信息
    $scope.saveCourse = function(){
        var formData = {
            "eduScheduleCode":$rootScope.eduScheduleCode,//课程表的code
            "eduDayCode":info.eduDayCode,//天
            "eduSectionCode":info.eduSectionCode,//节
            "subjectCode":""+$scope.subject.subjectCode+"",//学科code
            "subjectName":$scope.subject.subjectName,//学科名称
            "auditTeacherCode":"3505088EAE604A29954E16EC3C0A5632",//旁听老师code
            "curriculumCode":$scope.course.code,//课程体系code
            "mainTeacherCode":"3505088EAE604A29954E16EC3C0A5632",//主讲教师code
            "lessonType":"2",
            "courseType":"2"//0为大班课，1是小班课，2是1对1
        };
        $http.post(host+"teaching/course/addLesson?requestId=WEUOW343KL34L26NBSK3",
            formData).success(function(data){
            if(data.result.isAddLesson){
                alert("添加成功！");
                $modalInstance.close();
            }else{
                alert("添加失败！");
                $modalInstance.close();
            }
        });
    };
};
