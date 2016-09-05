app.controller('ParentGetDataCtrl', function($scope,CalcService) {
  // I'm the sibling, but want to act as parent
 
    $scope.getSubject = function(departmentType){
         //获取类型（文/理）
        CalcService.filterData().then(function(data){
            $scope.departmentType = data.filterData;
            $scope.category = data.filterData[departmentType].category;
            $scope.bookVersion = data.filterData[departmentType].bookVersion;
        });
        /*CalcService.PaperTypeData(departmentType).then(function(data){
            $scope.PaperType = data.result;
        })*/
    }
    $scope.load = function(){
        //获取类型（文/理） 默认为理科下面学科及版本
        CalcService.filterData().then(function(data){
            $scope.departmentType = data.filterData;
            $scope.category = data.filterData[1].category;
            $scope.bookVersion = data.filterData[1].bookVersion;
        })

        //获取文理科下的教材版本列表
       /* CalcService.PaperTypeData("1").then(function(data){
            $scope.PaperType = data.result;
        })*/
        //诊断用途{综合诊断、短板诊断、阶段考}
        CalcService.DiagnosisTypeData().then(function(data) {
            $scope.paperUseType = data.paperUse;
        });
        //目标
        CalcService.AimTypeData().then(function(data){
            $scope.aimTypes = data.aimData;
        });

        //阶段
        CalcService.StageData().then(function(data){
            $scope.stageData = data.stageData;
        });
        
        
    }
});

   