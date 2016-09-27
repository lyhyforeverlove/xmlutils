'use strict';
/*课程管理*/
app.controller('CourseListCtrl', function($scope, $http,$controller,$resource, $stateParams, $modal, $state,$log,CalcService) {
   
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    $scope.formData = {};
    //默认为语文
    $scope.formData.subjectCode = 5;
    //默认保分类型
    $scope.formData.aimType = 0;
    //默认班型
    $scope.formData.classType = 0;

    //根据考生类型、班型、保分类型、科目 查询列表
    $scope.getList = function(page,size,callback) {
        var url = $scope.app.host + "course/list?requestId=1";
        $http.post(url,{
            "aimType":  $scope.formData.aimType,
            "classType": $scope.formData.classType,
            "subjectCode": $scope.formData.subjectCode,
            "pageSize":size,
            "pageNumber":page
        }).success(function(data){
            if(data.message == "Success"){
                //console.log(data);
                $scope.results = data.result;
                var list = data.result.list;
                angular.forEach(list,function(cb,index){
                    if (cb.classType === "BIGCLASS") {
                        $scope.classTypeName = "大班课";
                    }else if(cb.classType === "SMALLCLASS"){
                        $scope.classTypeName = "小班课";
                    }else{
                        $scope.classTypeName = "1对1";
                    }
                });
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
            }
        }).error(function(data){
            console.log("fail");
        });
    }

    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *//*,controller,selectedJson*/
    $scope.open = function(size,data) {
        //console.log(selectedJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : 'TeachingDistributeCtrl', // specify controller for modal
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
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.formData.resourcePaperCode= selectedItem;

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
});
//课程管理 =》课程体系分配老师
app.controller('TeachingDistributeCtrl', function($scope, $http,$controller,$modalInstance,$resource, $stateParams, $modal, $state,host,data,CalcService) {
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    $scope.teacherGoalType = 0;
    $scope.authTeacherModels = []; //定义数组用于存放前端显示
    var str = ""; //
    $scope.x = false; //默认未选中
    var Index;
    $scope.chk = function(z, x) { //单选或者多选
        if (x == true) { //选中
            $scope.authTeacherModels.push(z);
        } else {
            //str = str.replace(z + ',', ''); //取消选中
            angular.forEach($scope.authTeacherModels,function(cb,index){
                if (cb.code === z.code) {
                    $scope.authTeacherModels.splice(index, 1);
                }
            });
        }
    };
     // ok click
    $scope.ok = function() {
        var url = host + 'course/distribute/teacher?requestId=1';
        $http.post(url,{
            "subject": data.subjectCode,
            "targetType": $scope.teacherGoalType,
            "courseSystemCode": data.courseCode,
            "authTeacherModels": $scope.authTeacherModels
        }).success(function(data){
            //console.log(data);
            $modalInstance.close();
        }).error(function(data){

        })
        //$modalInstance.close($scope.formData.resourcePaperCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
    //读取课程分配老师  老师列表（专职老师
    //
    // ）
    var url = host +'teaching/course/getTeachers?requestId=test123456';
    $http.post(url,{"type":1,"subjectCode":data.subjectCode}).success(function(data){
       //console.log(data);
        $scope.results = data.result;
        if(data.result.length === 0 ){
           $scope.message = '没有符合课程的教师!';
        }
    }).error(function(data){
        console.log("fail");
    })
});
/*课程管理=》详情*/
app.controller('CourseDetailController', function($scope, $http,$resource, $stateParams, $modal, $state) {

    var courseSystemCode = $stateParams.courseSystemCode;
    var url = $scope.app.host + '/course/detail?requestId=1';
    $scope.load = function(courseSystemCode){
        $http.post(url,{"courseSystemCode":courseSystemCode}).success(function(data){
            console.log(data);
            $scope.results = data.result;

        }).error(function(data){
            console.log("fail");
        })
    }

});
//读取新增课程列表 弹框
app.controller("getPapersByCourseCtrl", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson) {

    $scope.formCourseData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        $scope.formCourseData.resourcePaperCode = resourcePaperCode;
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.formCourseData.resourcePaperCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
    console.log(V_PapersListJson);
    //初始化调取资源库列表
    $scope.load = function(page,size,callback){
        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条
        console.log(V_PapersListJson);
        var url = host + "course/getRepositoryCourse?requestId=123456";
        $http.post(url,V_PapersListJson).success(function(data) {
            console.log(data);
            $scope.results = data.result;
            if(data.result != null){
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result); //调取分页回调
            }else{
                $scope.message = "没有符合的记录";
            }
        }).error(function(data){
            console.log("fail");
        })
    }
});


