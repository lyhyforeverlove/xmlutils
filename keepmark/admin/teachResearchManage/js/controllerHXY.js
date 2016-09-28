'use strict';

/*阅卷复审*/
app.controller('MarkReviewController', function($scope, $resource, $http, $modal, $state,$controller) {
//  $controller('getJsonData', {$scope: $scope});//继承
//  $controller('getValue', {$scope: $scope});//继承
//  $controller('getPaper', {$scope: $scope});//继承
//  $controller('btnSH', {$scope: $scope});//继承
//  $controller('constAll', {$scope: $scope});//继承
//  $controller('disabled', {$scope: $scope});//继承
    //渲染筛选信息
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    
    
     //全选
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
    
    
    $scope.tabs = [{
		title: '未审',
		code:0,
		url: 'one.tpl.html'
	}, {
		title: '已审',
		code:1,
		url: 'two.tpl.html'
	}];
	$scope.markType=0;
	$scope.currentTab = 'one.tpl.html';

	$scope.onClickTab = function(tab) {
		$scope.markType=tab.code;
		$scope.currentTab = tab.url;
	}

	$scope.isActiveTab = function(tabUrl) {
		return tabUrl == $scope.currentTab;
	}
    
    
    //默认信息
    $scope.formData = {
        "departmentType": 1,
        "subjectCode": 1,
        "bookVersionCode": 1,
        "distributionState":"1"
    };
    //复审判卷操作
    $scope.markReview=function(data){
    	var jsonString = angular.toJson(data);
    	$state.go("app.teachResearchManage.markReviewPaper",{jsonString: jsonString}, {reload: true});
    }
    //通过复审
    $scope.tongguo=function(data){
    	 var list=[];
    	 var obj={};
    	 obj.diagnosticRecordsCode=data.eduSingleDiagnosisRecordCode;
    	 list.push(obj);
    	$http.post($scope.app.host + 'section/diagnosis/review/through?requestId=test123456', {
				"diagnosticRecordsCodes": list
			})
			.success(function(data) {
				$scope.getList(1,5);
			}).error(function(data) {
				console.log(data);
			});
    }	
    //根据学年、类型、学科、教材 查询诊断列表
    $scope.getList = function (page, size, callback) {
        $http.post($scope.app.testhost + '/section/diagnosis/getReviewPaper?requestId=test123456', {
            "gradeCode": "33",
            "oneDifference":$scope.formData.oneDifference,
            "oneTotalScore":$scope.formData.oneTotalScore,
            "twoDifference":$scope.formData.twoDifference,
            "twoTotalScore":$scope.formData.twoTotalScore,
            "departmentType": $scope.formData.departmentType,
            "subjectCode": $scope.formData.subjectCode,
            "bookVersionCode": $scope.formData.bookVersionCode,
            "distributionState": 1,                      
            "currentPage": page,
            "subjectType":$scope.formData.departmentType,
            "teacherCode":"1",
            "markPaperStatus":$scope.markType,//判卷状态
            "pageSize": size
        }).success(function (data) {
                console.log(data);
                $scope.tesarry = []; //初始化数据
                $scope.result = data.result.list;
                angular.forEach($scope.result, function(data){
                    $scope.tesarry.push(data.studentCode);
                });
                $scope.totalPage = data.result.totalPage;
                console.log( $scope.totalPage);
                console.log(data.result);
                callback && callback(data.result);
            });
    }
    
    

});



