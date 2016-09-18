'use strict';
/*一轮判*/
app.controller('RoundController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state, CalcService) {

	//继承筛选条件控制器
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	}); //继承

	$scope.formData = {};
	//默认值赋值
	$scope.formData.gradeCode = 33;
	//根据学年、类型、学科、教材查询一轮判列表
	$scope.getList = function(page, size, callback) {
		$http.post($scope.app.host + 'teacher/diagnosis/getOneRound?requestId=test123456', {
				"subjectCode": $scope.formData.subjectCode,
				"bookVersionCode": $scope.formData.bookVersionCode,
				"currentPage": page,
				"departmentType": $scope.formData.departmentType,
				"gradeCode": $scope.formData.gradeCode,
				"distributionState": 1,
				"markPaperStatus": $scope.formData.markPaperStatus,
				"markRound": 1,
				"pageSize": size
			})
			.success(function(data) {
				$scope.results = data.result;

				$scope.totalPage = data.result.totalPage;

				callback && callback(data.result);
			}).error(function(data) {

			});
	};

	$scope.markPaper = function(data) {
		var jsonString = angular.toJson(data);
		$state.go('app.teachManage.exam', {
			jsonString: jsonString
		}, {
			reload: true
		});

	};

});
/*二轮判*/
app.controller('SecondRoundController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state) {
	//继承筛选条件控制器
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	}); //继承

	$scope.formData = {};

	//默认值赋值
	$scope.formData.gradeCode = 33;
	//根据学年、类型、学科、教材查询一轮判列表
	$scope.getList = function(page, size, callback) {
		$http.post($scope.app.host + 'teacher/diagnosis/getTwoRound?requestId=test123456', {
				"subjectCode": $scope.formData.subjectCode,
				"bookVersionCode": $scope.formData.bookVersionCode,
				"currentPage": page,
				"departmentType": $scope.formData.departmentType,
				"gradeCode": $scope.formData.gradeCode,
				"distributionState": 1,
				"markRound": 2,
				"markPaperStatus": $scope.formData.markPaperStatus,
				"pageSize": size
			})
			.success(function(data) {
				console.log(data);
				$scope.results = data.result;

				$scope.totalPage = data.result.totalPage;

				callback && callback(data.result);
			}).error(function(data) {
				console.log(data);

			});
	};

	$scope.markPaper = function(data) {
		var jsonString = angular.toJson(data);
		$state.go('app.teachManage.exam', {
			jsonString: jsonString
		}, {
			reload: true
		});

	};

	//	$scope.sayHello = function() {
	//		$scope.$emit('$fromSubControllerClick','hello');
	//	};

});

/**判卷详情*/
app.controller('MarkExamController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state) {
	
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	}); //继承

	var markPaperRequestJson = null;
	var postObj = {}; //判卷提交试题
	var markModel = {}; //单题信息
	var productionModel = {};
	markModel.productionList = [];
	postObj.list = [];
	// 获取上个界面传递的数据，并进行解析  
	if($stateParams.jsonString != '') {
		markPaperRequestJson = angular.fromJson($stateParams.jsonString);
	}
	console.log($stateParams.jsonString);
	console.log(markPaperRequestJson);
	$scope.paperDetail = markPaperRequestJson;
	//$scope.persons = markPaperFactory.getter();
	//$scope.$on('$fromSubControllerClick', function(e,data){
	//	console.log(data); // hello
	//获取学生答题详情
	$scope.load = function(){
		$http.post($scope.app.host + 'student/diagnosis/getUserAnswer?requestId=test123456', {
			"studentCode": "1111",
			"singleDiagnosisRecordCode": "5948BBC0862844B3808D668FD0E4E51F"
		})
		.success(function(data) {
			console.log(data);
			$scope.results = data.result;
			//$state.go("app.teachManage.examDetail");
		}).error(function(data) {
			console.log(data);

		});
	}

	$scope.addErrorKnown = function() {
			var addHtml = $('.survey-knowledge').children('div').children('a');
			addHtml.on('click', function() {
				var id = $(this).attr('id');
				$("#selectKnow").append('<a id=' + id + ' onclick="removehtml(\'' + id + '\')">' + $(this).html() + '</a>');
				$(this).addClass("hidden");

			})
		}
		//组装判卷信息
	$scope.submitQuestion = function(data) {

		console.log(data);
		data.productionList = [];
		//根据组装数据填充 产生式信息
		//		productionModel.productionName = '产生式名称';
		//		productionModel.productionCode = '产生式code';
		//		productionModel.knowledgeName = '知识点名称';
		//		productionModel.knowledgeCode = '知识点code';
		//		markModel.productionList.push(productionModel);
		markModel.answerRecordCode=data.eduSingleDiagnosisRecordCode;
		markModel.questionScore=data.questionScore;
		markModel.score=data.paperScore+data.questionScore;
		markModel.urfaceScore=data.paperScore;
		markModel.errorProductions='[{"productionName":"productionName0","productionCode":"productionCode0","knowledgeName":"knowledgeName0","knowledgeCode":"knowledgeCode0"}]';
		//markModel.questionType='';//试题类型
		//markModel.sentenceResult='';//判卷结果
		postObj.list.push(markModel);
		console.log(postObj);
	}

	//提交最终判卷结果
	$scope.submitPaper = function() {
		$http.post("http://192.168.1.156:8090/" + 'teacher/diagnosis/mark?requestId=test123456', {
				"diagnosticRecordsCode": "1111",
				"markType": 1, //一判 二判 复审
				"markModels": postObj.list
			})
			.success(function(data) {
				console.log(data);
				//$state.go("app.teachManage.examDetail");
			}).error(function(data) {
				console.log(data);

			});

	}
});

function removehtml(id) {
	$('.survey-knowledge').find('#' + id).removeClass("disabled");
	$('#useKnow').append('<a id=' + id + '></a>');
	$('#' + id).remove();
}