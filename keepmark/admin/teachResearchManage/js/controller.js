'use strict';

/*阅卷复审*/
/*阅卷复审*/
app.controller('MarkReviewController', function($scope, $resource, $http, $modal, $state,$controller,CalcService) {
    $controller('getValue', {$scope: $scope});//继承
    //渲染筛选信息
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    $scope.template = {url: "admin/common/tpl/filter.html"};
    $scope.poor1 = 70;
    $scope.poor2 = 80;
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
            "distributionState": "1",
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                var result = data.result.list;
                var poor = $scope.D_value($scope.poor1,$scope.poor2);
                var arr = [];
                for(var i=0; i< result.length; i++){
                    if($scope.D_value( result[i].subjectivityOneScore, result[i].subjectivityTwoScore) <= poor){
                        arr.push(result[i]);
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
    //默认信息
    $scope.formData = {
        "departmentType": 1,
        "subjectCode": 1,
        "bookVersionCode": 1
    };
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
/*学生分类*/
app.controller('StudentCategoryCtrl', function($scope, $http, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、年份、总分数、单科学科查询列表
    $scope.query = function(page,size,callback) {

    }
});
/*学生分类=》符合VIP报分短板分析*/
app.controller('ConfromToVipCtrl', function($scope, $http, $controller, CalcService) {
    $controller('getValue', {$scope: $scope});//继承
    $controller('getJsonData', {$scope: $scope});//继承
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
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "1";
    $scope.aimType = "1";
    $scope.formData.isShortlabStatus = "1";
    $scope.formData.totalStart = "400";
    $scope.formData.totalEnd = "600";
    $scope.formData.paperUseType = "1";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //已选总数
    $scope.num = 0;
    var $Box = $("#confromToVip");
    $scope.constAll = function(type){
        var $input = $Box.find(".const");
        var num = 0;
        $.each($input,function(index,item){
            $(item).prop('checked',type);
            if($(item).prop('checked') == true){
                num++;
            }
        })
        $scope.num = num;
    }
    $scope.const = function(){
        var $input = $Box.find(".const");
        var num = 0;
        $.each($input,function(index,item){
            if($(item).prop('checked') == true){
                num++;
            }
        })
        $scope.num = num;
    }
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
    }
    //根据类型、地区、总分数 查询列表
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.host + '/shortSlab/list?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,
            "bookVersionCode":$scope.formData.bookVersionCode,
            "aimType":$scope.aimType,
            "isShortlabStatus":$scope.formData.isShortlabStatus,
            "startTotalScore":$scope.formData.totalStart,
            "endTotalScore":$scope.formData.totalEnd,
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
    //获取诊断卷详情
    $scope.getJuan = function(code){
        $http.post($scope.app.host + '/diagnosis/detail?requestId=test123456', {
            "paperCode": "796EBDDCBDF7492CB7CCDA5729817767"     //code
        })
            .success(function (data) {
                console.log(data);
            });
    }
});
/*学生分类=》短板确认*/
app.controller('SBConfrimCtrl', function($scope, $controller,CalcService, $http) {
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
    $scope.formData.departmentType = "0";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "0";
    $scope.formData.aimType = "1";
    $scope.getSubject($scope.formData.departmentType);       //获取教材
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //获取诊断卷详情
    $scope.getJuan = function(code){
        $http.post($scope.app.host + '/diagnosis/detail?requestId=test123456', {
            "paperCode": "796EBDDCBDF7492CB7CCDA5729817767"     //code
        })
            .success(function (data) {
                console.log(data);
            });
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
    }
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.host + '/shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": "0",          //$scope.formData.departmentType
            "subjectCode": "1",             //$scope.formData.subjectCode,
            "bookVersionCode": "0",         //$scope.formData.bookVersionCode,
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
app.controller('SBAddClassCtrl', function($scope, $controller, CalcService, $http) {
    $controller('getJsonData', {$scope: $scope});//继承
    $scope.formData = {};
    //默认值
    $scope.formData.departmentType = "0";
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
        $wrapPop.show(300);
        $innerPop.show(300);
        $scope.newCode = code;

    }
    $scope.ok = function(){
        $wrapPop.hide(300);
        $innerPop.hide(300);
        $http.post($scope.app.host + '/shortSlab/section/add/period?requestId=test123456', {
            "shortSlabAnalysisRecordCode":$scope.newCode,
            "addHourNumber":$scope.formData.Hour
        })
            .success(function (data) {
                console.log(data);
                if(data.httpCode == 200) {
                    alert("课时添加成功");
                }
            });
    }
    $scope.cancel = function(){
        $wrapPop.hide(300);
        $innerPop.hide(300);
    }
    $scope.getHour = function(id,code){

    }
    //根据学年、类型、学科、教材 查询列表
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.host + '/shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": "0",          //$scope.formData.departmentType
            "subjectCode": "1",             //$scope.formData.subjectCode,
            "bookVersionCode": "0",         //$scope.formData.bookVersionCode,
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
    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return size;
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
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', '$http', function($scope, $modalInstance, items, $http, locals) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items
    };
    //调取更换课程类型接口
    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
        //console.log($scope.selected.item);    更改课程列表数据集
        $http.post(window.testhost + "/section/update/studentLevel?requestId=test123456",{
            "studentCode":"WER3L342LJ3J23DSDJSL3",
            "studentLevel":"2"
        }).success(function(data){
            console.log(data);
        })
    };
    //分目标-修改学生状态表
    $scope.studentClassify = function(){
        $modalInstance.close($scope.selected.item);
        //console.log($scope.selected.item);
        //获取已选多选框的targetType值。
        var arr  = [];
        var $input = $(".studentCategoryChecked input");
        for(var i=0; i<$input.length; i++){
            if($input.eq(i).prop("checked") == true){
                arr.push($input.eq(i).parents("tr").find("input:hidden").val());
            }
        }
        //获取修改学生状态值（对应的数字）
        var $options = $(".showHideControllerSelect option");
        for(var j=0; j<$options.length; j++){
            if($options.eq(j).prop("selected") == true){
                var value = $options.eq(j).val();
            }
        }
        $.each(arr,function(item){
            $http.post(window.testhost + "/section/distribute/target?requestId=test123456",{
                "studentCode":"WER3L342LJ3J23DSDJSL3",      //后期用item代替
                "targetType":value
            }).success(function(data){
                console.log(data);
            })
        })

    };
    //短板诊断
    $scope.shortBoard = function(code,display){
        //$modalInstance.close($scope.selected.item);
        if(!code || !display){
            return;
        }
        $http.post(window.testhost + "/shortSlab/section/add/Subject?requestId=test123456",{
            "diagnosticRecordsCode":$scope.selected.item.eduStudentDiagnoseResultCode ,
            "studentCodes":["123"],      //$scope.selected.item.studentCode
            "subjectCode": code,
            "bookVersionCode":$scope.selected.item.areaCode
        }).success(function(data){
            console.log(data);
            if(data.httpCode == "200"){
                alert("短板课程创建成功");
            }
        })
    };
    //添加课程类型
    $scope.changeCourseType = function(index){
        $modalInstance.close($scope.selected.item);
        console.log(index);

    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
/*学生分类=》不符合名单*/
app.controller('NotConformCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数查询不符合名单列表
    $scope.query = function() {

        }
        //不符合名单 Tab 切换
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
});
/*学生分类=》符合确认名单-课程分类*/
app.controller('CourseCategoryCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数、单科学科 查询列表
    $scope.query = function() {

    }
});
/*更换学生课程类型*/
app.controller('ChangeCourseTypeCtrl', function($scope, $http, $controller, CalcService) {
    $controller('getJsonData', {$scope: $scope});//继承
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
    $scope.formData.aimType = "1";
    $scope.formData.classes = "0";
    $scope.formData.center = "0";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //根据类型、目标、中心、班级 查询列表
    $scope.query = function(page,size,callback) {
               /* $http.post($scope.app.testhost + '/teacher/diagnosis/getDiagnosisRecordList?requestId=test123456', {
            "gradeCode": "1",
            "departmentType": "1",
            "subjectCode": "1",
            "bookVersionCode": "1",
            "distributionState": "1",
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });*/
    }
});
/*课程管理*/
app.controller('CourseListCtrl', function($scope, $http,$controller,$resource, $stateParams, $modal, $state,$log,CalcService) {
   
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    $scope.formData = {};
    /*//默认为语文
    $scope.formData.subjectCode = 1;
    //默认班型
    $scope.formData.aaa = "c_001";
    //默认保分类型
    $scope.formData.categoriesCode = "001001";*/

    //根据考生类型、班型、保分类型、科目 查询列表
    $scope.getList = function(page,size,callback) {
        var url = $scope.app.testhost + "course/list?requestId=1";
        $http.post(url,{
            "aimType":  $scope.formData.aimType,
            "classType": $scope.formData.classType,
            "subjectCode": $scope.formData.subjectCode,
            "pageSize":size,
            "pageNumber":page
        }).success(function(data){
            if(data.message == "Success"){
                console.log(data);
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
            
        }).error(function(data){
            console.log("fail");
        });
    }

    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *//*,controller,selectedJson*/
    $scope.open = function(size) {
        //console.log(selectedJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'TeachingDistributeCtrl', // specify controller for modal
            size : size,
            resolve : {
                host : function(){
                    return $scope.app.host;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.formData.resourcePaperCode= selectedItem;

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
});
app.controller('TeachingDistributeCtrl', function($scope, $http,$controller,$modalInstance,$resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
     // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.formData.resourcePaperCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
   // $scope.load = function(page,size,callback){
       /* if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条

        var url = host + "/resource/get/papers?requestId=1";
        $http.post(url,V_PapersListJson).success(function(data) {

            $scope.results = data.result;

            callback && callback(data.result); //调取分页回调
        })*/
    //}
});
/*试卷管理=》详情*/
app.controller('CourseDetailController', function($scope, $http,$resource, $stateParams, $modal, $state) {

    var courseSystemCode = $stateParams.courseSystemCode;
    var url = $scope.app.host + '/course/detail?requestId=1';
    $scope.load = function(courseSystemCode){
        $http.post(url,{"courseSystemCode":courseSystemCode}).success(function(data){
            console.log(data);
            $scope.results = data.result;

        }).error(function(data){
            console.log("fail");
        })
    }

});
/*试卷管理=》单科诊断列表*/
app.controller('DiagListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
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
    var results;
    $scope.getList = function(page, size, callback) {
       $http.post($scope.app.host + 'diagnosis/list?requestId=test123456', {
                "subjectCode":$scope.formData.subjectCode,
                "bookVersionCode": $scope.formData.bookVersionCode,
                "paperUseType": $scope.formData.paperUseType,
                "currentPage": page,
                "pageSize": size
            })
            .success(function(data) {
                if(data.message = "success"){
                    console.log(data);
                    $scope.results = data.result;
                    results = data.result.list;
                    var subjectCode = data.result.list[0].subjectCode;
                    if(subjectCode == 1){
                        $scope.subjectName = "语文";
                    }
                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                }
               
            }).error(function(data){
                console.log("fail");
            });
    };


});
//
app.controller('DetailController', function($scope, $http, $resource, $stateParams, $modal, $state ) {
 
    var paperCode = $stateParams.paperCode;
    //获取诊断资源试卷详情
    $scope.load = function(){
        /*$state.go("app.teachResearchManage.detail");*/
        $http.post($scope.app.host + '/resource/get/paper/detail?requestId=test123456',
            {
                "paperCode": paperCode
            }).success(function(data){
                var results = angular.fromJson(data.result);
                
                $scope.examName = results.examName;//试卷名称
                $scope.question = results.questions[0].stem;
                //console.log(results.examName);
               /* var paperDetailDto = data.result.paperDetailDto;

                $scope.diagnosisName = paperDetailDto.diagnosisName;
                $scope.gradeCode = paperDetailDto.gradeCode;
                $scope.bookVersion = paperDetailDto.bookVersion;
                $scope.diagnosisType = paperDetailDto.diagnosisType;
                $scope.operator = paperDetailDto.operator;
                $scope.createTime = paperDetailDto.createTime;
                $scope.diagnosisImgUrl = paperDetailDto.diagnosisImgUrl;
                $scope.artsType = paperDetailDto.artsType;
                $scope.area = paperDetailDto.area;
                $scope.diagnosisExplanation = paperDetailDto.diagnosisExplanation;
                $scope.diagnosisStatus = paperDetailDto.diagnosisStatus;*/
            })
    }
})


/*
*试卷管理=》新增单科诊断用卷  //formData          controller=>CreateSingleController
*试卷管理=》组织全科诊断卷   //postData           controller=>CreateGroupController
*试卷管理=》阶段组织用卷     //stageFormData      controller=>CreateStageController
*课程管理=》新增课程         //formCourseData     controller=>CreateCourseController
*/
app.controller('CreateSingleController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "national001";
    $scope.formData.gradeCode = 33;

    //默认为短板诊断
    $scope.formData.paperUseType = 0;

    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

    $scope.getName = function() {
        $('#text_name').attr('disabled', 'disabled');
    };

    $scope.editName = function() {
        $('#text_name').removeAttr('disabled');
    }
   
    //多行文本框 默认标题  获取焦点清空
    var defaultTitle = '#诊断介绍说明#';
    var defaultPlaceholder = '（建议教学管理组给出统一模板，创建教师统一复制粘贴统一介绍说明即可）';
    $scope.placeholder = defaultTitle + ' ' + defaultPlaceholder;

    
    $scope.formData.describe = '';

    $scope.focus = function() {
       
        if (!$scope.formData.describe) {
            $scope.formData.describe = defaultTitle;
        }
    };

    $scope.blur = function() {
        if ($scope.formData.describe === defaultTitle) {
            $scope.formData.describe = '';
        }
    };

    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {

               // $scope.formData.coverUrl = result;
            });
    };

    $scope.submit = function(){
       /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
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
    }
   

    document.addEventListener('uploaded', function(e) {
        $scope.formData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
      
    });    

   
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller) {
        //console.log(selectedJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.formData.resourcePaperCode= selectedItem;

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    //组成单科诊断用卷
    $scope.createSingle = function(formData) {

        var url = $scope.app.host + "/section/diagnosis/paper/add?requestId=test123456";

        $http.post(url, formData).success(function(data) {
            //alert($scope.formData.resourcePaperCode);
            if($scope.formData.resourcePaperCode == null){
                alert("请添加诊断卷资源");
            }
            if(data.message == "success"){

                $state.go('app.teachResearchManage.diagExamList');
            }
            console.log(data);
        }).error(function(data) {
            console.log("fail");
        })
    };
    
    /*function postMultipart(url, data) {
        var fd = new FormData();
        angular.forEach(data, function(val, key) {
            fd.append(key, val);
        });
        var args = {
            method: 'POST',
            url: url,
            data: data,
            headers: {
                'Content-Type': undefined
            },
            transformRequest: angular.identity
        };
        return $http(args);
    }*/
    
});
//组织全科诊断卷
app.controller('CreateGroupController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    //组成全科postData对象
    $scope.postData = { };

    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

    $scope.getName = function() {
        $('#text_name').attr('disabled', 'disabled');
    };

    $scope.editName = function() {
        $('#text_name').removeAttr('disabled');
    }
   
    //多行文本框 默认标题  获取焦点清空
    var defaultTitle = '#诊断介绍说明#';
    var defaultPlaceholder = '（建议教学管理组给出统一模板，创建教师统一复制粘贴统一介绍说明即可）';
    $scope.placeholder = defaultTitle + ' ' + defaultPlaceholder;

    
    $scope.postData.describe = '';

    $scope.focus = function() {
       
        if (!$scope.postData.describe) {
            $scope.postData.describe = defaultTitle;
        }
    };

    $scope.blur = function() {
        if ($scope.postData.describe === defaultTitle) {
            $scope.postData.describe = '';
        }
    };

    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {

               // $scope.formData.coverUrl = result;
            });
    };

    $scope.submit = function(){
       /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
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
    }
   

    document.addEventListener('uploaded', function(e) {
        $scope.postData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
      
    });    

   
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller,codeJson) {
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                },
                codeJson : function(){
                    return codeJson;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.postData[codeJson.code] = selectedItem;

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }


    //默认类型为理科
    $scope.postData.departmentType = 1;

    /*
    *组成全科(文/理)诊断用卷
    */
    $scope.creteGroup = function(postData){
        var url = $scope.app.host +"/section/diagnosis/papers/add?requestId=test123456";
        $http.post(url,postData).success(function(data){
            console.log(data);
            $state.go('app.teachResearchManage.doubleList');
        }).error(function(data) {
            console.log("fail");
        })
    }
});
//新增阶考试用卷
app.controller('CreateStageController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    $scope.stageFormData = {};//组织阶段考对象

    $scope.stageFormData.diagnosisPaperCode = [];//诊断卷code列表
    
    $scope.stageFormData.departmentType = 1;//默认为理科
   
    $scope.stageFormData.stage = 1; //默认为第一阶段

    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

    $scope.getName = function() {
        $('#text_name').attr('disabled', 'disabled');
    };

    $scope.editName = function() {
        $('#text_name').removeAttr('disabled');
    }
   
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller,codeJson) {
        //console.log(selectedJson);
        //console.log(codeJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                },
                codeJson : function(){
                    return codeJson;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

           // console.log(selectedItem);
            $scope.stageFormData.diagnosisPaperCode.push(selectedItem);

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    
    /*
    *新增阶段考试用卷
    */
    $scope.createStage = function(stageFormData){
        var url = $scope.app.host +"section/diagnosis/stage/paper/add?requestId=test123456";

        $http.post(url,stageFormData).success(function(data){
            console.log(data);
            $state.go('app.teachResearchManage.stageList');
        }).error(function(data) {
            console.log("fail");
        })
    }
});
//新增课程
app.controller('CreateCourseController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {

    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    $scope.formCourseData = {}; //组织新增课程对象
    
    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

    $scope.getName = function() {
        $('#text_name').attr('disabled', 'disabled');
    };

    $scope.editName = function() {
        $('#text_name').removeAttr('disabled');
    }
   
    //多行文本框 默认标题  获取焦点清空
    var defaultTitle = '#诊断介绍说明#';
    var defaultPlaceholder = '（建议教学管理组给出统一模板，创建教师统一复制粘贴统一介绍说明即可）';
    $scope.placeholder = defaultTitle + ' ' + defaultPlaceholder;

    
    $scope.formCourseData.describe = '';

    $scope.focus = function() {
       
        if (!$scope.formCourseData.describe) {
            $scope.formCourseData.describe = defaultTitle;
        }
    };

    $scope.blur = function() {
        if ($scope.formCourseData.describe === defaultTitle) {
            $scope.formCourseData.describe = '';
        }
    };

    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {

               // $scope.formData.coverUrl = result;
            });
    };

    $scope.submit = function(){
       /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
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
    }
   

    document.addEventListener('uploaded', function(e) {
        $scope.formCourseData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
    });    

   
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller) {
        console.log(selectedJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.formData.resourcePaperCode= selectedItem;
            //$scope.formCourseData

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    /*
    *新增课程体系
    */
    //学科
    $scope.formCourseData.subjectCode = 2;
    //默认为全国卷一
    $scope.formCourseData.bookType = "national001";
    //默认学年为33
    $scope.formCourseData.gradeCode = 21;
    //默认保分类型
    $scope.formCourseData.bigCategoriesCode = "c_003";
    //默认班型
    $scope.formCourseData.categoriesCode = "002001";

    $scope.conf = [];
    $scope.AddCourse = function(){
        var url = $scope.app.host + "/course/add?requestId=1";
        $http.post(url,{
            "bookVersion":'352a6e5c2f894239881f380448faaedd',   //$scope.formData.bookType,
            "subjectCode":$scope.formCourseData.subjectCode,
            "gradeCode":$scope.formCourseData.gradeCode,
            "courseName":"aaabbbb",//$scope.formData.name,
            "courseImgUrl": "http:", //$scope.formData.coverUrl,
            "repositoryCourseCode":"22222222222",//$scope.formData.repositoryCourseCode ,
            "repositoryBigcourseCode":"c_001", //$scope.formData.bigCategoriesCode,
            "categoriesCode":"002", //$scope.formData.categoriesCode 
            "classType":$scope.formCourseData.classType
        }).success(function(data){
            console.log(data);

        }).error(function(data){
            console.log("fail");
        });
    }
});
/*根据学年、学科、教材版本、试卷用途、单元知识点code获取试卷列表*/
app.controller("getPapersController", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson) {
    
    $scope.formData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        $scope.formData.resourcePaperCode = resourcePaperCode;
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.formData.resourcePaperCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
    $scope.load = function(page,size,callback){
        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条

        var url = host + "/resource/get/papers?requestId=1";
        $http.post(url,V_PapersListJson).success(function(data) {

            $scope.results = data.result;

            callback && callback(data.result); //调取分页回调
        })
    }
});
//读取单科诊断试卷列表  组织全科弹框
app.controller("getPapersByDiagCtrl", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson,codeJson) {
    
    $scope.postData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        //console.log(resourcePaperCode);
        $scope.postData[codeJson.code] = resourcePaperCode;
        //$scope.postData.[codeJson] = resourcePaperCode;
         
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.postData[codeJson.code]);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
    $scope.load = function(page,size,callback){
       
        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条
        //console.log(V_PapersListJson);
        var url = host + "diagnosis/list?requestId=test123456";
        $http.post(url,V_PapersListJson).success(function(data) {

            //$scope.results = data.result;
            //callback && callback(data.result); //调取分页回调


            if(data.message = "success"){
                console.log(data);
                $scope.results = data.result;

                $scope.totalPage = data.result.totalPage;

                callback && callback(data.result);
            }
            
        }).error(function(data){
            console.log("fail");
        })
    }
});
//阶段考  弹框
app.controller("getPapersByDiagStageCtrl", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson) {
    
    $scope.stageFormData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        console.log(resourcePaperCode);
        $scope.stageFormData.diagnosisPaperCode = resourcePaperCode;
         
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.stageFormData.diagnosisPaperCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
    $scope.load = function(page,size,callback){
       
        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条
        //console.log(V_PapersListJson);
        var url = host + "diagnosis/list?requestId=test123456";
        $http.post(url,V_PapersListJson).success(function(data) {

            //$scope.results = data.result;
            //callback && callback(data.result); //调取分页回调


            if(data.message = "success"){
                //console.log(data);
                $scope.results = data.result;

                $scope.totalPage = data.result.totalPage;

                callback && callback(data.result);
            }
            
        }).error(function(data){
            console.log("fail");
        })
    }
});
//读取新增课程列表 弹框
app.controller("getPapersByCourseCtrl", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson) {
    
    $scope.formCourseData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        $scope.formCourseData.resourcePaperCode = resourcePaperCode;
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.formCourseData.resourcePaperCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
    $scope.load = function(page,size,callback){
        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条
        //console.log(V_PapersListJson);
        var url = host + "/course/getRepositoryCourse?requestId";
        $http.post(url,V_PapersListJson).success(function(data) {
            console.log(data);
            if(data.result == null){
                
                $scope.results = data.result;
                callback && callback(data.result); //调取分页回调
            }
        }).error(function(data){
            console.log("fail");
        })
    }
});



