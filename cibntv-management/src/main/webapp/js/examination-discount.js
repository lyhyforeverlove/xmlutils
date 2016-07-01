var ajaxTool = new AJAXTool();
var bool=false;//验证折扣；
  function updateDiscount(){
      $('input').removeAttr("disabled");//去除input元素的disabled属性
      $('input').addClass("input-bg");
      $("#updateDiscount").css("display","none");
      $("#saveDiscount").css("display","block");
  }
  //加载方法
  $(function(){
      initDiscount();
  });


  //保存修改
  function saveDiscount(){
       var trList=$("#discount").children("tr");
       var array=[];
       for (var i=0;i<trList.length;i++) {
           var tdArr = trList.eq(i).find("td");
           var uuid = tdArr.eq(0).find("input").val();
           var startTime = tdArr.eq(2).find(".startTime").val()+" 00:00:00";
           var endTime = tdArr.eq(5).find(".endTime").val()+" 23:59:59";
           var discount = tdArr.eq(7).find(".discount").val();
           var obj = '{"uuid": "'+uuid+'",  "dateBef": "'+startTime+'",  "dateAft": "'+endTime+'",  "discount": "'+discount+'"}';
           array.push(obj);
       }
       if(bool){
           alert.dialog.confirm('您输入的折扣不正确，请重新输入！',function(){});
       }else{
           var result = ajaxTool.getInfo({"paperTypeDatas":array},"/paper/paperTypeReplace",true);
           result.done(function(resultList){
               initDiscount();
               $("#updateDiscount").css("display","block");
               $("#saveDiscount").css("display","none");
           });
       }

   }

  function initDiscount(){
    $("#discount").html("");
    var result = ajaxTool.getInfo({},"/paper/paperTypeList",false);
    result.done(function(resultList){
          var data = resultList.data;
          if(data){
              var tr="";
              for(var i=0;i<data.length;i++){
                var id=data[i].uuid;
                var title=data[i].name;
                var startTime=data[i].dateBef;
                var endTime=data[i].dateAft;
                var discount=data[i].discount;
                tr +="<tr><td>"+title+"<input type='hidden' value="+id+"  /></td><td>折扣时间段：</td><td><input type='text'  id='startTime"+i+"' value='"+startTime+"' class='startTime' disabled='disabled'></td><td>起</td><td>至</td><td><input type='text'  id='endTime"+i+"' value='"+endTime+"' class='endTime' disabled='disabled'></td><td>止</td><td>折扣：<input type='text' class='discount' value="+discount+"  onblur=validateDiscount(this);></td></tr>";
              }
              $("#discount").append(tr);
              //开始时间插件
              $(".startTime").datepicker({
              　  　language: "zh-CN",
              　　  autoclose:true
            });
              //结束时间控件
              $(".endTime").datepicker({
              　  　language: "zh-CN",
              　　  autoclose:true
              }).change(function(){
                    var startDate = $(this).parent().parent().find("td").eq(2).find(".startTime").datepicker( "getDate");
                    var endDate =  $(this).parent().parent().find("td").eq(5).find(".endTime").datepicker( "getDate");
                    console.log(startDate+"~~~~~~~~"+endDate);
                    if(endDate < startDate){
                       alert.dialog.confirm('折扣结束时间不能小于开始时间！',function(){});
                       $(this).parent().parent().find("td").eq(5).find(".endTime").datepicker('setDate', startDate);
                    }
              });
          }
      });
  }


  function validateDiscount(dis){
      var discount = $(dis).val();
      var reg = new RegExp("^00?\.(?:0[1-9]|[1-9][0-9]?)$");
      if(!reg.test(discount)){
        if(discount!=1){
          bool = true;
          $(dis).parent().find("label").remove();
          $(dis).parent().append("<label>折扣有误</label>");
        }
        else{
          bool = false;
          $(dis).parent().find("label").remove();
        }
      }
      else{
        bool = false;
        $(dis).parent().find("label").remove();
      }
  }
