/**
 * Created by ying on 2016/9/2.
 * 创建课程表
 */
app.factory("scheduleObject",function($http, $q){
    var factory = {};
    //获取课程表
    factory.getScheduleList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/schedule.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };
    //添加课程表
    factory.addScheduleObject = function(){
        var deferred = $q.defer();
        return deferred.promise;
    };

    return factory;
});


app.service("scheduleService",function(scheduleObject){
    this.getScheduleList = function(){
        return scheduleObject.getScheduleList();
    }

    this.addScheduleObject = function(){
        return scheduleObject.addScheduleObject();
    }
});