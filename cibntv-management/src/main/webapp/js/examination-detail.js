var ajaxTool = new AJAXTool();
$(function(){
  var id = window.location.search;
      id = id.substring(id.indexOf("=")+1,id.length);
      var result = ajaxTool.getInfo({"paperCode":id},"/paper/paperDetail",false);
      result.done(function(resultList){
          $("#loading").fadeOut();
          var data = resultList.data;
          if(data){
              var paperList = "<p class='examination-title'>"+data.examName+"</p>";
              if(data.questions){
                for(var i=0;i<data.questions.length;i++){
                    var stem = data.questions[i].stem;
                    var re = new RegExp("http://(.*?).(swf|gif|jpg|bmp|jpeg|png)");
                    var reg = new RegExp("/|/+");
                    //标题
                    var nstr="";
                    if(re.test(stem)){
                      var stemList = stem.split(re);
                      var cc="";
                      for(var j = 0; j<stemList.length;j++){
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
                      //答案
                      var newAnswer = answer[m].optionValue;
                      if(re.test(newAnswer)){
                        var answerList = newAnswer.split(re);
                        for(var p = 0; p<answerList.length;p++){
                             if(reg.test(answerList[p])){
                                 answer[m].optionValue= "<img src='http://"+answerList[p]+"."+answerList[p+1]+"'>";
                                 p=p+1;
                             }
                             else{
                               nstr += answerList[p];
                             }
                        }
                      }
                        answerStr += "<p>"+answer[m].optionKey+"、"+answer[m].optionValue+"</p>";
                    }
                    //答案结束
                    paperList +="<div class='examination-question'><p>"+(i+1)+"、"+nstr+"</p>"+answerStr+"</div>";
                }
                $("#detail-list").append(paperList);
              }
          }
      });
});
