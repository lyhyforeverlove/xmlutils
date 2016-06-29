var ajaxTool = new AJAXTool();
var bool=false;//验证价格；
function updatePrice(){
  $('input').removeAttr("disabled");//去除input元素的disabled属性
  $('input').addClass("input-bg");
  $("#updatePrice").css("display","none");
  $("#savePrice").css("display","block");
}


function savePrice(){
     var trList=$("#paper-price").children("tr");
     var array=[];
     for (var i=0;i<trList.length;i++) {
         var tdArr = trList.eq(i).find("td");
         var uuid = tdArr.eq(0).find("input").val();
         var price = tdArr.eq(1).find("input").val();
         var obj = '{"uuid": "'+uuid+'",  "price": "'+price+'"}';
         array.push(obj);
     }
     if(bool){
        alert("您输入的价格有误！请重新输入！");
     }
     else{
       var result = ajaxTool.getInfo({"paperTypeDatas":array},"/paper/paperTypeReplace",true);
       result.done(function(resultList){
           initPaperType();
           $("#updatePrice").css("display","block");
           $("#savePrice").css("display","none");
       });
     }

 }

$(function(){
    initPaperType();
});

function initPaperType(){
  $("#paper-price").html("");
  var result = ajaxTool.getInfo({},"/paper/paperTypeList",false);
  result.done(function(resultList){

        var data = resultList.data;
        var paperList="";
        if(data){
          for(var i=0;i<data.length;i++){
            paperList +="<tr><td><span name='paperName'>"+data[i].name+"：</span><input type='hidden' value="+data[i].uuid+"  /></td><td><input  type='text' name='price' value="+data[i].price+" disabled  onblur=validatePrice(this);>元/每套</td></tr>";
          }
          $("#paper-price").append(paperList);
        }
  });
}

//校验价格
function validatePrice(price){
    var cost = $(price).val();
    var exp =/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
    if(!exp.test(cost)){
        bool = true;
        $(price).parent().find("label").remove();
        $(price).parent().append("<label>价格有误</label>");
    }
    else{
      bool = false;
      $(price).parent().find("label").remove();
    }

}
