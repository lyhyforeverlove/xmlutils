/**
 * Created by ying on 2016/9/20.
 */
//小班课教师---我的课表
app.controller("smallClassMyScheduleController", function($controller, $scope, $http, scheduleService,$modal) {
	$scope.name = "小班课我的课表";
	$scope.scheduleStatus = "1";
	$scope.scheduleShow = false;
	$controller("getSchoolInfo", {
		$scope: $scope
	});
	$scope.getTeacherSchedule = function() {
		var parameters = {
			//"weekTimeCode": weekTimeCode,
			"ownerCode": "3505088EAE604A29954E16EC3C0A5632"
		};
		var url = $scope.app.host + "teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK3";
		scheduleService.getScheduleList(url, parameters).then(function(data) {
			if(data.result !== null) {
				$scope.scheduleUrl = 'admin/common/tpl/schedule.html';
				$scope.courses = data.result.sections;
			} else {
				$scope.scheduleUrl = '';
			}
		});
	};

    //获取今日作业
	$scope.getTodaySchedule = function(){
		$http.post("http://192.168.1.12:7777/keepMark-teacher-business/fullTeacher/getTeacherDayLessonList?requestId=1111",{
			"teacherCode":"3505088EAE604A29954E16EC3C0A5632"//教师code
		}).success(function(data){
			$scope.todaySchedule = data.result.lessons;
		});
	};
	//发送作业
	$scope.sendHomework = function(data){
		$scope.info = {
			"centerCode":data.centerCode,
			"curriculumCode":data.curriculumCode,
			"classType":data.data,//上课类型
			"subjectCode":data.subjectCode,//学科code
			"stage":1,//阶段
			"teacherCode":"01C07112C49F4120815EB160B99167AA",//教师code
			"teacherName":"01C07112C49F4120815EB160B99167AA"//教师名称
		};

		var modalInstance = $modal.open({
			templateUrl: 'admin/common/tpl/todaySchedule.html',
			size: "lg",
			controller: todayScheduleModalCtrl,
			resolve: {
				info: function () {
					return $scope.info;
				}
			}
		});
	}


});


//一对一教师---我的课表
app.controller("oneToOneMyScheduleController", function($controller, $scope, $http, scheduleService,$modal) {
	$scope.name = "一对一教师我的课表";
	$scope.scheduleStatus = "1";
	$scope.scheduleShow = false;
	$controller("getSchoolInfo", {
		$scope: $scope
	});
	$scope.getTeacherSchedule = function() {
		var parameters = {
			//"weekTimeCode": weekTimeCode,
			"ownerCode": "3505088EAE604A29954E16EC3C0A5632"
		};
		var url = $scope.app.host + "teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK3";
		scheduleService.getScheduleList(url, parameters).then(function(data) {
			if(data.result !== null) {
				$scope.courses = data.result.sections;
				$scope.scheduleUrl = 'admin/common/tpl/schedule.html'
			} else {
				$scope.scheduleUrl = '';
			}
		});
	};
	//获取今日作业
	$scope.getTodaySchedule = function(){
		$http.post("http://192.168.1.12:7777/keepMark-teacher-business/fullTeacher/getTeacherDayLessonList?requestId=1111",{
			"teacherCode":"3505088EAE604A29954E16EC3C0A5632"//教师code
		}).success(function(data){
			$scope.todaySchedule = data.result.lessons;
		});
	};
	//发送作业
	$scope.sendHomework = function(data){
		$scope.info = {
			"centerCode":data.centerCode,
			"curriculumCode":data.curriculumCode,
			"classType":data.data,//上课类型
			"subjectCode":data.subjectCode,//学科code
			"stage":1,//阶段
			"teacherCode":"01C07112C49F4120815EB160B99167AA",//教师code
			"teacherName":"01C07112C49F4120815EB160B99167AA"//教师名称
		};
		console.log($scope.info);
		var modalInstance = $modal.open({
			templateUrl: 'admin/common/tpl/todaySchedule.html',
			size: "lg",
			controller: todayScheduleModalCtrl,
			resolve: {
				info: function () {
					return $scope.info;
				}
			}
		});
	}
});


