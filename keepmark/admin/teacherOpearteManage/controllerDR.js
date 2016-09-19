//判卷列表页面
app.controller("paperCheckedControllerDR",function($scope, $http, $resource, $stateParams, $modal, $state,$controller){
    $scope.name="判卷";

    $scope.load = function(page,size,callback){
        if(page==undefined || page==null)
            page=1;
        if(size==undefined || size==null)
            size=10;
        $http.post($scope.app.host +"/fullTeacher/getDiagnosisRecordList?requestId=test123456",
            {
                "CurrentPage":page,
                "pageSize":size,
                "teacherCode":"02e6ae3310b24144b3683d5a2f741c5d"
            }
        ).success(function (data) {
                $scope.list = data.result.list;
                $scope.totalPage = data.result.totalPage;
                callback && callback(data.result);
        });
    };

    $scope.paperDetail = function(){
        $state.go("app.teacherOpearteManage.paperDetail");
    };
    $scope.paperChecked = function(){
        $state.go("app.teacherOpearteManage.paperDetail");
    };
    $scope.opraterSel = function(val,type){
        console.log("val-->"+val);
        console.log("type-->"+type);
        if((val==null || val==undefined) && type==0){
            return true;
        }
        if( type==val){
            return true;
        }else return false;
    };
});
//试卷详情
app.controller()