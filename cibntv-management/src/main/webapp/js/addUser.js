var ajaxTool = new AJAXTool();
//保存用户信息
function saveUser(){
       var reg = new RegExp("^[A-Za-z0-9]+$");
        var userName = $("#userName").val();//用户名
        var initPassword = $("#initPassword").val();//初始密码
        var uuid = $(".btn-group").find("input").val();
        var rName = $("#departValue").html();

        if(!userName){
            alert("请输入用户！");
        }else if(!reg.test(userName)){
            alert("您输入的用户名格式不正确！");
        }else if(userName.length>16){
            alert("用户名过长！");
        }else if(!initPassword){
            alert("请输入初始密码！");
        }
        else if(!reg.test(initPassword)){
            alert("您输入的密码格式不正确！");
        }else if(initPassword.length<6){
            alert("您输入的密码过短！");
        }else if(initPassword.length>16){
            alert("您输入的密码过长！");
        }else if(!uuid){
           alert("请选择所属部门！");
        }

        else{
            var result = ajaxTool.getInfo({"name":userName,"password":initPassword,"rName":rName,"rUuid":uuid},"/manager/manageSave",false);
            result.done(function(resultList){
                window.location.href="privileges-manage.html";
            });
        }
}

$(function(){
    var result = ajaxTool.getInfo({"currentPage":"1","size":"10"},"/role/roleList",false);
    result.done(function(resultList){
        var data = resultList.data;
        if(data){
             var  departList="";
             for(var i=0; i<data.content.length;i++){
                   departList +="<li><a href='#' onclick=departChecked('"+data.content[i].uuid+"','"+data.content[i].name+"')>"+data.content[i].name+"</a></li>";
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
     var userName = $("#userName").val();
     var result = ajaxTool.getInfo({"name":userName},"/manager/validateName",false);
     result.done(function(resultList){
       var str="";
       if(resultList.data ===null){
          str="<img src='images/disabled.png'><label class='remind'>用户名已占用</label>";
       }
       else{
          str="<img src='images/available.png'><label class='remind'>用户名可注册</label>";
       }
       $("#userNameDiv").append(str);
     });
  }