//今日作业弹框
var todayScheduleModalCtrl = function($scope,$modalInstance,info,$http){
	var host ="http://192.168.1.12:7777/keepMark-teacher-business/";
	$scope.formData ={};
	//获取作业接口
	$scope.getHomeWorkList = function(){
		$http.post(host+"fullTeacher/getPushTaskList?requestId=1111",
			{
				"burlCode":info.curriculumCode//节的code
			}).success(function(data){
			if(data.result)
			{
				$scope.homeWorkList = data.result.papers;
				$scope.formData.repositoryBurlCode = data.result.repositoryBurlCode
			}
		});
	};
	//发送作业
	//"repositoryBurlCode":"01C07112C49F4120815EB160B99167AA",//资源库节的code
	//"taskName":"01C07112C49F4120815EB160B99167AA",//作业名称
	//"taskCode":"01C07112C49F4120815EB160B99167AA",//作业code
	//"smallCourseBurlCode":"01C07112C49F4120815EB160B99167AA",//小课程节的code
	//"classCode":"01C07112C49F4120815EB160B99167AA",//中心code 或学生code 或组code
	//"year":"01C07112C49F4120815EB160B99167AA",//高考年
	$scope.saveHomeWorkToStudent = function(){
		console.log(info.classType);
		var homeWork = JSON.parse($scope.formData.homeWork);
		var formData = {
			"repositoryBurlCode":$scope.formData.repositoryBurlCode,//资源库节的code
			"taskName":homeWork.papersName,//作业名称
			"taskCode":homeWork.papersId,//作业code
			"smallCourseBurlCode":info.curriculumCode,//小课程节的code
			"classCode":info.centerCode,//中心code 或学生code 或组code
			"classType":info.classType,//上课类型
			"subjectCode":info.subjectCode,//学科code
			"year":"2016",//高考年
			"stage":info.stage,//阶段
			"teacherCode":info.teacherCode,//教师code
			"teacherName":info.teacherName//教师名称
		};


		console.log(formData);
		//$http.post(host+"fullTeacher/getPushTaskList?requestId=1111",
		//	formData).success(function(data){
		//	console.log(data);
		//});

	};
};



//1对1调课
app.controller('oneToOneAdjustCourseController', function($scope, $state, $http) {
	$scope.name = "一对一调课";
	$http.post($scope.app.host + "fullTeacher/getMyStudentList?requestId=test123456", {
		"teacherCode": "e44a0c2ad33a40d1a9c54bf4e801c227"
	}).success(function(data) {
		if(data.result) {
			$scope.studentList = data.result;
		}
	}).error(function(data) {
		console.log("fail");
	});

	$scope.studentSchedule = function(student) {
		var studentSchedule = {
			"scheduleStatus": "2",
			"studentCode": student.code,
			"goalType": student.goalType,
			"artsType": student.artType
		};
		$state.go("app.teacherOpearteManage.classSchedule", {
			"mySchedule": JSON.stringify(studentSchedule)
		});
	}

});

//課表controller
app.controller("classScheduleController", function($http, $controller, $rootScope, $modal, $scope, $stateParams, scheduleService) {
	var schedule = JSON.parse($stateParams.mySchedule);
	$scope.scheduleStatus = schedule.scheduleStatus;
	$controller("getSchoolInfo", {
		$scope: $scope
	});
	$rootScope.schedule = JSON.parse($stateParams.mySchedule);
	//根据教学周期获取课表
	$scope.getMySchedule = function(weekTimeCode) {
		$scope.weekTimeCode = weekTimeCode;
		if(typeof(weekTimeCode) !== "undefined") {
			var parameters = {
				"weekTimeCode": weekTimeCode,
				"ownerCode": schedule.studentCode
			};
			var url = $scope.app.host + "teaching/course/getSchedule?requestId=WEUOW343KL34L26NBSK3";
			scheduleService.getScheduleList(url, parameters).then(function(data) {
				if(data.result !== null) {
					$scope.courses = data.result.sections;
					$rootScope.eduScheduleCode = data.result.eduScheduleCode;
					$scope.scheduleUrl = 'admin/common/tpl/schedule.html'
				} else {
					$scope.scheduleUrl = '';
				}
			});
		}
	};
	//我的学生课表弹框
	$scope.chooseScheduleModal = function(eduSectionCode, eduDayCode) {
		$scope.info = {
			"eduSectionCode": eduSectionCode,
			"eduDayCode": eduDayCode
		};
		var modalInstance = $modal.open({
			templateUrl: 'admin/common/tpl/chooseSchedule.html',
			size: "lg",
			controller: myScheduleModalCtrl,
			resolve: {
				info: function() {
					return $scope.info;
				}
			}
		});
		//模态框关闭时返回数据
		modalInstance.result.then(function() {
			$scope.getMySchedule($scope.weekTimeCode);
		}, function() {
			$log.info('Modal dismissed at: ' + new Date())
		});
	};

	//删除课表
	$scope.deleteCourse = function(eduSectionCode, eduDayCode) {
		alert("删除课时");
		$http.post("http://192.168.1.12:7777/keepMark-teacher-business/teaching/course/delectLession?requestId=WEUOW343KL34L26NBSK3", {
			"weekTimeCode": $scope.weekTimeCode,
			"teacherCode": "e44a0c2ad33a40d1a9c54bf4e801c227",
			"studentCode": $rootScope.schedule.studentCode,
			"eduDayCode": eduDayCode,
			"eduSectionCode": eduSectionCode
		}).success(function(data) {
			alert("删除成功！！");
			$scope.getMySchedule($scope.weekTimeCode);
		});
	};
});

