'use strict';
/*新增诊断商品*/
app.constant('tesarry', []);    //定义全选数组
app.controller('DiagShelvesController', function($scope, $http, $controller, $resource, $stateParams,$localStorage, $modal, $state, CalcService,tesarry) {

    //继承筛选条件控制器
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承

    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    $scope.name = $localStorage.user.name;//监考老师
    //全选
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
    //获取诊断试卷列表
    $scope.getList = function(page, size, callback) {
        $http.post($scope.app.host + '/diagnosis/group/list?requestId=test123456', {
            "departmentType":$scope.formData.departmentType,
            /*"bookVersionCode":$scope.formData.bookVersionCode,*/
            "currentPage":page,
            "pageSize":size
        })
            .success(function(data) {
                console.log(data);
                if(data.message == "Success"){

                    $scope.tesarry = []; //初始化数据
                    angular.forEach(data.result.list, function(data){
                        if(data.artsType == "SCIENCE"){
                            data.artsType = "理科";
                        }else{
                            data.artsType = "文科";
                        }
                        $scope.tesarry.push(data.complexCode);
                    });
                    $scope.results = data.result;

                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                }
            }).error(function(data){
                console.log("fail");
            });
    }
    /*置为诊断商品*/
    $scope.AddDiagGoods = function(code){
        var url=$scope.app.host + '/teacher/diagnosis/add/good?requestId=test123456';
        $http.post(url,{
            "gradeCode":$scope.formData.gradeCode,
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "paperCodes":code
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
    };
    //点击全科详情
    $scope.GetGroupDetail = function(data){
        // $state.go(app.paperDetail({'paperCode':data.diagnosisPaperCode});
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.groupsDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    };
    //console.log($scope.tesarry);
});//诊断商品列表
app.controller("DiagGoodsCtrl", function($scope, $http, $localStorage,$controller, $resource, $stateParams, $modal, $state, CalcService,passParameter) {
        $scope.name = $localStorage.user.name;//监考老师
        //继承筛选条件控制器
        $controller('ParentGetDataCtrl', { $scope: $scope }); //继承

        $scope.formData = {};
        //默认类型为理科
        $scope.formData.departmentType = 1;
        //默认学年为33
        $scope.formData.gradeCode = 33;

        //商品列表
        $scope.getList = function(page, size, callback) {
            $http.post($scope.app.host + "/teacher/diagnosis/list?requestId=test123456", {
                    "gradeCode": $scope.formData.gradeCode,
                    "departmentType": $scope.formData.departmentType,
                    "bookVersionCode": $scope.formData.bookVersionCode,
                    "pageNum": page,
                    "pageSize": size
                })
                .success(function(data) {
                   if(data.message == "Success"){
                       console.log(data);

                       $scope.results = data.result;
                       var list = data.result.list;
                       angular.forEach(list,function(data){
                           console.log(data.subjectType);
                           if(data.subjectType == 1){
                               $scope.departmentName = "理科";
                           }else{
                               $scope.departmentName = "文科";
                           }
                       });
                       $scope.totalPage = data.result.totalPage;
                       callback && callback(data.result);
                   }
                }).error(function(data) {
                    alert("请求服务失败！");
                });
        };
        //修改诊断商品上下架
        $scope.UpdateGoodsStatus = function(diagnosisGoodsCode) {
            //diagnosisGoodsCode =>json
            var url = $scope.app.host + "/teacher/diagnosis/update/status?requestId=test123456";
            $http.post(url, diagnosisGoodsCode).success(function(data) {
                if(data.result == true){
                    self.location.reload();
                }
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
    $scope.postData = {};
    //专职老师列表
    $scope.teacherList = function(){
        var url = $scope.app.host +'/teaching/organization/teacher/list?requestId=test123456';
        $http.post(url,{"type":1}).success(function(data){
            //console.log(data);
            $scope.results = data.result;
        }).error(function(data){
            console.log("fail");
        })
    };
    //诊断时间
    $scope.groups = [{
        id: 1,
        name: '第一组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        AM: '上午',
        active: false
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

    $scope.postData.times = [];
    $scope.toggleActive = function(s) {
        s.active = !s.active;
        $scope.times();
    };
    $scope.times = function() {
        $scope.postData.times = [];
        angular.forEach($scope.groups, function(s) {
            if (s.active) {
                console.log($scope.postData.times);
                $scope.postData.times.push(s.id);
            }
        });
        return $scope.postData.times;
    };
    //添加老师
    $scope.V_GoodsAddJson = null;
    var diagnosisGoodsModels = []; //定义诊断商品列表
    //$scope.list = [{ teacherCode: 0, beginDate: 30, endDate: '张三' }];
    $scope.addTeacher = function(postData) {
        console.log( $scope.postData.times);
        $scope.postData.beginDate = angular.element("#beginDate").val();//开始时间
        $scope.postData.endDate = angular.element("#endDate").val();//结束时间

        // 获取上个界面传递的数据，并进行解析
        if ($stateParams.jsonString != '') {
            $scope.V_GoodsAddJson = angular.fromJson($stateParams.jsonString);
        }
        var goodsArr = angular.fromJson($scope.postData);
        diagnosisGoodsModels.push(goodsArr);
        $scope.V_GoodsAddJson = angular.fromJson($scope.V_GoodsAddJson);
        $scope.V_GoodsAddJson['diagnosisGoodsModels'] = diagnosisGoodsModels; //组合商品上架json数据

        console.log(diagnosisGoodsModels);
        console.log($scope.V_GoodsAddJson);
        $scope.postData  = {};
        angular.forEach($scope.groups, function(data,index) {
            angular.element(".times li").removeClass('active');
        });
        angular.forEach($scope.postData.times, function(data,index) {
            alert(index);
            $scope.postData.times.splice(index, 1);
        });
    };
     $scope.del = function(idx) {
        $scope.postData.times.splice(idx, 1);
     };
    //确定上架
    $scope.ConfirmShelves = function() {
        console.log($scope.V_GoodsAddJson);
        $http.post($scope.app.host + '/teacher/diagnosis/distribution/invigilate?requestId=test123456', $scope.V_GoodsAddJson)
            .success(function(data) {
                if (data.result == true) {
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
        //console.log($scope.choseArr);

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
            "distributionState" :1, //分配状态 0 未分配 1 已分配
            "markRound" : 0, //轮次 0 一判 1 二判 3 复审
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
                        $scope.subjectName = "语文";
                    }else if(data.subjectCode == 2){
                       $scope.subjectName = "数学";
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
       /* console.log(markRound);
        console.log(distributionState);*/
        var url = $scope.app.host + "/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456";
        $http.post(url, {
            "gradeCode": $scope.formData.gradeCode,
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode":  $scope.formData.bookVersionCode,
            "distributionState" :0, //分配状态 0 未分配 1 已分配
            "markRound" : 0, //轮次 0 一判 1 二判 3 复审
            "currentPage": page,
            "pageSize": size
        }).success(function(data) {
            //console.log(data);
            if (data.message == "Success") {
               
                var list = data.result.list;
                $scope.results = data.result;
                $scope.total = data.total;
                
                $scope.tesarry = []; //初始化数据
                angular.forEach(list, function(data){
                    $scope.tesarry.push(data.eduSingleDiagnosisRecordCode);
                });
                angular.forEach(list, function(data){
                    if(data.distributionStatus == 0){
                        data.distributionStatus = "未分配";

                    }
                });
                angular.forEach(list, function(data){
                    $scope.subjectCode = data.subjectCode;
                    if(data.subjectCode == 1){
                        $scope.subjectName = "语文";
                    }else if(data.subjectCode == 2){
                        $scope.subjectName = "数学";
                    }
                });


                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data) {
            console.log("fail");
        });
    }

    $scope.getList2 = function(page, size,callback) {
        var url = $scope.app.host + "/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456";
        $http.post(url, {
            "gradeCode": $scope.formData.gradeCode,
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode":  $scope.formData.bookVersionCode,
            "distributionState" :1, //分配状态 0 未分配 1 已分配
            "markRound" : 1, //轮次 0 一判 1 二判 3 复审
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
    $scope.getList3 = function(page, size,callback) {
        var url = $scope.app.host + "/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456";
        $http.post(url, {
            "gradeCode": $scope.formData.gradeCode,
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode":  $scope.formData.bookVersionCode,
            "distributionState" :0, //分配状态 0 未分配 1 已分配
            "markRound" : 1, //轮次 0 一判 1 二判 3 复审
            "currentPage": page,
            "pageSize": size
        }).success(function(data) {
            console.log(data);
            if (data.message == "Success") {
               
                var list = data.result.list;
                $scope.results = data.result;
                $scope.total = data.total;
                
                $scope.tesarry = []; //初始化数据
                angular.forEach(list, function(data){
                    $scope.tesarry.push(data.eduSingleDiagnosisRecordCode);
                });

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
    };
    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        // $state.go(app.paperDetail({'paperCode':data.diagnosisPaperCode});
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    };

    var teacherList;
    var url = $scope.app.host + "/teaching/organization/teacher/list?requestId=test123456";
    $http.post(url,{"type": 1}).success(function(data){
        console.log(data);
        $scope.teacherList = data.result;
        var teacherList = data.result;
        
    }).error(function(data){
        console.log(data);
    });

    //$scope.items = [ 'angularjs', 'backbone', 'canjs', 'Ember', 'react' ];
    // open click
    $scope.open = function(size,diagnosticRecordsCodes,subjectCode,teacherList) {
        //console.log(diagnosticRecordsCodes);
        //console.log(subjectCode);
        //console.log(teacherList);
        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalDistributionCtrl', // specify controller for modal
            size : size,
            resolve : {
                diagnosticRecordsCodes : function(){
                   // return $scope.diagnosticRecordsCodes;
                    return diagnosticRecordsCodes;
                },
                teacherList : function(){
                    return $scope.teacherList;
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
    }

});

// modal controller 分配试卷
app.controller('ModalDistributionCtrl', function($scope,$http, $modalInstance,diagnosticRecordsCodes,teacherList,host) {
    //console.log(diagnosticRecordsCodes);
    //console.log(teacherList);
     //
    $scope.teacherList = teacherList;
    $scope.TeacherList = function(){
       
    }

    $scope.teacherCodes = []; //定义数组用于存放前端显示
    var str = ""; //
    var flag = ''; //是否点击了全选，是为a
    $scope.x = false; //默认未选中

    $scope.chk = function(z, x) { //单选或者多选

       
        if (flag == 'a') { //在全选的基础上操作
            str = $scope.teacherCodes.join(',') + ',';
        }
        if (x == true) { //选中
            str = str + z + ',';
        } else {
            str = str.replace(z + ',', ''); //取消选中
        }

        $scope.teacherCodes = (str.substr(0, str.length - 1)).split(',');
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
    //console.log($scope.teacherCodes );
    //手动分配试卷
    $scope.DistributionOk = function(round){
        //console.log(round);
        var url = host + '/teacher/diagnosis/distribution?requestId=test123456';
        $http.post(url,{
            "teacherCodes":$scope.teacherCodes,
            "diagnosticRecordsCodes":diagnosticRecordsCodes,
            "markRound": 0
        }).success(function(data){
            /**/
            //$modalInstance.close($scope.selected.item);
            $modalInstance.close(data);
            //console.log(data);
            if(data.result == true){
                alert("分配成功！");
                self.location.reload();//刷新本页面
            }
           // $scope.getList();

        }).error(function(data){
            console.log("fail");
        });
    };
});

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
    $scope.formData.departmentType = "1";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.aimType = "1";
    $scope.getList = function(page,size,callback){
        var url=$scope.app.host + "shortSlab/teaching/getShortSlabStudentList?requestId=test123456";
        $http.post(url,{
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "aimType":$scope.formData.aimType,
            "currentPage":page,
            "pageSize":size 
        }).success(function(data){
            if(data.message == "Success"){

                //console.log(data);
                $scope.results = data.result;

                var isAgreeArr = data.result.list;
              
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
        
    }
    //教学-确认同学不同意短板诊断 (拒绝短板诊断)
    $scope.DiagDisagree = function(jsonString){
        
        var id = jsonString.shortSlabAnalysisRecordCode;
        var url = $scope.app.host + '/shortSlab/teaching/diagnosis/disagree?requestId=test123456';
        $http.post(url,jsonString).success(function(data){
            if(data.message == "Success"){

                if(data.result == true){
                    self.location.reload();//刷新本页面
                }
            }
        }).error(function(data){
            console.log("fail!");
        })
    }
    //确认学生同意短板诊断
    $scope.AgreeShortSlabDiag = function(jsonString){
        var id = jsonString.shortSlabAnalysisRecordCode;
        var url = $scope.app.host + '/shortSlab/teaching/diagnosis/agree?requestId=test123456';
        $http.post(url,jsonString).success(function(data){
            if(data.message == "Success"){
                if(data.result == true){
                    self.location.reload();//刷新本页面
                }
            }
        }).error(function(data){
            console.log("fail!");
        })
    }
    
    //弹框  预约时间
    $scope.open = function(size,data) {
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalAppointmentCtrl', // specify controller for modal
            size : size,
            resolve : {
                host : function(){
                    return $scope.app.host;
                },
                data : function(){
                    return data;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(postData) {
            //console.log(postData);
            var id = postData.shortSlabAnalysisRecordCode;
            var startDate = postData.startDate;
            var endDate = postData.endDate;

            //$("#"+id).find("button#0").css("display","none");
            //$("#"+id).append(startDate+'-'+endDate);
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    }
    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    };
});
// 教学管理=>短板考试确认 => 预约时间modal controller
app.controller('ModalAppointmentCtrl', function($scope, $http,$modalInstance, data,host) {
        
    $scope.postData = {};
    $scope.postData.shortSlabAnalysisRecordCode = data.shortSlabAnalysisRecordCode; //短板分析结果记录code
    $scope.postData.broadcastBoothUrl = data.broadcastBoothUrl; //直播间地址
    $scope.postData.invigilatorTeacher = data.invigilatorTeacher; //监考老师

    //诊断时间
    $scope.groups = [{
        id: 1,
        name: '第一组时间',
        startDate : "2016-6-18 16:00:00",
        endDate : " 2016-6-18 18:00:00",
        group: '一组:5人',
        AM: '上午',
        active: true
    }, {
        id: 2,
        name: '第二组时间',
        startDate : "2016-6-19 16:00:00",
        endDate : " 2016-6-19 18:00:00",
        group: '一组:5人',
        active: false
    }, {
        id: 3,
        name: '第三组时间',
        startDate : "2016-6-20 16:00:00",
        endDate : " 2016-6-20 18:00:00",
        group: '一组:5人',
        PM: '下午',
        active: false
    }, {
        id: 4,
        name: '第四组时间',
        startDate : "2016-6-21 16:00:00",
        endDate : " 2016-6-21 18:00:00",
        group: '一组:5人',
        active: false
    }, {
        id: 5,
        name: '第五组时间',
        startDate : "2016-6-22 16:00:00",
        endDate : " 2016-6-22 18:00:00",
        group: '一组:5人',
        active: false
    }, {
        id: 6,
        name: '第六组时间',
        startDate : "2016-6-23 16:00:00",
        endDate : " 2016-6-23 18:00:00",
        group: '一组:5人',
        active: false
    }];

    $scope.getDate = function(data,id){

        $("#"+id).addClass('active').siblings().removeClass('active');
        $scope.postData.startDate = data.startDate;
        $scope.postData.endDate = data.endDate;
    }
    //教学-给学生添加预约短板考试时间 （预约时间）
    $scope.AppointmentOK = function(postData){
        var url = host + "/shortSlab/teaching/appointment?requestId=test123456";
        $http.post(url,{
            "shortSlabAnalysisRecordCode":$scope.postData.shortSlabAnalysisRecordCode ,
            "invigilatorTeacher":$scope.postData.invigilatorTeacher,
            "broadcastBoothUrl":$scope.postData.broadcastBoothUrl,
            "appointmentExamStartDate":$scope.postData.startDate,
            "appointmentExamEndDate": $scope.postData.endDate
        }).success(function(data){
            if(data.result == true){
                //console.log("时间："+$scope.postData.startDate +'-'+$scope.postData.endDate);
                $modalInstance.close(postData);
            }
        }).error(function(data){
            console.log("fail");
        });
    }   
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
    // $modalInstance.close($scope.selected.item);
    
});
/*短板考试监考*/
app.controller('MonitorController', function($scope, $http,$controller,$resource, $stateParams, $modal, $state,$localStorage,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承
    $scope.formData = {};
    if( $scope.formData.subjectCode == 1){
        $scope.formData.subjectName = "语文";
    }
    $scope.formData.departmentType = "1";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.aimType = "1";
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
    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    };
    $scope.allSubjectTypes = [];
    CalcService.filterData().then(function(b){
        $scope.allSubjectTypes = b.filterData;
    });
    //进入直播室
    $scope.enterLiveRoom = function(data){

        var temp={}; // 临时变量存放
        temp.preEnterLiveRoom = 10*60*1000; //  提前10分钟进入直播间
        $scope.mayEnter = data; //null; // 可进入直播间的时间段数据
        $scope.timeContents = {am:[],pm:[],empty:null}; //某一天的课程安排列表
        var myData = $localStorage.user;

        if(!$scope.mayEnter)return modalAlert({content:'时间还没到哦!'});
        var subjects = $scope.allSubjectTypes[$scope.mayEnter.subjectType];
        if(!subjects)return modalAlert({content:'抱歉，数据异常!'});
       /* app.teachManage.monitorRoom*/
       /* console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.monitorRoom', {
            jsonString: jsonString
        }, {
            reload: true
        });*/
        console.log(data);
        var room =  $modal.open({
            templateUrl: 'admin/teacherOpearteManage/enterLiveRoom.html',
            controller: 'EnterLiveRoomController',
            size:'lg',
            resolve:{ // $scope.mayEnter
                data:function(){
                    return {
                        teacherCode:myData.code,
                        baseHost: $scope.app.host,
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
    //获取所有学生 http://192.168.1.142:8080/'fullTeacher/invigilator/getUserList?requestId=test123',
    $http.post(data.baseHost+'shortSlab/teaching/invigilate/getStudentList?requestId=test123456',
        {
            "invigilatorTeacher":"1",
            "invigilatorClassCode":"test"
        }
/*{
            "eduDiagnosisGoodsDetailCode":data.temp.eduDiagnosisGoodsDetailCode, // 1
            "eduDiagnosisGoodsCode":data.temp.eduDiagnosisGoodsCode  // "0A6E061EDB2B4AAC864FDAB787EB17C8"
        }*/
    ).then(function(re){
            if(re.data&&re.data.code=="Success"){
                console.log(re.data.result);
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
// alert优雅弹框
app.controller('WarningController', function($scope, $modalInstance,data){

    $scope.warning = data.content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});
/*短板诊断判卷*/
app.controller('ShortBoardDiagCtrl', function($scope,$http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });
    $scope.formData = {};
    //根据学年、类型、学科、教材查询短板诊断判卷列表
    $scope.formData.departmentType = "1";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.aimType = "1";
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
    };
    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        // $state.go(app.paperDetail({'paperCode':data.diagnosisPaperCode});
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    };
    //判卷操作
    //复审判卷操作
    $scope.markReview=function(data){
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go("app.teachManage.MarkPaperDetail",{jsonString: jsonString}, {reload: true});
    }
});


/*短板加课确认*/

app.controller('ShortBoardClassCtrl', function($scope,$http,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });
    //根据类型、地区、总分数、用户名不符合名单通知确认
    $scope.formData = {};
    $scope.formData.departmentType = "1";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.aimType = "2";

    $scope.getList = function(page,size,callback) {
        var url=$scope.app.host + "/shortSlab/teaching/getShortSlabStudentList?requestId=test123456";
        $http.post(url,{
            "departmentType":$scope.formData.departmentType,
            "subjectCode":$scope.formData.subjectCode,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "aimType":$scope.formData.aimType,
            /*"isAgreeAddHour":isAgreeHour,*/
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
    };
    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        // $state.go(app.paperDetail({'paperCode':data.diagnosisPaperCode});
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    };

    //确认学生同意添加课时
    $scope.AgreeAddClassHour = function(shortSlabAnalysisRecordCode){
        var url = $scope.app.host + '/shortSlab/teaching/period/agree?requestId=test123456';
        $http.post(url,{
            "shortSlabAnalysisRecordCode":shortSlabAnalysisRecordCode 
        }).success(function(data){
            //console.log(data);
            if(data.result == true){
                self.location.reload();//刷新本页面
            }
        }).error(function(data){
             console.log('fail');
        });
    };
    //确认学生不同意添加课时
    $scope.DisAgreeAddClassHour = function(shortSlabAnalysisRecordCode){
        var url = $scope.app.host + '/shortSlab/teaching/period/disagree?requestId=test123456';
        $http.post(url,{
            "shortSlabAnalysisRecordCode":shortSlabAnalysisRecordCode 
        }).success(function(data){
            if(data.result == true){
                self.location.reload();//刷新本页面
            }
        }).error(function(data){
             console.log('fail');
        });
    }
});
/*不符合名单通知确认*/
app.controller('NotConformCtrl', function($scope, $http, $controller, $resource, $stateParams, $modal, $state, CalcService) {
    $controller('ParentGetDataCtrl', {
        $scope: $scope
    }); //继承


    // 文理Tab 切换
    $scope.tabs = [{
        title: '理科',
        code:1,
        url: 'one.tpl.html'
    }, {
        title: '文科',
        code:0,
        url: 'two.tpl.html'
    }];
    $scope.artType=1;
    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function(tab) {
        $scope.artType=tab.code;
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }


    $scope.formData = {};
    //根据类型、地区、总分数、用户名不符合名单通知确认 (不符合VIP学生列表)
    $scope.getList = function(page, size, callback) {
        var url = $scope.app.testhost + '/student/unnatural/list?requestId=1';
        console.log(url);
        $http.post(url, {
            "pageNumber": page,
            "pageSize": parseInt(size),
            "studentObjective":$scope.formData.studentObjective,
            "minTotalScore": $scope.formData.minTotalScore,
            "type":$scope.artType,
            "maxTotalScore": $scope.formData.maxTotalScore
        }).success(function(data) {
            if(data.message == "Success") {
                console.log(data);
                $scope.results = data.result;

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data) {
            console.log("fail!");
        })
    }
    //通知确认操作
    $scope.notice = function(studentCode) {
        console.log(studentCode);
        $http.post($scope.app.host + '/teaching/phone/agree?requestId=SDFDW3F343JLKL3L5LN43J434', {
            "studentCode": studentCode
        }).success(function(data) {
            if(data.message == "Success") {
                console.log(data);
                $scope.getList(1, 5);
            }
        }).error(function(data) {
            console.log("fail!");
        })

    }
    //赠送操作
    $scope.giveToUser = function(studentCode) {
        $http.post($scope.app.host + '/teaching/giveToStudent?requestId=SDFDW3F343JLKL3L5LN43J434', {
            "studentCode": studentCode
        }).success(function(data) {
            if(data.message == "Success") {
                console.log(data);
                $scope.getList(1, 5);
            }
        }).error(function(data) {
            console.log("fail!");
        })
    }

});

/*分班*/
app.controller('DividingClassesCtrl', function($scope, $http,$log,$controller,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope });
    //分班 文理科 Tab 切换
    $scope.code = 1;
    $scope.tabs = [{
        title: '文科',
        code : 0,
        url: 'one.tpl.html'
    }, {
        title: '理科',
        code:1,
        url: 'two.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function(tab) {
        $scope.code = tab.code ; 
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

    //全选
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
    $scope.formData = {};
    $scope.formData.studentObjective = 1; //目标类型默认为二本
    $scope.formData.minTotalScore = 1;
    $scope.formData.maxTotalScore = 600;
    $scope.getList = function(page,size,callback) {
        var url = $scope.app.testhost + 'student/accord/list?requestId=123456';//符合vip学生列表
        $http.post(url,{    
            "pageNumber": page,
            "pageSize": size,
            "studentObjective":$scope.formData.studentObjective,
            "minTotalScore":$scope.formData.minTotalScore,
            "maxTotalScore":$scope.formData.maxTotalScore
            /*""*/
        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){

                $scope.results = data.result;
                var list = data.result.list;
                console.log(list);
                $scope.tesarry = []; //初始化数据
                angular.forEach(list, function(data){
                    $scope.tesarry.push(data.studentCode);
                });

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
    }
    // open click
    $scope.open = function(size,userCodeList) {
        console.log(userCodeList);
         if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ClassesController', // specify controller for modal
            size : size,
            resolve : {
                host : function() {
                    return $scope.app.host;
                },
                userCodeList : function(){
                    return userCodeList;
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
app.controller('ClassesController', function($scope,$http, $controller,$modalInstance,host,userCodeList ) {
    $controller('getSchoolInfo', { $scope: $scope });
    
    //得到班级
    $scope.getClassesList = function(code){
        //console.log(code);
        var url = host + '/teaching/organization/list?requestId=test123456';
        $http.post(url,{
            "pageSize":20,
            "pageNumber":1,
            "type":6,
            "centerCode":code 
        }).success(function(data){
            console.log(data);
            $scope.results = data.result;

        }).error(function(data){
            console.log('fail');
        })
    }
    //选中的班级
    $scope.selectedClasses = function(data){
        $scope.data = data;
        //console.log(data);
        var id = data.code;
        console.log(id);
        $("#"+id).addClass('active').siblings().removeClass('active');
        //return data;
    }
    //分班 ok
    $scope.placementOk = function(){
        console.log( $scope.data);
        //console.log($scope.selectedClasses());
        //$modalInstance.close($scope.selected.item);
        /*var url = host + 'teaching/placement?requestId=SDDL234LSDK';*/
        var url = host + 'teaching/placement?requestId=SDDL234LSDK';
        $http.post(url,{
            "schoolCenterCode":$scope.data.centerCode,
            "schoolClassCode":$scope.data.code,
            "userCodeList":userCodeList
        }).success(function(data){
            if(data.result.placement == false){
                alert("您已经分过班了");
            }

        }).error(function(data){
            console.log("fail");
        })
    }
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

});
/*分班后确认*/
app.controller('DividClassesConfrimCtrl', function($scope, $http, $controller, $resource, $stateParams, $modal, $state) {
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	});
	//根据类型、地区、总分数、单科学科、分数、上课时间查询列表

	//分班后确认 Tab 切换
	$scope.tabs = [{
		title: '理科',
		code:1,
		url: 'one.tpl.html'
	}, {
		title: '文科',
		code:0,
		url: 'two.tpl.html'
	}];
	$scope.artType=1;
	$scope.currentTab = 'one.tpl.html';

	$scope.onClickTab = function(tab) {
		$scope.artType=tab.code;
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}

	$scope.getList = function(page, size, callback) {
		var url = $scope.app.host + 'student/accord/list?requestId=1';
			console.log(url);
			$http.post(url, {
				"pageNumber": 1,
				"pageSize": 10,
				"type":$scope.artType
			}).success(function(data) {
			console.log(data);
			if(data.message == "Success") {

				$scope.results = data.result;

				$scope.totalPage = data.result.totalPage;
				callback && callback(data.result);

			}
		}).error(function(data) {
			console.log("fail");
		})
	}
	
	
	//拒绝上课
	$scope.refuse=function(studentCode){
		$http.post($scope.app.host + '/teaching/placement/disagree?requestId=SDFDW3F343JLKL3L5LN43J434', {
			"studentCode": studentCode
		}).success(function(data) {
			if(data.message == "Success") {
				console.log(data);
				$scope.getList(1, 5);
			}
		}).error(function(data) {
			console.log("fail!");
		})
		
	}
	//同意上课
	$scope.agree=function(studentCode){
		$http.post($scope.app.host + '/teaching/placement/agree?requestId=SDFDW3F343JLKL3L5LN43J434', {
			"studentCode": studentCode
		}).success(function(data) {
			if(data.message == "Success") {
				console.log(data);
				$scope.getList(1, 5);
			}
		}).error(function(data) {
			console.log("fail!");
		})
		
	}
	//确认缴费
	$scope.confirmPayment=function(studentCode){
		$http.post($scope.app.host + '/teaching/payAgree?requestId=SDFDW3F343JLKL3L5LN43J434', {
			"studentCode": studentCode
		}).success(function(data) {
			if(data.message == "Success") {
				console.log(data);
				$scope.getList(1, 5);
			}
		}).error(function(data) {
			console.log("fail!");
		})
		
	}
	
	
});

/*监考老师*/
app.controller('MonitorTeacherCtrl', function($scope, $http,$controller,$resource, $stateParams, $state) {

     //全选
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
        //console.log($scope.choseArr);
    };
    //获取九大学科
    $scope.getSubject = function(){
        $http.post('admin/json/subject.json').success(function(data){
           $scope.subjects = data.subject;
        }).error(function(data){
            console.log("fail");
        })
    };
    $scope.subjectCode = 0;
    //获取获取监考老师分页列表
    $scope.getList = function(subjectCode,page,size,callback){
        //$scope.getSubject();
        //console.log(subjectCode);
        var url = $scope.app.host + 'teaching/organization/invTeacher/page?requestId=test123456';
        $http.post(url,{
            "pageNumber":page,
            "pageSize":size,
            "subjectCode": subjectCode,
            "invigilator":0
        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){

                $scope.results = data.result;
                var list = data.result.list;
                $scope.tesarry = []; //初始化数据
                angular.forEach(list, function(data){
                    $scope.tesarry.push(data.code);
                });

                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        });
    };
    //添加监考老师
    $scope.AddMonitorTeacher = function(choseArr){
        console.log(choseArr);
        var url = $scope.app.host + 'teaching/add/invigilateTeacher?requestId=SDDL234LSDK';
        $http.post(url,{
            "teacherCodes":choseArr
        }).success(function(data){
            if(data.result.addInvigilateTeacher == true){
                self.location.reload();//刷新本页面
            }
        }).error(function(data){
            console.log("fail");
        });
    }

});
/*chart*/
/*
app
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
}]);*/


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
