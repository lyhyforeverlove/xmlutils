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
app.controller('ConfromToVipCtrl', function($scope, $http, $controller, CalcService) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('constAll', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    $controller('disabled', {$scope: $scope});//继承
    $scope.formData = {};
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
    //默认值
    $scope.formData.departmentType = "1";
    $scope.formData.aimType = 1;
    $scope.formData.isShortlabStatus = "1";
    $scope.formData.totalStart = "400";
    $scope.formData.totalEnd = "600";
    $scope.formData.paperUseType = "1";
    $scope.formData.city = "1";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
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
    //目标分类
    $scope.target = function(type){
        $scope.formData.aimType = type;
        $scope.query(1,1,null);
    };
    //根据类型、地区、总分数 查询列表
    $scope.query = function(page,size,callback){
        $http.post($scope.app.host + '/shortSlab/list?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,
            "aimType":$scope.formData.aimType,
            "isShortlabStatus":$scope.formData.isShortlabStatus,
            "startTotalScore":$scope.formData.totalStart,
            "endTotalScore":$scope.formData.totalEnd,
            "areaCode":$scope.formData.city,
            "currentPage": page,
            "pageSize":size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    };
});
/*学生分类=》短板确认*/
app.controller('SBConfrimCtrl', function($scope, $controller,CalcService, $http) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('constAll', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $controller('disabled', {$scope: $scope});//继承
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
        $scope.query(1,1,null);
    }
    $scope.query = function(page,size,callback) {
        $http.post($scope.app.testhost + '/shortSlab/teaching/getShortSlabStudentList?requestId=test123456', {
            "departmentType": $scope.formData.departmentType,          //$scope.formData.departmentType
            "subjectCode": $scope.formData.subjectCode,             //$scope.formData.subjectCode,
            "bookVersionCode": $scope.formData.bookVersionCode,         //$scope.formData.bookVersionCode,
            "aimType": $scope.formData.aimType,                 //$scope.formData.aimType,
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    }
});
/*学生分类=》短板加课时排课*/
app.controller('SBAddClassCtrl',function($scope, $controller, CalcService, $http, $state) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('btnSH', {$scope: $scope});//继承
    $controller('getPaper', {$scope: $scope});//继承
    $scope.formData = {};
    //默认值
    $scope.formData.departmentType = "0";
    $scope.formData.subjectCode = "1";
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.aimType = "1";
    $scope.formData.Hour = "1";
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //目标
    $scope.target = function(code){
        $scope.formData.aimType = code;
        $scope.query(1,3,null);
    }
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
        $http.post($scope.app.testhost + '/shortSlab/section/add/period?requestId=test123456', {
            "shortSlabAnalysisRecordCode":$scope.newCode,
            "addHourNumber":$scope.formData.Hour
        })
            .success(function (data) {
                console.log(data);
                $scope.query();
            });
    }
    $scope.cancel = function(){
        $wrapPop.hide(10);
        $innerPop.hide(10);
        $scope.query();
    }
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
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
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
app.controller('ChangeCourseTypeCtrl', function($scope, $http, $controller, CalcService) {
    $controller('getJsonData', {$scope: $scope});//继承
    $controller('getValue', {$scope: $scope});//继承
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
    //默认值
    $scope.formData = {};
    $scope.formData.departmentType = "all";
    $scope.formData.aimType = "all";
    $scope.formData.classes = "all";
    $scope.formData.center = "all";
    $scope.formData.studentType = "all";
    $scope.formData.inScrollYear = "all";

    //班级默认值（点击中心后）
    $scope.first = function(){
        if($scope.formData.classes){
            $scope.formData.classes = "09d4eefcbb924c1fb529f0d27c641295";
        }
    };
    //筛选条件改变时执行
    $scope.change = function(val,name){
        $scope.formData[name] = val;
    };
    //根据类型、目标、中心、班级 查询列表
    $scope.query = function(page,size,callback) {
        var obj = {};
        for(var key in $scope.formData){
            if($scope.formData[key] != "all"){
                if(key == "inScrollYear"){
                    obj[key] = $scope.getScrollYearName($scope.formData[key]);

                } else {
                    obj[key] = $scope.formData[key];
                }
            }
        }
        //console.log(obj);//数据用obj代替（选全部时不传数据）
        $http.post($scope.app.host + 'section/change/students?requestId=test123456', {
            "targetType": "1",
            "accessionYear": "2016",
            "artType": 1,
            /*"centerCode": "62c60cc618d64f2fa80787647bbe3e78",
             "classCode": "7ea1fd8c6ca942ea8a4ac76c0cb28f5b",*/
            "examAttr": "1",
            "currentPage": page,
            "pageSize": size
        })
            .success(function (data) {
                console.log(data);
                $scope.data = data;
                $scope.result = data.result.authStudentModels;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            });
    }
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