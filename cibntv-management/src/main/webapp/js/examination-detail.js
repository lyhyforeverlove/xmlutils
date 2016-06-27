var ajaxTool = new AJAXTool();
$(function(){
  var id = window.location.search;
      id = id.substring(id.indexOf("=")+1,id.length);
      var result = ajaxTool.getInfo({"paperCode":id},"/paper/paperDetail",false);
      result.done(function(resultList){
          var data = resultList.data;
          if(data){
              var paperList = "<p class='examination-title'>"+data.examName+"</p>";
              for(var i=0;i<data.questions.length;i++){
                  var stem = data.questions[i].stem;
                  var re = new RegExp("http://(.*?).(swf|gif|jpg|bmp|jpeg|png)");
                  //标题
                  var nstr="";
                  if(re.test(stem)){
                    var stemList = stem.split(re);
                    var cc="";
                    for(var j = 0; j<stemList.length;j++){
                         var reg = new RegExp("/|/+");
                         if(reg.test(stemList[j])){
                             cc = "<img src='http://"+stemList[j]+"."+stemList[j+1]+"'>";
                             nstr += cc;
                             j=j+1;
                         }
                         else{
                           nstr += stemList[j];
                         }
                  }
                  }else{
                    nstr=stem;
                  }
                  //标题结束
                  //答案
                  var answer =data.questions[i].optionModels;
                  var answerStr = "";
                  for(var m=0; m<answer.length;m++){
                    if(re.test(answer[m].optionValue)){
                       answer[m].optionValue="<img src='"+answer[m].optionValue.replace(/&nbsp;/ig, "")+"'>";
                    }
                      answerStr += "<p>"+answer[m].optionKey+"、"+answer[m].optionValue+"</p>";
                  }
                  //答案结束
                  paperList +="<div class='examination-question'><p>"+(i+1)+"、"+nstr+"</p>"+answerStr+"</div>";
              }
              $("#detail-list").append(paperList);
          }
      });
});
