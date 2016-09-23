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
				"markRound": 0,
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
		data.goHtml=0;
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
				"markRound": 1,
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
		
		data.goHtml=1;
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
app.controller('MarkExamController', function($scope, $http, $controller,$resource, $stateParams, $modal, $state) {
	
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	}); //继承

	var markPaperRequestJson = null;
	var postObj = {}; //判卷提交试题
	var markModel = {}; //单题信息
	var productionModel = {};
	var subjectivityScore = 0; //主观得分
	var impersonalityScore = 0; //客观得分
	postObj.list = [];
	// 获取上个界面传递的数据，并进行解析  
	if($stateParams.jsonString != '') {
		markPaperRequestJson = angular.fromJson($stateParams.jsonString);
	}
	$scope.paperDetail = markPaperRequestJson;
	impersonalityScore = markPaperRequestJson.impersonalityScore;
	//$scope.persons = markPaperFactory.getter();
	//$scope.$on('$fromSubControllerClick', function(e,data){
	//	console.log(data); // hello
	//获取学生答题详情
	$scope.load = function(){
		$http.post($scope.app.testhost + 'student/diagnosis/getUserAnswer?requestId=test123456', {
			"studentCode":  markPaperRequestJson.studentCode,
			"singleDiagnosisRecordCode": markPaperRequestJson.eduSingleDiagnosisRecordCode
		})
		.success(function(data) {
			console.log(data);
			$scope.results = data.result;
			//$state.go("app.teachManage.examDetail");
		}).error(function(data) {
			console.log(data);

		});
	}
    //选中知识点
	$scope.addErrorKnown = function(code,pro,index) {
		
		$("#selectKnow_"+code).append('<a id="prodution'+index+"_"+pro.productionCode+'"    onclick="removeKnowledge(\'' + code + '\',\'' + index + '\',\'' + pro.productionCode + '\')" class="btn btn-default " role="button">'+pro.productionName+'</a>');
		$("#useKnow_"+code).find("#prodution"+index+"_"+pro.productionCode).addClass("disabled");
	}
	//组装判卷信息
	$scope.submitQuestion = function(data) {
		markModel.errorProductions=[];
		angular.forEach($("#selectKnow_"+data.code).find("a"),function(pro,index,objs){
			angular.forEach(data.productionJson,function(obj,index){
				if(obj.productionCode==angular.element(pro).attr("id").split("_")[1]){
					markModel.errorProductions.push(obj);
				}
			});
			
		});
		console.log(markModel.errorProductions);
		$("#selectKnow_"+data.code).find("a").addClass("disabled");
		$("#useKnow_"+data.code).find("a").addClass("disabled");
		data.productionList = [];
		//根据组装数据填充 产生式信息
		markModel.answerRecordCode=data.eduSingleDiagnosisRecordCode;
		markModel.questionScore=data.questionScore;
		markModel.score=data.paperScore+data.questionScore;
		markModel.urfaceScore=data.paperScore;
		//markModel.questionType='';//试题类型
		//markModel.sentenceResult='';//判卷结果
		postObj.list.push(markModel);
		subjectivityScore = parseFloat(subjectivityScore) + parseFloat(data.paperScore) + parseFloat(data.questionScore);
		$("#" + data.code).attr('disabled', true);
		console.log(postObj);
	}

	//提交最终判卷结果
	$scope.submitPaper = function() {
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
				if(data.message == "Success"){
					if(markPaperRequestJson.goHtml==0){
						//跳转到一轮判列表				
						 $state.go("app.teachManage.round");
					}
					if(markPaperRequestJson.goHtml==1){
						//跳转到二轮判列表	
						$state.go("app.teachManage.secondRound");
					}
					if(markPaperRequestJson.goHtml==2){
						//跳转到复审列表
					}
				}
			}).error(function(data) {
				console.log(data);
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

//取消选中知识点
function removeKnowledge(code,index,pro){
	$("#selectKnow_"+code).find("#prodution"+index+"_"+pro).remove();
	$("#useKnow_"+code).find("#prodution"+index+"_"+pro).removeClass("disabled");

}