/**复审判卷详情*/
app.controller('reviwePaperDetailController', function($scope, $http, $controller,$resource, $stateParams, $modal, $state) {
	
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
	//获取学生答题详情
	$scope.load = function(){
		$http.post($scope.app.host + 'student/diagnosis/getUserAnswer?requestId=test123456', {
			"studentCode":  "6",//markPaperRequestJson.studentCode,
			"singleDiagnosisRecordCode": "01E0C9C54D154BFBA984E84E3C91AC28"//markPaperRequestJson.eduSingleDiagnosisRecordCode
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
		$http.post($scope.app.host + 'section/diagnosis/review?requestId=test123456', {
				"diagnosticRecordsCode": markPaperRequestJson.eduSingleDiagnosisRecordCode,
				"teacherCode": "111111",//获取登录教师的code
				"teacherName": "教师名称",//获取登录教师的名称
				"markType":2,
				"subjectivityScore": subjectivityScore, //主观题得分
				"singleScore": subjectivityScore + parseFloat(impersonalityScore), //单科总分
				"markModels": postObj.list
			})
			.success(function(data) {
				if(data.message == "Success"){
						 $state.go("app.teacherOpearteManage.stageExams");
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

/*学生分类=》符合VIP报分短板分析*/
app.controller('ConfromToVipCtrl', function($scope, $http, $resource, $stateParams, $modal, $state,$log,$controller) {
    //$controller('ParentGetDataCtrl', {$scope: $scope});//继承
    $controller('getJsonData', {$scope: $scope});//继承  文理 目标类型

    //获取所有地区列表
    $scope.GetAreaAllProvince = function(){
        var url = $scope.app.host + '/area/allProvince?requestId=1';
        $http.post(url).success(function(data){
            $scope.results = data.result;
        }).error(function(data){
            console.log("fail");
        })
    };
    $scope.GetAreaAllProvince();//初始所有地区下拉框

    $scope.formData = {};
    //$scope.dataMap=new Array();
    //默认选中函数
    /*function checked(data,ele,value){
     for(var i=0; i<data.length; i++){
     if(data[i].checked == true){
     ele.eq(i).prop("checked",true);
     $scope.formData[value] = data[i][value];
     break;
     }
     }
     }*/
    //状态显示
    $scope.status = function(val,type){
        return val==type;
    }
    //默认值
    $scope.formData.departmentType = "1";//文理科
    $scope.formData.isShortlabStatus = "1";//短板状态 默认为已分析
    $scope.formData.city = "1";//地区
    $scope.formData.totalStart = "1"; //总分数开始值
    $scope.formData.totalEnd = "600"; //总分数结束值
    $scope.formData.sortValue = "1";//排序
    $scope.formData.aimType = 1;//目标类型
    //筛选条件改变时执行
    /* $scope.change = function(val,name){
     $scope.formData[name] = val;
     };*/
    //排序
    $scope.arrsort = function(type){
        $scope.result.sort(function(value1,value2){
            if(value1.totalScore > value2.totalScore){
                return type == 0 ? -1 : 1;
            } else {
                return type == 0 ? 1 : -1;
            }
        })
    }
    //目标分类 点击切换列表
    $scope.target = function(type){
        $scope.formData.aimType = type;
        $scope.getList(1,10);
    };
    //全选
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
    //根据类型、地区、总分数 查询列表
    $scope.getList = function(page,size,callback){
        if(page == null || page == undefined){
            page = 1;
        }
        if(size == null || size == undefined){
            size = 5;
        }
        $scope.status();
        $http.post($scope.app.host + 'shortSlab/list?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,
            "areaCode":$scope.formData.city,
            "aimType":$scope.formData.aimType,
            "isShortlabStatus":$scope.formData.isShortlabStatus, //0:未做,1:已做
            "startTotalScore":$scope.formData.totalStart,
            "endTotalScore":$scope.formData.totalEnd,
            "currentPage": page,
            "pageSize":size
        }).success(function (data) {
            if(data.message == "Success"){

                $scope.data = data;
                $scope.result = data.result.list;

                $scope.tesarry = []; //初始化数据
                angular.forEach($scope.result, function(data){
                    $scope.tesarry.push(data.studentCode);
                });
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }

        });
    };

    $scope.open = function(size,choseArr) {
        //console.log(choseArr);
        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalShortSlabCtrlDR', // specify controller for modal
            size : size,
            resolve : {
                host : function(){
                    return $scope.app.host;
                },
                studentCodes : function(){
                    return choseArr;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    };
});
//短板分析-弹出框 控制器
app.controller('ModalShortSlabCtrlDR',function($scope,$http,$controller, $modalInstance,host,studentCodes) {
    //console.log(studentCodes);
    $controller('getJsonData', {$scope: $scope});//继承

    //获取九大学科
    $scope.getSubject = function(){
        $http.post('admin/json/subject.json').success(function(data){
            console.log(data.subject);
            $scope.subjects = data.subject;
        }).error(function(data){
            console.log("fail");
        })
    };
    //是否添加短板
    $scope.whether = 0;//默认添加短板
    $scope.display = true;
    $scope.whetherMothed = function(){
        if($scope.whether == 1){
            $scope.display = false;
        }else{
            $scope.display = true;
        }
    };
    //短板分析Ok
    $scope.shortBoardOk = function(subjectCode){
        console.log(studentCodes);
        console.log($scope.whether);
        console.log(subjectCode);
        if(!studentCodes || !subjectCode){
            return;
        }
        var url = host + "shortSlab/section/through?requestId=test123456";
        if($scope.whether == 0){//添加短板学科
            url = host + "shortSlab/section/add/Subject?requestId=test123456";
        }
        $http.post(url,{
            "studentCodes":studentCodes,
            "subjectCode": subjectCode
        }).success(function(data){

            if(data.result == true){
                alert("短板分析成功！");
                location.reload(true);
                //$modalInstance.close(data);
            }
            //location.reload(true); //重新加载页面
        });
    };
    //取消
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
});
/*学生分类=》短板确认*/
app.controller('SBConfrimCtrl', function($scope, $http, $resource, $stateParams, $modal,$log, $state,$controller,CalcService) {
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    //$controller('getJsonData', {$scope: $scope});//继承
    //$controller('constAll', {$scope: $scope});//继承
    //$controller('btnSH', {$scope: $scope});//继承
    //$controller('getPaper', {$scope: $scope});//继承
    //$controller('disabled', {$scope: $scope});//继承
    // $scope.dataMap=new Array();
    //全选
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
        //console.log($scope.choseArr);

    };

    //默认值
    $scope.formData = {};
    $scope.formData.departmentType = "0";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.aimType = "1";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //目标分类
    $scope.target = function(type){
        $scope.formData.aimType = type;
        $scope.getList(1,5,null);
    }
    $scope.getList = function(page,size,callback) {
        $http.post($scope.app.host + 'shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,          //$scope.formData.departmentType
            "subjectCode": $scope.formData.subjectCode,             //$scope.formData.subjectCode,
            "bookVersionCode": $scope.formData.bookVersionCode,         //$scope.formData.bookVersionCode,
            "aimType": $scope.formData.aimType,                 //$scope.formData.aimType,
            "currentPage": page,
            "pageSize": size
        }).success(function (data) {
            $scope.data = data;
            $scope.result = data.result.list;
            $scope.tesarry = []; //初始化数据
            angular.forEach($scope.result, function(data){
                if(data.diagnosisPaperCode == null){
                    $scope.tesarry.push(data.eduVulnerabilityAnalyzeRecordCode);
                }
            });
            if(data.message == "Success"){
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        });
    }
    $scope.open = function(size,data) {
        if ($scope.choseArr[0] == "" || $scope.choseArr.length == 0) { //没有选择一个的时候提示
            alert("请至少选中一条数据在操作！")
            return;
        };
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'ModalShortSlabConfrimCtrlDR', // specify controller for modal
            size : size,
            resolve : {
                host : function(){
                    return $scope.app.host;
                },
                data : function(){
                    return data;
                }
            }
        });
        // modal return result
        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {
            $log.info('Modal dismissed at: ' + new Date())
        });
    };

    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        // $state.go(app.paperDetail({'paperCode':data.diagnosisPaperCode});
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    }

});
app.controller('ModalShortSlabConfrimCtrlDR',function($scope,$http,$controller, $modalInstance,host,data,CalcService) {
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承筛选条件
    $scope.formData = {};
    //默认值
    $scope.formData.departmentType = 1;
    $scope.formData.subjectCode = 1;
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.paperUseType = "p_005";
    $scope.formData.aimType = 1;
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    $scope.getList = function(page,size,callback){
        $http.post(host + '/diagnosis/list?requestId=test123456', {
            "subjectCode":$scope.formData.subjectCode,                  //$scope.formData.subjectCode
            "bookVersionCode":$scope.formData.bookVersionCode,       //$scope.formData.bookVersionCode
            "paperUseType":$scope.formData.paperUseType,                //$scope.formData.paperUseType
            "currentPage":page,
            "pageSize":size
        }).success(function (data) {
            console.log(data);
            if(data.message == "Success"){
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data){
            alert("请求服务失败！");
        });
    };
    //  取消
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    $scope.GetPaperCode = function(paperCode){
        $scope.paperCode = paperCode;
        console.log(paperCode);
    }
    //添加短板诊断用卷
    $scope.addShortBoardDiagOK = function(){

        console.log(data);
        console.log($scope.paperCode);
        $http.post(host + 'shortSlab/section/add/paper?requestId=test123456', {
            "shortSlabAnalysisRecordCodes":data,
            "paperCode":$scope.paperCode
        }).success(function (data) {
            if(data.result == true){
                alert("短板诊断用卷添加成功！");
                location.reload(true);
            };
        });
    };
});
/*学生分类=》短板加课时排课*/
app.controller('SBAddClassCtrl',function($scope, $controller, CalcService, $http, $state) {
    $controller('btnSH', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $controller('ParentGetDataCtrl', {$scope: $scope}); //继承
    $scope.formData = {};

    //默认类型文科
    $scope.formData.departmentType = 0;
    //默认为语文
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.gradeCode = 33;
    $scope.formData.aimType = 0;
    var $wrapPop = $(".wrapPop");
    var $innerPop = $(".innerPopBox");
    //添加课时
    $scope.addHour = function(code){
        $wrapPop.show(10);
        $innerPop.show(10);
        $scope.newCode = code;
    };
    $scope.ok = function(){
        $wrapPop.hide(10);
        $innerPop.hide(10);
        $http.post($scope.app.host + '/shortSlab/section/add/period?requestId=test123456', {
            "shortSlabAnalysisRecordCode":$scope.newCode,
            "addHourNumber":$scope.formData.Hour
        })
            .success(function (data) {
                console.log(data);
                $scope.query(1,10);
            });
    }
    $scope.cancel = function(){
        $wrapPop.hide(10);
        $innerPop.hide(10);
        $scope.query();
    };
    //添加课程
    $scope.addCourse = function(item){
        var course = {
            "shortSlabAnalysisRecordCode":item.eduVulnerabilityAnalyzeRecordCode,
            "subjectCode":item.subjectCode,
            "targetType":item.targetType,//目标类型
            "gradeCode":33,
            "bookVersionCode":item.bookVersionCode,
            "classType":3
        };
        //subjectCode学科code，targetType目标类型,classType：3 为短板课时
        $state.go("app.teachResearchManage.courseTree",{"item":JSON.stringify(course)});
    };
    //根据学年、类型、学科、教材 查询列表
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.host + '/shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,          //$scope.formData.departmentType
            "subjectCode": $scope.formData.subjectCode,             //$scope.formData.subjectCode,
            "bookVersionCode": $scope.formData.bookVersionCode,         //$scope.formData.bookVersionCode,
            "aimType": $scope.formData.aimType,                 //$scope.formData.aimType,
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
               if(data.result){
                   $scope.data = data;
                   $scope.result = data.result.list;
                   $scope.totalPage = data.result.totalPage;
                   callback && callback(data.result);
               }
            });
    }
});


//弹窗
app.controller('categoryCtrl', ['$scope', '$modal', '$log', function($scope, $modal, $log) {
    $scope.open = function(size,city) {
        var modalInstance = $modal.open({
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            city: city,
            resolve: {
                items: function() {
                    return size;
                },
                city:function(){
                    return city;
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
//弹窗调用控制器
app.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', '$http',function($scope, $modalInstance, items, $http) {
    $scope.items = items;
    $scope.selected = {
        item: $scope.items
    };
    //短板分析
    $scope.shortBoard = function(code,city,display){
        if(!code || !display || !city){
            return;
        }
        $modalInstance.close($scope.selected.item);
        var data = $scope.selected.item;
        var arr = [];
        if(data.length){
            var $input = $("#confromToVipTbody").find(".constAll").children("input:checkbox");
            $.each($input,function(index,item){
                if($(item).prop("checked") == true){
                    arr.push(data[index]);
                }
            })
        } else {
            arr.push(data);
        }
        if(arr == []){
            return;
        }
        $.each(arr,function(index,item){
            $http.post(window.testhost + "/shortSlab/section/add/Subject?requestId=test123456",{
                "diagnosticRecordsCode":item.eduStudentDiagnoseResultCode,        //$scope.selected.item.eduStudentDiagnoseResultCode ,
                "studentCodes":[item.studentCode],      //$scope.selected.item.studentCode
                "subjectCode": code,         //code
                "bookVersionCode":item.areaCode,                     //$scope.selected.item.areaCode
                "areaCode":"1"                              //city
            }).success(function(data){
                console.log(data);
               location.reload(true);
            })
        })

    };
    //添加课程类型
    $scope.changeCourseType = function(code){
        $modalInstance.close($scope.selected.item);
        $http.post(window.testhost + '/section/update/LessionLevel?requestId=test123456', {
            "code":$scope.selected.item.code,
            "lessonLevel":code
        })
            .success(function (data) {
                console.log(data);
                location.reload(true);
            });
    };
    //添加短板诊断用卷
    $scope.addShortBoardDiag = function(){
        $modalInstance.close($scope.selected.item);
        var $shortBoardBox = $("#shortBoardController").find(".isChecked");
        var $SBConfrimCtrlBox = $("#SBConfrimCtrl").find(".isChecked");
        //获取试卷Code
        var $aInput = $shortBoardBox.find("input:radio");
        for(var i=0; i<$aInput.length; i++){
            if($($aInput).eq(i).prop("checked") == true){
                $scope.diagnosisPaperCode = $($aInput).eq(i).siblings("input:hidden").val();
                break;
            }
        }
        //获取短板分析Code
        var $inputs = $SBConfrimCtrlBox.find("input:checked");
        var arr = [];
        $.each($inputs,function(index,item){
            if($(item).prop("checked") == true){
                if($scope.selected.item){
                    if($(item).siblings("input").val() != $scope.selected.item.eduVulnerabilityAnalyzeRecordCode){
                        arr.push($(item).siblings("input").val());
                    }
                } else {
                    arr.push($(item).siblings("input").val());
                }
            }
        });
        if($scope.selected.item){
            arr.push($scope.selected.item.eduVulnerabilityAnalyzeRecordCode);
        }
        $.each(arr,function(index,item){
            $http.post(window.host1 + '/shortSlab/section/add/paper?requestId=test123456', {
                "shortSlabAnalysisRecordCode":item,
                "paperCode":$scope.diagnosisPaperCode
            })
                .success(function (data) {
                    console.log(data);
                    location.reload(true);
                });
        })
    };
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}]);
/*更换学生课程类型*/
app.controller('ChangeCourseTypeCtrl', function($scope, $http, $controller, CalcService,$modal) {
    $controller('getSchoolInfo', {$scope: $scope}); // 继承筛选条件
    $controller('getSchoolInfo', {$scope: $scope}); // 继承筛选条件
    var baseHost = $scope.app.host;
    //默认选中函数
    function checked(data,ele,value){
        for(var i=0; i<data.length; i++){
            if(data[i].checked == true){
                ele.eq(i).prop("checked",true);
                $scope.formData[value] = data[i][value];
                break;
            }
        }
    }
    // 课类型
    $scope.courseTypeAll=[{code:0,name:'A'},{code:1,name:'B'},{code:2,name:'C'}];
    //文理类型
    $scope.departmentTypeAll =[];
    CalcService.filterData().then(function(b){
        $scope.departmentTypeAll=b.filterData;
    });
    //默认值
    $scope.formData = {};

    //修改某人课程类型
    $scope.changeDepartmentType = function(person){
        var instance = $modal.open({
            templateUrl: 'admin/common/tpl/changeCourseType.html',
            controller: 'ChangePersonCourseTypeAlertCtrl',
            size:'lg',
            resolve:{
                person:function(){  return person;  },
                types:function(){  return angular.copy($scope.courseTypeAll);  },
                baseHost:function(){return baseHost}
            }
        });
        instance.result.then(function(flag){
            if(flag=='ok'){
                $scope.query($scope.currentPage);
            }else if(flag=='error'){
                modalAlert({content:'抱歉，修改失败!'});
            }
        });
    };


    //根据类型、目标、中心、班级 查询列表
    $scope.query = function(page,ex) {
        if(ex)return null;
        var q =   {
            "currentPage":page||1,
            "pageSize":"10",
            "accessionYear": '2016',
            "centerCode":$scope.formData.centreOfSchool&&$scope.formData.centreOfSchool.code||undefined,
            "classCode": $scope.formData.classAndGrade&& $scope.formData.classAndGrade.code||undefined,
                "examAttr":  0,
        };
            q.targetType= $scope.formData.centreOfSchool==null ? undefined : $scope.formData.centreOfSchool.goalType;
            q.artType= $scope.formData.departmentSchool==null ? undefined : $scope.formData.departmentSchool.divisionType;
        q.name= $scope.formData.studentName==null ? undefined : $scope.formData.studentName;

        $http.post(baseHost + 'section/change/students?requestId='+Math.random(),
            q)
            .success(function (data) {
                if(data.code=='Success'){
                    $scope.currentPage = data.result.pageNumber;
                    $scope.pagination = makePagination(data.result.pageNumber,data.result.totalPage);
                    $scope.studentList = data.result;
                }else{
                    modalAlert({content:'查询学生列表失败!'});
                }
            });
    };
    //组装分页
    function makePagination(pageNo,totalPage){
        var arr=[], upage=pageNo,lpage=pageNo,showIndexs= 5,half = parseInt(showIndexs/2);
        if(totalPage>1){
            if(pageNo==1){
                upage=totalPage>showIndexs?pageNo+showIndexs-1:totalPage;
            }else if(pageNo>1){
                upage = totalPage-pageNo > half ? pageNo+half:totalPage;
                lpage = upage -showIndexs > 0 ? upage-showIndexs+1 :1;
            }
            arr.push({page:1,name:'首页',className:pageNo==1?'active':'',edge:pageNo==1?'e':''});
            arr.push({page:pageNo-1>1?pageNo-1:1,name:'上一页',className:pageNo==1?'disabled':''});
            for(var i=lpage;i<=upage;i++){
                arr.push({page:i,name:i,className:pageNo==i?'active':''});
            }
            arr.push({page:pageNo+1>totalPage?totalPage:pageNo+1,name:'下一页',className:totalPage==pageNo?'disabled':''});
            arr.push({page:totalPage,name:'尾页',className:totalPage==pageNo?'active':'',edge:'e'});
        }

        return arr;
    }
    // 弹框提醒用户(作用似alert)
    function modalAlert(data){
        $modal.open({
            templateUrl: 'admin/warning.html',
            controller: 'WarningController',
            size:data.size||'lg',
            resolve:{
                data:function(){  return data;  }
            }
        });
    }



    //获取考生类型（集合）
    $http.get("admin/json/studentType.json").then(function(result) {
        $scope.studentTypeAll =result.data.studentType;
    });

    //获取目标（集合）
    $http.get("./admin/json/aimData.json").then(function(result){
        var data = result.data.aimData;
        $scope.aimTypesAll =result.data.aimData;
    });

});
// alert优雅弹框
app.controller('WarningController', function($scope, $modalInstance,data){
    $scope.warning = data.content;
    $scope.ok = function () {
        $modalInstance.close();
    };
});
//更换某人课程类型--弹框
app.controller('ChangePersonCourseTypeAlertCtrl', function($scope, $modalInstance, $http,person,types,baseHost){
    $scope.person = person;
    $scope.departmentType = person.lessonLevel;
    $scope.types = types;
    $scope.ok = function () {
        $http.post(baseHost+'section/update/LessionLevel?requestId='+Math.random(),
            {
                "studentCode":person.code,
                "lessonLevel":$scope.departmentType
            })
            .success(function(b){
                if(b.code=='Success'&& b.result){
                    $modalInstance.close('ok');
                }else{
                    $modalInstance.close('error');
                }
            })
            .error(function(e){
                $modalInstance.close('error');
            });
    };
    $scope.cancel = function () {
        $modalInstance.close('cancel');
    };
});

/*试卷详情*/
app.controller("testpaperController",function($scope,$http, $controller, CalcService){
    $controller('getJsonData', {$scope: $scope});//继承
    var code = sessionStorage.getItem("testpaperCode");
    console.log(code);
    $http.post($scope.app.host + '/diagnosis/detail?requestId=test123456', {
        "paperCode": code     //code
    }).success(function (data) {
        $scope.testpaper = data.result.paperDetailDto;
    });
    $scope.goLast = function(){
        history.go(-1);
    }
});


//添加课程体系
app.controller('AbnTestController', function($scope,$http,$stateParams,$state) {
    $scope.courseListStatus = false;
    $scope.formData = {};
    var knowledgeList =[];
    var codes = [];
    var course = JSON.parse($stateParams.item);
    var shortSlabAnalysisRecordCode = course.shortSlabAnalysisRecordCode;

    // 获取知识点列表
    $scope.getKnowledgeTree = function(){
        $scope.my_data = [];
        knowledgeList = [];
        codes = [];

        var parameter = {
            "gradeCode" :course.gradeCode,
            "subjectCode": course.subjectCode,
            "booktypeCode": course.bookVersionCode,
            "knowledgeType": 1
        };

        $http.post($scope.app.host +'resource/knowledge/tree?requestId='+(Math.random()*100),
            parameter
        ).success(function(data,header,config,status){
            if(data.result){
                var result = [];
                data.result.datas = data.result.datas.sort(function(a,b){return parseInt(a.level)- parseInt(b.level);});
                for(var i = 0, l = data.result.datas.length; i < l; i++){
                    findTreeChild(result, data.result.datas[i]);
                }
                $scope.my_data = result;
                result = data.result.datas=null;
            }else{
                alert("无数据！");
            }

        }).error(function(data,header,config,status){
            if(status.timeout&&status.timeout.$$state.value=='abort'){
                return false;
            }
            alert('抱歉，请求知识点失败!');
        });
    };
    // 点击知识点触发事件
    $scope.showSelected = function(node){
        var knowledge = {"knowledgeCode":node.ctbCode,"knowledgeName":node.knowledgeName};
        if(codes.indexOf(node.ctbCode)<0){
            knowledgeList.push(knowledge);
            codes.push(node.ctbCode);
        }else{
            alert("此知识点已经被选中！");
        }
        $scope.knowledgeList = knowledgeList;
    };
    //移除知识点
    $scope.remove = function(obj){
        for(var i =0;i<knowledgeList.length;i++){
            if(obj ==knowledgeList[i].knowledgeCode){
                knowledgeList.splice(i,1);
                codes.splice(i,1)
                $scope.knowledgeList = knowledgeList;
            }
        }
    };
    // 知识树配置
    $scope.treeOptions = {
        multiSelection: false,
        dirSelectable:false
    };

    // 将节点放到已有json树的合适位置
    function findTreeChild(arr, tmp, isChild){
        for(var i = 0; i < arr.length; i++){
            if(arr[i].ctbCode == tmp.parentCode){
                if(!arr[i].children)arr[i].children = [];
                arr[i].children.push(tmp);
                return true;
            }else if(arr[i].parentCode == tmp.ctbCode){
                tmp.children =[arr[i]];
                arr.splice(i, 1);
                arr.unshift(tmp);
                return true;
            }else if(arr[i].children){
                if(findTreeChild(arr[i].children, tmp, true)){
                    return true;
                }
            }
        }
        if(!isChild){
            arr.push(tmp);
        }
    }

    //获取课程体系
    $scope.chooseCourse = function(){
        var url = $scope.app.host + "course/getCourseForTimeTable?requestId=1";
        $http.post(url,{
            "aimType":course.targetType,
            "classType":course.classType,
            "subjectCode": course.subjectCode
        }).success(function(data){
            if(data.message == "Success"){
                $scope.datas = data.result;
                $scope.courseListStatus = true;
            }
        }).error(function(data){
            console.log("fail");
        });
    };

    //短板加课时排课
    $scope.saveCourse = function(){
        var url = "http://192.168.1.142:8080/shortSlab/section/add/classContent?requestId=test123456";
        var course ={
            "shortSlabAnalysisRecordCode":shortSlabAnalysisRecordCode,
            "courseCode":$scope.formData.course,
            "knowledgeList":knowledgeList
        };
        $http.post(url,course).success(
            function(data){
                if(data.result){
                    $state.go("app.teachResearchManage.addClasses");
                }else{
                    alert("添加失败");
                }

            }
        );
    };
});