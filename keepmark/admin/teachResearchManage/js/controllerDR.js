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
                $scope.list = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
                if(dataMap.get("departmentType")==0){
                    $(".sub-science-tr").hide();
                    $(".sub-arts-tr").show();
                }
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

