var ajaxTool = new AJAXTool();
  $(function(){
      var result = ajaxTool.getInfo({"gradeCode":"11"},"/baseData/subject",false);
      result.done(function(resultList){
          var subjectList = resultList.data;
          if(subjectList){
              var subject="";
              for(var i=0;i<subjectList.length;i++){
                 subject+="<li><a href='javascript:void(0);'  onclick=firstLink('"+subjectList[i].subjectCode+"','"+subjectList[i].subjectName+"')>"+subjectList[i].subjectName+"</a></li>";
              }
              $("#subjectUl").append(subject);
          }
      });
  });
  //页面加载。带参数查询方法
  var subjectName="";
  var subjectCode="";
  function searcherValue(page){
        $("#video-list").html("");
        var searchName = $("#searchName").val();
        var result = ajaxTool.getInfo({"subjectCode":subjectCode,"subjectName":subjectName,"searchName":searchName,"cp":page,"pageSize":"10"},"/video/videoPage",false);
        result.done(function(resultList){
          if(resultList.data){
              var videoList = resultList.data.reponseVedio;
              var s="";
              $("#video-total").html(resultList.data.item+"个");
              for(var i=0;i<videoList.length;i++)
              {
                  var colorlist=["#1277de","#ffc053","#236b47","#68418d","#ff7e64","#c42a59","#6c65fc","#02d2ad"];
                  var n = Math.floor(Math.random() * colorlist.length + 1)-1;
                  s ="<div class='col-sm-3'><div class='video-div'><h4>"+videoList[i].videoName+"</h4></div><a class='stop' href='#' onclick=videoDetail('"+videoList[i].id+"')></a><div class='content'><div class='title'>"+videoList[i].videoName+"</div></div></div>";
                  $("#video-list").append(s);
                  $(".video-div").eq(i).css("background-color",colorlist[n]);

              }
          }
        });
    }
    //初始化分页
    function firstLink(code,name){
          if(!name && !subjectName){
             $("#subject").html("学科");
          }else if(name){
  　　　　　　 subjectName=name;
  　         subjectCode=code;
          }
          $("#subject").html(subjectName);
          $("#video-list").html("");
          var searchName = $("#searchName").val();
          var result = ajaxTool.getInfo({"subjectCode":subjectCode,"subjectName":subjectName,"searchName":searchName,"cp":1,"pageSize":"10"},"/video/videoPage",false);
          result.done(function(resultList){
              totalpage = resultList.data.totalPage;
              initPagination();
          });
      }
    //查看详细
    function videoDetail(id){
         window.location.href="video-detail.html?id="+id;
    }
