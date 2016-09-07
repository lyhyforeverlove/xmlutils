'use strict';

/*阅卷复审*/
app.controller('MarkReviewController', function($scope, $resource,$controller, $stateParams, $modal, $state,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    //阅卷复审 Tab 切换
    $scope.tabs = [{
        title: '未复审',
        url: 'one.tpl.html'
    }, {
        title: '已复审',
        url: 'two.tpl.html'
    }];

    $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function(tab) {
        $scope.currentTab = tab.url;
    }

    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }

});
/*学生分类*/
app.controller('StudentCategoryCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、年份、总分数、单科学科查询列表
    $scope.query = function() {

    }
});
/*学生分类=》符合VIP报分短板分析*/
app.controller('ConfromToVipCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数 查询列表
    $scope.query = function() {

    }
});
/*学生分类=》短板确认*/
app.controller('SBConfrimCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数 查询列表
    $scope.query = function() {

    }
});
/*学生分类=》短板加课时排课*/
app.controller('SBAddClassCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材 查询列表
    $scope.query = function() {

    }
});
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
app.controller('ChangeCourseTypeCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、目标、中心、班级 查询列表
    $scope.query = function() {

    }
});
/*课程管理*/
app.controller('CourseListCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据考生类型、班型、保分类型、科目 查询列表
    $scope.query = function() {

    }
});
/*课程管理=》新增课程*/
app.controller('AddCourseCtrl', function($scope, $resource,$controller, $stateParams, $modal, $state) {
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
    //默认为第几阶段
    $scope.formData.stage = 1;

    
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
                    console.log(data);
                    $scope.results = data.result;
                     results = data.result.content;
                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                });
    };
    
    $scope.stageFormData = {};
    $scope.stageFormData.diagnosisPaperCode = [];

    $scope.diagnosisPaperCode = function(value){

        $scope.stageFormData.diagnosisPaperCode.push(value);


    };


    //默认为第几阶段
    $scope.stageFormData.stage = 1;

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


/*试卷管理=》创建单科/组织全科诊断卷*/
app.controller('CreateController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state ,fileReader,CalcService) {
    
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

    //默认目标类型为一本上线30分
    //$scope.formData.aimType = 3;

    $scope.formData.resourcePaperCode = $stateParams.resourcePaperCode;


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
        $scope.postData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
      
    });    


    //组成单科诊断用卷
    $scope.createSingle = function(formData) {

        var url = $scope.app.host + "/section/diagnosis/paper/add?requestId=test123456";

        /*var promise = postMultipart(url, formData); 
        console.log(promise);*/
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

    $scope.postData = { };

    //默认类型为理科
    $scope.postData.departmentType = 1;
   

    //确定组成诊断用卷
    $scope.creteGroup = function(postData){
        var url = $scope.app.host +"/section/diagnosis/papers/add?requestId=test123456";
        $http.post(url,postData).success(function(data){
            console.log(data);
            $state.go('app.teachResearchManage.doubleList');
        }).error(function(data) {
            console.log("fail");
        })
    }
    
    //资源库传参数
    $scope.GetPapers = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.teachResearchManage.list', {
            jsonString : jsonString
        }, {
            reload : true
        });
    }
    function postMultipart(url, data) {
        /*var fd = new FormData();
        angular.forEach(data, function(val, key) {
            fd.append(key, val);
        });*/
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
    }
    
   
    
});

/*根据学年、学科、教材版本、试卷用途、单元知识点code获取试卷列表*/
app.controller("getPapersController", function($scope, $http, $resource, $stateParams, $modal, $state) {

    $scope.load = function(){
        //$state.go('app.teachResearchManage.list');
        var V_PapersListJson = null;  
        // 获取上个界面传递的数据，并进行解析  
        if ($stateParams.jsonString != '') {  
            V_PapersListJson = angular.fromJson($stateParams.jsonString);  
        } 

        $scope.subjectCode = V_PapersListJson.subjectCode;
        console.log(V_PapersListJson.subjectCode);
        var subjectCode = $stateParams.subjectCode;
       // console.log(subjectCode);
        var url = $scope.app.host + "/resource/get/papers?requestId=1";
        $http.post(url,V_PapersListJson).success(function(data) {

            $scope.results = data.result;
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
                    console.log(data);
                    $scope.results = data.result;

                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                });
    }   

});
app.controller('GroupsDetailCtrl', function($scope, $http,$resource, $stateParams, $modal, $state) {
    $scope.name = "诊断试卷组详情";

});
app.controller('CreateStageController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
      //新增阶段考试卷组
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    $scope.stageFormData = {};
    

})

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
                    console.log(data);
                    $scope.results = data.result;

                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
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

/*model*/
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
        console.log($scope.selected.item);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);

app.controller('categoryCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.open = function(size) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function() {
                    return $scope.items;
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
/*符合VIP*/
app.controller('showHideController', function($scope) {
    $scope.isShow = true;
    $scope.showorhide = function() {
        $scope.isShow = !$scope.isShow;
    }
});