//弹框数据
var myScheduleModalCtrl = function($scope, $modalInstance, info, $http, $rootScope) {
	$scope.teacherDiv = false;
	$scope.formData = {};
	var schedule = $rootScope.schedule;
	//根据学部获取学科
	$scope.getSubjectByDivisionType = function() {
		$http.get("admin/json/subject.json").success(function(data) {
			if(schedule.artsType === 0) {
				$scope.subjectList = data.artsSubject;
			} else {
				$scope.subjectList = data.scienceSubject;
			}
		});
	};

	//根据中心目标code和学科获取课程
	$scope.getCourseList = function(subjectCode) {
		if(typeof(subjectCode) !== "undefined") {
			$http.post("http://192.168.1.12:7777/keepMark-teacher-business/course/getCourseForTimeTable?requestId=1", {
				"classType": "2", //班级上课类型 大班是“0” 小班是“1”  1对1是“2”
				"subjectCode": subjectCode, //学科code
				"aimType": schedule.goalType //中心目标
			}).success(function(data) {
				if(data.result) $scope.courseList = data.result;
			});
		}
	};

	//保存课程信息
	$scope.saveCourse = function() {
		var formData = {
			"eduScheduleCode": $rootScope.eduScheduleCode, //课程表的code
			"eduDayCode": info.eduDayCode, //天
			"eduSectionCode": info.eduSectionCode, //节
			"subjectCode": "" + $scope.subject.subjectCode + "", //学科code
			"subjectName": $scope.subject.subjectName, //学科名称
			"auditTeacherCode": "e44a0c2ad33a40d1a9c54bf4e801c227", //旁听老师code
			"curriculumCode": $scope.course.code, //课程体系code
			"mainTeacherCode": "e44a0c2ad33a40d1a9c54bf4e801c227", //主讲教师code
			"lessonType": "2",
			"courseType": "2" //0为大班课，1是小班课，2是1对1
		};
		console.log(formData);
		$http.post("http://192.168.1.12:7777/keepMark-teacher-business/teaching/course/addLesson?requestId=WEUOW343KL34L26NBSK3",
			formData).success(function(data) {
			if(data.result.isAddLesson) {
				alert("添加成功！");
				$modalInstance.close();
			} else {
				alert("添加失败！");
				$modalInstance.close();
			}
		});
	};
};

//阶段考试卷待批改列表
app.controller('stageExamsController', function($scope, $state, $http) {
	$scope.name = "阶段考试卷列表";
	$scope.getList = function() {
		$http.post($scope.app.host + "teacher/diagnosis/getStagePaperForMark?requestId=test123456", {
			"teacher": "e44a0c2ad33a40d1a9c54bf4e801c227",
			"stage": "1"
		}).success(function(data) {
			if(data.message == "Success") {
				$scope.results = data.result;
			}
			console.log(data);
		}).error(function(data) {
			console.log("fail");
		});

	}
	$scope.paperChecked = function(data) {
		data.markRound = 2; //判卷为最终状态
		data.impersonalityScore = data.objectiveScore;
		data.eduSingleDiagnosisRecordCode = data.singleDiagnosisRecordCode;
		data.goHtml = 1;
		var jsonString = angular.toJson(data);
		$state.go('app.teacherOpearteManage.paperDetail', {
			jsonString: jsonString
		}, {
			reload: true
		});

	}
	//试卷详情
	$scope.GetPaperDetail = function(data) {
		var jsonString = angular.toJson(data);
		$state.go('app.paperDetail', {
			jsonString: jsonString
		}, {
			reload: true
		});
	}
});

