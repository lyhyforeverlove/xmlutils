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


//通过ID获取value
app.controller("getValue",function($http,$scope){
    $http.get("admin/json/filterData.json").then(function(data){
        var newData = data.data.filterData;
        var department;
        //获取 文、理
        $scope.getDepartmentName = function(id){
            for(var i=0; i<newData.length; i++){
                if(newData[i].departmentType == id){
                    department = newData[i];
                    return department.departmentName;
                }
            }
        }
        //获取 科目
        $scope.getSubjectName = function(id,type){
            var category = newData[type].category;
            for(var i=0; i<category.length; i++){
                if(category[i].subjectCode == id){
                    return category[i].subjectName;
                }
            }
        }
        //获取 教材
        $scope.getBookVersionName = function(id,type){
            var BookVersion = newData[type].bookVersion;
            if(id.length > 3){
                for(var i=0; i<BookVersion.length; i++){
                    if(BookVersion[i].bookVersionCode == id){
                        return BookVersion[i].bookVersionName;
                    }
                }
            } else {
                switch(id){
                    case "0":
                        return "全国卷一";
                        break;
                    case "1":
                        return "全国卷二";
                        break;
                    case "2":
                        return "全国卷三";
                        break;
                    default: return "北京";
                }
            }
        }
    })
    $http.get("admin/json/aimData.json").then(function(data){
        //获取 目标类型
        $scope.getAimData = function(id){
            var aimData = data.data.aimData;
            for(var i=0; i<aimData.length; i++){
                if(aimData[i].aimType == id){
                    return aimData[i].aimName;
                }
            }
        }
    });
    //是否添加课时
    $scope.isAddClass = function(id){
        switch(id){
            case "0":
                return "是";
                break;
            case "1":
                return "否";
                break;
        }
    }
    //是否添加短板
    $scope.isAddShort = function(id){
        switch(id){
            case "0":
                return "同意添加短板";
                break;
            case "1":
                return "不同意添加短板";
                break;
        }
    }
    //获取考试类型
    $scope.getExamType = function(id){
        switch(id){
            case "0":
                return "短板考试";
                break;
            case "1":
                return "诊断考试";
                break;
            case "2":
                return "阶段考试";
                break;
        }
    }
});
//获取JSON数据
app.controller("getJsonData",function($scope,$http){

    //获取类型（文/理）
    $http.post("admin/json/filterData.json").then(function(result){
        $scope.departmentType = result.data.filterData;
    })
    //获取学科、教材
    $scope.getSubject = function(type,value){
        $http.post("admin/json/filterData.json").then(function(result){
            $scope.category = result.data.filterData[type].category;
            $scope.bookVersion = $scope.category[value].bookVersion;
        })
    };
    //获取目标
    $http.post("admin/json/aimData.json").then(function(result){
        $scope.aimTypes = result.data.aimData;
    });
});
   

   