//试卷管理=》诊断全科试卷列表
app.controller('GroupListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
   $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    //$scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "national001";
    //默认为短板诊断
    $scope.formData.paperType = 1;
    
    $scope.getList = function(page, size, callback) {
           $http.post($scope.app.host + '/diagnosis/group/list?requestId=test123456', {
                    "paperType":$scope.formData.paperType,
                    "departmentType":$scope.formData.departmentType,
                    "bookVersionCode":$scope.formData.bookVersionCode,
                    "currentPage":page,
                    "pageSize":size
                })
                .success(function(data) {
                    if(data.message = "success"){
                        console.log(data);
                        $scope.results = data.result;

                        $scope.totalPage = data.result.totalPage;

                        callback && callback(data.result);
                    }
                }).error(function(data){
                    console.log("fail");
                });
    }   

});
app.controller('GroupsDetailCtrl', function($scope, $http,$resource, $stateParams, $modal, $state) {
    $scope.name = "诊断试卷组详情";

});


//试卷管理=》阶段考试卷列表
app.controller('StageListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

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
   // $scope.formData.paperUseType = 0;
    //默认目标类型为一本上线30分
    $scope.formData.aimType = 3;
    //默认为第几阶段
    $scope.formData.stage = 1;

    $scope.getList = function(page, size, callback) {
           $http.post($scope.app.host + '/diagnosis/stage/list?requestId=test123456', {
                    "gradeCode": $scope.formData.gradeCode,
                    "departmentType":$scope.formData.departmentType,
                    "subjectCode":$scope.formData.subjectCode,
                    "bookVersionCode": $scope.formData.bookVersionCode,
                    "stage":$scope.formData.stage,
                    "aimType": $scope.formData.aimType,
                    "currentPage":page,
                    "pageSize":size
                })
                .success(function(data) {
                    if(data.message = "success"){
                        console.log(data);
                        $scope.results = data.result;

                        $scope.totalPage = data.result.totalPage;

                        callback && callback(data.result);
                    }
                }).error(function(data){
                    console.log("fail");
                });
    }   

})









app.controller('teachResearchCtrl', function($scope) {
    //全选
    var selected = false;
    $scope.selectAll = function() {
        selected = !selected;
        angular.forEach($scope.data.results, function(item) {
            item.selected = selected;
        });
    }
})


/*符合VIP*/
app.controller('showHideController', function($scope) {
    $scope.isShow = true;
    $scope.showorhide = function() {
        $scope.isShow = !$scope.isShow;
    }
});






/*app.controller('modalDemo', function($scope, $modal, $log) {
    
})*/