/**判卷详情*/
app.controller('paperDetailController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state) {

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
	$scope.load = function() {
			$http.post($scope.app.host + 'student/diagnosis/getUserAnswer?requestId=test123456', {
					"studentCode": markPaperRequestJson.studentCode,
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
	$scope.addErrorKnown = function(code, pro, index) {

			$("#selectKnow_" + code).append('<a id="prodution' + index + "_" + pro.productionCode + '"    onclick="removeKnowledge(\'' + code + '\',\'' + index + '\',\'' + pro.productionCode + '\')" class="btn btn-default " role="button">' + pro.productionName + '</a>');
			$("#useKnow_" + code).find("#prodution" + index + "_" + pro.productionCode).addClass("disabled");
		}
		//组装判卷信息
	$scope.submitQuestion = function(data) {
		markModel.errorProductions = [];
		angular.forEach($("#selectKnow_" + data.code).find("a"), function(pro, index, objs) {
			angular.forEach(data.productionJson, function(obj, index) {
				if(obj.productionCode == angular.element(pro).attr("id").split("_")[1]) {
					markModel.errorProductions.push(obj);
				}
			});

		});
		$("#selectKnow_" + data.code).find("a").addClass("disabled");
		$("#useKnow_" + data.code).find("a").addClass("disabled");
		data.productionList = [];
		//根据组装数据填充 产生式信息
		markModel.answerRecordCode = data.eduSingleDiagnosisRecordCode;
		markModel.questionScore = data.questionScore;
		markModel.score = data.paperScore + data.questionScore;
		markModel.urfaceScore = data.paperScore;
		//markModel.questionType='';//试题类型
		//markModel.sentenceResult='';//判卷结果
		postObj.list.push(markModel);
		subjectivityScore = parseFloat(subjectivityScore) + parseFloat(data.paperScore) + parseFloat(data.questionScore);
		$("#" + data.code).attr('disabled', true);
	}

	//提交最终判卷结果
	$scope.submitPaper = function() {
		console.log(markPaperRequestJson);
		var url;
		if(markPaperRequestJson.goHtml == 1) {
			url = 'teacher/diagnosis/stagePaperMark';
		}
		if(markPaperRequestJson.goHtml == 3) {
			url = 'teacher/diagnosis/mark';
		}
		$http.post($scope.app.host + url + '?requestId=test123456', {
				"diagnosticRecordsCode": markPaperRequestJson.eduSingleDiagnosisRecordCode,
				"teacherCode": "111111", //获取登录教师的code
				"teacherName": "教师名称", //获取登录教师的名称
				"markType": markPaperRequestJson.markRound, //轮次  
				"subjectivityScore": subjectivityScore, //主观题得分
				"singleScore": subjectivityScore + parseFloat(impersonalityScore), //单科总分
				"markModels": postObj.list
			})
			.success(function(data) {
				if(data.message == "Success") {
					if(markPaperRequestJson.goHtml == 1) {
						$state.go("app.teacherOpearteManage.stageExams");
					}
					if(markPaperRequestJson.goHtml == 2) {

					}
					if(markPaperRequestJson.goHtml == 3) {
						$state.go("app.teacherOpearteManage.paperChecked");
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
function removeKnowledge(code, index, pro) {
	$("#selectKnow_" + code).find("#prodution" + index + "_" + pro).remove();
	$("#useKnow_" + code).find("#prodution" + index + "_" + pro).removeClass("disabled");

}

//老师判卷列表
app.controller("paperCheckedControllerDR", function($controller, $scope, $http, $state) {
	$scope.name = "判卷";
	$controller('ParentGetDataCtrl', {
		$scope: $scope
	}); //继承

	//根据学年、类型、学科、教材 查询诊断列表
	$scope.getList = function(page, size, callback) {
		$http.post($scope.app.testhost + '/teacher/diagnosis/getTeacherMarkPaper?requestId=test123456', {
			"currentPage": page,
			"teacherCode": "1",
			"pageSize": parseInt(size)
		}).success(function(data) {
			$scope.list = data.result.list;
			$scope.totalPage = data.result.totalPage;
			callback && callback(data.result);
		});
	}
	//判卷操作
	$scope.paperChecked = function(data) {
		data.goHtml = 3;
		var jsonString = angular.toJson(data);
		$state.go('app.teacherOpearteManage.paperDetail', {
			jsonString: jsonString
		}, {
			reload: true
		});

	}
	//试卷详情
	$scope.GetPaperDetail = function(data) {
		var jsonString = angular.toJson(data);
		$state.go('app.paperDetail', {
			jsonString: jsonString
		}, {
			reload: true
		});
	}
});