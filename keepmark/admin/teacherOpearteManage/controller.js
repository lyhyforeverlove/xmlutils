'use strict';
var DataSource = [
    {
        "day": "一", "course": [
        {"courseName": "语文课1", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "英语课2", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "数学课3", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课4", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课5", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课6", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课6", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课1", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "英语课2", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "数学课3", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课4", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课5", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课6", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"},
        {"courseName": "语文课6", "teacherName": "李老师", "pointName": 1, "pointTime": "8:00~8:45"}
    ]
    },
    {
        "day": "二", "course": [
        {"courseName": "数文课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "语文课4", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "语文课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "数文课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "语文课4", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "语文课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 2, "pointTime": "9:00~9:45"}
    ]
    },
    {
        "day": "三", "course": [
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 3, "pointTime": "10:00~10:45"}
    ]
    },
    {
        "day": "四", "course": [
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 4, "pointTime": "11:00~11:45"}
    ]
    },
    {
        "day": "五", "course": [
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课4", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "数文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课4", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "数文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"},
        {"courseName": "语文课", "teacherName": "李老师", "pointName": 5, "pointTime": "14:00~14:45"}
    ]
    },
    {
        "day": "六", "course": [
        {"courseName": "数文课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "语文课4", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "数文课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "语文课4", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"},
        {"courseName": "英语课", "teacherName": "张老师", "pointName": 6, "pointTime": "15:00~15:45"}
    ]
    },
    {
        "day": "七", "course": [
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "语文课4", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "语文课4", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"},
        {"courseName": "数文课", "teacherName": "孙老师", "pointName": 7, "pointTime": "16:00~16:45"}
    ]
    },
    {
        "day": "八", "course": [
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"},
        {"courseName": "自习课", "teacherName": "", "pointName": 8, "pointTime": "17:00~17:45"}
    ]
    }
];


//我的学生
app.controller('myStudentsController', function($scope,$http,$controller,$resource,$stateParams, $modal, $state,CalcService){

    $scope.name='我的学生';
    $scope.total_count =10;
    var id = 1;
    // 学生动态数据
    var url = $scope.app.host + "fullTeacher/getMyStudentList?requestId=test123456";
    $http.post(url,{
        "teacherCode":"e44a0c2ad33a40d1a9c54bf4e801c227"
    }).success(function(data){
        console.log(data)
        if(data.message == "Success"){
            $scope.results = data.result;
        }
    }).error(function(data){
        console.log("fail");
    });
    // 到这结束
    $scope.learningDetail = function(){
        $state.go("app.teacherOpearteManage.learningDetail",{"id":id});
    }

    $scope.answerQuestionsRecord = function(){
        $state.go("app.teacherOpearteManage.answerQuestions",{"id":id});
    }

    $scope.checkMySchedule = function(){
        $state.go("app.teacherOpearteManage.classSchedule",{"id":id});
    }

})

//学生二

app.controller('myStudentsControllertwo', function($scope,$http,$controller,$resource,$stateParams, $modal, $state,CalcService){

    $scope.name='我的学生';
    $scope.total_count =10;
    var id = 1;
    // 学生动态数据
    var url = $scope.app.host + "fullTeacher/getMyStudentList?requestId=test123456";
    $http.post(url,{
        "teacherCode":"e44a0c2ad33a40d1a9c54bf4e801c227"
    }).success(function(data){
        console.log(data)
        if(data.message == "Success"){
            $scope.results = data.result;
        }
    }).error(function(data){
        console.log("fail");
    });
    // 到这结束
    $scope.learningDetail = function(){
        $state.go("app.teacherOpearteManage.learningDetail",{"id":id});
    }

    $scope.answerQuestionsRecord = function(){
        $state.go("app.teacherOpearteManage.answerQuestions",{"id":id});
    }

    $scope.checkMySchedule = function(){
        $state.go("app.teacherOpearteManage.classSchedule",{"id":id});
    }

})


