'use strict';

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
       // console.log(data)
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
    $scope.checkMySchedule = function(student){
        var studentSchedule = {
            "scheduleStatus":"1",
            "studentCode":student.code,
            "goalType":student.goalType,
            "artsType":student.artType
        };
        $state.go("app.teacherOpearteManage.classSchedule",{"mySchedule":JSON.stringify(studentSchedule)});
    }
});

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
    var url = $scope.app.host+"";//路径拼接未完成
    $http.post(url,{
        "teacherCode":""
    }).success(function(data){
        console.log(data);
        if(data.message=="Success"){
            $scope.studyres = data.result;
        }
    }).error(function(data){
        console.log("fail");
    })

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
app.controller('autonmousPushResourcesController', function($scope,$rootScope,$http,$localStorage, $controller,$q, $timeout,$modal, CalcService){

    $controller('ParentGetDataCtrl', {$scope: $scope}); //继承
    $scope.name = "自主推送学习资源";

    // 教师自己的code(需后期登录改成活的)
    $scope.teacherCode = $localStorage.user.code; //'e44a0c2ad33a40d1a9c54bf4e801c227';
    var myData = $localStorage.user;

    //待定
    $scope.paperType = [];
    $scope.studentsShow = false;
    var baseHost = $scope.app.host; //'http://192.168.1.156:8090/'; //'http://192.168.1.102:8080/keepMark-teacher-business/';//$scope.app.host;
    $scope.questionTypes=[]; //试题类型
    $scope.nowQuestionType = null; //当前试题类型
    $scope.selectedQuestions = []; // 已选择试题
    $scope.choosedStudents = []; // 已选择学生
    $scope.questionDatas = {list:[]}; // 试题列表初始化
    $scope.myStudents = []; // 初始化我的学生列表
    var finishedPaper = null; // 组装好的试卷
    // 添加试题
    $scope.questionAdd = function(question,subjectCode){
        if(subjectCode !=searchCondition.subjectCode){ // 非bug用不到
            return modalAlert({content:'当前试题和科目不匹配!'});
        }
        question.added = true;
        angular.forEach( $scope.questionDatas.list,function(t){
            if(t.id==question.id){
                t.added = true;
                return true;
            }
        });

        $scope.selectedQuestions.push({typeId:question.enlargeId,
            id:question.id,
            knowledgeCode:searchCondition.paperKnowledge.ctbCode,
            knowledgeName:searchCondition.paperKnowledge.knowledgeName});
    };
    //预处理试题
    function preDealQuestions(qList){
        angular.forEach(qList,function(t,i){
            angular.forEach($scope.selectedQuestions,function(tt,ii){
                if(tt.id== t.id){
                    t.added = true;
                    return false;
                }
            });
            if(t.type==6){
                angular.forEach(t.Subtitle,function(ttt,iii){
                    try{
                        ttt.quesOption = angular.fromJson(ttt.quesOption);
                        ttt.quesAnalyze = angular.fromJson(ttt.quesAnalyze);
                    }catch(e){
                        ttt.quesOption = [];
                        ttt.quesAnalyze = [];
                    }
                });
            }else if(t.type == 1|| t.type==2|| t.type==3){
                try{
                    t.quesOptionJ = angular.fromJson(t.quesOption);
                    t.quesAnalyzeJ = angular.fromJson(t.quesAnalyze);
                }catch(e){
                    t.quesOptionJ = [];
                    t.quesAnalyzeJ = [];
                }
            }
        });
    }

    //选择推送学生
    $scope.chooseStudents = function(){
        $scope.studentsShow = !($scope.studentsShow);
        if($scope.myStudents.length>0)return false;
        if(searchCondition.listsXHR)
            searchCondition.listsXHR.resolve('abort');
        searchCondition.listsXHR = $q.defer();
        $http.post(baseHost+'fullTeacher/getMyStudentList?requestId='+Math.random(),
            {
                "teacherCode": myData.code
            }
        ).success(function(b){
                if(b.code=='Success'&& b.result){
                    if(b.result.length==0){
                        modalAlert({content:'未获取到您的学生!'});
                    }else{
                        $scope.myStudents = b.result;
                    }
                }else{
                    modalAlert({content:'抱歉，请求获取学生列表失败!'});
                }
            }).error(function(data,header,config,status){
                if(status.timeout&&status.timeout.$$state.value=='abort'){
                    return false;
                }
                modalAlert({content:'抱歉，请求获取学生列表失败!'});
            });
    };
    //选择或者取消学生选择
    $scope.toggleStudent = function(s){
        for(var i=0;i<$scope.choosedStudents.length;i++){
            if($scope.choosedStudents[i].code== s.code){
                $scope.choosedStudents.splice(i,1);
                return false;
            }
        }
        $scope.choosedStudents.push(s);
    };
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
    };

    $scope.isActiveTab = function(tabUrl){
        return tabUrl == $scope.currentTab;
    };
    /* $scope.dedepartmentType=[];
     $scope.category=[];
     $scope.bookVersion=[];*/
    //初始化学科学年学段教材
    CalcService.filterData().then(function(data){
        $scope.formData.gradeCode = data.filterData[0].gradeCode;
        //    $scope.dedepartmentType = data.filterData;
        //    $scope.category = $scope.dedepartmentType[0].category;
        //    $scope.bookVersion = $scope.dedepartmentType[0].category[0].bookVersion;
        $scope.formData.departmentType = 1;
        $scope.formData.subjectCode = 1;
        initQuestionTypes();
    });
    //初始化试卷类型
    function initQuestionTypes(){
        CalcService.getQuestionTypes($scope.formData.subjectCode).then(function(data){
            if(typeof data=='object'){
                $scope.questionTypes = data;
                $scope.nowQuestionType = data.types[0].id;
            }else
                modalAlert({content:'获取试题类型出错!'});
        });
    }

    $scope.my_data = []; // 知识树数据

    // 学年类型学科教材被选中项
    $scope.formData =   {knowledge:[]};
    //查询 视频/试卷 列表条件
    var searchCondition = angular.copy($scope.formData);
    $scope.pagination = []; // 分页列表
    // 视频列表
    $scope.videos = [];
    //被选中的视频列表
    $scope.selectedVideos = [];
    //视频列表多选框选择
    $scope.toggleSelectVideo = function(knowledge,video){
        for(var i= 0,l=$scope.selectedVideos.length;i<l;i++){
            if($scope.selectedVideos[i].treeNodeCode == knowledge.knowledge){
                for(var j=0;j<$scope.selectedVideos[i].pushResourcesDtos.length;j++){
                    if($scope.selectedVideos[i].pushResourcesDtos[j].resourcesCode==video.id){
                        $scope.selectedVideos[i].pushResourcesDtos[j].splice(j,1);
                        if($scope.selectedVideos[i].pushResourcesDtos.length==0){
                            $scope.selectedVideos[i].splice(i,1);
                        }
                        return false;
                    }
                }
                $scope.selectedVideos[i].pushResourcesDtos.push({
                    "repositoryTreeCode":knowledge.knowledge,
                    "resourcesCode":video.id,
                    "resourcesType":"1",
                    "repositoryTreeName":knowledge.knowledgeName,
                    "resourcesName":video.videoName
                });
                return false;
            }
        }
        $scope.selectedVideos.push({treeNodeCode:knowledge.knowledge,treeNodeName:knowledge.knowledgeName,
            pushResourcesDtos:[
                {"repositoryTreeCode":knowledge.knowledge,
                    "resourcesCode":video.id,
                    "resourcesType":"1",
                    "repositoryTreeName":knowledge.knowledgeName,
                    "resourcesName":video.videoName
                }
            ]});
    };
    //试题列表
    $scope.papers = [];
    //组装分页
    function makePagination(pageNo,totalPage){
        var arr=[], upage=pageNo,lpage=pageNo,showIndexs= 5,half = parseInt(showIndexs/2);
        if(totalPage>1){
            if(pageNo==1){
                upage=totalPage>showIndexs?pageNo+showIndexs-1:totalPage;
            }else if(pageNo>1){
                upage = totalPage-pageNo > half ? pageNo+half:totalPage;
                lpage = upage -showIndexs > 0 ? upage-showIndexs+1 :1;
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
    // 视频列表
    $scope.getVideoList= function (){
        if(searchCondition.listsXHR)
            searchCondition.listsXHR.resolve('abort');
        searchCondition.listsXHR = $q.defer();
        var ks = [];
        angular.forEach($scope.selectedNodes,function(t,i){
            ks.push(t.ctbCode);
        });
        if(ks.length==0)return modalAlert({content:'请至少选择一个知识点!'});
        $http.post(baseHost+'resource/get/videos?requestId='+Math.random(),
            {
                "gradeCode":searchCondition.gradeCode,
                "subjectCode":searchCondition.subjectCode,
                "knowledges": ks
            },
            {timeout:searchCondition.listsXHR.promise}
        ).success(function(b){
                if(b.code=='Success'){
                    $scope.videos = b.result;
                }else{
                    modalAlert({content:'抱歉，请求树失败!'});
                }
            }).error(function(data,header,config,status){
                if(status.timeout&&status.timeout.$$state.value=='abort'){
                    return false;
                }
                modalAlert({content:'抱歉，请求树失败!'});
            });
    };
    //试题列表
    $scope.getQuestionList= function (page,ex){
        if(ex=="activee"||ex=="disabled")return false;
        if(!searchCondition.paperKnowledge)return modalAlert({content:'请先选择知识点!'});
        if(!searchCondition.old)page=1;searchCondition.old=true;
        page = page||1;
        if(searchCondition.questionlistXHR)
            searchCondition.questionlistXHR.resolve('abort');
        searchCondition.questionlistXHR = $q.defer();
        $http.post(baseHost+'resource/get/questions?requestId='+Math.random(),
            {
                "gradeCode":searchCondition.gradeCode,
                "subjectCode":searchCondition.subjectCode,
                "knowledgeCode":searchCondition.paperKnowledge.ctbCode,
                "pageNum":page,
                "pageSize":"10 ",
                "type":$scope.nowQuestionType
            },
            {timeout:searchCondition.questionlistXHR.promise}
        ).success(function(b){
                if(b.code=='Success'&& b.result&& b.result.datas&& b.result.datas.data){
                    preDealQuestions(b.result.datas.data);
                    b.result.datas.subjectCode = searchCondition.subjectCode;
                    $scope.questionDatas = b.result.datas;
                    $scope.pagination=makePagination(parseInt(b.result.datas.pageNum),parseInt(b.result.datas.pages));
                }else{
                    modalAlert({content:'没用符合条件的试题!'});
                }
            }).error(function(data,header,config,status){
                if(status.timeout&&status.timeout.$$state.value=='abort'){
                    return false;
                }
                modalAlert({content:'抱歉，请求获取卷子列表失败!'});
            });
    };
    //将已选择的题组合成试卷
    $scope.packagePaper = function(){
        var paperModal =  $modal.open({
            templateUrl: 'admin/teacherOpearteManage/autonomousPushResourcesPaper.html',
            controller: 'AutoPushResourcePaperController',
            size:'lg',
            resolve:{
            }
        });
        paperModal.result.then(function(result){
            result.questions = $scope.selectedQuestions;
            finishedPaper = result;
        });
    };
    //推送学习资源
    $scope.pushSource = function(){
        if(searchCondition.pushingData)return false;
        var pushData;
        searchCondition.pushingData = true; // 禁止再次发送
        if($scope.currentTab=='video.tpl.html'){ //视频
            pushData ={
                subjectCode:searchCondition.subjectCode,
                teacherCode:myData.code, //'ce70fe795fd040328061a548862d7918',
                teacherName:myData.name, //'章子怡',
                aimType:1,// TODO 以后从老师信息里拿
                burls:$scope.selectedVideos,
                studentCode:[]
            };
            angular.forEach($scope.choosedStudents,function(t){
                pushData.studentCode.push(t.code);
            });
          //  console.log('selected videos-- ',$scope.selectedVideos,'-- students --' ,$scope.choosedStudents,pushData);

            pushResource(pushData);
        }else{ //试卷
            if(!finishedPaper){
                return modalAlert({content:'请先组合一份试卷!'});
            }else if(finishedPaper.questions.length==0){
                return modalAlert({content:'请至少选择一道题!'});
            }else{
                console.log('推送试卷了...',finishedPaper,$localStorage.user);
            }
            var makePaper = {
                "questions":[],
                "gradeCode":$scope.departmentType[0].gradeCode,
                "subjectCode":searchCondition.subjectCode,
                "aimType": 1, // TODO 以后从老师信息里拿
                "departmentType":searchCondition.departmentType,
                "name":finishedPaper.paperName,
                "description":finishedPaper.paperDesc,
                "examTimeLong":finishedPaper.time
            };
            angular.forEach(finishedPaper.questions,function(t){
                makePaper.questions.push(t.id);
            }); // 'http://192.168.1.156:8090/'
            $http.post(baseHost+'fullTeacher/createPaperByQuestions?requestId='+Math.random(),makePaper)
                .then(function(data){
                   if(data.data&&data.data.code=='Success'){
                        console.log("组卷back...", data.data);
                        var  pushData ={
                            subjectCode:searchCondition.subjectCode,
                            teacherCode:myData.code, //'ce70fe795fd040328061a548862d7918',
                            teacherName:myData.name, //'章子怡',
                            aimType:1, // TODO 以后从老师信息里拿
                            burls: [{
                                "pushResourcesDtos":[
                                    {
                                        "resourcesCode":data.data.result,
                                        "resourcesType":"0",
                                        "resourcesName":makePaper.name
                                    }
                                ]}],
                            studentCode:[]
                        };
                       angular.forEach($scope.choosedStudents,function(t){
                           pushData.studentCode.push(t.code);
                       });
                       pushResource(pushData);
                   }else{
                       modalAlert({content:'抱歉组卷失败!'});
                       searchCondition.pushingData = false;
                   }
                });
        }
    };
    // 推送资源
    var pushResource = function(pushData){ // 'http://192.168.1.156:8090/'
        $http.post(baseHost+'fullTeacher/pushVedioOrPaperToStudents?requestId='+Math.random(),pushData)
            .then(function(b){
                if(b.data&& b.data.code=="Success"){
                    modalAlert({content:'资源推送成功!'});
                    angular.forEach($scope.selectedQuestions,function(t){
                        t.added = false;
                    });
                    finishedPaper = null; // 清理试卷
                    $scope.selectedQuestions = []; // 清空已选试题
                }else{
                    modalAlert({content:'抱歉!资源推送失败!'});
                }
                searchCondition.pushingData = false;
            });
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
        if(searchCondition.subjectCode != $scope.formData.subjectCode){
            finishedPaper = null; // 只能单学科组卷-清空已组试卷
            $scope.selectedVideos = []; // 只能单学科发送视频-清空已选视频
            $scope.selectedQuestions = []; // 只能单学科发送试卷-清空已选试题避免混合科目发送
            $scope.questionDatas = {list:[]}; //清空当前试题列表
            $scope.pagination = []; // 分页清空
            $scope.videos = []; // 清空视频列表
        }
        $scope.selectedNodes = []; // 清空已选的视频知识点
        searchCondition.paperKnowledge = {};// 清空已选的试题知识点
        searchCondition.subjectCode = $scope.formData.subjectCode;
        searchCondition.departmentType = $scope.formData.departmentType;
        searchCondition.gradeCode = $scope.formData.gradeCode;
        searchCondition.bookVersionCode = $scope.formData.bookVersionCode;

        if(searchCondition.KlistXHR)
            searchCondition.KlistXHR.resolve('abort');
        searchCondition.KlistXHR = $q.defer();
        $http.post(baseHost +'resource/knowledge/tree?requestId='+(Math.random()*100),
            {gradeCode:$scope.formData.gradeCode,subjectCode:$scope.formData.subjectCode,booktypeCode:$scope.formData.bookVersionCode,knowledgeType:1},
            {timeout:searchCondition.KlistXHR.promise}
        ).success(function(data,header,config,status){
                if(!data.code=='Success'){
                    return modalAlert({content:'抱歉，请求知识点失败!'});
                }else if(!data.result.datas||data.result.datas.length==0){
                    return modalAlert({content:'未获取到相应知识点!'});
                }
                var result = [];
                data.result.datas = data.result.datas.sort(function(a,b){return parseInt(a.level)- parseInt(b.level);});
                for(var i = 0, l = data.result.datas.length; i < l; i++){
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
        initQuestionTypes();
    };
    // 试题知识点选择
    $scope.showSelected = function(node,selected){
        // 查询试题时 old = false ,强制页码为1
        searchCondition.paperKnowledge={ctbCode:node.ctbCode,old:false,knowledgeName:node.knowledgeName};
    };
    //视频知识树被选中节点
    $scope.selectedNodes = [];
    // 知识树配置
    $scope.videoTreeOptions = {
        multiSelection: true,
        dirSelectable:false
    };
    // 试题树配置
    $scope.paperTreeOptions = {
        multiSelection: false,
        dirSelectable:false
    };


});
// alert优雅弹框
app.controller('WarningController', function($scope, $modalInstance,data){

    $scope.warning = data.content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});
// 自主推送学习资源 组卷卷头弹框
app.controller('AutoPushResourcePaperController', function($scope, $modalInstance){

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.ok = function () {
        $modalInstance.close({paperName:$scope.paperName,paperDesc:$scope.paperDesc,time:$scope.useTime});
    };
});


//大班值守
app.controller("classOnDutyController", function($scope,$controller,$http,scheduleService){
    $controller("getSchoolInfo",{$scope:$scope});
    $scope.name = '大班值守';
    $scope.scheduleStatus = 1;
    var host = $scope.app.host;

    $scope.getTeacherSOnDutyList = function(weekTimeCode){
        if(typeof(weekTimeCode) !== "undefined"){
            var parameters = {
                "weekTimeCode":weekTimeCode,
                "ownerCode":"12"
            };
            var url = host +"teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK3";
            scheduleService.getScheduleList(url,parameters).then(function(data){
                if(data.result !== null) {
                    $scope.courses = data.result.sections;

                }else{
                    alert("此老师没有课表！");
                    $scope.courses="";
                }
            });
        }
    };
    $scope.enterLargelassroom = function(){
        alert('非上课时间，无大班课！');
    };
});
//答疑
app.controller("answerQuestionsController",function($scope,$http,$controller,$resource, $stateParams, $modal,$state,CalcService){
    $scope.name='答疑';

    var url =  $scope.app.host + "fullTeacher/getStudentAnswerRecordList?requestId=test123456";

    $http.post(url,{
        "teacherCode":"e44a0c2ad33a40d1a9c54bf4e801c227",
        "doubtStatus":"0"
    }).success(function(data){
        console.log(data)
        if(data.message == "Success"){
            $scope.studentCount = data.result.studentCount;
            $scope.notStudentCount = 30- $scope.studentCount;
            //接口说这个地方要改：doAnswerCount 变成 notAnswerCount ；目前还没改，接口改完后我再改
            $scope.doAnswerCount = data.result.doAnswerCount;
            $scope.answerCount = data.result.answerCount;
            $scope.notAnswerCount = $scope.answerCount - data.result.doAnswerCount;

            $scope.results = data.result.studentAnswerRecord;
            //console.log(data.result.studentAnswerRecord);
            //console.log($scope.results.studentAnswerRecord)
        }
    }).error(function(data){
        console.log("fail");
    });

    $scope.answerQuestions = function(ContentPageasd){

       //var ContentPageasd = angular.toJson(ContentPageasd);
        var eduStudentAnswerRecordCode = ContentPageasd.eduStudentAnswerRecordCode;
        var studentCode= ContentPageasd.studentCode;
        var ContentPageasd = "";
        if(eduStudentAnswerRecordCode!='' && studentCode!=''){
            ContentPageasd = eduStudentAnswerRecordCode+","+studentCode;
        }
        //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$'+ContentPageasd);

        $state.go("app.teacherOpearteManage.answerQuestionsDetail",{
            ContentPageasd:ContentPageasd
        },{
            reload:true
        });
        //$state.go('app.teacherOpearteManage.answerQuestionsDetail',{"ContentPageasd":JSON.stringify(ContentPageasd)});
    }
})
//答疑详情
app.controller("studentWorkDetailController11",function($scope,$http,$stateParams){

    $scope.name='答疑详情';
    var contentPageasd = null;
    var doubtCode ;
    var studentCode ;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.ContentPageasd != '') {
        contentPageasd = $stateParams.ContentPageasd;
        contentPageasd = contentPageasd.split(',');
        doubtCode = contentPageasd[0];
        studentCode = contentPageasd[1];
    }
   console.log(doubtCode);
    console.log(studentCode);
    //测试调用接口
    //var url =  $scope.app.host + "fullTeacher/getStudentAnswerRecordList?requestId=test123456";
    //$http.post(url,{
    //        "teacherCode":"e44a0c2ad33a40d1a9c54bf4e801c227",
    //        "doubtStatus":"0"
    //})
    //正式调用接口
    var url =  $scope.app.host + "fullTeacher/getStudentAnswerRecordDetails?requestId=test123456";
    $http.post(url,{
        "doubtCode":doubtCode,
        "studentCode":studentCode
    }).success(function(data){
        console.log(data);
        if(data.message == "Success"){
            //$scope.results = data.result;
            //$scope.studentAnswerRecord = data.result.studentAnswerRecord;
            //console.log( $scope.studentAnswerRecord);
            //angular.forEach($scope.studentAnswerRecord,function(data,index){
            //
            //});

            $scope.ContentPageasd = data.result;
            $scope.answerImgUrls = angular.fromJson(data.result.answerImgUrl); //将string 变成 数组，data.result.answerImgUrl是string
            console.log( $scope.answerImgUrls)
            //var BookTreeData = JSON.stringify($scope.ContentPageasd);
            //window.localStorage.setItem("BookObj",BookTreeData);
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

    //添加错误的知识点
    $scope.addErrorKnown = function () {
        //var BookData = JSON.parse(window.localStorage.getItem("BookObj"));
        //var subjectCode = BookData.subjectCode;
        //弹窗
        var modalInstance = $modal.open({
            templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
            controller:'knowledgeTreeController',
            size: 'lg',
            resolve: {
                host : function() {
                    return $scope.app.host;
                }
            }
        });
        //展示选中的知识点
        modalInstance.result.then(function (results) {
            $scope.records=results;
            //console.log('````````````',$scope.records);
        })
    }
    //又拍云服务
    $scope.submit = function(){
        /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        alert(22)
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
        alert(33)
        instance.upload('/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + '.jpg');
        alert(4)
        console.log(instance.upload)
        //console.log(instance)
    }

   /* document.addEventListener('uploaded', function(e) {
        $scope.formData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
    });*/
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
app.controller("knowledgeTreeController",function($scope,$http,$modalInstance,host){
    var  tree;
    // 将json串解析成tree结构(将节点放到已有json树的合适位置)
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

    //树选项设置
    $scope.videoTreeOptions = {
        multiSelection: true,  //多选
        dirSelectable:false   //点击文字是否可以展开下一层树
    };
    //选中的节点
    $scope.selectedNodes=[];
    //console.log("***********"+ $scope.selectedNodes);

    //$scope.showSelections = function(node,selected){
    //    $scope.selectedNodes.append(node.knowledgeName+ (selected?" selected":" deselected") );
    //};
    //树内容
    //console.log(host);
    var url = host +'/resource/knowledge/tree?requestId=test123456';
    $http.post(url,
        {gradeCode:33,subjectCode:1,booktypeCode:'7HCcMZTzpcThi6RaByWysKQPPbtTHSj8',knowledgeType:"1" }
    ).success(function(data,header,config,status){
        //console.log(data)
        if(!data.code =='Success'){
            return alert('抱歉，请求知识点失败!');
        }else if(!data.result.datas||data.result.datas.length==0){
            return alert('未获取到相应知识点!');
        }
        //将接口数据渲染为tree结构 start
        var result = [];
        data.result.datas = data.result.datas.sort(function(a,b){return parseInt(a.level)- parseInt(b.level);});
        for(var i = 0, l = data.result.datas.length; i < l; i++){
            findTreeChild(result, data.result.datas[i]);
        }
        $scope.my_data = result;
        //end
    }).error(function(data,header,config,status){
        return alert('抱歉，请求知识点失败!');
    });

    //关闭弹窗
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //将选中的知识点传回答疑详情页面
    $scope.ok = function () {
        //$scope.selectedNodes.push()
        $modalInstance.close($scope.selectedNodes);
    };
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
app.controller("diagnoseInvigilationController", function($scope,$http,$localStorage,$modal,$q,CalcService){
    $scope.name = "诊断监考";
    var temp={}; // 临时变量存放
    temp.preEnterLiveRoom = 10*60*1000; //  提前10分钟进入直播间
    $scope.mayEnter =  null; // 可进入直播间的时间段数据
    $scope.timeContents = {am:[],pm:[],empty:null}; //某一天的课程安排列表
    var baseHost = $scope.app.host;
    var myData = $localStorage.user;
    CalcService.filterData().then(function(b){
       $scope.allSubjectTypes = b.filterData;
    });
    // 选择日期
   $scope.$watch('dt',function(){
       if($scope.dt==null)return false;
        getDateCourses();
   });
    //预处理时间段列表
    var preDealTimeContents = function(list){
        $scope.timeContents = {am:[],pm:[],empty:null};
        if(list.length==0){
            $scope.timeContents.empty=true;
            return false;
        }
        $scope.timeContents.empty=false;
        angular.forEach(list,function(t,i){
            var start = moment(t.edgdExamStartDate);
            var po = 'am';
            if(po=='am'&&start.hour()>12){
                po = 'pm';
            }
            if(moment().diff(start) > -temp.preEnterLiveRoom&&moment().diff(moment(t.edgdExamEndDate))<0){
                $scope.mayEnter = t;
            }
            t.index = i+1;
            $scope.timeContents[po].push(t);
        });

       /* 测试时放开 $scope.mayEnter = list[0];*/
    };
    //获取某一天课程
    var getDateCourses = function(){
        if(temp.DateCoursesXHR)temp.DateCoursesXHR.resolve('abort');
        temp.DateCoursesXHR = $q.defer();
        $http.post(baseHost+'fullTeacher/getTeacherDiagnosisExaminationList?requestId='+Math.random(),
            {
                "teacherCode":myData.code, // 'a',
                "lessonDate":moment($scope.dt).format('YYYY-MM-DD')
            },
            {timeout:temp.DateCoursesXHR.promiss}
        ).success(function(b){
            if(b.code=='Success'){
                preDealTimeContents(b.result);
            }else{
                modalAlert({content:'请求时间安排出错!'});
            }
        }).error(function(data,header,config,status){
                if(status.timeout&&status.timeout.$$state.value=='abort'){
                    return false;
                }
            modalAlert({content:'请求时间安排出错!'});
        });
    };
    //进入直播室
    $scope.enterLiveRoom = function(){
        if(!$scope.mayEnter)return modalAlert({content:'时间还没到哦!'});
        var subjects = $scope.allSubjectTypes[$scope.mayEnter.subjectType];
        if(!subjects)return modalAlert({content:'抱歉，数据异常!'});
        var room =  $modal.open({
            templateUrl: 'admin/teacherOpearteManage/enterLiveRoom.html',
            controller: 'EnterLiveRoomController',
            size:'lg',
            resolve:{ // $scope.mayEnter
                data:function(){
                    return {
                        teacherCode:myData.code,
                        baseHost:baseHost,
                        subjects:subjects.category,
                        temp:{
                            eduDiagnosisGoodsCode:$scope.mayEnter.eduDiagnosisGoodsCode, //诊断商品code
                            eduDiagnosisGoodsDetailCode:$scope.mayEnter.eduDiagnosisGoodsDetailCode //诊断商品详情code
                        },
                        nickName:myData.name};
                }
            }
        });
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
});
// 诊断监考--进入课堂
app.controller('EnterLiveRoomController',function($scope, $modalInstance,$http,$modal, data){
    $scope.loading = true;
    $scope.loadingMsg = '网速有点慢，请耐心等待一会...';
    $scope.nowTime = new Date();
    $scope.subjects = data.subjects; // 所有学科
     $scope.subjectCode = data.subjects[0].subjectCode; //  被选中学科
    $scope.geenses = {};
    $scope.myStudents = [];
    //获取所有学生 http://192.168.1.142:8080/
    $http.post(data.baseHost+'fullTeacher/invigilator/getUserList?requestId=test123',
        {
            "eduDiagnosisGoodsDetailCode":data.temp.eduDiagnosisGoodsDetailCode, // 1
            "eduDiagnosisGoodsCode":data.temp.eduDiagnosisGoodsCode  // "0A6E061EDB2B4AAC864FDAB787EB17C8"
        }
    ).then(function(re){
            if(re.data&&re.data.code=="Success"){
                $scope.myStudents = re.data.result;
            }else{
                modalAlert({content:'请求学生列表失败!'});
            }
        });
    //获取展示互动地址
    var getURL = function(){
        // http://192.168.1.142:8080/
        $http.post(data.baseHost+'fullTeacher/enter/invigilator?requestId='+Math.random(),
            {
                "teacherCode":data.teacherCode, // "6ed3cf000fa84d6e947f37dc9fe347b5"
                "diagnosisGoodsDetailCode":data.temp.eduDiagnosisGoodsCode // "416E26FEF5724F7887C8EC2522F68029"
            }
        ).success(function(data){
            if(data.code=='Success'){
                markUrl(data.result);
            }else{
                $scope.loadingMsg = '请求直播间失败!';
            }
        }).error(function(){
                $scope.loadingMsg = '请求直播间失败!';
        });
    };
    //混淆url地址
    var markUrl = function(geen){
        $http.get(geen.geesenModel.teacherJoinUrl+"?nickname="+encodeURIComponent(data.nickName)+"&token="+geen.geesenModel.teacherToken+"&type=jsonp&jsonpcallback=j"
        ).success(function(b){
                try{
                    var  result = angular.fromJson(b.substring(b.indexOf("(") + 1, b.lastIndexOf(")")));
                    $scope.geenses = result;
                    $scope.downloadClient = result.download;
                    $scope.loading = false;
                }catch(e){
                    $scope.loadingMsg = '请求直播间失败!';
                }
            }).error(function(){
                $scope.loadingMsg = '请求直播间失败!';
            });
    };
    getURL();
    // 进入课堂
    $scope.enterRoom = function(){
        window.open($scope.geenses.protocol+'://'+$scope.geenses.code);
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
    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
    //切换学科改变checkbox状态
    $scope.changeCheckStat = function(subjectCode){
        $scope.subjectCode = subjectCode;
    };
    //发送试卷
    $scope.sendPaper = function(){
        var sendable = [];
        angular.forEach($scope.myStudents,function(t){
            if(!t['check'+$scope.subjectCode]&& t.checked){
                sendable.push(t.studentCode);
            }
        });

        if(sendable.length==0){return modalAlert({content:'无未发送过的学生'})}
        angular.forEach($scope.myStudents,function(t){ // 设置学科checked状态
            t['check'+$scope.subjectCode]=true;
        });
        $http.post(data.baseHost+'fullTeacher/push/paper?requestId=test12345',
            {
                "teacherCode":data.teacherCode,  // '6ed3cf000fa84d6e947f37dc9fe347b5',
                "diagnosisGoodsDetailCode":data.temp.eduDiagnosisGoodsCode, //  "416E26FEF5724F7887C8EC2522F68029",
                "subject":$scope.subjectCode,
                "studentCodeList":sendable
            }
        )
            .then(function(b){
                if(b.data&& b.data.code=="Success"||true){
                    modalAlert({content:'发送成功!'});
                    angular.forEach($scope.myStudents,function(t){ // 设置学科checked状态
                        t['check'+$scope.subjectCode]=true;
                    });
                }else{
                    modalAlert({content:'发送失败!'});
                }
            })
    };
    //点击checkbox时
    $scope.toggleStudent = function(st){
        if(st['check'+$scope.subjectCode]){
            st.checked = true;
        }
    }
});
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