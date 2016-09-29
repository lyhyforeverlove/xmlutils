/**
 * Created by wangyanxiao on 2016/9/22.
 */
//公共试卷详情
//单科试卷=》详情
app.controller('paperDetailController', ['$scope','$http','$stateParams',function($scope,$http,$stateParams) {
    //$scope.oneAtATime = true;
    //console.log(1111);
    //console.log($stateParams.jsonString);
    $scope.paperCode = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        $scope.json = angular.fromJson($stateParams.jsonString);
    }
    $scope.paperCode =  $scope.json.paperCode;
    //console.log($scope.paperCode);

    $scope.GetPaperDetail = function(){
        var url = $scope.app.host + 'diagnosis/detail?requestId=test123456';
        $http.post(url,{
            'paperCode':$scope.paperCode
        }).success(function(data){
            $scope.data = angular.fromJson(data);
            //console.log($scope.data);
            preDealQuestions(data.result.paperSystem.bigQusetions); //试题预处理
            $scope.diagnosisName = $scope.data.result.paperDetailDto.diagnosisName;
            $scope.bigQusetions = $scope.data.result.paperSystem.bigQusetions;
        }).error(function(data){
            console.log("fail");
        });
    };
    //预处理试题
    function preDealQuestions(qList){
        angular.forEach(qList,function(t,i){

            angular.forEach(t.list,function(ttt,iii){
                try{
                    ttt.quesOption = angular.fromJson(ttt.quesOption);
                    ttt.quesAnalyze = angular.fromJson(ttt.quesAnalyze);
                }catch(e){
                    ttt.quesOption = [];
                    ttt.quesAnalyze = [];
                }
            });

        });
    };
    //MP3播放
    $scope.MP3click = function (HSK) {
        $scope.HSKMp3Path1 = "<audio  controls='controls' id='Audio1'><source src='../../data/media/"+PY1+".mp3' type='audio/mpeg' /></audio>";
    };
}]);
//试卷管理-全科-》详情
app.controller('GroupDetailController', function($scope, $http, $resource, $stateParams, $modal, $state ) {
    /* app.teachResearchManage.groupsDetail*/
    //console.log($stateParams.jsonString);
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        $scope.V_Json = angular.fromJson($stateParams.jsonString);
    }
    var url = $scope.app.host + 'diagnosis/group/detail?requestId=test123456';
    $http.post(url,{
        "complexPaperCode":$scope.V_Json.complexPaperCode
    }).success(function(data){
        $scope.artsType = data.result.artsType;
        $scope.createTime = data.result.createTime;
        $scope.complexName = data.result.complexName;
        $scope.complexPrice = data.result.complexPrice;
        $scope.complexImgUrl = data.result.complexImgUrl;
        $scope.complexExplanation = data.result.complexExplanation;
        $scope.complexStatus = data.result.complexStatus;
        $scope.chineseDiagnosisPaperName = data.result.chineseDiagnosisPaperName;
        $scope.mathematicsDiagnosisPaperName = data.result.mathematicsDiagnosisPaperName;
        $scope.englishDiagnosisPaperName = data.result.englishDiagnosisPaperName;
        $scope.physicalDiagnosisPaperName = data.result.physicalDiagnosisPaperName;
        $scope.chemistryDiagnosisPaperName = data.result.chemistryDiagnosisPaperName;
        $scope.biologicalDiagnosisPaperName = data.result.biologicalDiagnosisPaperName;
        $scope.geographyDiagnosisPaperName = data.result.geographyDiagnosisPaperName;
        $scope.politicsDiagnosisPaperName = data.result.politicsDiagnosisPaperName;
        $scope.historyDiagnosisPaperName = data.result.historyDiagnosisPaperName;
    }).error(function(){
        modalAlert({content:'抱歉，获取诊断卷组失败!'});
    });
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
});