//课程表
app.controller("scheduleController", function($scope, scheduleService, $modal, $stateParams){
    if(typeof($scope.scheduleStatus) === "undefined"){
        $scope.scheduleStatus = $stateParams.scheduleStatus;
    }

    var url = $scope.app.host +"teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK";
    var parameters = {
        "weekTimeCode": "30A56BA2E71E4BE2BD5DD59BA044C1D6",
        "ownerCode": "AEDBB67C70B24165817BAEA2B4EBF0D0"
    }
    scheduleService.getScheduleList(url, parameters).then(function(data){
        $scope.courses = data.result.sections;
    });


    $scope.chooseScheduleModal = function(){
        var modalInstance = $modal.open({
            templateUrl: 'admin/common/tpl/chooseSchedule.html',
            size: "lg"
        });
    }
})

//选择课程弹框
app.controller("chooseScheduleController", function($scope){
    $scope.name = "选择课程";
    $scope.courseList = false;
    $scope.chooseTeacher = function(){
        $scope.courseList = !($scope.courseList);
    };

    $scope.saveCourse = function(){

    }
});
//学习情况
app.controller('learningDetailController', function($scope){
    $scope.name = '学习情况';
    $scope.total_count = 10;

})
//一对一老师操作页面
app.controller('oneToOneController', function($scope, $state, $rootScope, scheduleService){
    $scope.name = "1对1老师操作页面";
    $scope.scheduleStatus = "1";

    //获取课程信息
    var url = $scope.app.host +"teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK";
    var parameters = {
        "weekTimeCode": "30A56BA2E71E4BE2BD5DD59BA044C1D6",
        "ownerCode": "AEDBB67C70B24165817BAEA2B4EBF0D0"
    }
    scheduleService.getScheduleList(url, parameters).then(function(data){
        $scope.courses = data.result.sections;
    });

    //进入课堂
    $scope.enterTheClassroom = function(){
        $state.go("app.teacherOpearteManage.enterTheClassroom", {"scheduleStatus": "1"});
    }
});

