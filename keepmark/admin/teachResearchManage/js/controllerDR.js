/*学生分类-目标 */
app.controller('StudentCategoryCtrlDR', function($scope, $http, $resource, $stateParams, $modal, $state,$controller,CalcService) {
    //根据类型、地区、总分数、单科学科 查询列表
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    var dataMap=new Map();
    var dataStuString="";
    $scope.depSel= function(val){
        if( dataMap.get("departmentType")==val){
            return true;
        }else{
            return false;
        }
    };
    $scope.conditionSel= function(val,type){
        if(type=="departmentType" && val==1){
            $("#studentCategory-div").find(".sub-arts").hide();$(".sub-science").show();
        }else if(type=="departmentType" && val==0){
            $("#studentCategory-div").find(".sub-arts").show();$(".sub-science").hide();
        }

        dataMap.remove(type);
        dataMap.put(type,val);
        $scope.getStudentCategoryList();
    };
    $scope.totalScore= function(val,type){
        dataMap.remove(type);
        dataMap.put(type,val);
        $scope.getStudentCategoryList();
    };

    //单科
    $scope.x = false; //默认未选中
    $scope.checkSub = function(z, x) { //单选或者多选

        if (x == true) { //选中
            dataMap.put(z,$("#"+z).val());
        } else {
            dataMap.remove(z);//取消选中
        }
        $scope.getStudentCategoryList();
    };
    //目标类型
    $scope.getAimType = function(val) {
        dataMap.remove("aimType");
        dataMap.put("aimType",val);
        $scope.getStudentCategoryList();
    };
    //地区
    $scope.areaSel = function(val) {
        if(typeof(val) !== "undefined") {
            dataMap.remove("areaCode");
            dataMap.put("areaCode", val);
            $scope.getStudentCategoryList();
        }
    };

    $scope.dataStr = function(){
        dataMap.remove("bookVersionCode");
        dataMap.put("bookVersionCode","1");
        dataStuString="{";
        for (var  i = 0; i < dataMap.elements.length; i++) {
            dataStuString+="'"+dataMap.elements[i].key+"':"+"'"+dataMap.elements[i].value+"'";
            if(i!=dataMap.elements.length-1){
                dataStuString+=",";
            }
        }
        dataStuString+="}";
        console.log(dataStuString);
//        $scope.getStudentCategoryList();
    };

    //获取地区列表
    $scope.loadStuAreaList = function() {
        $http.post($scope.app.host + '/area/allProvince?requestId=test123456', "").success(function (data) {
            $scope.areaResults = data.result;
        });
        $scope.load();
    };
    $scope.getStudentCategoryList = function(page,size,callback){
        if(page!=null && page!=undefined && size!=null && size!=undefined){
            dataMap.remove("currentPage");
            dataMap.put("currentPage",page);
            dataMap.remove("pageSize");
            dataMap.put("pageSize",size);
        }
        $scope.dataStr();

        $http.post($scope.app.host +"/shortSlab/getStudentClassifyList?requestId=test123456",
            strToJson(dataStuString)
        ).success(function (data) {
                $scope.list = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
                if(dataMap.get("departmentType")==0){
                    $(".sub-science-tr").hide();
                    $(".sub-arts-tr").show();
                }
            });
    };
    function strToJson(str){
        var json = (new Function("return " + str))();
        return json;
    }
    //全选
    $scope.tesarry = ['1', '2', '3']; //初始化数据
    $scope.choseArr = []; //定义数组用于存放前端显示
    var str = ""; //
    var flag = ''; //是否点击了全选，是为a
    $scope.x = false; //默认未选中

    $scope.checkAll = function(c, v) { //全选
        if (c == true) {
            $scope.x = true;
            var entities=$("#studentCategory-div input[type=checkbox][name=check-entities]");
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                $scope.choseArr.push(entity.id);
            }
//            $scope.choseArr = v;
        } else {
            $scope.x = false;
            $scope.choseArr = [""];
        }
        flag = 'a';
        console.log($scope.choseArr);
    };
    $scope.chk = function(z, x) { //单选或者多选


        if (flag == 'a') { //在全选的基础上操作
            str = $scope.choseArr.join(',') + ',';
        }
        if (x == true) { //选中
            str = str + z + ',';
        } else {
            str = str.replace(z + ',', ''); //取消选中
        }

        $scope.choseArr = (str.substr(0, str.length - 1)).split(',');
        console.log($scope.choseArr);

    };

    // open click
    $scope.open = function(size,studentCodes,type) {
        console.log("studentCodes-->"+studentCodes);
        console.log("TYPE--->"+type);
        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！");
            return;
        }

        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalStuCategoryCtrlDR', // specify controller for modal
            size : size,
            resolve : {
                type: function(){
                    return type;
                },
                studentCodes : function(){
                    // return $scope.diagnosticRecordsCodes;
                    return studentCodes;
                },
                host : function(){
                    return $scope.app.host;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });

    };

});

