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
            var category = data.data.filterData[type].category;
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
    $http.post("admin/json/aimData.json").then(function(data){
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
    //获取诊断类型
    $http.post("admin/json/paperUse.json").then(function (data) {
        $scope.getPaperUseName = function(id){
            var PaperUse = data.paperUse;
            for(var i=0; i<PaperUse.length; i++){
                if(PaperUse[i].paperUseType == id){
                    return PaperUse[i].paperUseName;
                }
            }
        }
    })
    //是否添加课时
    $scope.isAddClass = function(id){
        switch(id){
            case "0":
                return "否";
                break;
            case "1":
                return "是";
                break;
        }
    };
    //是否添加短板
    $scope.isAddShort = function(id){
        switch(id){
            case "0":
                return "拒绝";
                break;
            case "1":
                return "同意";
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
    $scope.getLessonLevel = function(id){
        var value;
        if(id == 0){
            value = "A课程";
        } else if(id == 1){
            value = "B课程";
        } else if(id == 2){
            value = "C课程";
        } else {
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
    $http.post("admin/json/inScrollYear.json").then(function(result){
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
    $http.post("./admin/json/filterData.json").then(function(result){
        var data = result.data.filterData;
        $scope.departmentType = data;
        //带全部
        $scope.departmentTypeAll = [{"departmentType":"all","departmentName":"全部"}];
        $.each(data,function(index,item){
            $scope.departmentTypeAll.push(item);
        });
        $scope.getSubject(0);
        $scope.getBookVersion(1);
    });
    //获取 学科（集合）
    $scope.getSubject = function(departmentType){
        $scope.category = $scope.departmentType[departmentType].category;
    };
    //获取 教材（集合）
    $scope.getBookVersion = function(subjectCode,departmentType){
        var data;
        if(departmentType){
            data = $scope.departmentType[departmentType].category;
        } else {
            data = $scope.category;
        }
        for(var i=0; i<data.length; i++){
            if(data[i].subjectCode == subjectCode){
                $scope.bookVersion = data[i].bookVersion;
                break;
            }
        }
    };
    //获取 全部学科（集合）
    $http.post("./admin/json/subject.json").then(function(result){
        $scope.AllSubject = result.data.subject;
    })
    //获取目标（集合）
    $http.post("./admin/json/aimData.json").then(function(result){
        var data = result.data.aimData;
        $scope.aimTypes = data;
        //带全部
        $scope.aimTypesAll = [{aimType:"all",aimName:"全部"}];
        $.each(data,function(index,item){
            $scope.aimTypesAll.push(item);
        });

    });
    //获取中心（集合）
    $http.post(window.testhost + '/teaching/organization/centers?requestId=test123456').then(function (result) {
        var data = result.data.result;
        $scope.center = data;
        //带全部
        $scope.centerAll = [{code:"all",name:"全部"}];
        $.each(data,function(index,item){
            $scope.centerAll.push(item);
        });
    });
    //获取诊断类型（集合）
    $http.post("./admin/json/paperUseType.json").then(function(result){
        var data = result.data.paperUse;
        $scope.paperUse = data;
        //带全部
        $scope.paperUseAll = [{paperUseType:"all",paperUseName:"全部"}];
        $.each(data,function(index,item){
            $scope.paperUseAll.push(item);
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
    //获取考生类型（集合）
    $http.post("./admin/json/studentType.json").then(function(result) {
        var data = result.data.studentType;
        $scope.studentType = data;
        //带全部
        $scope.studentTypeAll = [{studentTypeCode:"all",studentTypeName:"全部"}];
        $.each(data,function(index,item){
            $scope.studentTypeAll.push(item);
        });
    });
    //获取入学年份（集合）
    $http.post("./admin/json/inScrollYear.json").then(function(result){
        var data = result.data.inScrollYear;
        $scope.inScrollYear = data;
        //带全部
        $scope.inScrollYearAll = [{inScrollYearCode:"all",inScrollYearName:"全部"}];
        $.each(data,function(index,item){
            $scope.inScrollYearAll.push(item);
        });
    });
    //获取地区（集合）
    $http.post(window.testhost + "/area/allProvince?requestId=1").then(function(result){
        var data = result.data.result;
        $scope.city = data;
        //带全部
        $scope.cityAll = [{provinceCode:"all",provinceName:"全部"}];
        $.each(data,function(index,item){
            $scope.cityAll.push(item);
        });
    });
});
//全选
app.controller("constAll",function($scope){
    $scope.num = 0;
    $scope.constAll = function(id){
        var $Box =$("#"+id);
        var $input = $Box.find(".const").find("input:checkbox");
        var $all = $Box.find(".constAll").find("input:checkbox");
        var num = 0;

        $.each($input,function(index,item){
            if($all.prop('checked') == true){
                if(!$(item).prop("disabled")){
                    num++;
                    $(item).prop("checked",true);
                }
            } else {
                $(item).prop("checked",false);
            }
        })
        $scope.num = num;
    }
    $scope.const = function(id){
        var $Box = $("#"+id);
        var $input = $Box.find(".const").find("input:checkbox");
        var num = 0;
        $.each($input,function(index,item){
            if($(item).prop('checked') == true){
                num++;
            }
            $scope.num = num;
        })
    }
});
//禁用多选框
app.controller("disabled",function($scope){
    $scope.isDisable = function(id,type,index){
        var $input = $("#"+id).find(".isDisable");
        if(type){
            $input.eq(index).prop("disabled",true);
        }
    }
});
// 数据 || 按钮
app.controller("btnSH",function($scope){
    $scope.btnSH = function(id,className,item,index,value1,value2){
        var $box = $("#" + id);
        var $btnBox = $box.find("." + className);
        if(item[value1]){
            $btnBox.eq(index).empty().html(value2);
        }
    }
});
//获取 试卷详情
app.controller("getPaper",function($scope,$state){
    //获取诊断卷详情
    $scope.getPaper = function (code) {
        sessionStorage.setItem("testpaperCode",code);

        console.log(sessionStorage.getItem("testpaperCode"))
        $state.go('app.teachResearchManage.testPaper');
    };
});