//进入课堂
app.controller('todayCourseController', function($scope){
    $scope.name = '进入课堂';

})
//学生作业
app.controller('studentWorkController', function($scope, $state, $controller){
    $scope.name = '学生作业';
    $controller("getSchoolInfo", {$scope: $scope});
    $scope.studentWorkChecked = function(){
        $state.go("app.teacherOpearteManage.studentWorkChecked");
    }

})
//自主推送学习资源-------------chc
app.controller('autonmousPushResourcesController', function($scope,$rootScope,$http, $controller,$q, $timeout,$modal, CalcService){

    $controller('ParentGetDataCtrl', {$scope: $scope}); //继承
    $scope.name = "自主推送学习资源";
    $scope.studentsShow = false;
    var baseHost = 'http://192.168.1.102:8080/keepMark-teacher-business/';//$scope.app.host;
    //选择推送学生
    $scope.chooseStudents = function(){
        $scope.studentsShow = !($scope.studentsShow);
    }
    $scope.tabs = [{
        title: '视频',
        url: 'video.tpl.html'
    }, {
        title: '试卷',
        url: 'paper.tpl.html'
    }];
    // 将节点放到已有json树的合适位置
    function findTreeChild(arr, tmp, isChild){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].ctbCode == tmp.parentCode){
                if(!arr[i].children)arr[i].children = [];
                arr[i].children.push(tmp);
                return true;
            }else if(arr[i].parentCode == tmp.ctbCode){
                tmp.children =[arr[i]];
                arr.splice(i, 1);
                arr.unshift(tmp);
                return true;
            }else if(arr[i].children){
                if(findTreeChild(arr[i].children, tmp, true)){
                    return true;
                }
            }
        }
        if(!isChild){
            arr.push(tmp);
        }
    }

    $scope.currentTab = 'video.tpl.html';

    $scope.onClickTab = function(tab){
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl){
        return tabUrl == $scope.currentTab;
    }
    var tree;

    $scope.dedepartmentType=[];
    $scope.category=[];
    $scope.bookVersion=[];

    CalcService.filterData().then(function(data){
        $scope.formData.gradeCode = data.filterData[0].gradeCode;
        $scope.dedepartmentType = data.filterData;
        $scope.category = $scope.dedepartmentType[0].category;
        $scope.bookVersion = $scope.dedepartmentType[0].category[0].bookVersion;
        $scope.formData.departmentType = $scope.dedepartmentType[0].departmentType;
        $scope.formData.subjectCode = $scope.dedepartmentType[0].category[0].subjectCode;
    });

    $scope.my_data = [];
    $scope.my_tree = tree = {};

    // 学年类型学科教材被选中项
    $scope.formData =   {knowledge:[]};
    //查询 视频/试卷 列表条件
    var searchCondition = {};
    $scope.pagination = [];
    // 视频列表
    $scope.videos = [];
    //试题列表
    $scope.papers = [];
    //组装分页
    function makePagination(pageNo,totalPage){
       var arr=[], upage=pageNo,lpage=pageNo,showIndexs=5;
        if(totalPage>1){
            if(pageNo==1){
                upage=totalPage>showIndexs?pageNo+showIndexs-1:totalPage;
            }else if(pageNo>1){
                upage = totalPage-pageNo > 2 ? pageNo+2:totalPage;
                lpage = upage -4 >0 ? upage-4 :1;

            }
        }
        arr.push({page:1,name:'首页',className:pageNo==1?'active':'',edge:pageNo==1?'e':''});
        arr.push({page:pageNo-1>1?pageNo-1:1,name:'上一页',className:pageNo==1?'disabled':''});
        for(var i=lpage;i<=upage;i++){
            arr.push({page:i,name:i,className:pageNo==i?'active':''});
        }
        arr.push({page:pageNo+1>totalPage?totalPage:pageNo+1,name:'下一页',className:totalPage==pageNo?'disabled':''});
        arr.push({page:totalPage,name:'尾页',className:totalPage==pageNo?'active':'',edge:'e'});
        return arr;
    }



    //获取 视频/试卷 列表
    $scope.getList = function(page,flag,total){
        page = page||1;
        if(searchCondition.listsXHR)
            searchCondition.listsXHR.resolve('abort');
        searchCondition.listsXHR = $q.defer();
        var ks = []
        if($scope.currentTab.url=='video.tpl.html'){
            $http.post(baseHost+'/resource/get/videos?requestId='+Math.random(),
                {
                    "gradeCode":searchCondition.gradeCode,
                    "subjectCode":searchCondition.subjectCode,
                    "knowledges": ks
                }
            ).success(function(b){

            }).error(function(e){
                    if(status.timeout&&status.timeout.$$state.value=='abort'){
                        return false;
                    }
                    modalAlert({content:'抱歉，请求树失败!'});
            });
        }else{
            $scope.pagination = makePagination(page,total);
        }
    };

    // 弹框提醒用户(作用似alert)
    function modalAlert(data){
        $modal.open({
            templateUrl: 'admin/warning.html',
            controller: 'WarningController',
            size:data.size||'lg',
            resolve:{
                data:function(){  return data;  }
            }
        });
    }
    // 获取知识点列表
    $scope.getKnowledgeList = function(){
        if(!$scope.formData.bookVersionCode){
            modalAlert({content:'请先选择教材版本!',size:'sm'});
            return false;
        }
        $scope.my_data = [];
        searchCondition.subjectCode = $scope.formData.subjectCode;
        searchCondition.gradeCode = $scope.formData.gradeCode;
        searchCondition.bookVersionCode = $scope.formData.bookVersionCode;

        if(searchCondition.KlistXHR)
            searchCondition.KlistXHR.resolve('abort');
        searchCondition.KlistXHR = $q.defer();
        $http.post(baseHost +'resource/knowledge/tree?requestId='+(Math.random()*100),
            {gradeCode:$scope.formData.gradeCode,subjectCode:$scope.formData.subjectCode,booktypeCode:$scope.formData.bookVersionCode,knowledgeType:1},
            {timeout:searchCondition.listXHR.promise}
        ).success(function(data,header,config,status){
                if(!data.code=='Success'){
                    return modalAlert({content:'抱歉，请求知识点失败!'});
                }else if(!data.result.datas||data.result.datas.length==0){
                    return modalAlert({content:'未获取到相应知识点!'});
                }
                var result = [];
                data.result.datas = data.result.datas.sort(function(a,b){return parseInt(a.level)- parseInt(b.level);});
                for(var i = 0, l = data.result.datas.length; i < l; i++){
                    data.result.datas[i].label = data.result.datas[i].knowledgeName;
                    findTreeChild(result, data.result.datas[i]);
                }
                console.log('tree data....',result);
                $scope.my_data = result;
                result = data.result.datas=null;
            }).error(function(data,header,config,status){
                if(status.timeout&&status.timeout.$$state.value=='abort'){
                    return false;
                }
                modalAlert({content:'抱歉，请求知识点失败!'});
            });

    };
    // 2版树
    $scope.showSelected = function(node,selected){
        console.log(node,tree,$scope.selectedNodes);
    };
    $scope.selectedNodes = [];
    // 2版树配置
    $scope.treeOptions = {multiSelection: true};


});
// alert优雅弹框
app.controller('WarningController', function($scope, $modalInstance,data){

    $scope.warning = data.content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});
