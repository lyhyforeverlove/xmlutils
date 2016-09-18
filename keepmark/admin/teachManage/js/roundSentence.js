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
		$http.post($scope.app.testhost + 'teacher/diagnosis/getTwoRound?requestId=test123456', {
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

/**判卷详情*/
app.controller('MarkExamController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state) {
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	}); //继承
	//
	var markPaperRequestJson = null;
	var postObj = {}; //判卷提交试题
	var markModel = {}; //单题信息
	var productionModel = {};
	var subjectivityScore = 0; //主观得分
	var impersonalityScore = 0; //客观得分
	markModel.productionList = [];
	postObj.list = [];
	// 获取上个界面传递的数据，并进行解析  
	if($stateParams.jsonString != '') {
		markPaperRequestJson = angular.fromJson($stateParams.jsonString);
	}
	$scope.paperDetail = markPaperRequestJson;
	impersonalityScore = markPaperRequestJson.impersonalityScore;
	//获取学生答题详情
	$scope.load = function() {
		$http.post($scope.app.host + 'student/diagnosis/getUserAnswer?requestId=test123456', {
				"studentCode": markPaperRequestJson.studentCode,
				"singleDiagnosisRecordCode": markPaperRequestJson.eduSingleDiagnosisRecordCode
			})
			.success(function(data) {
				$scope.results = data.result;
				//$state.go("app.teachManage.examDetail");
			}).error(function(data) {

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

		data.productionList = [];
		//根据组装数据填充 产生式信息
		//		productionModel.productionName = '产生式名称';
		//		productionModel.productionCode = '产生式code';
		//		productionModel.knowledgeName = '知识点名称';
		//		productionModel.knowledgeCode = '知识点code';
		//		markModel.productionList.push(productionModel);
		markModel.answerRecordCode = data.eduSingleDiagnosisRecordCode;
		markModel.questionScore = data.questionScore;
		markModel.score = data.questionScore;
		markModel.answerRecordCode = data.code;
		markModel.urfaceScore = data.paperScore;

		markModel.errorProductions = '[{"productionName":"productionName0","productionCode":"productionCode0","knowledgeName":"knowledgeName0","knowledgeCode":"knowledgeCode0"}]';
		//markModel.questionType='';//试题类型
		//markModel.sentenceResult='';//判卷结果
		postObj.list.push(markModel);
		subjectivityScore = parseFloat(subjectivityScore) + parseFloat(data.paperScore) + parseFloat(data.questionScore);
		console.log(subjectivityScore);
		$("#" + data.code).attr('disabled', true);
	}

	//提交最终判卷结果
	$scope.submitPaper = function() {
		console.log($scope.check());
		console.log(parseFloat(subjectivityScore) + parseFloat(impersonalityScore));
		console.log(subjectivityScore);

		$http.post($scope.app.host + 'teacher/diagnosis/mark?requestId=test123456', {
				"diagnosticRecordsCode": markPaperRequestJson.eduSingleDiagnosisRecordCode,
				"markType":markPaperRequestJson.markRound , //一判 二判 复审
				"teacherCode": "111111",//获取登录教师的code
				"teacherName": "教师名称",//获取登录教师的名称
				"subjectivityScore": subjectivityScore, //主观题得分
				"singleScore": subjectivityScore + parseFloat(impersonalityScore), //单科总分
				"markModels": postObj.list
			})
			.success(function(data) {
				//根据判卷轮次跳转不同的页面
			}).error(function(data) {

			});

	}

	$scope.check = function() {
		$(".col-sm-3 button").each(function(index, value) {
			if(typeof($(this).attr('disabled')) == "undefined") {
				alert("还有题未进行提交！！请检查！！！");
				return false;
			}
		});
	}

});

function removehtml(id) {
	$('.survey-knowledge').find('#' + id).removeClass("disabled");
	$('#useKnow').append('<a id=' + id + '></a>');
	$('#' + id).remove();
}