/*试卷管理=》单科诊断列表*/
app.controller('DiagListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    //默认为短板诊断
    $scope.formData.paperUseType = "p_004";
    //默认学年为33
    $scope.formData.gradeCode = 33;
    var results;
    $scope.getList = function(page, size, callback) {
       $http.post($scope.app.host + 'diagnosis/list?requestId=test123456', {
                "subjectCode":$scope.formData.subjectCode,
                "bookVersionCode": $scope.formData.bookVersionCode,
                "paperUseType": $scope.formData.paperUseType,
                "currentPage": page,
                "pageSize": size
            })
            .success(function(data) {
                if(data.message == "Success"){
                    console.log(data);
                    $scope.results = data.result;
                    results = data.result.list;
                    angular.forEach(results, function(data,index,array){
                        if(data.subjectCode == 1){
                            $scope.subjectName = "语文";
                        }else if(data.subjectCode == 2){
                            $scope.subjectName = "数学";
                        }else if(data.subjectCode == 3){
                            $scope.subjectName = "英语";
                        }else if(data.subjectCode == 4){
                            $scope.subjectName = "物理";
                        }else if(data.subjectCode == 5){
                            $scope.subjectName = "化学";
                        }else if(data.subjectCode == 6){
                            $scope.subjectName = "生物";
                        }else if(data.subjectCode == 7){
                            $scope.subjectName = "历史";
                        }else if(data.subjectCode == 8){
                            $scope.subjectName = "政治";
                        }else{
                            $scope.subjectName = "地理";
                        }
                    });
                    $scope.totalPage = data.result.totalPage;

                    callback && callback(data.result);
                }
               
            }).error(function(data){
                console.log("fail");
            });
    };

    //详情跳转传参数
    $scope.GetPaperDetail = function(data){
        var jsonString = angular.toJson(data);
        $state.go('app.paperDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    }

});


app.controller('DetailController', function($scope, $http, $resource, $stateParams, $modal, $state ) {
 
    var paperCode = $stateParams.paperCode;
    //获取诊断资源试卷详情
    $scope.load = function(){
        /*$state.go("app.teachResearchManage.detail");*/
        $http.post($scope.app.host + '/resource/get/paper/detail?requestId=test123456',
            {
                "paperCode": paperCode
            }).success(function(data){
                var results = angular.fromJson(data.result);
                
                $scope.examName = results.examName;//试卷名称
                $scope.question = results.questions[0].stem;
                //console.log(results.examName);
               /* var paperDetailDto = data.result.paperDetailDto;

                $scope.diagnosisName = paperDetailDto.diagnosisName;
                $scope.gradeCode = paperDetailDto.gradeCode;
                $scope.bookVersion = paperDetailDto.bookVersion;
                $scope.diagnosisType = paperDetailDto.diagnosisType;
                $scope.operator = paperDetailDto.operator;
                $scope.createTime = paperDetailDto.createTime;
                $scope.diagnosisImgUrl = paperDetailDto.diagnosisImgUrl;
                $scope.artsType = paperDetailDto.artsType;
                $scope.area = paperDetailDto.area;
                $scope.diagnosisExplanation = paperDetailDto.diagnosisExplanation;
                $scope.diagnosisStatus = paperDetailDto.diagnosisStatus;*/
            })
    }
})


/*
*试卷管理=》新增单科诊断用卷  //formData          controller=>CreateSingleController
*试卷管理=》组织全科诊断卷   //postData           controller=>CreateGroupController
*试卷管理=》阶段组织用卷     //stageFormData      controller=>CreateStageController
*课程管理=》新增课程         //formCourseData     controller=>CreateCourseController
*/
app.controller('CreateSingleController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    $scope.formData.gradeCode = 33;

    //默认为短板诊断
    $scope.formData.paperUseType = "p_004";
    $scope.formData.aimType = 2;

    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

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

    
    $scope.formData.describe = '';

    $scope.focus = function() {
       
        if (!$scope.formData.describe) {
            $scope.formData.describe = defaultTitle;
        }
    };

    $scope.blur = function() {
        if ($scope.formData.describe === defaultTitle) {
            $scope.formData.describe = '';
        }
    };

    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {

               // $scope.formData.coverUrl = result;
            });
    };

    $scope.submit = function(){
       /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
        var config = {
            "bucket": 'keepmark', //空间名称
            "expiration": date, //上传请求过期时间
            "save-key":"/img.jpg",
            //"signature" : aaaa
            // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
            form_api_secret: 'WwbrepSiLMoTpx/+D2c+3klosIA='
        };

        var instance = new Sand(config);

        var options = {
            'notify_url': 'http://upyun.com'
        };

        instance.setOptions(options);
    
        instance.upload('/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + '.jpg');
    }

    document.addEventListener('uploaded', function(e) {
        $scope.formData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
      
    });
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller) {
        //console.log(selectedJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.formData.resourcePaperCode= selectedItem;

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    //组成单科诊断用卷
    $scope.createSingle = function(formData) {

        var url = $scope.app.host + "/section/diagnosis/paper/add?requestId=test123456";

        $http.post(url, formData).success(function(data) {
            //alert($scope.formData.resourcePaperCode);
            if($scope.formData.resourcePaperCode == null){
                alert("请添加诊断卷资源");
            }
            if(data.message == "Success"){

                $state.go('app.teachResearchManage.diagExamList');
            }
            console.log(data);
        }).error(function(data) {
            console.log("fail");
        })
    };
    
});
//组织全科诊断卷
app.controller('CreateGroupController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    //组成全科postData对象
    $scope.postData = { };
    $scope.postData.paperUseType = "p_004";

    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

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
    $scope.postData.describe = '';
    $scope.focus = function() {
        if (!$scope.postData.describe) {
            $scope.postData.describe = defaultTitle;
        }
    };
    $scope.blur = function() {
        if ($scope.postData.describe === defaultTitle) {
            $scope.postData.describe = '';
        }
    };
    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {
               // $scope.formData.coverUrl = result;
            });
    };
    $scope.submit = function(){
       /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
        var config = {
            "bucket": 'keepmark', //空间名称
            "expiration": date, //上传请求过期时间
            "save-key":"/img.jpg",
            //"signature" : aaaa
            // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
            form_api_secret: 'WwbrepSiLMoTpx/+D2c+3klosIA='
        };
        var instance = new Sand(config);
        var options = {
            'notify_url': 'http://upyun.com'
        };
        instance.setOptions(options);
        instance.upload('/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + '.jpg');
    };
    document.addEventListener('uploaded', function(e) {
        $scope.postData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
      
    });
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller,codeJson) {
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                },
                codeJson : function(){
                    return codeJson; //chineseCode...
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {
            $scope.postData[codeJson.code] = selectedItem; //返回值动态赋给postData对象
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    //默认类型为理科
    $scope.postData.departmentType = 1;
    /*
    *组成全科(文/理)诊断用卷
    */
    $scope.creteGroup = function(postData){
        var url = $scope.app.host +"/section/diagnosis/papers/add?requestId=test123456";
        $http.post(url,postData).success(function(data){
            console.log(data);
            $state.go('app.teachResearchManage.doubleList');
        }).error(function(data) {
            console.log("fail");
        })
    }
});
//新增阶考试用卷
app.controller('CreateStageController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {
    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //
    $scope.stageFormData = {};//组织阶段考对象
    $scope.stageFormData.diagnosisPaperCode = [];//诊断卷code列表
    $scope.stageFormData.departmentType = 1;//默认为理科
    $scope.stageFormData.stage = 1; //默认为第一阶段
    $scope.stageFormData.paperUseType = "p_014";
    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };
    $scope.getName = function() {
        $('#text_name').attr('disabled', 'disabled');
    };
    $scope.editName = function() {
        $('#text_name').removeAttr('disabled');
    };
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.subjectCode = [];//存放学科数组 判断添加/更换按钮
    $scope.open = function(size,selectedJson,controller,codeJson,state,removediagnosisPaperCode) {
        //console.log(selectedJson);
        //console.log(codeJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                },
                codeJson : function(){
                    return codeJson;
                },
                state : function(){
                    return state;
                },
                removePaperCode : function(){
                    return removediagnosisPaperCode;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {
            angular.forEach($scope.subjectCode, function(data,index,array){
                console.log(array);
                //data等价于array[index]
                if($scope.subjectCode[index] == selectedItem.subjectCode){
                    //console.log(true);
                    $scope.subjectCode.splice(index,1);//删除之前的
                }
            });
            $scope.subjectCode.push(selectedItem.subjectCode);
            $scope.diagnosisPaperCode = selectedItem.diagnosisPaperCode;
            $scope.removePaperCode = selectedItem.removePaperCode;

            //console.log($scope.removePaperCode);
            //console.log($scope.subjectCode);
            //console.log($scope.diagnosisPaperCode);

            if(state == 0){
                $scope.stageFormData.diagnosisPaperCode.push( $scope.diagnosisPaperCode);
            }else{
                console.log($scope.stageFormData.diagnosisPaperCode); //splice
                angular.forEach($scope.stageFormData.diagnosisPaperCode, function(data,index,array){
                    if($scope.removePaperCode == $scope.stageFormData.diagnosisPaperCode[index]){
                        console.log(index);
                        $scope.stageFormData.diagnosisPaperCode.splice(index,1);//删除之前的
                    }
                });
                //console.log($scope.stageFormData.diagnosisPaperCode);
                $scope.stageFormData.diagnosisPaperCode.push( $scope.diagnosisPaperCode);//再追加
            }
        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }
    
    /*
    *新增阶段考试用卷
    */
    $scope.createStage = function(stageFormData){

        $scope.stageFormData.startDate = angular.element("#startDate").val();//开始时间
        $scope.stageFormData.endDate = angular.element("#endDate").val();//结束时间

        var url = $scope.app.host +"section/diagnosis/stage/paper/add?requestId=test123456";

        $http.post(url,stageFormData).success(function(data){
            console.log(data);
            if(data.result != null){
                $state.go('app.teachResearchManage.stageList');
            }
        }).error(function(data) {
            console.log("fail");
        })
    };
});
//新增课程
app.controller('CreateCourseController', function($scope, $http,$controller, $resource, $stateParams, $modal,$log, $state ,fileReader,CalcService) {

    
    $controller('ParentGetDataCtrl', {$scope: $scope}); //

    $scope.formData = {};//组织新增课程对象
    $scope.getSubjectName = function(subjectName){
        $scope.subjectName = subjectName;
    };

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

    
    $scope.formData.describe = '';

    $scope.focus = function() {
       
        if (!$scope.formData.describe) {
            $scope.formData.describe = defaultTitle;
        }
    };

    $scope.blur = function() {
        if ($scope.formData.describe === defaultTitle) {
            $scope.formData.describe = '';
        }
    };

    //获取图片路径
    $scope.getFile = function() {
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function(result) {

               // $scope.formData.coverUrl = result;
            });
    };

    $scope.submit = function(){
       /* var ext = angular.element('#file').files[0].name.split('.').pop();*/
        var date =parseInt((new Date().getTime() + 3600000) / 1000);
        var config = {
            "bucket": 'keepmark', //空间名称
            "expiration": date, //上传请求过期时间
            "save-key":"/img.jpg",
            //"signature" : aaaa
            // 尽量不要使用直接传表单 API 的方式，以防泄露造成安全隐患
            form_api_secret: 'WwbrepSiLMoTpx/+D2c+3klosIA='
        };

        var instance = new Sand(config);

        var options = {
            'notify_url': 'http://upyun.com'
        };

        instance.setOptions(options);
    
        instance.upload('/upload/test' + parseInt((new Date().getTime() + 3600000) / 1000) + '.jpg');
    }
   

    document.addEventListener('uploaded', function(e) {
        $scope.formData.coverUrl= 'http://keepmark.b0.upaiyun.com'+e.detail.path;
    });    

   
    /*弹出模态框 （公共模态框）
    *@params size  模态框大小
    *@params selectedJson 根据学年、类型、学科、教材查询资源库/诊断试卷列表列表
    */
    $scope.open = function(size,selectedJson,controller) {
        console.log(selectedJson);
        var modalInstance = $modal.open({
            templateUrl : 'myModelContent.html',
            controller : controller, // specify controller for modal
            size : size,
            resolve : {
                V_PapersListJson :function(){
                    return selectedJson;
                },
                host : function(){
                    return $scope.app.host;
                }
            }
        });
        // model返回结果
        modalInstance.result.then(function(selectedItem) {

            $scope.formData.repositoryCourseCode= selectedItem;
            //$scope.formCourseData

        }, function() {
            $log.info('Modal dismissed at: ' + new Date());
        });
    }

    /*
    *新增课程体系
    */
    //学科
    $scope.formData.gradeCode = 33;
   $scope.formData.departmentType = 1;
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
    $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";
    //默认学年为33

    //默认保分类型
    $scope.formData.bigCategoriesCode = "c_001";
    //默认班型
    $scope.formData.categoriesCode = "001001";
    $scope.formData.classType = 0;
    //判断大班课
    $scope.getClassType = function(classType){
        $scope.formData.classType = classType
    };

    $scope.conf = [];
    $scope.AddCourse = function(){
        var url = $scope.app.host + "/course/add?requestId=1";
        $http.post(url,{/*repositoryBigcourseCode*/
            "bookVersion":$scope.formData.bookVersionCode,
            "categoriesCode":$scope.formData.categoriesCode,
            "classType":$scope.formData.classType,
            "subjectCode":$scope.formData.subjectCode,
            "gradeCode":$scope.formData.gradeCode,
            "courseName":$scope.formData.name,
            "courseImgUrl":$scope.formData.coverUrl,
            "repositoryCourseCode":$scope.formData.repositoryCourseCode ,
            "repositoryBigcourseCode": $scope.formData.bigCategoriesCode
        }).success(function(data){
            console.log(data);
            if(data.message == "Success"){
               $state.go('app.teachResearchManage.courseList');
            }
        }).error(function(data){
            console.log("fail");
        });
    }
});
/*根据学年、学科、教材版本、试卷用途、单元知识点code获取试卷列表*/
app.controller("getPapersController", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson) {
    console.log(V_PapersListJson);
    $scope.formData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        console.log( $scope.formData.repositoryCourseCode);
        $scope.formData.repositoryCourseCode = resourcePaperCode;
       // angular.element("#"+resourcePaperCode).remove("btn-default")
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.formData.repositoryCourseCode);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
    $scope.load = function(page,size,callback){
        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
       // V_PapersListJson["currentPage"] = page;  //当前页参数
       // V_PapersListJson["pageSize"] = size; //每页显示多少条

        var url = host + "/resource/get/papers?requestId=1";
        $http.post(url,{
            "gradeCode":V_PapersListJson.gradeCode,
            "subjectCode":V_PapersListJson.subjectCode,
            "booktype":V_PapersListJson.bookVersionCode,
            "type":V_PapersListJson.paperUseType,
            "difficultStar":V_PapersListJson.aimType,
            "cp":page,
            "pageSize":size 
        }).success(function(data) {

            console.log(data.message);

            $scope.results = data.result;

            callback && callback(data.result); //调取分页回调
        })
    }
});
//读取单科诊断试卷列表  组织全科弹框
app.controller("getPapersByDiagCtrl", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson,codeJson) {
    
    $scope.postData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(resourcePaperCode){
        //console.log(resourcePaperCode);
        $scope.postData[codeJson.code] = resourcePaperCode;
        //$scope.postData.[codeJson] = resourcePaperCode;
         
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.postData[codeJson.code]);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }
    console.log(V_PapersListJson);
    //初始化调取资源库列表
    $scope.load = function(page,size,callback){

        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条
        console.log(V_PapersListJson);
        var url = host + "diagnosis/list?requestId=test123456";
        $http.post(url,V_PapersListJson).success(function(data) {

            if(data.message == "Success"){
                console.log(data);
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
    }
});
//阶段考  弹框
app.controller("getPapersByDiagStageCtrl", function($scope, $http, $resource, $stateParams, $modal, $state, $modalInstance, host,V_PapersListJson,state,removePaperCode) {
    
    $scope.stageFormData = {};  //formData.resourcePaperCode
    //选用按钮
    $scope.GetResourcePaperCode = function(diagnosisPaperCode,subjectCode,state){
        //console.log(subjectCode);
        $scope.stageFormData.diagnosisPaperCode = diagnosisPaperCode;
        $scope.stageFormData.subjectCode = subjectCode;
        $scope.stageFormData.state = state;
        $scope.stageFormData.removePaperCode = removePaperCode;
         
    }
    // ok click
    $scope.ok = function() {
        $modalInstance.close($scope.stageFormData);
        //$modalInstance.close($scope.selected.item);
    };
    // cancel click
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    }

    //初始化调取资源库列表
    $scope.load = function(page,size,callback){

        if(V_PapersListJson.subjectCode == 1){
            $scope.subjectName ="语文";
        }
        V_PapersListJson["currentPage"] = page;  //当前页参数
        V_PapersListJson["pageSize"] = size; //每页显示多少条
        //console.log(V_PapersListJson);
        var url = host + "diagnosis/list?requestId=test123456";
        $http.post(url,V_PapersListJson).success(function(data) {

            if(data.message == "Success"){
                //console.log(data);
                $scope.results = data.result;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);

            }
        }).error(function(data){
            console.log("fail");
        })
    }
});
//试卷管理=》诊断全科试卷列表
app.controller('GroupListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
   $controller('ParentGetDataCtrl', {$scope: $scope});//继承
    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    //$scope.formData.subjectCode = 1;
    //默认为全国卷一
    /*$scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";*/
    /*$scope.formData.gradeCode = 33;*/

    
    $scope.getList = function(page, size, callback) {
           $http.post($scope.app.host + '/diagnosis/group/list?requestId=test123456', {
                    "departmentType":$scope.formData.departmentType,
                    /*"bookVersionCode":$scope.formData.bookVersionCode,*/
                    "currentPage":page,
                    "pageSize":size
                })
                .success(function(data) {
                  /* console.log(data);*/
                    if(data.message == "Success"){
                        angular.forEach(data.result.list, function(data){
                            if(data.artsType == "SCIENCE"){
                                data.artsType = "理科";
                            }else{
                                data.artsType = "文科";
                            }
                        });
                        $scope.results = data.result;

                        $scope.totalPage = data.result.totalPage;

                        callback && callback(data.result);
                    }
                }).error(function(data){
                    console.log("fail");
                });
    };
    //获取学科类型
   /* CalcService.filterData().then(function(d){
        $scope.departmentTypeAll = d.filterData;
        $scope.departmentTypeAll.unshift({  "departmentType": '', "departmentName": "全部",selected:true});

    });*/
    //点击全科详情
    $scope.GetGroupDetail = function(data){
        // $state.go(app.paperDetail({'paperCode':data.diagnosisPaperCode});
        console.log(data);
        var jsonString = angular.toJson(data);
        $state.go('app.groupsDetail', {
            jsonString: jsonString
        }, {
            reload: true
        });
    }

});
app.controller('GroupsDetailCtrl', function($scope, $http,$resource, $stateParams, $modal, $state) {
    $scope.name = "诊断试卷组详情";
});
//试卷管理=》阶段考试卷列表
app.controller('StageListController', function($scope, $http,$controller, $resource, $stateParams, $modal, $state,CalcService) {
    $controller('ParentGetDataCtrl', {$scope: $scope});//继承

    $scope.formData = {};
    //默认类型为理科
    $scope.formData.departmentType = 1;
    //默认为语文
    $scope.formData.subjectCode = 1;
    //默认为全国卷一
   /* $scope.formData.bookVersionCode = "7HCcMZTzpcThi6RaByWysKQPPbtTHSj8";*/
    //默认学年为33
    $scope.formData.gradeCode = 33;
    //默认为短板诊断
   // $scope.formData.paperUseType = 0;
    //默认目标类型为一本上线30分
    $scope.formData.aimType = 3;
    //默认为第几阶段
    $scope.formData.stage = 1;

    $scope.getList = function(page, size, callback) {
           $http.post($scope.app.host + '/diagnosis/stage/list?requestId=test123456', {
                    /*"gradeCode": $scope.formData.gradeCode,*/
                    "departmentType":$scope.formData.departmentType,
                   /* "subjectCode":$scope.formData.subjectCode,*/
                    /*"bookVersionCode": $scope.formData.bookVersionCode,*/
                    "stage":$scope.formData.stage,
                    /*"aimType": $scope.formData.aimType,*/
                    "currentPage":page,
                    "pageSize":size
                })
                .success(function(data) {
                    if(data.message == "Success"){
                        console.log(data);
                        var list = data.result.list;

                        angular.forEach(list, function(data){

                            if(data.subjectCode == 1 ){
                                data.subjectCode = "语文";
                            }else if(data.subjectCode == 2){
                                data.subjectCode = "数学";
                            }else if(data.subjectCode == 3){
                                data.subjectCode = "英语";
                            }else if(data.subjectCode == 4){
                                data.subjectCode = "物理";
                            }else if(data.subjectCode == 5){
                                data.subjectCode = "化学";
                            }else if(data.subjectCode == 6){
                                data.subjectCode = "生物";
                            }else if(data.subjectCode == 7){
                                data.subjectCode = "历史";
                            }else if(data.subjectCode == 8){
                                data.subjectCode = "地理";
                            }else if(data.subjectCode == 9){
                                data.subjectCode = "政治";
                            }
                        });
                        $scope.results = data.result;

                        $scope.totalPage = data.result.totalPage;

                        callback && callback(data.result);
                    }
                }).error(function(data){
                    console.log("fail");
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

