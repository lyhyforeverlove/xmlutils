var ajaxTool = new AJAXTool();
$(function(){
    // 学段下拉列表
    $("#stageUl").empty();
    $("#gradeDiv").css("display","none");
    $("#subjectDiv").css("display","none");
    $("#bookTypeDiv").css("display","none");
    var stageResult = ajaxTool.getInfo({},"/baseData/stage",false);
    stageResult.done(function(resultList){
        var stageList = resultList.data;
        if(stageList)
        {
            var stage="";
            for(var i=0;i<stageList.length;i++)
            {
               stage+="<li><a href='#'  onclick=searchStage('"+stageList[i].stageCode+"','"+stageList[i].stageName+"')>"+stageList[i].stageName+"</a></li>";
            }
            $("#stageUl").append(stage);
        }
    });
});

//学段下拉列表单击方法
//页面加载。带参数查询方法
var stageCode="";
var stageName="";
var gradeCode="";
var gradeName="";
var subjectCode="";
var subjectName="";
var bookTypeCode="";
var bookTypeCodeName="";

function searchStage(code,name){
    // 学年下拉列表
    $("#subjectDiv").css("display","none");
    $("#bookTypeDiv").css("display","none");
    $("#gradeUl").empty();
    $("#gradeChecked").html("学年");
    var gradeResult = ajaxTool.getInfo({"stageCode":code},"/baseData/grade",false);
    gradeResult.done(function(resultList){
        var gradeList = resultList.data;
        if(gradeList)
        {
            var grade="";
            for(var i=0;i<gradeList.length;i++)
            {
               grade+="<li><a href='#'  onclick=searchGrade('"+gradeList[i].gradeCode+"','"+gradeList[i].gradeName+"')>"+gradeList[i].gradeName+"</a></li>";
            }
            $("#gradeUl").append(grade);
         }
      });
      stageCode = code;
      stageName = name;
      $("#stageChecked").html(stageName);
      $("#gradeDiv").css("display","inline-block");
      if(stageCode && stageName && gradeCode && gradeName && subjectCode && subjectName && bookTypeCode &&　bookTypeCodeName){
          firstLink();
      }
}
//学年下拉列表单击方法
function searchGrade(code,name){
    //学科下拉列表
    $("#bookTypeDiv").css("display","none");
    $("#subjectUl").empty();
    $("#subjectChecked").html("学科");
    var subjectResult = ajaxTool.getInfo({"gradeCode":code},"/baseData/subject",false);
    subjectResult.done(function(resultList){
        var subjectList = resultList.data;
        if(subjectList)
        {
            var subject="";
            for(var i=0;i<subjectList.length;i++){
               subject+="<li><a href='#'  onclick=searchSubject('"+subjectList[i].subjectCode+"','"+subjectList[i].subjectName+"')>"+subjectList[i].subjectName+"</a></li>";
            }
            $("#subjectUl").append(subject);
        }
      });
      gradeCode = code;
      gradeName = name;
      $("#gradeChecked").html(gradeName);
      $("#subjectDiv").css("display","inline-block");
      if(stageCode && stageName && gradeCode && gradeName && subjectCode && subjectName && bookTypeCode &&　bookTypeCodeName){
          firstLink();
      }
}
//学科下拉列表单击方法
function searchSubject(code,name){
    //教材信息下拉列表
    $("#bookTypeUl").empty();
    $("#bookTypeChecked").html("教材版本");
    var bookTypeResult = ajaxTool.getInfo({"gradeCode":gradeCode,"subjectCode":code},"/baseData/bookType",false);
    bookTypeResult.done(function(resultList){
        var bookTyprList = resultList.data;
        if(bookTyprList){
          var bookType="";
          for(var i=0;i<bookTyprList.length;i++){
             bookType+="<li><a href='#'  onclick=searchBookType('"+bookTyprList[i].bookTypeCode+"','"+bookTyprList[i].bookTypeCodeName+"')>"+bookTyprList[i].bookTypeCodeName+"</a></li>";
          }
          $("#bookTypeUl").append(bookType);
        }
    });
    subjectCode = code;
    subjectName = name;
    $("#subjectChecked").html(subjectName);
    $("#bookTypeDiv").css("display","inline-block");
    if(stageCode && stageName && gradeCode && gradeName && subjectCode && subjectName && bookTypeCode &&　bookTypeCodeName){
        firstLink();
    }
}
//教材版本列表单击方法
function searchBookType(code,name){
    bookTypeCode = code;
    bookTypeCodeName = name;
    $("#bookTypeChecked").html(bookTypeCodeName);
    if(stageCode && stageName && gradeCode && gradeName && subjectCode && subjectName && bookTypeCode &&　bookTypeCodeName){
        firstLink();
    }
}

//页面初始化
function searcherValue(page){
    $("#examination_list").empty();
    if(page===1){
        iteratorList(dataList,page);
    }else{
        $("#loading").fadeIn();
        var keyWord = $("#keyWord").val();
        var result = ajaxTool.getInfo({"stageCode":stageCode,"stageName":stageName,"gradeCode":gradeCode,"gradeName":gradeName,"subjectCode":subjectCode,"subjectName":subjectName,"bookTypeCode":bookTypeCode,"bookTypeName":bookTypeCodeName,"paperType":"1","cp":page,"pageSize":"10","searchName": "paperName",
               "searchValue":keyWord},"/paper/paperPage",false);
        result.done(function(resultList){
            $("#loading").fadeOut();
            var data=resultList.data;
            iteratorList(data,page);
        });
    }

}
//第一次进入页面加载分页
function firstLink(){
    $("#loading").fadeIn();
    $("#examination_list").empty();
    $("#examination-total").empty();
    var keyWord = $("#keyWord").val();
    var result = ajaxTool.getInfo({"stageCode":stageCode,"stageName":stageName,"gradeCode":gradeCode,"gradeName":gradeName,"subjectCode":subjectCode,"subjectName":subjectName,"bookTypeCode":bookTypeCode,"bookTypeName":bookTypeCodeName,"paperType":"1","cp":"1","pageSize":"10","searchName": "paperName","searchValue":keyWord
  },"/paper/paperPage",false);
    result.done(function(resultList){
        $("#loading").fadeOut();
        var data = resultList.data;
        if(data){
           totalpage = data.totalPage;
           dataList = data;
           initPagination();
        }
    });
}

//试卷详情
function paperDetail(id){
      window.open("examination-detail.html?id="+id);//打开窗口}
      //window.location.href="examination-detail.html?id="+id;
}

//列表迭代
function iteratorList(data,page){
     if(data.paperDatas){
        var lg = data.paperDatas.length;
        console.log(data.item);
        if(data.item){
          $("#examination-total").html(data.item+"套");
        }
        var examination="";
        for(var i=0;i<lg;i++){
            var index =(page-1)*10+(i+1);
            //<td>"+data.stageName+"</td><td>"+data.gradeName+"</td><td>"+data.subjectName+"</td><td>"+data.bookTypeName+"</td>
            examination +="<tr><td>"+index+"</td><td>"+data.paperDatas[i].paperName+"</td><td>"+data.paperDatas[i].typeName+"</td><td>"+data.paperDatas[i].price+"元</td><td>"+data.paperDatas[i].createDateStr+"</td><td>"+data.paperDatas[i].createName+"</td><td>系统</td><td  class='last-td'><a href='#'  onclick=paperDetail('"+data.paperDatas[i].id+"')>详情</a></td></tr>";
        }
        $("#examination_list").append(examination);
    }
}
