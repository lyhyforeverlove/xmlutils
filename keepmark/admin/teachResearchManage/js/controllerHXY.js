'use strict';

/*阅卷复审*/
app.controller('MarkReviewController', function($scope, $resource, $http, $modal, $state,$controller,CalcService) {
    $controller('getValue', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    //渲染筛选信息
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    $scope.poor1 = 0;
    $scope.poor2 = 20;
    $scope.point1 = 0;
    $scope.point2 = 400;
    //默认信息
    $scope.formData = {
        "departmentType": 1,
        "subjectCode": 1,
        "bookVersionCode": 1,
        "distributionState":"1"
    };
    $scope.poor = function(value,name){
        $scope[name] = value;
    }
    //数组排序
    $scope.arrsort = function(type){
        $scope.result.sort(function(value1,value2){
            var num1 = $scope.D_value(value1.subjectivityOneScore,value1.subjectivityTwoScore);
            var num2 = $scope.D_value(value2.subjectivityOneScore,value2.subjectivityTwoScore);
            if(num1 > num2){
                return type == 0 ? -1 : 1;
            } else {
                return type == 0 ? 1 : -1;
            }
        })
    }
    //根据学年、类型、学科、教材 查询诊断列表
    $scope.query = function (page, size, callback) {
        $http.post($scope.app.testhost + '/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456', {
            "gradeCode": "33",
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode": $scope.formData.bookVersionCode,
            "distributionState": $scope.formData.distributionState,
            "currentPage": page,
            "pageSize": size
        }).success(function (data) {
                console.log(data);
                var result = data.result.list;
                //分数过滤
                var arr = [];
                for(var i=0; i< result.length; i++){
                    var poor = $scope.D_value( result[i].subjectivityOneScore, result[i].subjectivityTwoScore);
                    var point = result[i].impersonalityScore;
                    if($scope.formData.distributionState == 0){
                        if(poor >= $scope.poor1 && poor <= $scope.poor2 && point >= $scope.point1 && point <= $scope.point2){
                            arr.push(result[i]);
                        }
                    } else {
                        if(poor >= $scope.poor1 && poor <= $scope.poor2){
                            arr.push(result[i]);
                        }
                    }
                }
                $scope.result = arr;
                $scope.totalPage = arr.totalPage;
                callback && callback(data.result);
            });
    }

    //阅卷复审 Tab 切换
    $scope.tabs = [{
        title: '未复审',
        url: 'one.tpl.html'
    }, {
        title: '已复审',
        url: 'two.tpl.html'
    }];
    $scope.currentTab = 'one.tpl.html';
    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    $scope.isActiveTab = function (tabUrl) {
        return tabUrl == $scope.currentTab;
    }
    //计算差值
    $scope.D_value = function (value1, value2) {
        return Math.abs(value1 - value2);
    }
    /* //复审
     $scope.examine = function(){
     $http.post($scope.app.host + '/section/diagnosis/review?requestId=test123456', {
     "diagnosticRecordsCode":"code1",
     "markType":"1",
     "singleScore":"60",
     "subjectivityScore":"10",
     "teacherCode":"code1",
     "teacherName":"test",
     "markModels":[{
     "answerRecordCode":"code",
     "questionScore":"10",
     "score":"2",
     "surfaceScore":"1",
     "errorProductions":[{
     "knowledgeName":"test",
     "knowledgeCode":"code1",
     "productionName":"ptest",
     "productionCode":"pcode1"
     },
     {
     "knowledgeName":"test",
     "knowledgeCode":"code1",
     "productionName":"ptest",
     "productionCode":"pcode1"
     }],
     "questionType":"1",
     "sentenceResult":"1"
     }]
     })
     .success(function (data) {
     console.log(data);
     });
     }*/
});
/*学生分类=》符合VIP报分短板分析*/
app.controller('ConfromToVipCtrl', function($scope, $http, $controller, CalcService) {
    $controller('getValue', {$scope: $scope});//继承
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('constAll', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    $scope.formData = {};
    //默认选中函数
    function checked(data,ele,value){
        for(var i=0; i<data.length; i++){
            if(data[i].checked == true){
                ele.eq(i).prop("checked",true);
                $scope.formData[value] = data[i][value];
                break;
            }
        }
    }
    //默认值
    $scope.formData.departmentType = "1";
    $scope.aimType = "1";
    $scope.formData.isShortlabStatus = "1";
    $scope.formData.totalStart = "400";
    $scope.formData.totalEnd = "600";
    $scope.formData.paperUseType = "1";
    $scope.formData.city = "1";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //排序
    $scope.arrsort = function(type){
        $scope.result.sort(function(value1,value2){
            if(value1.totalScore > value2.totalScore){
                return type == 0 ? -1 : 1;
            } else {
                return type == 0 ? 1 : -1;
            }
        })
    }
    //目标分类
    $scope.target = function(type){
        var arr = [];
        $.each($scope.data.result.list,function(index,item){
            if(item.studentObjective == type){
                arr.push(item);
            }
        })
        $scope.result = arr;
    };
    //根据类型、地区、总分数 查询列表
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.host + '/shortSlab/list?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,
            "aimType":$scope.aimType,
            "isShortlabStatus":$scope.formData.isShortlabStatus,
            "startTotalScore":$scope.formData.totalStart,
            "endTotalScore":$scope.formData.totalEnd,
            "areaCode":$scope.formData.city,
            "currentPage": page,
            "pageSize":size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    };
});
/*学生分类=》短板确认*/
app.controller('SBConfrimCtrl', function($scope, $controller,CalcService, $http) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('getValue', {$scope: $scope});//继承
    $controller('constAll', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
      //默认选中函数
    function checked(data,ele,value){
        for(var i=0; i<data.length; i++){
            if(data[i].checked == true){
                ele.eq(i).prop("checked",true);
                $scope.formData[value] = data[i][value];
                break;
            }
        }
    }
    //默认值
    $scope.formData = {};
    $scope.formData.departmentType = "0";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "0";
    $scope.formData.aimType = "1";
   //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //目标分类
    $scope.target = function(type){
        var arr = [];
        $.each($scope.data.result.list,function(index,item){
            if(item.studentObjective == type){
                arr.push(item);
            }
        })
        $scope.result = arr;
    }
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.testhost + '/shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": "1",          //$scope.formData.departmentType
            "subjectCode": "1",             //$scope.formData.subjectCode,
            "bookVersionCode": "1",         //$scope.formData.bookVersionCode,
            "aimType": "1",                 //$scope.formData.aimType,
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    }
});
/*学生分类=》短板加课时排课*/
app.controller('SBAddClassCtrl',function($scope, $controller, CalcService, $http, $state) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('getValue', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $scope.formData = {};
    //默认值
    $scope.formData.departmentType = "1";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "national001";
    $scope.formData.aimType = "1";
    $scope.formData.Hour = "1";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    var $wrapPop = $(".wrapPop");
    var $innerPop = $(".innerPopBox");
    //添加课时
    $scope.addHour = function(code){
        $wrapPop.show(10);
        $innerPop.show(10);
        $scope.newCode = code;
    };
    $scope.ok = function(){
        $wrapPop.hide(10);
        $innerPop.hide(10);
        $http.post($scope.app.testhost + '/shortSlab/section/add/period?requestId=test123456', {
            "shortSlabAnalysisRecordCode":$scope.newCode,
            "addHourNumber":$scope.formData.Hour
        })
            .success(function (data) {
                console.log(data);
                $scope.query();
            });
    }
    $scope.cancel = function(){
        $wrapPop.hide(10);
        $innerPop.hide(10);
    }
    //根据学年、类型、学科、教材 查询列表
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.host + '/shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": "1",          //$scope.formData.departmentType
            "subjectCode": "1",             //$scope.formData.subjectCode,
            "bookVersionCode": "1",         //$scope.formData.bookVersionCode,
            "aimType": "1",                 //$scope.formData.aimType,
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    }
});
//弹窗
app.controller('categoryCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.open = function(size,city) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            city: city,
            resolve: {
                items: function() {
                    return size;
                },
                city:function(){
                    return city;
                }
            }
        });
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
}]);
//弹窗调用控制器
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', '$http',function($scope, $modalInstance, items, $http) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items
    };
    //短板分析
    $scope.shortBoard = function(code,city,display){
        if(!code || !display || !city){
            return;
        }
        $modalInstance.close($scope.selected.item);
        var data = $scope.selected.item;
        var arr = [];
        if(data.length){
            var $input = $("#confromToVipTbody").find(".constAll").children("input:checkbox");
            $.each($input,function(index,item){
                if($(item).prop("checked") == true){
                    arr.push(data[index]);
                }
            })
        } else {
            arr.push(data);
        }
        console.log(arr);
        $.each(arr,function(index,item){
            $http.post(window.testhost + "/shortSlab/section/add/Subject?requestId=test123456",{
                "diagnosticRecordsCode":item.eduStudentDiagnoseResultCode,        //$scope.selected.item.eduStudentDiagnoseResultCode ,
                "studentCodes":[item.studentCode],      //$scope.selected.item.studentCode
                "subjectCode": code,         //code
                "bookVersionCode":item.areaCode,                     //$scope.selected.item.areaCode
                "areaCode":"1"                              //city
            }).success(function(data){
                console.log(data);
               //location.reload(true);
            })
        })

    };
    //添加课程类型
    $scope.changeCourseType = function(code){
        $modalInstance.close($scope.selected.item);
        console.log($scope.selected.item.code)
        $http.post(window.testhost + '/section/update/LessionLevel?requestId=test123456', {
            "code":$scope.selected.item.code,
            "lessonLevel":code
        })
            .success(function (data) {
                console.log(data);
                location.reload(true);
            });
    };
    //添加短板诊断用卷
    $scope.addShortBoardDiag = function(){
        $modalInstance.close($scope.selected.item);
        var $shortBoardBox = $("#shortBoardController").find(".isChecked");
        var $SBConfrimCtrlBox = $("#SBConfrimCtrl").find(".isChecked");
        //获取试卷Code
        var $aInput = $shortBoardBox.find("input:radio");
        for(var i=0; i<$aInput.length; i++){
            if($($aInput).eq(i).prop("checked") == true){
                $scope.diagnosisPaperCode = $($aInput).eq(i).siblings("input:hidden").val();
                break;
            }
        }
        //获取短板分析Code
        var $inputs = $SBConfrimCtrlBox.find("input:checked");
        var arr = [];
        $.each($inputs,function(index,item){
            if($(item).prop("checked") == true){
                if($scope.selected.item){
                    if($(item).siblings("input").val() != $scope.selected.item.eduVulnerabilityAnalyzeRecordCode){
                        arr.push($(item).siblings("input").val());
                    }
                } else {
                    arr.push($(item).siblings("input").val());
                }
            }
        });
        if($scope.selected.item){
            arr.push($scope.selected.item.eduVulnerabilityAnalyzeRecordCode);
        }
        $.each(arr,function(index,item){
            $http.post(window.host1 + '/shortSlab/section/add/paper?requestId=test123456', {
                "shortSlabAnalysisRecordCode":item,
                "paperCode":$scope.diagnosisPaperCode
            })
                .success(function (data) {
                    console.log(data);
                    location.reload(true);
                });
        })
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
/*更换学生课程类型*/
app.controller('ChangeCourseTypeCtrl', function($scope, $http, $controller, CalcService) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('getValue', {$scope: $scope});//继承
    //默认选中函数
    function checked(data,ele,value){
        for(var i=0; i<data.length; i++){
            if(data[i].checked == true){
                ele.eq(i).prop("checked",true);
                $scope.formData[value] = data[i][value];
                break;
            }
        }
    }
    //默认值
    $scope.formData = {};
    $scope.formData.departmentType = "all";
    $scope.formData.aimType = "all";
    $scope.formData.classes = "all";
    $scope.formData.center = "all";
    $scope.formData.studentType = "all";
    $scope.formData.inScrollYear = "all";

    //班级默认值（点击中心后）
    $scope.first = function(){
        if($scope.formData.classes){
            $scope.formData.classes = "09d4eefcbb924c1fb529f0d27c641295";
        }
    };
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //根据类型、目标、中心、班级 查询列表
    $scope.query = function(page,size,callback) {
        var obj = {};
        for(var key in $scope.formData){
            if($scope.formData[key] != "all"){
                if(key == "inScrollYear"){
                    obj[key] = $scope.getScrollYearName($scope.formData[key]);

                } else {
                    obj[key] = $scope.formData[key];
                }
            }
        }
        //console.log(obj);//数据用obj代替（选全部时不传数据）
        $http.post($scope.app.host + 'section/change/students?requestId=test123456', {
            "targetType": "1",
            "accessionYear": "2016",
            "artType": 1,
            /*"centerCode": "62c60cc618d64f2fa80787647bbe3e78",
             "classCode": "7ea1fd8c6ca942ea8a4ac76c0cb28f5b",*/
            "examAttr": "1",
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.authStudentModels;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    }
});
/*试卷详情*/
app.controller("testpaperController",function($scope,$http, $controller, CalcService){
    $controller('getValue', {$scope: $scope});//继承
    var code = sessionStorage.getItem("testpaperCode");
    $http.post($scope.app.host + '/diagnosis/detail?requestId=test123456', {
        "paperCode": code     //code
    }).success(function (data) {
        $scope.testpaper = data.result.paperDetailDto;
    });
    $scope.goLast = function(){
        history.go(-1);
    }
});