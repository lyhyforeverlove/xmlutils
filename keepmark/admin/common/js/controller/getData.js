app.controller('ParentGetDataCtrl', function($scope,CalcService) {
  // I'm the sibling, but want to act as parent
 
    $scope.getSubject = function(departmentType){
         //获取类型（文/理）
        console.log(departmentType);
        CalcService.filterData().then(function(data){
            $scope.departmentType = data.filterData;
            var category = data.filterData[departmentType].category;
            $scope.category = data.filterData[departmentType].category;
            //$scope.bookVersion = data.filterData[departmentType].category[0].bookVersion;
            //console.log(data.filterData[departmentType].category[0].bookVersion);
        });
    }
    $scope.getBookVersion = function(id){
       
       //console.log(id);
        CalcService.filterData().then(function(data){
            $scope.bookVersion = data.filterData[1].category[id].bookVersion;
        });
    }
    //获取直播课程类型
    $scope.getCtb = function(id){
        CalcService.CourseAimData().then(function(data){

            $scope.CourseAimData = data.CourseAimData;
            $scope.ctb_group = data.CourseAimData[id].ctb_group;
        });
    }
    $scope.load = function(){
        //获取类型（文/理） 默认为理科下面学科及版本  //初始化
        CalcService.filterData().then(function(data){
            $scope.departmentType = data.filterData;
            $scope.category = data.filterData[1].category; //理科下的学科
            $scope.bookVersion = data.filterData[1].category[0].bookVersion;  //理科=>语文=>教材版本
        })

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
        //课程目标类型
        CalcService.CourseAimData().then(function(data){
            $scope.CourseAimData = data.CourseAimData;
            $scope.ctb_group = data.CourseAimData[0].ctb_group;

        });
        
        
    }
});

   