/*
 *读取本地json 类型、学科、教材、诊断用途
 * use factory
 */
app.factory('MathService', function($http, $q) {
    var factory = {};
    /*factory.multiply = function(a, b) {
        return a * b
    }*/
    //获取类型、学科、教材
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
    factory.getDiagnosisType = function(){
        var deferred = $q.defer();
        $http.get('admin/json/paperUseType.json')
            .success(function(data) {
                deferred.resolve(data);
            }).error(function() {
                deferred.reject("there was an error");
            })
        return deferred.promise;
    }
    return factory;
});

app.service('CalcService', function(MathService) {
    /*this.square = function(a) {
        return MathService.multiply(a, a);
    }*/
    this.filterData = function() {
        return MathService.getSubject();
    }
    this.DiagnosisTypeData = function() {
        return MathService.getDiagnosisType();
    }
});
