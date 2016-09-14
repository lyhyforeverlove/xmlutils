/*一轮判*/
app.controller('RoundController', function($scope, $http, $controller, $resource, $stateParams, $modal, $state, CalcService) {
    $controller('ParentGetDataCtrl', { $scope: $scope }); //继承

    $scope.formData = {};

});
/*二轮判*/
app.controller('SecondRoundController', function($scope, $resource, $stateParams, $modal, $state) {
    //根据学年、类型、学科、教材查询二轮判列表
    $scope.query = function() {

    }
});