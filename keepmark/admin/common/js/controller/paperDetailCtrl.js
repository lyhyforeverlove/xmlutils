/**
 * Created by wangyanxiao on 2016/9/22.
 */
//公共试卷详情
app.controller('paperDetailController', ['$scope','$http', function($scope,$http) {
    //$scope.oneAtATime = true;
    var url = $scope.app.host + 'diagnosis/detail?requestId=test123456';
    $http.post(url,{
        'paperCode':"796EBDDCBDF7492CB7CCDA5729817767"
    }).success(function(data){
        console.log(data);
    }).error(function(data){
        console.log("fail");
    })

}]);