// modal controller 分配学生目标
app.controller('ModalStuCategoryCtrlDR', function($scope,$http, $modalInstance,studentCodes,type,host) {
    $scope.formData={};
    $scope.formData.yesVip=1;
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    console.log($scope.studentCodes );
    $scope.isShow = true;
    $scope.showOrHide = function() {
        $scope.isShow = !$scope.isShow;
    };
    //分配目标
    $scope.ok = function(formData){
        console.log("targetType--->"+formData);
        var url = host + "/section/vip/noThrough?requestId=test123456";
        if(formData.yesVip==1){
            url = host + "/section/distribute/courseType?requestId=test123456";
        }
        $http.post(url,{
            "studentCodeList":studentCodes,
            "targetType": formData.courseCategoryTarget
        }).success(function(data){
            $modalInstance.close(data);
            if(data.result == true){
                alert("分配成功！");
            }
            $scope.getStuGoryList();
        }).error(function(data){
            console.log("fail");
        });


    };
    $scope.getStuGoryList = function(){
        $http.post($scope.app.host +"/shortSlab/getStudentClassifyList?requestId=test123456",
            dataStuString
        ).success(function (data) {
                $scope.list = data.result.list;
                if(dataMap.get("departmentType")==0){
                    $(".sub-science-tr").hide();
                    $(".sub-arts-tr").show();
                }
            });
    };
});


