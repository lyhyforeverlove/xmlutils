'use strict';
/*诊断上架*/
app.constant('tesarry', []);    //定义全选数组
app.controller('DiagShelvesController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state, CalcService,tesarry) {

    //继承筛选条件控制器
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承

    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "national001";
    //默认学年为33
    $scope.formData.gradeCode = 33;
    //默认为短板诊断
    $scope.formData.paperUseType = 0;

    //获取诊断试卷列表
    $scope.getList = function(page, size, callback) {
        $http.post($scope.app.host + 'diagnosis/list?requestId=test123456', {
                "subjectCode": $scope.formData.subjectCode,
                "bookVersionCode": $scope.formData.bookVersionCode,
                "paperUseType": $scope.formData.paperUseType,
                "currentPage": page,
                "pageSize": size
            })
            .success(function(data) {
                if(data.message == "Success"){
                    $scope.results = data.result;
                    var list = data.result.list;

                    angular.forEach(list, function(data){
                        $scope.tesarry.push(data.repositoryPaperCode);
                        if(data.artsType == "SCIENCE"){
                            data.artsType = "理科";
                        }else{
                             data.artsType = "文科";
                        }
                    });
                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
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
            $scope.choseArr = v;
        } else {
            $scope.x = false;
            $scope.choseArr = [""];
        }
        flag = 'a';
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
    };
    /*置为诊断商品*/
    $scope.AddDiagGoods = function(){
        var url=$scope.app.host + '/teacher/diagnosis/add/good?requestId=test123456';
        $http.post(url,{
            "gradeCode":$scope.formData.gradeCode,
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "paperCodes":["8a2a746856c481ed0156cb5c1c07067e"]
        }).success(function(data){
            //console.log(data);
            if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
                alert("请至少选中一条数据在操作！")
                return;
            }else{
                if(data.message == "Success"){
                    $state.go("app.teachManage.diagGoods"); //成功跳转诊断商品列表
                }
            }
        }).error(function(data){
            console.log("fail!");
        });
    }
    console.log($scope.tesarry);
});
//诊断商品列表
app.controller("DiagGoodsCtrl", function($scope, $http, $controller, $resource, $stateParams, $modal, $state, CalcService,passParameter) {
        //继承筛选条件控制器
        $controller('ParentGetDataCtrl', { $scope: $scope }); //继承

        $scope.formData = {};
        //默认类型为理科
        $scope.formData.departmentType = 1;
        //默认为语文
        $scope.formData.subjectCode = 1;
        //默认为全国卷一
        $scope.formData.bookVersionCode = 1;
        //默认学年为33
        $scope.formData.gradeCode = 33;

        //商品列表
        $scope.getList = function(page, size, callback) {
            $http.post($scope.app.host + "/teacher/diagnosis/list?requestId=test123456", {
                    "gradeCode": $scope.formData.gradeCode,
                    "departmentType": $scope.formData.departmentType,
                    "bookVersionCode": $scope.formData.bookVersionCode,
                    "currentPage": page,
                    "pageSize": size
                })
                .success(function(data) {
                    console.log(data);
                    $scope.results = data.result;

                    var list = data.result.list;

                    angular.forEach(list, function(data){
                       // $scope.tesarry.push(data.repositoryPaperCode);
                        if(data.onsaleStatus == "1"){
                            data.onsaleStatus = "下架";
                        }else{
                             data.onsaleStatus = "上架";
                        }
                    });
                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);

                }).error(function(data) {

                })
        };
        //修改诊断商品上下架
        $scope.UpdateGoodsStatus = function(diagnosisGoodsCode) {
            //diagnosisGoodsCode =>json
            var url = $scope.app.host + "/teacher/diagnosis/update/status?requestId=test123456";
            $http.post(url, diagnosisGoodsCode).success(function(data) {
                /*if(data.message == ""){

                }*/
                console.log(data);
            }).error(function(data) {
                console.log("fail");
            })
        }
        //点击获取诊断商品详情
        $scope.GetGoodsDetail = function(data) {
           passParameter.setter(data);
           $state.go("app.teachManage.goodsDetail");
        }
        //分配监考人
        $scope.allotBtn = function(data) {
            console.log(data);
            var jsonString = angular.toJson(data);
            $state.go('app.teachManage.allot', {
                jsonString: jsonString
            }, {
                reload: true
            });
        };
})
//给诊断商品分配监考人
app.controller("DistributionCtrl", function($scope, $http, $controller, $resource, $stateParams, $modal, $state, CalcService) {

    //添加老师
    $scope.list = [{ teacherCode: 0, beginDate: 30, endDate: '张三' }];
    $scope.addTeacher = function() {
        var obj = { teacherCode: 0, beginDate: 30, endDate: '张三' };
        $scope.list.push(obj);
    }
    $scope.del = function(idx) {
        $scope.list.splice(idx, 1);
    }
      
    $scope.postData = {};
    //诊断时间
    $scope.groups = [{
        id: 1,
        name: '第一组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        AM: '上午',
        active: true
    }, {
        id: 2,
        name: '第二组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }, {
        id: 3,
        name: '第三组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        PM: '下午',
        active: false
    }, {
        id: 4,
        name: '第四组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }, {
        id: 5,
        name: '第五组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }, {
        id: 6,
        name: '第六组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }];

    $scope.toggleActive = function(s) {
        s.active = !s.active;
    };

    $scope.times = function() {

        $scope.postData.times = [];

        angular.forEach($scope.groups, function(s) {
            if (s.active) {
                $scope.postData.times.push(s.id);
            }
        });

        return $scope.postData.times;
    };
    //确定上架
    $scope.ConfirmShelves = function(postData) {

        //url参数对象  
        var V_GoodsAddJson = null;
        // 获取上个界面传递的数据，并进行解析  
        if ($stateParams.jsonString != '') {
            V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
        }

        var diagnosisGoodsModels = []; //定义诊断商品列表
        //console.log($scope.postData);
        var goodsArr = angular.fromJson($scope.postData);
        //console.log(goodsArr);
        diagnosisGoodsModels.push(goodsArr);

        var V_GoodsAddJson = angular.fromJson(V_GoodsAddJson);

        V_GoodsAddJson['diagnosisGoodsModels'] = diagnosisGoodsModels; //组合商品上架json数据

        console.log(V_GoodsAddJson);

        //console.log(V_GoodsAddJson);

        $http.post($scope.app.host + '/teacher/diagnosis/distribution/invigilate?requestId=test123456', V_GoodsAddJson)
            .success(function(data) {
                if (data.result == "success") {
                    console.log(data);
                    $state.go('app.teachManage.diagGoods');
                }
            });
    }

})
//获取诊断商品详情 controller
app.controller("GoodsDetailController", function($scope, $http, $stateParams, $state,passParameter) {

    var goodsCode = passParameter.getter();//读取到参数
    $scope.GetGoodsDetailList = function(){
        var url = $scope.app.host + '/teacher/diagnosis/detail?requestId=test123456';
        $http.post(url,goodsCode).success(function(data){
            if(data.message == "Success"){
                $scope.results = data.result;
                console.log(data);
                console.log("获取诊断商品详情");
            }
        }).error(function(data){
            console.log("fail!");
        });
    }
})
/*试卷池*/
app.controller('TestPoolControler', function($scope, $http, $controller,$log, $resource, $stateParams, $modal, $state, CalcService) {

    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承
    //试卷池 Tab 切换
    $scope.tabs = [{
        title: '未分配',
        url: 'one.tpl.html'
    }, {
        title: '已分配',
        url: 'two.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
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
            $scope.choseArr = v;
        } else {
            $scope.x = false;
            $scope.choseArr = [""];
        }
        flag = 'a';
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

    };
    $scope.delete = function() { // 操作CURD

        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };

        for (var i = 0; i < $scope.choseArr.length; i++) {
            console.log($scope.choseArr[i]); //遍历选中的id
        }
    };

    $scope.formData = {};
   
    $scope.formData.departmentType = 1; //默认类型为理科
    $scope.formData.subjectCode = 1;//默认为语文
    $scope.formData.bookVersionCode = "1";//默认为全国卷一
    $scope.formData.gradeCode = 33;//默认学年为33

    
    $scope.getList1 = function(page, size,callback) {
        var url = $scope.app.host + "/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456";
        $http.post(url, {
            "gradeCode": $scope.formData.gradeCode,
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode":  $scope.formData.bookVersionCode,
            "distributionState" :1, 
            "currentPage": page,
            "pageSize": size
        }).success(function(data) {
            console.log(data);
            if (data.message == "Success") {
               
                var list = data.result.list;
                $scope.results = data.result;
                $scope.total = data.total;

            //$scope.allotData = [];
            //$scope.noAllotData = [];
                angular.forEach(list, function(data){
                    if(data.distributionStatus == 1){
                        data.distributionStatus = "已分配";
                    }
                });
                angular.forEach(list, function(data){
                    if(data.subjectCode == 1){
                        data.subjectCode = "语文";
                    }else if(data.subjectCode == 2){
                         data.subjectCode = "数学";
                    }
                });

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data) {
            console.log("fail");
        });
    }
    //根据学年、类型、教材 查询试卷池 （接口获取学生诊断记录列表） 
    $scope.getList = function(page, size,callback) {
        var url = $scope.app.host + "/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456";
        $http.post(url, {
            "gradeCode": $scope.formData.gradeCode,
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode":  $scope.formData.bookVersionCode,
            "distributionState" :0, 
            "currentPage": page,
            "pageSize": size
        }).success(function(data) {
            console.log(data);
            if (data.message == "Success") {
               
                var list = data.result.list;
                $scope.results = data.result;
                $scope.total = data.total;
                
            //$scope.allotData = [];
            //$scope.noAllotData = [];
                angular.forEach(list, function(data){
                    if(data.distributionStatus == 0){
                        data.distributionStatus = "未分配";

                    }
                });
                angular.forEach(list, function(data){
                    if(data.subjectCode == 1){
                        data.subjectCode = "语文";
                    }else if(data.subjectCode == 2){
                         data.subjectCode = "数学";
                    }
                });

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data) {
            console.log("fail");
        });
    }


    $scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
    // open click
    $scope.open = function(size) {
        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalDistributionCtrl', // specify controller for modal
            size : size,
            resolve : {
                items : function() {
                    return $scope.items;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    }

});

// modal controller 分配试卷
app.controller('ModalDistributionCtrl', function($scope, $modalInstance, items) {
    
    $scope.items = items;
    
    $scope.selected = {
        item : $scope.items[0]
    };
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //手动分配试卷
    $scope.Distribution = function(){
        var url = $scope.app.host + '/teacher/diagnosis/distribution?requestId=test123456';
        /*{
            "teacherCodes":["1","2","3"],
            "diagnosticRecordsCodes":["123","456","789"]
            }  */
        $http.post(url).success(function(data){
            console.log(data);
        }).error(function(data){
            console.log("fail");
        });
    }

});

/*判卷*/
app.controller('MarkExamController', function($scope, $resource, $stateParams, $modal, $state) {
    $scope.addErrorKnown = function() {
            var addHtml = $('.survey-knowledge').children('a');
            addHtml.removeClass("disabled");

            addHtml.on('click', function() {
                var id = $(this).attr('id');
                $("#selectKnow").append('<a id=' + id + ' onclick="removehtml(\'' + id + '\')">' + $(this).html() + '</a>');
                $(this).addClass("disabled");

            })
        }
        //判卷提交
    $scope.submit = function() {

    };
});

function removehtml(id) {
    $('.survey-knowledge').find('#' + id).removeClass("disabled");
    $('#' + id).remove();
}
/*
*短板<短板考试确认>、<短板考试监考>、<短板诊断判卷>、<短板加课确认> 
*date : 2016-9-12
*auth : wangyanxiao
*/
//短板考试确认
app.controller('ShortSlabController', function($scope, $http,$compile,$log,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承

    $scope.formData ={};//定义短板考试确认筛选条件对象
    //根据学年、类型、学科、教材查询短板考试确认列表
    $scope.getList = function(page,size,callback){
        var url=$scope.app.host + "/shortSlab/teaching/getShortSlabStudentList?requestId=test123456";
        $http.post(url,{
            "departmentType":"0",
            "subjectCode":"1",
            "bookVersionCode":"0",
            "aimType":"1",
            "currentPage":page,
            "pageSize":size 
        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){

                $scope.results = data.result;

                var isAgreeArr = data.result.list;
                
                angular.forEach(isAgreeArr, function(data) {
                   //isAgreeJoinVulnerability  0=>不同意  1=>同意
                    if(data.isAgreeJoinVulnerability == 0){
                       //data.isAgreeJoinVulnerability = "";
                       var html="<a>33</a>";
               var template = angular.element(html);
               var mobileDialogElement = $compile(template)($scope);
               angular.element("#"+data.eduVulnerabilityAnalyzeRecordCode).append(mobileDialogElement);
               
                       console.log(angular.element("#"+data.eduVulnerabilityAnalyzeRecordCode).html());
                        // remove移除创建的元素
               //var closeMobileDialog = function () {if (mobileDialogElement) {  mobileDialogElement.remove();}}

                       // angular.element('#'+data.eduVulnerabilityAnalyzeRecordCode).append('ssss');
                    }else{console.log(222);
                        angular.element(".aa").html("已确认");
                    }
                });

               /* angular.forEach(isAgreeArr, function(data) {
                   //isAgreeJoinVulnerability  0=>不同意  1=>同意
                    if(data.isAgreeAddHour == "0"){
                       data.isAgreeAddHour = "预约时间";
                    }
                });*/
              

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
        
    }
    //教学-确认同学不同意短板诊断 (拒绝短板诊断)
    $scope.DiagDisagree = function(shortSlabAnalysisRecordCode){
        console.log(shortSlabAnalysisRecordCode);
        console.log();
        var id = shortSlabAnalysisRecordCode.shortSlabAnalysisRecordCode;
        var url = $scope.app.host + '/shortSlab/teaching/diagnosis/disagree?requestId=test123456';
        $http.post(url,shortSlabAnalysisRecordCode).success(function(data){
            if(data.message == "Success"){
                console.log(data.result);
                if(data.result == true){
                    console.log("#"+id);
                    angular.element("#"+id).find("button").remove(); // remove移除创建的元素
                    angular.element("#"+id).html("已确认");
                }
            }
        }).error(function(data){
            console.log("fail!");
        })
    }
    //弹框  预约时间
    $scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
    // open click
    $scope.open = function(size,data) {
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalAppointmentCtrl', // specify controller for modal
            size : size,
            resolve : {
                items : function() {
                    return $scope.items;
                },
                host : function(){
                    return $scope.app.host;
                },
                shortSlabAnalysisRecordCode : function(){
                    return data;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    }
    
    
});
// 教学管理=>短板考试确认 => 预约时间modal controller
app.controller('ModalAppointmentCtrl', function($scope, $modalInstance, items ,shortSlabAnalysisRecordCode) {
    
    console.log(shortSlabAnalysisRecordCode);
    $scope.items = items;
    
    $scope.selected = {
        item : $scope.items[0]
    };
   
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    $scope.postData = {};
    //诊断时间
    $scope.groups = [{
        id: 1,
        name: '第一组时间',
        startDate : "2016.6.18 16:00",
        endDate : " 2016.6.18 18:00",
        group: '一组:5人',
        AM: '上午',
        active: true
    }, {
        id: 2,
        name: '第二组时间',
        startDate : "2016.6.18 16:00",
        endDate : " 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }, {
        id: 3,
        name: '第三组时间',
        startDate : "2016.6.18 16:00",
        endDate : " 2016.6.18 18:00",
        group: '一组:5人',
        PM: '下午',
        active: false
    }, {
        id: 4,
        name: '第四组时间',
        startDate : "2016.6.18 16:00",
        endDate : " 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }, {
        id: 5,
        name: '第五组时间',
        startDate : "2016.6.18 16:00",
        endDate : " 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }, {
        id: 6,
        name: '第六组时间',
        startDate : "2016.6.18 16:00",
        endDate : " 2016.6.18 18:00",
        group: '一组:5人',
        active: false
    }];

    $scope.toggleActive = function(s) {
        s.active = !s.active;
    };
/*
    $scope.times = function() {

        //$scope.postData.times = [];

        angular.forEach($scope.groups, function(s) {
            if (s.active) {
                $scope.postData.times.push(s.id);
            }
        });

        return $scope.postData.times;
    };*/
     // ok click
   /* $scope.ok = function() {
        
    };*/
    //教学-给学生添加预约短板考试时间 （预约时间）
    $scope.AppointmentOK = function(postData){
        var url = $scope.app.host = "/shortSlab/teaching/appointment?requestId=test123456";
        /*{
            "shortSlabAnalysisRecordCode":"DE484E80B6DA40BEA5A2975AB78F3E00",
            "invigilatorTeacher":"000111222333",
            "broadcastBoothUrl":"http://www.google.cn",
            "appointmentExamStartDate":"2016-09-08 09:00:00",
            "appointmentExamEndDate":"2016-09-08 10:00:00" 
        }*/
        $http.post(url,postData).success(function(data){
            console.log(data);
            if(data.message == "Success"){
                console.log(data);
            }
        }).error(function(data){

        })
       // $modalInstance.close($scope.selected.item);
    }
});
/*短板考试监考*/
app.controller('MonitorController', function($scope, $http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承
    $scope.formData = {};
    if( $scope.formData.subjectCode == 1){
        $scope.formData.subjectName = "语文";
    }
    
    //根据学年、类型、学科、教材查询短板诊断监考列表
    $scope.getList = function(page,size,callback) {
        var url=$scope.app.host + "/shortSlab/teaching/getShortSlabStudentList?requestId=test123456";
        $http.post(url,{
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "aimType":$scope.formData.aimType,
            "currentPage":page,
            "pageSize":size 
        }).success(function(data){
            if(data.message == "Success"){
                var list = data.result.list;
                console.log(data);
                //examType 考试类型  0=》短板诊断  1
                angular.forEach(list, function(data){
                    if(data.examType == 0){
                        data.examType = "短板诊断";
                    }else if(data.examType == 1){
                        data.examType = "";
                    }else{
                        data.examType ="";
                    }
                });
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data){
            console.log("fail");
        });
       
    }
});
/*短板诊断判卷*/
app.controller('ShortBoardDiagCtrl', function($scope,$http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });
    $scope.formData = {};
    //根据学年、类型、学科、教材查询短板诊断判卷列表
    $scope.getList = function(page,size,callback) {
        var url=$scope.app.host + "/shortSlab/teaching/getShortSlabStudentList?requestId=test123456";
        $http.post(url,{
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "aimType":$scope.formData.aimType,
            "currentPage":page,
            "pageSize":size 
        }).success(function(data){
            if(data.message == "Success"){
                var list = data.result.list;
                console.log(data);
                //examType 考试类型  0=》短板诊断  1
                angular.forEach(list, function(data){
                    if(data.examType == 0){
                        data.examType = "短板考试";
                    }else if(data.examType == 1){
                        data.examType = "诊断考试";
                    }else{
                        data.examType ="";
                    }
                });
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data){
            console.log("fail");
        });
       
    }
});
/*短板加课确认*/
app.controller('ShortBoardClassCtrl', function($scope,$http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });
    //根据类型、地区、总分数、用户名不符合名单通知确认
    $scope.formData = {};
    $scope.formData.departmentType = 1;
    $scope.formData.subjectCode = 1;
    $scope.formData.bookVersionCode = 1;
    $scope.formData.aimType = 1;

    $scope.getList = function(page,size,callback) {
        var url=$scope.app.host + "/shortSlab/teaching/getShortSlabStudentList?requestId=test123456";
        $http.post(url,{
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "aimType":$scope.formData.aimType,
            "currentPage":page,
            "pageSize":size 
        }).success(function(data){
            if(data.message == "Success"){
                var list = data.result.list;
                console.log(data);
                //examType 考试类型  0=》短板诊断  1
                angular.forEach(list, function(data){
                    if(data.examType == 0){
                        data.examType = "短板考试";
                    }else if(data.examType == 1){
                        data.examType = "诊断考试";
                    }else{
                        data.examType ="";
                    }
                });
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data){
            console.log("fail");
        });
       
    }
    
});
/*不符合名单通知确认*/
app.controller('NotConformCtrl', function($scope,$http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承
   
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

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    $scope.formData = {};
    //根据类型、地区、总分数、用户名不符合名单通知确认 (不符合VIP学生列表)
    $scope.getList = function(page,size,callback){
        var url = $scope.app.host + '/student/unnatural/list?requestId=1';
        $http.post(url,{
            "pageNumber": page, 
            "pageSize": size,
            "studentObjective":$scope.formData.studentObjective,
            "minTotalScore": $scope.formData.minTotalScore,
            "maxTotalScore": $scope.formData. maxTotalScore
        }).success(function(data){
            if(data.message == "Success"){
                console.log(data);
                $scope.results = data.result;

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data){
            console.log("fail!");
        })
    }
    //教学-确认学生同意短板诊断
    $scope.DiagAgree = function(){
        var url = $scope.app.host + '/shortSlab/teaching/diagnosis/agree?requestId=test123456';
        $http.post(url,{
            "shortSlabAnalysisRecordCode":"DE484E80B6DA40BEA5A2975AB78F3E00" 
        }).success(function(data){
            if(data.message == "Success"){
                console.log(data);
            }
        }).error(function(data){
            console.log("fail!");
        })
    }
    
   
       
    
});

/*分班*/
app.controller('DividingClassesCtrl', function($scope, $http,$log,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });

    //根据类型、地区、总分数、单科学科、分数、上课时间查询列表
    

    $scope.getList = function(page,size,callback) {
        var url = $scope.app.host + 'student/accord/list?requestId=1';//符合vip学生列表
        $http.post(url,{    
           "pageNumber": 1, 
           "pageSize": 5,
           "studentObjective":1 ,
            "minTotalScore":1,
            "maxTotalScore":500 

        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){

                $scope.results = data.result;
               
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
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
            $scope.choseArr = v;
        } else {
            $scope.x = false;
            $scope.choseArr = [""];
        }
        flag = 'a';
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
    };
    // list
    $scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
    // open click
    $scope.open = function(size) {
         if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ClassesController', // specify controller for modal
            size : size,
            resolve : {
                items : function() {
                    return $scope.items;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    }
});
// modal controller
app.controller('ClassesController', function($scope, $controller,$modalInstance, items) {
    $controller('getSchoolInfo', { $scope: $scope });
    
    $scope.items = items;
    
    $scope.selected = {
        item : $scope.items[0]
    };
    // ok click
   /* $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };*/
     //班 ok
    $scope.placementOk = function(){
        var url = $scope.app.host + '/teaching/placement?requestId=1';
        /*$http.post(url,{
            "schoolCenterCode":$scope.formData.schoolCenterCode,
            "schoolClassCode":$scope.formData.schoolClassCode,
            "userCodeList":
        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){

                $scope.results = data.result;
               
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })*/
    }
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
});
/*分班后确认*/
app.controller('DividClassesConfrimCtrl' ,function($scope, $http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });
    //根据类型、地区、总分数、单科学科、分数、上课时间查询列表
    
    //分班后确认 Tab 切换
    $scope.tabs = [{
        title: '通过',
        url: 'one.tpl.html'
    }, {
        title: '未通过',
        url: 'two.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

    $scope.getList = function(page,size,callback) {
        var url = $scope.app.host + 'teaching/placement/list?requestId=1';//符合vip学生列表
        $http.post(url,{    
            "schoolCenterCode":"133"
        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){

                $scope.results = data.result;
               
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
    }
});



/*chart*/
app
// Flot Chart controller 
    .controller('FlotChartDemoCtrl', ['$scope', function($scope) {
    $scope.d = [
        [1, 6.5],
        [2, 6.5],
        [3, 7],
        [4, 8],
        [5, 7.5],
        [6, 7],
        [7, 6.8],
        [8, 7],
        [9, 7.2],
        [10, 7],
        [11, 6.8],
        [12, 7]
    ];

    $scope.d0_1 = [
        [0, 7],
        [1, 6.5],
        [2, 12.5],
        [3, 7],
        [4, 9],
        [5, 6],
        [6, 11],
        [7, 6.5],
        [8, 8],
        [9, 7]
    ];

    $scope.d0_2 = [
        [0, 4],
        [1, 4.5],
        [2, 7],
        [3, 4.5],
        [4, 3],
        [5, 3.5],
        [6, 6],
        [7, 3],
        [8, 4],
        [9, 3]
    ];

    $scope.d1_1 = [
        [10, 120],
        [20, 70],
        [30, 70],
        [40, 60]
    ];

    $scope.d1_2 = [
        [10, 50],
        [20, 60],
        [30, 90],
        [40, 35]
    ];

    $scope.d1_3 = [
        [10, 80],
        [20, 40],
        [30, 30],
        [40, 20]
    ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
        $scope.d2.push([i, Math.sin(i)]);
    }

    $scope.d3 = [
        { label: "iPhone5S", data: 40 },
        { label: "iPad Mini", data: 10 },
        { label: "iPad Mini Retina", data: 20 },
        { label: "iPhone4S", data: 12 },
        { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function() {
        $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
        var data = [],
            totalPoints = 150;
        if (data.length > 0)
            data = data.slice(1);
        while (data.length < totalPoints) {
            var prev = data.length > 0 ? data[data.length - 1] : 50,
                y = prev + Math.random() * 10 - 5;
            if (y < 0) {
                y = 0;
            } else if (y > 100) {
                y = 100;
            }
            data.push(y);
        }
        // Zip the generated y values with the x values
        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }
        return res;
    }

    $scope.d4 = $scope.getRandomData();
}]);


/*切换class类*/
app.directive('toggleClass', function() {
    return {
        restrict: 'A',
        scope: {
            toggleClass: '@'
        },
        link: function($scope, $element) {
            $element.on('click', function() {
                $element.toggleClass($scope.toggleClass);
            });
        }
    };
});