//大班值守
app.controller("classOnDutyController", function($scope){
    $scope.name = '大班值守';
    $scope.scheduleStatus = 1;
    $scope.enterLargelassroom = function(){
        alert('非上课时间，无大班课！');
    }
})
//答疑
app.controller("answerQuestionsController",function($scope,$http,$controller,$resource, $stateParams, $modal,$state,CalcService){
    $scope.name='答疑';

    var url =  $scope.app.host + "fullTeacher/getStudentAnswerRecordList?requestId=test123456";

    $http.post(url,{

        "teacherCode":"e97e313d9f6f4166b75c4e308529490e",
        "doubtStatus":"0"

    }).success(function(data){
        //console.log(data)
        if(data.message == "Success"){
            $scope.results = data.result;
            //console.log($scope.results.studentAnswerRecord)
        }
    }).error(function(data){
        console.log("fail");
    });

    $scope.answerQuestions = function(ContentPageasd){
        // console.log(ContentPageasd)
        // var ContentPageasd = angular.toJson(ContentPageasd);
        var ContentPageasd = ContentPageasd;
        $state.go("app.teacherOpearteManage.answerQuestionsDetail",{
            ContentPageasd:ContentPageasd
        },{
            reload:true
        });
    }
})
//答疑详情
app.controller("studentWorkDetailController",function($scope,$rootScope,$http,$modal,$stateParams,$controller,$state,CalcService){

    $scope.name='答疑详情';

    var ContentPageasd = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.ContentPageasd != '') {
        ContentPageasd = $stateParams.ContentPageasd;
    }
    //console.log(ContentPageasd)
    var url =  $scope.app.host + "fullTeacher/getStudentAnswerRecordList?requestId=test123456";

    $http.post(url,{
        "teacherCode":"e97e313d9f6f4166b75c4e308529490e",
        "doubtStatus":"0"
    }).success(function(data){
        //console.log(data)
        if(data.message == "Success"){
            $scope.results = data.result;

            //console.log($scope.results.studentAnswerRecord[ContentPageasd])
            $scope.ContentPageasd = $scope.results.studentAnswerRecord[ContentPageasd]
            var BookTreeData = JSON.stringify($scope.ContentPageasd);
            window.localStorage.setItem("BookObj",BookTreeData);
            //callback && callback(data.result);
        }
    }).error(function(data){
        console.log("fail");
    });

    $scope.dumpThisBtn = function(){
        $state.go("app.teacherOpearteManage.answerQuestions")
    };
    // 将节点放到已有json树的合适位置
    function findTreeChild(arr, tmp, isChild){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].ctbCode == tmp.parentCode){
                if(!arr[i].children)arr[i].children = [];
                arr[i].children.push(tmp);
                return true;
            }else if(arr[i].parentCode == tmp.ctbCode){
                tmp.children =[arr[i]];
                arr.splice(i, 1);
                arr.unshift(tmp);
                return true;
            }else if(arr[i].children){
                if(findTreeChild(arr[i].children, tmp, true)){
                    return true;
                }
            }
        }
        if(!isChild){
            arr.push(tmp);
        }
    }

    $scope.addErrorKnown = function () {
        //var BookData = JSON.parse(window.localStorage.getItem("BookObj"));
        //var subjectCode = BookData.subjectCode;
        $http.post($scope.app.host +'/resource/knowledge/tree?requestId=test123456',
            {gradeCode:33,subjectCode:1,booktypeCode:'7HCcMZTzpcThi6RaByWysKQPPbtTHSj8',knowledgeType:"1" }
        ).success(function(data,header,config,status){
                //console.log(data)
                if(!data.code=='Success'){
                    return alert('抱歉，请求知识点失败!');
                }else if(!data.result.datas||data.result.datas.length==0){
                    return alert('未获取到相应知识点!');
                }
                var result = [];
                data.result.datas = data.result.datas.sort(function(a,b){return parseInt(a.level)- parseInt(b.level);});
                for(var i = 0, l = data.result.datas.length; i < l; i++){
                    data.result.datas[i].label = data.result.datas[i].knowledgeName;
                    findTreeChild(result, data.result.datas[i]);
                }
                var scope = $rootScope.$new();
                scope.tree = result;
                var modalInstance = $modal.open({
                    templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
                    size: "lg",
                    scope:scope,
                    resolve: {}
                });
                result = data=null;
            }).error(function(data,header,config,status){
                return alert('抱歉，请求知识点失败!');
            });
    }
    //又拍云服务
    $scope.submit = function(){
        /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
        console.log(date)
        var config = {
            "bucket": 'keepmark', //空间名称
            "expiration": date, //上传请求过期时间
            "save-key":"/img.jpg",
            //"signature" : aaaa
            // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
            form_api_secret: 'WwbrepSiLMoTpx/+D2c+3klosIA='
        };
        var instance = new Sand(config);
        var options = {
            'notify_url': 'http://upyun.com'
        };
        instance.setOptions(options);
        instance.upload('/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + '.jpg');
        console.log(instance.upload)
        //console.log(instance)
    }
    document.addEventListener('uploaded', function(e) {

        $scope.formData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
    });
    //又拍云服务到此
    $scope.dumpThisBtn = function(){

        var BookData = JSON.parse(window.localStorage.getItem("BookObj"));
        var subjectCode = BookData.subjectCode;

        var url =  $scope.app.host + "fullTeacher/addTeacherAnswerDoubtRecord?requestId=test123456";
        var oji = document.getElementById('Booktext').value;
        var resuleGoback = {
            "answerName":BookData.answerName,
            "answerDescribe": oji,
            "answerImgUrl":'answerImgUrl',
            "audioUrl":'audioUrl',
            "sAnswerRecordCode":BookData.eduStudentAnswerRecordCode,
            "studentCode":BookData.studentCode,
            "teacherCode":BookData.teacherCode
        };
        var jsonString = JSON.stringify(resuleGoback);
        $http.post(url,jsonString).success(function(data){
            console.log(data)
            $state.go('app.teacherOpearteManage.answerQuestions');
        }).error(function(data){
            console.log("fail");
        });
    }

})

