/*
 *读取本地json 类型、学科、教材、诊断用途
 * use factory
 */
app.factory('GetDataFactory', function($http, $q) {
    var factory = {};
    //获取类型、学科、教材版本
    factory.getSubject = function() {
        var deferred = $q.defer();
        $http.get('admin/json/filterData.json')
            .success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("there was an error");
            })
        return deferred.promise;
    }
    //获取诊断类型（）
    factory.getDiagnosisType = function(){
        var deferred = $q.defer();
        $http.get('admin/json/paperUseType.json')
            .success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("there was an error");
            })
        return deferred.promise;
    };
    //获取目标类型（）
    factory.getAimType = function(){
        var deferred = $q.defer();
        $http.get('admin/json/aimData.json')
            .success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("there was an error");
            })
        return deferred.promise;
    };
    //获取第几阶段
    factory.getStage = function(){
        var deferred = $q.defer();
        $http.get('admin/json/stageData.json')
            .success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("there was an error");
            })
        return deferred.promise;
    };
    //获取课程 目标类型
    factory.getCourseAim = function(){
        var deferred = $q.defer();
        $http.get('admin/json/courseAimData.json')
            .success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("there was an error");
            })
        return deferred.promise;
    };
    return factory;   
});

app.service('CalcService', function(GetDataFactory) {
   
    this.filterData = function() {
        return GetDataFactory.getSubject();
    };
    this.DiagnosisTypeData = function() {
        return GetDataFactory.getDiagnosisType();
    };
    /*this.PaperTypeData = function(artType){
        return GetDataFactory.getPaperType(artType);
    }*/
    this.AimTypeData = function() {
        return GetDataFactory.getAimType();
    };
    this.StageData = function() {
        return GetDataFactory.getStage();
    };
    this.CourseAimData = function() {
        return GetDataFactory.getCourseAim();
    };
    
});
