'use strict';
var DataSource = [
	{"day":"一","course":[
		{"courseName":"语文课1","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"英语课2","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"数学课3","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课4","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课5","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课6","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课6","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课1","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"英语课2","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"数学课3","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课4","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课5","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课6","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"},
		{"courseName":"语文课6","teacherName":"李老师","pointName":1,"pointTime":"8:00~8:45"}
	]},
	{"day":"二","course":[
		{"courseName":"数文课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"语文课4","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"语文课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"数文课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"语文课4","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"语文课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":2,"pointTime":"9:00~9:45"}
	]},
	{"day":"三","course":[
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":3,"pointTime":"10:00~10:45"}
	]},
	{"day":"四","course":[
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"},
		{"courseName":"自习课","teacherName":"","pointName":4,"pointTime":"11:00~11:45"}
	]},
	{"day":"五","course":[
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课4","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"数文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课4","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"数文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"},
		{"courseName":"语文课","teacherName":"李老师","pointName":5,"pointTime":"14:00~14:45"}
	]},
	{"day":"六","course":[
		{"courseName":"数文课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"语文课4","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"数文课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"语文课4","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"},
		{"courseName":"英语课","teacherName":"张老师","pointName":6,"pointTime":"15:00~15:45"}
	]},
	{"day":"七","course":[
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"语文课4","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"语文课4","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"},
		{"courseName":"数文课","teacherName":"孙老师","pointName":7,"pointTime":"16:00~16:45"}
	]},
	{"day":"八","course":[
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"},
		{"courseName":"自习课","teacherName":"","pointName":8,"pointTime":"17:00~17:45"}
	]}
];


//我的学生
app.controller('myStudentsController', function($scope,$state) {
	$scope.name='我的学生';
	$scope.total_count =10;
	var id = 1;
	$scope.learningDetail =function(){
		$state.go("app.teacherOpearteManage.learningDetail",{"id":id});
	}

	$scope.answerQuestionsRecord = function(){
		$state.go("app.teacherOpearteManage.answerQuestions",{"id":id});
	}

	$scope.checkMySchedule = function(){
		$state.go("app.teacherOpearteManage.classSchedule",{"id":id});
	}
})

//课程表
app.controller("classScheduleController",function($scope){
	$scope.name="课程表";
	$scope.courses = DataSource;
})
//学习情况
app.controller('learningDetailController', function($scope) {
	$scope.name='学习情况';
	$scope.total_count =10;

})
//一对一老师操作页面
app.controller('oneToOneController', function($scope,$state) {
	$scope.name = "1对1老师操作页面";
	$scope.courses = DataSource;
	$scope.enterTheClassroom = function(){
		$state.go("app.teacherOpearteManage.enterTheClassroom");
	}
});

//1对1调课
app.controller('oneToOneAdjustCourseController',function($scope,$state){
    $scope.name = "一对一调课";
	var id = 1;
    $scope.checkMySchedule = function(){
	    $state.go("app.teacherOpearteManage.classSchedule",{"id":id});
    }

    $scope.studentSchedule = function(){
		$state.go("app.teacherOpearteManage.classSchedule",{"id":id});
    }


})

//进入课堂
app.controller('todayCourseController', function($scope) {
	$scope.name='进入课堂';

})
//学生作业
app.controller('studentWorkController', function($scope,$state) {
	$scope.name='学生作业';

	$scope.studentWorkChecked = function(){
		$state.go("app.teacherOpearteManage.studentWorkChecked");
	}

})
//自主推送学习资源
app.controller('autonmousPushResourcesController', function ($scope) {
	$scope.name = "自主推送学习资源";
	$scope.studentsShow = false;
	//选择推送学生
	$scope.chooseStudents = function(){
		$scope.studentsShow = !($scope.studentsShow);
	}
	$scope.tabs = [{
		title: '视频',
		url: 'video.tpl.html'
	}, {
		title: '试卷',
		url: 'paper.tpl.html'
	}];

	$scope.currentTab = 'video.tpl.html';

	$scope.onClickTab = function(tab) {
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
	var apple_selected, tree, treedata_avm, treedata_geography;
	$scope.my_tree_handler = function(branch) {
		var _ref;
		$scope.output = "You selected: " + branch.label;
		if ((_ref = branch.data) != null ? _ref.description : void 0) {
			return $scope.output += '(' + branch.data.description + ')';
		}
	};
	apple_selected = function(branch) {
		return $scope.output = "APPLE! : " + branch.label;
	};
	treedata_avm = [
		{
			label: '1分数乘法',
			children: [
				{
					label: '分数乘法计算',
					data: {
						description: "man's best friend"
					}
				}, {
					label: '分数乘法应用题',
					data: {
						description: "Felis catus"
					}
				}
			]
		},
		{
			label: '2位置与方向',
			children: [
				{
					label: '位置与方向',
					children: ['分数乘法应用题', '位置与方向', '位置与方向']
				}, {
					label: '分数乘法应用题',
					children: ['分数乘法计算', '分数乘法计算', '分数乘法计算']
				}, {
					label: '3分数除法',
					children: [
						{
							label: '分数乘法计算',
							children: ['比', '圆', '百分数', '数学广角']
						}, {
							label: '位置与方向',
							children: ['百分数', '圆', '扇形统计图', '数与形']
						}
					]
				}
			]
		}
	];
	treedata_geography = [
		{
			label: '扇形统计图',
			children: [
				{
					label: '百分数',
					children: ['比', '数学广角']
				}, {
					label: '数学广角',
					children: ['百分数', '数学广角']
				}, {
					label: 'Mexico',
					children: ['比', '数学广角']
				}
			]
		}
	];
	$scope.my_data = treedata_avm;
	$scope.try_changing_the_tree_data = function() {
		if ($scope.my_data === treedata_avm) {
			return $scope.my_data = treedata_geography;
		} else {
			return $scope.my_data = treedata_avm;
		}
	};
	$scope.my_tree = tree = {};
	$scope.try_async_load = function() {
		$scope.my_data = [];
		$scope.doing_async = true;
		return $timeout(function() {
			if (Math.random() < 0.5) {
				$scope.my_data = treedata_avm;
			} else {
				$scope.my_data = treedata_geography;
			}
			$scope.doing_async = false;
			return tree.expand_all();
		}, 1000);
	};
	return $scope.try_adding_a_branch = function() {
		var b;
		b = tree.get_selected_branch();
		return tree.add_branch(b, {
			label: 'New Branch',
			data: {
				something: 42,
				"else": 43
			}
		});
	};


})
//大班值守
app.controller("classOnDutyController",function($scope,$window){
	$scope.name='大班值守';
	$scope.courses= DataSource;
	$scope.enterLargelassroom = function(){
		$window.alert('非上课时间，无大班课！');
	}
})
//答疑
app.controller("answerQuestionsController",function($scope,$state){
	$scope.name='答疑';

    $scope.answerQuestions = function(){
		$state.go("app.teacherOpearteManage.answerQuestionsDetail");
	}
})
//答疑详情
app.controller("studentWorkDetailController",['$scope', '$modal',function($scope,$modal){
	$scope.name='答疑详情';
	$scope.addErrorKnown = function () {
		var modalInstance = $modal.open({
			templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
			size: "sm",
			resolve: {
				deps: ['$ocLazyLoad',
					function( $ocLazyLoad ){
						return $ocLazyLoad.load('angularBootstrapNavTree');
					}
				]
			}
		});
	}
}])
//批改
app.controller("studentWorkCheckedController",['$scope', '$modal',function($scope,$modal){
	$scope.name="批改";
	$scope.addErrorKnown = function () {
		var modalInstance = $modal.open({
			templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
			size: "sm",
			resolve: {
				deps: ['$ocLazyLoad',
					function( $ocLazyLoad ){
						return $ocLazyLoad.load('angularBootstrapNavTree');
					}
				]
			}
		});
	}
}])

//知识点树
app.controller("knowledgeTreeController",function($scope,$timeout){
	var apple_selected, tree, treedata_avm, treedata_geography;
	$scope.my_tree_handler = function(branch) {
		var _ref;
		$scope.output = "You selected: " + branch.label;
		if ((_ref = branch.data) != null ? _ref.description : void 0) {
			return $scope.output += '(' + branch.data.description + ')';
		}
	};
	apple_selected = function(branch) {
		return $scope.output = "APPLE! : " + branch.label;
	};
	treedata_avm = [
		{
			label: '1分数乘法',
			children: [
				{
					label: '分数乘法计算',
					data: {
						description: "man's best friend"
					}
				}, {
					label: '分数乘法应用题',
					data: {
						description: "Felis catus"
					}
				}
			]
		},
		{
			label: '2位置与方向',
			children: [
				{
					label: '位置与方向',
					children: ['分数乘法应用题', '位置与方向', '位置与方向']
				}, {
					label: '分数乘法应用题',
					children: ['分数乘法计算', '分数乘法计算', '分数乘法计算']
				}, {
					label: '3分数除法',
					children: [
						{
							label: '分数乘法计算',
							children: ['比', '圆', '百分数', '数学广角']
						}, {
							label: '位置与方向',
							children: ['百分数', '圆', '扇形统计图', '数与形']
						}
					]
				}
			]
		}
	];
	treedata_geography = [
		{
			label: '扇形统计图',
			children: [
				{
					label: '百分数',
					children: ['比', '数学广角']
				}, {
					label: '数学广角',
					children: ['百分数', '数学广角']
				}, {
					label: 'Mexico',
					children: ['比', '数学广角']
				}
			]
		}
	];
	$scope.my_data = treedata_avm;
	$scope.try_changing_the_tree_data = function() {
		if ($scope.my_data === treedata_avm) {
			return $scope.my_data = treedata_geography;
		} else {
			return $scope.my_data = treedata_avm;
		}
	};
	$scope.my_tree = tree = {};
	$scope.try_async_load = function() {
		$scope.my_data = [];
		$scope.doing_async = true;
		return $timeout(function() {
			if (Math.random() < 0.5) {
				$scope.my_data = treedata_avm;
			} else {
				$scope.my_data = treedata_geography;
			}
			$scope.doing_async = false;
			return tree.expand_all();
		}, 1000);
	};
	return $scope.try_adding_a_branch = function() {
		var b;
		b = tree.get_selected_branch();
		return tree.add_branch(b, {
			label: 'New Branch',
			data: {
				something: 42,
				"else": 43
			}
		});
	};
})


//学生考试
app.controller("studentExamsController",['$scope', '$modal',function($scope,$modal){
	$scope.name="学生考试";
	$scope.choiceTestPaper = function(){
		var modalInstance = $modal.open({
			templateUrl: 'admin/teacherOpearteManage/chooseStudent.html',
			size: "lg"
		});
	}
}]);

//选择学生
app.controller("chooseStudentController",function($scope){
	$scope.name="选择学生";

});

//阶段考判卷--试卷详情
app.controller("stageExamsController",function($scope,$state){
	$scope.name="阶段考判卷";
    $scope.paperDetail = function(){
		$state.go("app.teacherOpearteManage.paperDetail");
	}
	$scope.paperChecked = function(){
		$state.go("app.teacherOpearteManage.paperDetail");
	}
})

//判卷列表页面
app.controller("paperCheckedController",function($scope,$state){
	$scope.name="判卷";
	$scope.paperDetail = function(){
		$state.go("app.teacherOpearteManage.paperDetail");
	}
	$scope.paperChecked = function(){
		$state.go("app.teacherOpearteManage.paperDetail");
	}
})
//试卷详情
app.controller()
//诊断监考
app.controller("diagnoseInvigilationController",function($scope){
	$scope.name="诊断监考";
})
//教辅材料
app.controller("supplementaryMaterialsController",['$scope', '$modal',function($scope,$modal){
	$scope.name="教辅材料";
    $scope.pushSupplementary = function(){
		var modalInstance = $modal.open({
			templateUrl: 'admin/teacherOpearteManage/knowledgeTree.html',
			size: "sm",
			resolve: {
				deps: ['$ocLazyLoad',
					function( $ocLazyLoad ){
						return $ocLazyLoad.load('angularBootstrapNavTree');
					}
				]
			}
		});
	}
}])


//教学难点
app.controller("teachingDifficultPointController",function($scope){
	$scope.name="教学难点";
	var apple_selected, tree, treedata_avm, treedata_geography;
	$scope.my_tree_handler = function(branch) {
		var _ref;
		$scope.output = "You selected: " + branch.label;
		if ((_ref = branch.data) != null ? _ref.description : void 0) {
			return $scope.output += '(' + branch.data.description + ')';
		}
	};
	apple_selected = function(branch) {
		return $scope.output = "APPLE! : " + branch.label;
	};
	treedata_avm = [
		{
			label: '1分数乘法',
			children: [
				{
					label: '分数乘法计算',
					data: {
						description: "man's best friend"
					}
				}, {
					label: '分数乘法应用题',
					data: {
						description: "Felis catus"
					}
				}
			]
		},
		{
			label: '2位置与方向',
			children: [
				{
					label: '位置与方向',
					children: ['分数乘法应用题', '位置与方向', '位置与方向']
				}, {
					label: '分数乘法应用题',
					children: ['分数乘法计算', '分数乘法计算', '分数乘法计算']
				}, {
					label: '3分数除法',
					children: [
						{
							label: '分数乘法计算',
							children: ['比', '圆', '百分数', '数学广角']
						}, {
							label: '位置与方向',
							children: ['百分数', '圆', '扇形统计图', '数与形']
						}
					]
				}
			]
		}
	];
	treedata_geography = [
		{
			label: '扇形统计图',
			children: [
				{
					label: '百分数',
					children: ['比', '数学广角']
				}, {
					label: '数学广角',
					children: ['百分数', '数学广角']
				}, {
					label: 'Mexico',
					children: ['比', '数学广角']
				}
			]
		}
	];
	$scope.my_data = treedata_avm;
	$scope.try_changing_the_tree_data = function() {
		if ($scope.my_data === treedata_avm) {
			return $scope.my_data = treedata_geography;
		} else {
			return $scope.my_data = treedata_avm;
		}
	};
	$scope.my_tree = tree = {};
	$scope.try_async_load = function() {
		$scope.my_data = [];
		$scope.doing_async = true;
		return $timeout(function() {
			if (Math.random() < 0.5) {
				$scope.my_data = treedata_avm;
			} else {
				$scope.my_data = treedata_geography;
			}
			$scope.doing_async = false;
			return tree.expand_all();
		}, 1000);
	};
	return $scope.try_adding_a_branch = function() {
		var b;
		b = tree.get_selected_branch();
		return tree.add_branch(b, {
			label: 'New Branch',
			data: {
				something: 42,
				"else": 43
			}
		});
	};
})