/**
 * Created by wangyanxiao on 2016/9/22.
 */
//公共试卷详情
/*
app.controller('paperDetailController', ['$scope','$http','$stateParams',function($scope,$http,$stateParams) {
    //$scope.oneAtATime = true;
    console.log(333);
    console.log($stateParams.jsonString);
    $scope.paperCode = null;
    // 获取上个界面传递的数据，并进行解析
    if ($stateParams.jsonString != '') {
        $scope.json = angular.fromJson($stateParams.jsonString);
    }
    $scope.paperCode =  $scope.json.paperCode;
    console.log($scope.paperCode);

    $scope.GetPaperDetail = function(){
         var url = $scope.app.host + 'diagnosis/detail?requestId=test123456';
         $http.post(url,{
         'paperCode':$scope.paperCode
         }).success(function(data){
            console.log(data);
             $scope.diagnosisName = data.result.paperDetailDto.diagnosisName;
            $scope.bigQusetions = data.result.paperSystem.bigQusetions;
         }).error(function(data){
            console.log("fail");
         })
    }

}]);*/
