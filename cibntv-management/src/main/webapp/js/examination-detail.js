var ajaxTool = new AJAXTool();
var re = new RegExp("http://(.*?).(swf|gif|jpg|bmp|jpeg|png)");
var reg = new RegExp("[a-zA-z]+.com+/[^\s]*");
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
                    //标题结束
                    var nstr = transitionImg(stem);
                    //答案
                    var answer =data.questions[i].optionModels;
                    var answerStr = "";
                    for(var m=0; m<answer.length;m++){
                      //答案
                      var newAnswer = answer[m].optionValue;
                      answer[m].optionValue = transitionImg(newAnswer);
                      if(answer[m].optionKey==="C"){
                             // console.log(answer[m].optionValue);
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


//标题和答案 图片处理
 function  transitionImg(stem){     
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

           console.log(nstr);
        }
      }else{
        nstr=stem;
      }
      return nstr;
 }
