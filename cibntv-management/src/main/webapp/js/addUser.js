var ajaxTool = new AJAXTool();
var reg = new RegExp("^[A-Za-z0-9]+$");
//保存用户信息
function saveUser(){
      var userName = $("#userName").val();//用户名
      var initPassword = $("#initPassword").val();//初始密码
      var uuid = $(".btn-group").find("input").val();
      var rName = $("#departValue").html();

      if(!userName){
          alert.dialog.confirm('请输入用户名！',function(){
            $("#userName").focus();
          });
      }else if(!reg.test(userName)){
          alert.dialog.confirm('用户名只能为字母、数字，不能包含中文和特殊字符！',function(){
            $("#userName").focus();
          });
      }else if(userName.length<6){
          alert.dialog.confirm('用户名只能由6~16位的字母或数字组成！您输入的用户名小于6位！',function(){
             $("#userName").focus();
          });
      }else   if(userName.length>16){
          alert.dialog.confirm('用户名只能由6~16位的字母或数字组成！您输入的用户名大于16位！',function(){
             $("#userName").focus();
          });
      }else if(!initPassword){
          alert.dialog.confirm('请输入初始密码！',function(){});
      }
      else if(!reg.test(initPassword)){
          alert.dialog.confirm('密码只能由字母、数字组成，不能包含中文和特殊字符！',function(){
              $("#initPassword").focus();
          });
      }else if(initPassword.length<6){
          alert.dialog.confirm('密码只能由6~16位的字母或数字组成！您输入的密码小于6位！',function(){
              $("#initPassword").focus();
          });
      }else if(initPassword.length>16){
          alert.dialog.confirm('密码只能由6~16位的字母或数字组成！您输入的密码大于16位！',function(){
              $("#initPassword").focus();
          });
      }else if(!uuid){
          alert.dialog.confirm('请选择所属部门！',function(){});
      }
      else{
          var result = ajaxTool.getInfo({"name":userName,"password":initPassword,"rName":rName,"rUuid":uuid},"/role/manageSave",false);
          result.done(function(resultList){
              window.location.href="privileges-manage.html";
          });
      }
}

$(function(){
      var result = ajaxTool.getInfo({},"/role/manageSkip",false);
      result.done(function(resultList){
          var data = resultList.data;
          if(data){
               var  departList="";
               for(var i=0; i<data.length;i++){
                     departList +="<li><a href='#' onclick=departChecked('"+data[i].uuid+"','"+data[i].name+"')>"+data[i].name+"</a></li>";
               }
               $("#departUl").append(departList);
          }
      });
  });


  //下拉框选中状态
  function departChecked(uuid,name){
      $("#departValue").html(name);
      $(".btn-group").find("input").val(uuid);
  }

  //验证用户名是否注册
  function verifyUserName(){
     $("#userNameDiv").find("img").remove();
     $("#userNameDiv").find(".remind").remove();
     $("#userNameDiv").find(".error").remove();
     var userName = $("#userName").val();
     if(userName){
         var result = ajaxTool.getInfo({"name":userName},"/manager/validateName",false);
         result.done(function(resultList){
           var str="";
           if(!userName){
               str="<img src='images/disabled.png'><label class='error'>用户名不能为空</label>";
               $("#userName").focus();
           }else if(!reg.test(userName)){
               str="<img src='images/disabled.png'><label class='error'>用户名只能为字母、数字，不能包含中文和特殊字符！</label>";
               $("#userName").focus();
           }else if(userName.length<6){
               str="<img src='images/disabled.png'><label class='error'>用户名不能小于6位！</label>";
               $("#userName").focus();
           }else   if(userName.length>16){
               str="<img src='images/disabled.png'><label class='error'>用户名不能大于16位！</label>";
               $("#userName").focus();
           }else if(resultList.data === null){
              str="<img src='images/disabled.png'><label class='error'>用户名已占用</label>";
               ("#userName").focus();
           }else{
              str="<img src='images/available.png'><label class='remind'>用户名可注册</label>";
           }
           $("#userNameDiv").append(str);
         });
     }
  }