//知识点树
app.controller("knowledgeTreeController",function($scope,$timeout,$rootScope,$http,$modal,$stateParams,$controller,$state,CalcService){
    var  tree;
    $scope.my_tree_handler = function(branch) {

    };
    $scope.my_data = $scope.tree;
    console.log('-----000------',$scope.tree);
    $scope.my_tree = tree = {};

});
//批改
app.controller("studentWorkCheckedController",['$scope', '$modal',function($scope,$modal){
    $scope.name="批改";
    $scope.addErrorKnown = function () {
        var modalInstance = $modal.open({
            templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
            size: "sm",
            resolve: {
                deps: ['$ocLazyLoad',
                    function( $ocLazyLoad ){
                        return $ocLazyLoad.load('angularBootstrapNavTree');
                    }
                ]
            }
        });
    }
}])
//学生考试
app.controller("studentExamsController", ['$scope', '$modal', function($scope, $modal){
    $scope.name = "学生考试";
    $scope.choiceTestPaper = function(){
        var modalInstance = $modal.open({
            templateUrl: 'admin/teacherOpearteManage/chooseStudent.html',
            size: "lg"
        });
    }
}]);

//选择学生
app.controller("chooseStudentController", function($scope){
    $scope.name = "选择学生";

});

//阶段考判卷--试卷详情
app.controller("stageExamsController", function($scope, $state){
    $scope.name = "阶段考判卷";
    $scope.paperDetail = function(){
        $state.go("app.teacherOpearteManage.paperDetail");
    }
    $scope.paperChecked = function(){
        $state.go("app.teacherOpearteManage.paperDetail");
    }
})

