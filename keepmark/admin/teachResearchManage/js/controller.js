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
app.controller('DiagListController', function($scope, $http, $resource, $stateParams, $modal, $state) {
    
   

});



/*试卷管理=》创建单科诊断卷*/
app.controller('CreateController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state ,fileReader,CalcService) {
    
    $controller('ParentFilterCtrl', {$scope: $scope}); 

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

    $scope.describe = '';

    $scope.focus = function() {
        if (!$scope.describe) {
            $scope.describe = defaultTitle;
        }
    };

    $scope.blur = function() {
        if ($scope.describe === defaultTitle) {
            $scope.describe = '';
        }
    };

    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
                $scope.coverUrl = result;
            });
    };

    //诊断用途{综合诊断、短板诊断、阶段考}
    CalcService.DiagnosisTypeData().then(function(data) {
        $scope.diagnosisType = data.diagnosisData;
    })

    $scope.formData = {};
    $scope.createSingle = function() {
        var url = $scope.app.host + "/section/diagnosis/paper/add?requestId=test123456";

       /* var postData = {
            "gradeCode":$scope.gradeCode,
            "subjectCode":$scope.selectedCity,
            "bookVersionCode":$scope.selectedDstrict,
            "name": $scope.name,
            "resourcePaperCode": "123", 
            "coverUrl": $scope.coverUrl,
            "diagnosisType": $scope.diagnosisType,
            "departmentType": $scope.selectedProvince,
            "describe": $scope.describe,
            "diagnosisPaperPrice": $scope.diagnosisPaperPrice

        };*/
        $http.post(url, formData).success(function(data) {
            console.log(data);
            //$state.go('app.teachResearchManage.diagExamList');
        }).error(function(data) {
            console.log("fail");
        })
    }
});



app.controller('UploaderController', function($scope, $http, fileReader,CalcService) {


    

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
var promise = postMultipart('/maldives/leave/save', postData); 
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
}*/
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
/*根据学年、学科、教材版本、试卷用途、单元知识点code获取试卷列表*/
app.controller("getPapersController", function($scope, $http, $resource, $stateParams, $modal, $state) {

    $scope.query = function() {
        var url = $scope.app.host + "/resource/get/papers?requestId=1";
        $http.post(url).success(function(data) {

            $scope.data = data.result;

            console.log(data.result);
        })
    }

})