/*学生分类=》符合确认名单-课程分类*/
app.controller('CourseCategoryCtrlDR', function($scope, $resource, $stateParams, $modal, $state, $controller,$http,CalcService) {
    //根据类型、地区、总分数、单科学科 查询列表
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    var dataMap=new Map();
    var dataString="";
    $scope.depSel= function(val){
        if( dataMap.get("departmentType")==val){
            return true;
        }else{
            return false;
        }
    };
    $scope.conditionSel= function(val,type){
        if(type=="departmentType" && val==1){
            $("#courseCategory-div").find(".sub-arts").hide();$(".sub-science").show();
        }else if(type=="departmentType" && val==0){
            $("#courseCategory-div").find(".sub-arts").show();$(".sub-science").hide();
        }

        dataMap.remove(type);
        dataMap.put(type,val);
        $scope.getList();
    };
    $scope.totalScore= function(val,type){
        dataMap.remove(type);
        dataMap.put(type,val);
        $scope.getList();
    };

    //单科
    $scope.x = false; //默认未选中
    $scope.checkSub = function(z, x) { //单选或者多选

        if (x == true) { //选中
            dataMap.put(z,$("#"+z).val());
        } else {
            dataMap.remove(z);//取消选中
        }
        $scope.getList();
    };
    //目标类型
    $scope.getAimType = function(val) {
        dataMap.remove("aimType");
        dataMap.put("aimType",val);
        $scope.getList();
    };
    //地区
    $scope.areaSel = function(val) {
        if(typeof(val) !== "undefined") {
            dataMap.remove("areaCode");
            dataMap.put("areaCode", val);
            $scope.getList();
        }
    };

    $scope.dataStr = function(){
        dataMap.remove("bookVersionCode");
        dataMap.put("bookVersionCode","1");
        dataString="{";
        for (var  i = 0; i < dataMap.elements.length; i++) {
            dataString+="'"+dataMap.elements[i].key+"':"+"'"+dataMap.elements[i].value+"'";
            if(i!=dataMap.elements.length-1){
                dataString+=",";
            }
        }
        dataString+="}";
        console.log(dataString);

    };

    //获取地区列表
    $scope.loadAreaList = function() {
        $http.post($scope.app.host + '/area/allProvince?requestId=test123456', "").success(function (data) {
            $scope.areaResults = data.result;
        });
        $scope.load();
    };
    $scope.getList = function(page,size,callback){
        if(page!=null && page!=undefined && size!=null && size!=undefined){
            dataMap.remove("currentPage");
            dataMap.put("currentPage",page);
            dataMap.remove("pageSize");
            dataMap.put("pageSize",size);
        }
        $scope.dataStr();
        $http.post($scope.app.host +"/shortSlab/getStudentClassifyList?requestId=test123456",
            dataString
        ).success(function (data) {
                if(data.message == "Success"){
                    $scope.list = data.result.list;
                    $scope.totalPage = data.result.totalPage;
                    callback && callback(data.result);
                    if(dataMap.get("departmentType")==0){
                        $(".sub-science-tr").hide();
                        $(".sub-arts-tr").show();
                    }
                }
            }).error(function(data){
                console.log("服务请求失败");
            });
    };
    //全选
    $scope.tesarry = ['1', '2', '3']; //初始化数据
    $scope.choseArr = []; //定义数组用于存放前端显示
    var str = ""; //
    var flag = ''; //是否点击了全选，是为a
    $scope.x = false; //默认未选中

    $scope.checkAll = function(c, v) { //全选
        if (c == true) {
            $scope.x = true;
            var entities=$("#courseCategory-div input[type=checkbox][name=check-entities]");
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                $scope.choseArr.push(entity.id);
            }
//            $scope.choseArr = v;
        } else {
            $scope.x = false;
            $scope.choseArr = [""];
        }
        flag = 'a';
        console.log($scope.choseArr);
    };
    $scope.chk = function(z, x) { //单选或者多选


        if (flag == 'a') { //在全选的基础上操作
            str = $scope.choseArr.join(',') + ',';
        }
        if (x == true) { //选中
            str = str + z + ',';
        } else {
            str = str.replace(z + ',', ''); //取消选中
        }

        $scope.choseArr = (str.substr(0, str.length - 1)).split(',');
        console.log($scope.choseArr);

    };
    // open click
    $scope.open = function(size,studentCodes,type) {
        console.log("studentCodes-->"+studentCodes);
        console.log("TYPE--->"+type);
        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！");
            return;
        }

        $http.post($scope.app.host +"/section/distribute/courseType?requestId=test123456",
            {
                "lessonLevel":type,
                "studentCodeList":$scope.choseArr
            }
        ).success(function (data) {
                $scope.getList();
                alert("操作成功！");
//                $state.go("app.teachResearchManage.category");
            });

    };

});
// 学生分类-不符合名单
app.controller('NotConformCtrl', function($scope, $resource, $stateParams, $modal,$q, $state, $controller,$http,CalcService) {
    //根据类型、地区、总分数、单科学科 查询列表
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    var baseHost = $scope.app.host;
    //表单选项
    $scope.formData = {};
    //类型、学年、学科
    $scope.subjectTypes = [];
    //所有省份
    $scope.allProvince = [];
    //短板诊断学科筛选
    $scope.shortSubjects = [];
    // 不符合、未诊断、诊断后拒绝学生列表(包含分页信息)
    $scope.studentsList = {};
    //试卷池 Tab 切换
    $scope.tabs = [{
        title: '不符合',
        url: 'one.tpl.html'
    }, {
        title: '未短板诊断',
        url: 'two.tpl.html'
    }, {
        title: '短板诊断后拒绝',
        url: 'three.tpl.html'
    }];
    //分页
    $scope.pagination = [];
    //tab标签
    $scope.currentTab = 'one.tpl.html';
    $scope.formData.tabUrl = $scope.currentTab;
    $scope.onClickTab = function(tab){
        $scope.currentTab = tab.url;
        $scope.formData.tabUrl=tab.url;
        $scope.searchStudent();
        /* searchData = angular.copy($scope.formData);
         angular.forEach($scope.subjectTypes,function(t){
         if(t.departmentType == searchData.departmentType){
         $scope.shortSubjects = t.category;
         $scope.formData.shortSubject =$scope.shortSubjects[0];
         return false;
         }
         });*/
    };

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
            arr.push({page:1,name:'首页',className:pageNo==1?'active':'',edge:pageNo==1?'e':''});
            arr.push({page:pageNo-1>1?pageNo-1:1,name:'上一页',className:pageNo==1?'disabled':''});
            for(var i=lpage;i<=upage;i++){
                arr.push({page:i,name:i,className:pageNo==i?'active':''});
            }
            arr.push({page:pageNo+1>totalPage?totalPage:pageNo+1,name:'下一页',className:totalPage==pageNo?'disabled':''});
            arr.push({page:totalPage,name:'尾页',className:totalPage==pageNo?'active':'',edge:'e'});
        }
        return arr;
    }

    // 全部地区
    CalcService.filterData().then(function(data){
        $scope.subjectTypes = data.filterData;
        $scope.formData.departmentType = data.filterData[0].departmentType;
    });
    //获取全布地区
    var getAllProvince = function(){
        $http.post(baseHost+'area/allProvince?requestId='+Math.random())
            .success(function(b){
                if(b.code=="Success"){
                    $scope.allProvince = b.result;
                    $scope.formData.provinceCode = b.result[0].provinceCode;
                }else{
                    modalAlert({content:'获取地区异常'});
                }
            })
            .error(function(data,header,config,status){
                modalAlert({content:'抱歉，获取地区失败！'});
            });
    };
    getAllProvince();
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
    //查询不合格名单条件
    var searchData = {};
    //点击查询按钮-查询不合格名单--form检验
    $scope.searchStudent = function(){
        $scope.formData.lowScore&&($scope.formData.lowScore = $scope.formData.lowScore.replace(/^\s+|\s+$/g,''));
        $scope.formData.highScore&&($scope.formData.highScore = $scope.formData.highScore.replace(/^\s+|\s+$/g,''));
        if($scope.formData.lowScore&&!/^\d*$/.test($scope.formData.lowScore)||(!/^\d*$/.test($scope.formData.highScore)&&$scope.formData.highScore)){
            return modalAlert({content:'输入总分数只能是正整数!'});
        }
        if(/^\d+$/.test($scope.formData.lowScore)&&/^\d+$/.test($scope.formData.highScore)&&parseInt($scope.formData.lowScore)>parseInt($scope.formData.highScore)){
            return modalAlert({content:'分数范围只能是从小到大！'});
        }
        var flag = false;
        if(searchData.departmentType != $scope.formData.departmentType){
            flag = true;
        }
        searchData = angular.copy($scope.formData);
        if(flag)
            angular.forEach($scope.subjectTypes,function(t){
                if(t.departmentType == searchData.departmentType){
                    $scope.shortSubjects = t.category;
                    $scope.formData.shortSubject =$scope.shortSubjects[0];
                    return false;
                }
            });
        $scope.getStudentList(1);
    };
    //分页查询不合格名单
    $scope.getStudentList = function(p,e){

        $scope.studentsList={};
        $scope.pagination=[];
        if(searchData.studentListXHR)searchData.studentListXHR.resolve('abort');
        searchData.studentListXHR = $q.defer();
        var page = p||1;

        var url=/* 'http://192.168.1.156:8090/'*/ baseHost+ 'shortSlab/getdisAccordVipList?requestId='+Math.random(),data={},page = p|1;
        if($scope.currentTab=='two.tpl.html'){ //未诊断
            if(!$scope.formData.shortSubject)return modalAlert({content:'请先选择学科'});
            url =/* 'http://192.168.1.156:8090/'*/ baseHost+ 'shortSlab/getdisAgreeListBySubjectCode?requestId='+Math.random();
            data = {
                "departmentType":searchData.departmentType,
                      "subjectCode":$scope.formData.shortSubject.subjectCode,
                       "areaCode":searchData.provinceCode,
                "isAgreeShortSlabDiagnosis":"0",
                "startTotalScore":searchData.lowScore||undefined,
                "endTotalScore":searchData.highScore||undefined,
                "currentPage":page,
                "pageSize":"10"
            };
            $scope.formData.shortSubjectName = $scope.formData.shortSubject.subjectName;
        }else if($scope.currentTab=='three.tpl.html'){ // 诊断拒绝
            if(!$scope.formData.shortSubject)return modalAlert({content:'请先选择学科'});
            url =/* 'http://192.168.1.156:8090/'*/ baseHost+ 'shortSlab/getDoNotShortSlabList?requestId='+Math.random();
            data = {
                "departmentType":searchData.departmentType,
                     "subjectCode":$scope.formData.shortSubject.subjectCode,
                     "areaCode":searchData.provinceCode,
                "isAgreeAddHour":"0",
                "startTotalScore":searchData.lowScore||undefined,
                "endTotalScore":searchData.highScore||undefined,
                "currentPage":page,
                "pageSize":"10"
            };
            $scope.formData.shortSubjectName = $scope.formData.shortSubject.subjectName;
        }else{ // 不符合
            data = {
                "departmentType":searchData.departmentType,
                "areaCode":searchData.provinceCode,
                "isAccordVip":"0",
                "startTotalScore":searchData.lowScore||undefined,
                "endTotalScore":searchData.highScore||undefined,
                "currentPage":page,
                "pageSize":"10"
            }
        }
        $http
            .post(url,data,{timeout: searchData.studentListXHR.promise})
            .success(function(b){
                if(b.code=="Success"){
                    if(b.result){
                        $scope.studentsList = b.result.list;
                        $scope.pagination = makePagination(b.result.pageNumber, b.result.totalPage);
                    }else{
                        $scope.studentsList =[];
                    }
                }else{
                    modalAlert({content:'查询列表失败!'});
                }
            })
            .error(function(data,header,config,status){
                if(status.timeout&&status.timeout.$$state.value=='abort'){
                    return false;
                }
                modalAlert({content:'查询列表失败!'});
            });
    };
    $scope.GetPaperDetail = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    }


});
// alert优雅弹框
app.controller('WarningController', function($scope, $modalInstance,data){
    $scope.warning = data.content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});