//判卷列表页面
app.controller("paperCheckedController", function($scope, $state){
    $scope.name = "判卷";
    $scope.paperDetail = function(){
        $state.go("app.teacherOpearteManage.paperDetail");
    }
    $scope.paperChecked = function(){
        $state.go("app.teacherOpearteManage.paperDetail");
    }
})
//试卷详情
app.controller()
//诊断监考
app.controller("diagnoseInvigilationController", function($scope){
    $scope.name = "诊断监考";
})
//教辅材料
app.controller("supplementaryMaterialsController", ['$scope', '$modal', function($scope, $modal){
    $scope.name = "教辅材料";
    $scope.pushSupplementary = function(){
        var modalInstance = $modal.open({
            templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
            size: "sm",
            resolve: {
                deps: ['$ocLazyLoad',
                    function($ocLazyLoad){
                        return $ocLazyLoad.load('angularBootstrapNavTree');
                    }
                ]
            }
        });
    }
}])


//教学难点
app.controller("teachingDifficultPointController", function($scope){
    $scope.name = "教学难点";
    var apple_selected, tree, treedata_avm, treedata_geography;
    $scope.my_tree_handler = function(branch){
        var _ref;
        $scope.output = "You selected: " + branch.label;
        if((_ref = branch.data) != null ? _ref.description : void 0){
            return $scope.output += '(' + branch.data.description + ')';
        }
    };
    apple_selected = function(branch){
        return $scope.output = "APPLE! : " + branch.label;
    };
    treedata_avm = [
        {
            label: '1分数乘法',
            children: [
                {
                    label: '分数乘法计算',
                    data: {
                        description: "man's best friend"
                    }
                }, {
                    label: '分数乘法应用题',
                    data: {
                        description: "Felis catus"
                    }
                }
            ]
        },
        {
            label: '2位置与方向',
            children: [
                {
                    label: '位置与方向',
                    children: ['分数乘法应用题', '位置与方向', '位置与方向']
                }, {
                    label: '分数乘法应用题',
                    children: ['分数乘法计算', '分数乘法计算', '分数乘法计算']
                }, {
                    label: '3分数除法',
                    children: [
                        {
                            label: '分数乘法计算',
                            children: ['比', '圆', '百分数', '数学广角']
                        }, {
                            label: '位置与方向',
                            children: ['百分数', '圆', '扇形统计图', '数与形']
                        }
                    ]
                }
            ]
        }
    ];
    treedata_geography = [
        {
            label: '扇形统计图',
            children: [
                {
                    label: '百分数',
                    children: ['比', '数学广角']
                }, {
                    label: '数学广角',
                    children: ['百分数', '数学广角']
                }, {
                    label: 'Mexico',
                    children: ['比', '数学广角']
                }
            ]
        }
    ];
    $scope.my_data = treedata_avm;
    $scope.try_changing_the_tree_data = function(){
        if($scope.my_data === treedata_avm){
            return $scope.my_data = treedata_geography;
        }else{
            return $scope.my_data = treedata_avm;
        }
    };
    $scope.my_tree = tree = {};
    $scope.try_async_load = function(){
        $scope.my_data = [];
        $scope.doing_async = true;
        return $timeout(function(){
            if(Math.random() < 0.5){
                $scope.my_data = treedata_avm;
            }else{
                $scope.my_data = treedata_geography;
            }
            $scope.doing_async = false;
            return tree.expand_all();
        }, 1000);
    };
    return $scope.try_adding_a_branch = function(){
        var b;
        b = tree.get_selected_branch();
        return tree.add_branch(b, {
            label: 'New Branch',
            data: {
                something: 42,
                "else": 43
            }
        });
    };
})