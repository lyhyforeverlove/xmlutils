'use strict';
/*诊断上架*/

app.controller('DiagShelvesController', function($scope, $http, $controller,$resource, $stateParams, $modal, $state, CalcService) {

    //继承筛选条件控制器
    $controller('ParentFilterCtrl', {$scope: $scope}); 
   
    $scope.load = function() {
           
    }
    /**/
    $scope.getList = function(page, size, callback) {
         $http.post($scope.app.host + 'diagnosis/list?requestId=test123456', {
                    "subjectCode": $scope.selectedCity,
                    "bookVersionCode": "全国卷一",
                    "paperUseType": "1",
                    "currentPage": 1,
                    "pageSize": 2
                })
                .success(function(data) {
                    //console.log(data.result.totalPage);
                    $scope.results = data.result;

                    $scope.totalPage = data.result.totalPage;

                    console.log(data.result);

                    callback && callback(data.result);
                });


    }
        //根据学年、类型、教材 查询诊断列表
    $scope.query = function() {

        }
        //分配监考人
    $scope.allotBtn = function() {

    };
    //添加老师
    $scope.addTeacher = function() {

        }
        //确定上架
    $scope.ConfirmShelves = function(id) {
        $state.go('app.teachManage.diagGoods');
    }

    //诊断时间
    $scope.groups = [{
        'id': '1',
        'name': '第一组时间',
        'date': "2016.6.18 16:00 ~ 2016.6.18 18:00",
        'group': '一组:5人',
        'AM': '上午'
    }, {
        'id': '2',
        'name': '第二组时间',
        'date': '2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group': '一组:5人'
    }, {
        'id': '3',
        'name': '第三组时间',
        'date': '2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group': '一组:5人',
        'PM': '下午'
    }, {
        'id': '4',
        'name': '第四组时间',
        'date': '2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group': '一组:5人'
    }, {
        'id': '5',
        'name': '第五组时间',
        'date': '2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group': '一组:5人'
    }, {
        'id': '6',
        'name': '第六组时间',
        'date': '2016.6.18 16:00 ~ 2016.6.18 18:00',
        'group': '一组:5人'
    }];

});

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
app.controller("MainCtrl", function($scope) {
    $scope.subjects = [{
            "id": 0,
            "name": "文科",
            "category": [{
                "id": 0,
                "name": "语文",
                "checked": true
            }, {
                "id": 1,
                "name": "数学",
                "checked": false
            }, {
                "id": 2,
                "name": "英语",
                "checked": false
            }, {
                "id": 3,
                "name": "历史",
                "checked": false
            }, {
                "id": 4,
                "name": "政治",
                "checked": false
            }]
        }, {
            "id": 1,
            "name": "理科",
            "category": [{
                "id": 0,
                "name": "语文",
                "checked": true
            }, {
                "id": 1,
                "name": "数学",
                "checked": false
            }, {
                "id": 2,
                "name": "英语",
                "checked": false
            }, {
                "id": 3,
                "name": "物理",
                "checked": false
            }, {
                "id": 4,
                "name": "化学",
                "checked": false
            }]
        }]
        //$scope.selectedGenre = '$scope.subjects[0].name';            
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
