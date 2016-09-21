app.controller('ParentGetDataCtrl', function($scope,CalcService) {
  // I'm the sibling, but want to act as parent
 
    $scope.getSubject = function(departmentType){
         //获取类型（文/理）
        //console.log(departmentType);
        CalcService.filterData().then(function(data){
            $scope.departmentType = data.filterData;
            var category = data.filterData[departmentType].category;
            $scope.category = data.filterData[departmentType].category;
            //$scope.bookVersion = data.filterData[departmentType].category[0].bookVersion;
            //console.log(data.filterData[departmentType].category[0].bookVersion);
        });
    }
    
    $scope.getBookVersion = function(departmentType,id){
       console.log(departmentType);
       console.log(id);
       CalcService.filterData().then(function(data){
            $scope.bookVersion = data.filterData[departmentType].category[id].bookVersion;
       });
    };
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
    $http.post("admin/json/filterData.json").then(function(data){
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
        };
        //获取 科目
        $scope.getSubjectName = function(id,type){
            var category = newData[type].category;
            for(var i=0; i<category.length; i++){
                if(category[i].subjectCode == id){
                    return category[i].subjectName;
                }
            }
        };
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
    });
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
    };
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
    };
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
    };
    //获取艺考、统考
    $scope.getStudentType = function(id){
        if(id == 0){
            return "统考";
        } else if(id == 1){
            return "艺考";
        }
    };
    //获取课程类型
    $scope.getArtType = function(id){
        var value;
        switch(id){
            case "0":
                value = "A课程";
                break;
            case "1":
                value = "B课程";
                break;
            case "2":
                value = "C课程";
                break;
            default:
                value = "未分类"
        }
        return value;
    };
    //获取上课类型
    $scope.getCourseType = function(id){
        var value;
        if(id == 0){
            value = "平时班";
        } else if(id == 1){
            value = "平时晚班+周末";
        }
        return value;
    };
    //获取入学年份
    $http.get("admin/json/inScrollYear.json").then(function(result){
        var data = result.data.inScrollYear;
        $scope.getScrollYearName = function(id){
            for(var i=0; i<data.length; i++){
                if(data[i].inScrollYearCode == id){
                    return data[i].inScrollYearName;
                }
            }
        };
    });
});
//获取JSON数据
app.controller("getJsonData",function($scope, $http){
    //获取类型（集合）
    $http.post("admin/json/filterData.json").then(function(result){
        var data = result.data.filterData;
        $scope.departmentType = data;
        //带全部
        $scope.departmentTypeAll = [{"departmentType":"all","departmentName":"全部"}];
        $.each(data,function(index,item){
            $scope.departmentTypeAll.push(item);
        });
        $scope.getSubject(0);
        $scope.getBookVersion(1);
    })
    //获取 学科（集合）
    $scope.getSubject = function(departmentType){
        $scope.category = $scope.departmentType[departmentType].category;
    };
    //获取 教材（集合）
    $scope.getBookVersion = function(subjectCode,departmentType){
        if(departmentType){
            var data = $scope.departmentType[departmentType].category;
        } else {
            var data = $scope.category;
        }
        for(var i=0; i<data.length; i++){
            if(data[i].subjectCode == subjectCode){
                $scope.bookVersion = data[i].bookVersion;
                break;
            }
        }
    }
    //获取目标
    $http.post("admin/json/aimData.json").then(function(result){
        var data = result.data.aimData;
        $scope.aimTypes = data;
        //带全部
        $scope.aimTypesAll = [{aimType:"all",aimName:"全部"}];
        $.each(data,function(index,item){
            $scope.aimTypesAll.push(item);
        });
    });
    //获取中心（集合）
    $http.post($scope.app.testhost + 'teaching/organization/centers?requestId=test123456').then(function (result) {
        var data = result.data.result;
        $scope.center = data;
        //带全部
        $scope.centerAll = [{code:"all",name:"全部"}];
        $.each(data,function(index,item){
            $scope.centerAll.push(item);
        });
    });
    //获取班级（集合）
    $scope.getClasses = function(centerCode){
        $http.post($scope.app.testhost + '/teaching/organization/list?requestId=test123456',{
            "pageSize":20,
            "pageNumber":1,
            "type":6,
            "centerCode":centerCode
        }).then(function (result) {
            var data = result.data.result;
            $scope.classes = data;
            //带全部
            $scope.classesAll = [{code:"all",name:"全部"}];
            $.each(data,function(index,item){
                $scope.classesAll.push(item);
            });
        });
    };
    //获取考生类型
    $http.post("admin/json/studentType.json").then(function(result) {
        var data = result.data.studentType;
        $scope.studentType = data;
        //带全部
        $scope.studentTypeAll = [{studentTypeCode:"all",studentTypeName:"全部"}];
        $.each(data,function(index,item){
            $scope.studentTypeAll.push(item);
        });
    });
    //获取入学年份
    $http.post("admin/json/inScrollYear.json").then(function(result){
        var data = result.data.inScrollYear;
        $scope.inScrollYear = data;
        //带全部
        $scope.inScrollYearAll = [{inScrollYearCode:"all",inScrollYearName:"全部"}];
        $.each(data,function(index,item){
            $scope.inScrollYearAll.push(item);
        });
    })
});
//已选总数
app.controller("constAll",function($scope){
    $scope.num = 0;

    $scope.constAll = function(id,type){
        var $Box =$("#"+id);
        var $input = $Box.find(".constAll");
        var num = 0;
        $.each($input,function(index,item){
            $(item).prop('checked',type);
            if($(item).prop('checked') == true){
                num++;
            }
        })
        $scope.num = num;
    }
    $scope.const = function(id){
        var $Box = $("#"+id);
        var $input = $Box.find(".constAll");
        var num = 0;
        $.each($input,function(index,item){
            if($(item).prop('checked') == true){
                num++;
            }
        })
        $scope.num = num;
    }
});
   

   