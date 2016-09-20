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
app.controller('myStudentsController', function($scope, $state){
    $scope.name = '我的学生';
    $scope.total_count = 10;
    var id = 1;
    $scope.learningDetail = function(){
        $state.go("app.teacherOpearteManage.learningDetail", {"id": id});
    }

    $scope.answerQuestionsRecord = function(){
        $state.go("app.teacherOpearteManage.answerQuestions", {"id": id});
    }

    $scope.checkMySchedule = function(){
        $state.go("app.teacherOpearteManage.classSchedule", {"id": id});
    }
})


//课程表
app.controller("scheduleController", function($scope, scheduleService, $modal, $stateParams){
    if(typeof($scope.scheduleStatus) === "undefined"){
        $scope.scheduleStatus = $stateParams.scheduleStatus;
    }

    var url = "http://192.168.1.213:8080/keepMark-teacher-business/teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK";
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
    var url = "http://192.168.1.213:8080/keepMark-teacher-business/teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK";
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


//1对1调课
app.controller('oneToOneAdjustCourseController', function($scope, $state){
    $scope.name = "一对一调课";
    var id = 1;
    $scope.checkMySchedule = function(){
        $state.go("app.teacherOpearteManage.classSchedule", {"id": id, "scheduleStatus": "2"});
    }

    $scope.studentSchedule = function(){
        $state.go("app.teacherOpearteManage.classSchedule", {"id": id, "scheduleStatus": "1"});
    }


})

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
    $scope.formData =   {};
    //查询 视频/试卷 列表条件
    var searchCondition = {};

    function makePagination(pageNo,totalPage){
        var p = '<div>';
        if(totalPage>1){
            p+='   <ul class="pagination">';
            var pli='',c= 0,upage=pageNo,lpage=pageNo;
            if(pageNo==1){
                upage=totalPage>5?pageNo+4:totalPage;
            }else if(pageNo>1){
                lpage = pageNo-2>0?pageNo-2:pageNo-1;
                upage = lpage+4;
                upage = upage > totalPage ? totalPage:upage;
            }
            pli +='<li >'+
                '<a href="javascript:void(0);" >首页</a>'+
                '</li>';
            for(var i=lpage;i<=upage;i++){
                pli +='<li >'+
                    '<a href="javascript:void(0);" >上一页</a>'+
                    '</li>';
            }
            pli +='<li >'+
                '<a href="javascript:void(0);" >尾页</a>'+
                '</li>';
            p+='   </ul>';
        }
        p += '</div>';
        return p;
    }

    //获取 视频/试卷 列表
    $scope.getListData = function(page,size,callback){
   

        //callback({totalPage:total||1,currentPage:page});
    };
    $timeout(function(){
        $scope.totalPage = 20;
        $scope.getListData(4,10);
    },3000);
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
        if(searchCondition.listXHR)
            searchCondition.listXHR.resolve('abort');
        searchCondition.listXHR = $q.defer();
        $http.post($scope.app.host +'/resource/knowledge/tree?requestId='+(Math.random()*100),
            {gradeCode:$scope.formData.gradeCode,subjectCode:$scope.formData.subjectCode,booktypeCode:$scope.formData.bookVersionCode},
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
                console.log(result);
            $scope.my_data = result;
            result = data.result.datas=null;
        }).error(function(data,header,config,status){
         //   console.log('error....',data,'header--',header,'cfg--',config,'sts--',status);
            if(status.timeout&&status.timeout.$$state.value=='abort'){
                return false;
            }
            modalAlert({content:'抱歉，请求知识点失败!'});
        });



    };
        //	tree.expand_all()
    //选择知识点操作
    $scope.my_tree_handler = function(node){
        $scope.formData.knowledge = {ctbCode:node.ctbCode,knowledgeName:node.knowledgeName};
        if(node&&!node.children||node.children.length == 0){
            $scope.formData.knowledge.isLeaf = true;
            searchCondition.subjectCode = $scope.formData.subjectCode;
            searchCondition.gradeCode = $scope.formData.gradeCode;
            searchCondition.booktypeCode = $scope.formData.bookVersionCode;
            searchCondition.knowledge = $scope.formData.knowledge;
            console.log(searchCondition)
            $scope.totalPage = 20;
            $scope.getListData(1,10);
        }else{
            $scope.formData.knowledge.isLeaf = false;
        }

    }
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
app.controller("answerQuestionsController", function($scope, $state){
    $scope.name = '答疑';

    $scope.answerQuestions = function(){
        $state.go("app.teacherOpearteManage.answerQuestionsDetail");
    }
})
//答疑详情
app.controller("studentWorkDetailController", ['$scope', '$modal', function($scope, $modal){
    $scope.name = '答疑详情';
    $scope.addErrorKnown = function(){
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
//批改
app.controller("studentWorkCheckedController", ['$scope', '$modal', function($scope, $modal){
    $scope.name = "批改";
    $scope.addErrorKnown = function(){
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

//知识点树
app.controller("knowledgeTreeController", function($scope, $timeout){
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