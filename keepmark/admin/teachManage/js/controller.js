'use strict';
/*诊断上架*/

app.controller('DiagShelvesController', function($scope, $http, $controller,$resource, $stateParams, $modal, $state, CalcService) {

    //继承筛选条件控制器
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

    //列表
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

    
    //分配监考人
    $scope.allotBtn = function(data) {
        var jsonString = angular.toJson(data);
        $state.go('app.teachManage.allot', {
            jsonString : jsonString
        }, {
            reload : true
        });

    };
    
    //添加老师
    $scope.list = [{id:100,age:30,name:'张三'}];
    $scope.addTeacher=function(){
        var obj={id:101,age:30,name:"李四"};
        $scope.list.push(obj);
    }
    $scope.del=function(idx){
        $scope.list.splice(idx,1);
    }

    /*
    *新增诊断商品
    */
    $scope.postData = {};
     //诊断时间
    $scope.groups = [{
        id: 1,
        name : '第一组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        AM: '上午',
        active:true
    }, {
        id: 2,
        name : '第二组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active:false
    }, {
        id: 3,
        name : '第三组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        PM: '下午',
        active:false
    }, {
        id: 4,
        name : '第四组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active:false
    }, {
        id: 5,
        name : '第五组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active:false
    }, {
        id: 6,
        name : '第六组时间',
        date: "2016.6.18 16:00 ~ 2016.6.18 18:00",
        group: '一组:5人',
        active:false
    }];

    $scope.toggleActive = function(s){
        s.active = !s.active;
    };

    $scope.times = function(){

        $scope.postData.times = [];

        angular.forEach($scope.groups, function(s){
            if (s.active){
                $scope.postData.times.push(s.id);
            }
        });

        return $scope.postData.times;
    };
    //确定上架
    $scope.ConfirmShelves = function() {

        //url参数对象  
        var V_GoodsAddJson = null;  
        // 获取上个界面传递的数据，并进行解析  
        if ($stateParams.jsonString != '') {  
            V_GoodsAddJson = angular.fromJson($stateParams.jsonString);  
        } 
           
        var diagnosisGoodsModels = [];
        var goodsArr = angular.fromJson($scope.postData); 
       
        diagnosisGoodsModels.push(goodsArr);
        
        var V_GoodsAddJson = angular.fromJson(V_GoodsAddJson);
      
        V_GoodsAddJson['diagnosisGoodsModels'] = diagnosisGoodsModels; //组合商品上架json数据

        
        if(V_GoodsAddJson.departmentType == "SCIENCE"){
            V_GoodsAddJson.departmentType = 1;
        }else{
             V_GoodsAddJson.departmentType = 0;
        }

        //console.log(V_GoodsAddJson);

        $http.post($scope.app.host +'/teacher/diagnosis/add?requestId=test123456',V_GoodsAddJson)
        .success(function(data){
                if(data.result == "success"){
                    console.log(data);
                    $state.go('app.teachManage.diagGoods');
                }
               
        });
    }

   

    
});
//诊断商品列表
app.controller("DiagGoodsCtrl",function($scope,$http,$controller,$resource, $stateParams, $modal, $state, CalcService){
    //继承筛选条件控制器
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

    $scope.getList = function(page,size,callback){
        $http.post($scope.app.host+"/teacher/diagnosis/list?requestId=test123456",{
            "gradeCode":$scope.formData.gradeCode,
            "departmentType": $scope.formData.departmentType,
            "bookVersionCode": $scope.formData.bookVersionCode,
            "currentPage": page,
            "pageSize": size
        })
     .success(function(data){
           $scope.results = data.result;
        })
    }
    
})
/*试卷池*/
app.controller('TestPoolControler', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、教材 查询试卷池
    $scope.query = function() {

    }

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

});
/*一轮判*/
app.controller('RoundController', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材查询一轮判列表
    $scope.query = function() {

    }
});
/*二轮判*/
app.controller('SecondRoundController', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材查询二轮判列表
    $scope.query = function() {

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
/*短板考试确认*/
app.controller('ComfrimController', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材查询短板考试确认列表
    $scope.query = function() {

    }
});
/*短板考试监考*/
app.controller('MonitorController', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材查询短板诊断监考列表
    $scope.query = function() {

    }
});
/*短板诊断判卷*/
app.controller('ShortBoardDiagCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材查询短板诊断判卷列表
    $scope.query = function() {

    }
});
/*不符合名单通知确认*/
app.controller('NotConformCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数、用户名不符合名单通知确认
    $scope.query = function() {

        }
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

});
/*短板加课确认*/
app.controller('ShortBoardClassCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数、用户名不符合名单通知确认
    $scope.query = function() {

    }
});
/*分班*/
app.controller('DividingClassesCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数、单科学科、分数、上课时间查询列表
    $scope.query = function() {

    }
});
/*分班后确认*/
app.controller('DividClassesConfrimCtrl', function($scope, $resource, $stateParams, $modal, $state) {
    //根据类型、地区、总分数、单科学科、分数、上课时间查询列表
    $scope.query = function() {

        }
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

});



/*自动分配*/
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
/*分班*/
app.controller('ClassesCtrl', ['$scope', '$modal', '$log', '$http', function($scope, $modal, $log) {

    $scope.items = 'admin/common/classes.json';

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
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function($scope, $modalInstance, items) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function() {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);

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
