'use strict';

/*阅卷复审*/
app.controller('MarkReviewController', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材 查询诊断列表
    $scope.query = function() {

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
app.controller('AddCourseCtrl', function($scope, $resource, $stateParams, $modal, $state) {

    $scope.submit = function() {

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

                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                });
    };
    


});
app.controller('DetailController', function($scope, $http, $resource, $stateParams, $modal, $state ) {
 
    var paperCode = $stateParams.paperCode;
    console.log(paperCode);
    //获取诊断试卷详情
    $scope.load = function(){
        /*$state.go("app.teachResearchManage.detail");*/
        $http.post($scope.app.host + '/diagnosis/detail?requestId=test123456',
            {
                "paperCode": paperCode
            }).success(function(data){

                console.log(data.result);
                var paperDetailDto = data.result.paperDetailDto;

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
                $scope.diagnosisStatus = paperDetailDto.diagnosisStatus;
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
                $scope.formData.coverUrl = result;
            });
    };

    
    //组成单科诊断用卷
    $scope.createSingle = function(formData) {

       /*var ext = '.' + document.getElementById('file').files[0].name.split('.').pop();
       
        var config = {
            bucket: 'keepmark', //空间名称
            expiration: parseInt((new Date().getTime() + 3600000) / 1000), //上传请求过期时间
            signature : hash
            // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
            //form_api_secret: 'WwbrepSiLMoTpx/+D2c+3klosIA='
        };

        var instance = new Sand(config);
        var options = {
            'notify_url': 'http://upyun.com'
        };

        instance.setOptions(options);
        instance.upload('/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + ext);

        document.addEventListener('uploaded', function(e) {
            $scope.path = e.detail;
            console.log(e.detail);
        });
*/

        var url = $scope.app.host + "/section/diagnosis/paper/add?requestId=test123456";

        //var promise = postMultipart(url, formData); 

        //console.log(promise);
      
        $http.post(url, formData).success(function(data) {
            console.log(data);
            $state.go('app.teachResearchManage.diagExamList');
        }).error(function(data) {
            console.log("fail");
        })
    }
    //确定组成诊断用卷
    $scope.creteGroup = function(formData){
        $scope.formData.mathCode = ""
        var url = $scope.app.host +"/section/diagnosis/papers/add?requestId=test123456";
        $http.post(url,formData).success(function(data){
            
            $state.go('app.teachResearchManage.doubleList');
        }).error(function(data) {
            console.log("fail");
        })
    }

    function postMultipart(url, data) {
        var fd = new FormData();
        angular.forEach(data, function(val, key) {
            fd.append(key, val);
        });
        var args = {
            method: 'POST',
            url: url,
            data: fd,
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
        var url = $scope.app.host + "/resource/get/papers?requestId=1";
        $http.post(url,{"gradeCode":"23",
            "subjectCode":"5",
            "booktype":"c643e7a8c0374a74a394347033b5dd9d",
            "volume":"5393",
            "type":"单元测试",
            "cp":0,
            "pageSize":2
        }).success(function(data) {

            //$scope.data = data.result;

            console.log(data);
        })
    }

})

//组装表单数据
/*var postData = {
  vacationType: $scope.leave.type,
  reason: $scope.leave.reason,
  familyRelation: +$scope.leave.type == 7 ? $scope.leave.relation : "",
  startTime: startTime,
  endTime: endTime,
  fileName: $scope.imageSrc,
  workDelivers: workDelivers,
  ccmailNickNames: sendPersons,
  realDays: +$scope.leave.type == 8 ? $scope.leave.timeLong : ""
};
*/
//试卷管理=》诊断全科试卷列表
app.controller('GroupListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
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
    
    $scope.getList = function(page, size, callback) {
           $http.post($scope.app.host + '/diagnosis/group/list?requestId=test123456', {
                    "paperUseType":$scope.formData.paperUseType,
                    "departmentType":$scope.formData.departmentType,
                    "bookVersionCode":$scope.formData.bookVersionCode,
                    "currentPage":page,
                    "pageSize":size
                })
                .success(function(data) {
                    $scope.results = data.result;

                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                });
    }   

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
    $scope.formData.paperUseType = 0;
    //默认目标类型为一本上线30分
    $scope.formData.aimType = 0;
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


