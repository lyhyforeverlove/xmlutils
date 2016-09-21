/**
 * Created by ying on 2016/9/2.
 * 页面下拉框
 */
app.factory("factory",function($http, $q){
    var factory = {};
    //授课类型
    factory.getTeachingTypeList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/teachingTypeList.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };
    //学历类型
    factory.getTeacherEducationList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/teacherEducationList.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };
    //学历类型
    factory.getTeacherEducationList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/teacherEducationList.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };
    //合作关系
    factory.getTeacherShipList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/teacherShipList.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };
    //职称
    factory.getTeacherProList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/teacherProList.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };

    //职务
    factory.getDutyList = function(){
        var deferred = $q.defer();
        $http.get("admin/json/duty.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };


    //获取学生类型
    factory.getStudentType = function(){
        var deferred = $q.defer();
        $http.get("admin/json/studentType.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };

    //获取目标类型
    factory.getGoalType = function(){
        var deferred = $q.defer();
        $http.get("admin/json/aimData.json").success(function(data){
            deferred.resolve(data);
        }).error(function(){
            deferred.reject("error");
        });
        return deferred.promise;
    };
    return factory;
});


app.service("acquireDataService",function(factory){
    //授课类型
    this.getTeachingTypeList = function(){
        return factory.getTeachingTypeList();
    };
    //学历类型
    this.getTeacherEducationList = function(){
        return factory.getTeacherEducationList();
    };
    //合作关系
    this.getTeacherShipList = function(){
        return factory.getTeacherShipList();
    };
    //职称
    this.getTeacherProList = function(){
        return factory.getTeacherProList();
    };
    //获取学科
    this.getSubjectList = function(){
        return factory.getSubject();
    }
    //获取职务
    this.getDutyList = function(){
        return factory.getDutyList();
    }
    //获取学生类型
    this.getStudentType = function(){
        return factory.getStudentType();
    }
    //获取目标类型
    this.getGoalType = function(){
        return factory.getGoalType();
    }
});