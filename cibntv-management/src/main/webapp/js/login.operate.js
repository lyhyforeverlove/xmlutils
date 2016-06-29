/*
 **params Author wangyanaxiao
 **params Date 2016-6-23
 **/
var uuid_id;
var userName;
var userPwd;
var api = new API();
$(function() {
    /*
     *用户登录
     */
    $("#login-btn").click(function() {
        var userName = $("#userName").val();
        var password = $("#password").val();
        if(userName == "" || password == ""){
            alert("用户名或密码不能为空!");
            return false;
        }
        login(userName,password);

    })
    //登录
    function login(userName,password){
        api.userLogin({
            "user": userName,
            "password": password
        }).done(function(data) {
            //console.log(data);
            var dataObj = data.data;

            if (dataObj != null) {

                var url;

                uuid_id = dataObj.userUuid;// 管理员uuid

                //存放用户uuid,用户名，密码
                sessionStorage.setItem("uuid_id", uuid_id);
                sessionStorage.setItem("userName", userName);
                sessionStorage.setItem("userPwd", password);             

                var flag =dataObj.isFirst; //判断用户是否第一次登录 true 是 false 否         

                if (flag == true) {
                    url = "login-enter.html";
                    alert("用户第一次登录，需要填写具体信息！");
                    api.windowOpen(url);
                       
                } else if (flag == false) {

                    var roleModelObj = dataObj.roleModel;
                    var permissionModels = roleModelObj.permissionModels; //lifang  5个
                    
                    //console.log(permissionModels);
                    var stringPer = JSON.stringify(permissionModels);
                    sessionStorage.setItem("permissionModels",stringPer);

                    

                    url = "index.html";
                    api.windowOpen(url);

                    
                    
                }
            }else{
                if(data.message == ".password"){
                    alert("密码输入错误,请重新输入！");
                }else if(data.message == ".no user"){
                     alert(userName+"用户不存在！");
                }
               
            }
        })
    }    
    var person = sessionStorage.getItem("permissionModels");
    var jsonPerson = JSON.parse(person);

    //console.log(jsonPerson);
    indexShow();
    function indexShow(){

        $("#indexMenuBox").empty();
        $.each(jsonPerson,function(index,item) {
            //console.log(value.name);
            $("#indexMenuBox").append('<li id='+index+'><a href=""><div class="menu-box-icon"><i></i></div><h3><a href="">'+ item.name +'</a></h3></a></li>');
            if(item.name == "用户管理"){
                 $("#0").find(".menu-box-icon").addClass("user-manage");
                 $("#0").find("a").attr("href","usermanage.html");
            }else if(item.name == "订单管理"){
                $("#1").find(".menu-box-icon").addClass("order-manage");
                $("#1").find("a").attr("href","ordermanage.html");
            }else if(item.name == "VIP管理"){
                $("#2").find(".menu-box-icon").addClass("vip-manage");
                $("#2").find("a").attr("href","vipmanage.html");
            }else if(item.name == "试卷管理"){
                $("#3").find(".menu-box-icon").addClass("test-manage");
                $("#3").find("a").attr("href","examination-manage.html ");
            }else if(item.name == "视频管理"){
                $("#4").find(".menu-box-icon").addClass("video-manage");
                $("#4").find("a").attr("href","video.html");
            }else if(item.name == "权限管理"){
                $("#5").find(".menu-box-icon").addClass("power-manage");
                $("#5").find("a").attr("href","privileges-manage.html");
            }
         });

    }
    var userName = sessionStorage.getItem("userName");
    var userPwd = sessionStorage.getItem("userPwd");
    
    indexPage(userName);

    function indexPage(name){
        $("#userName_login").append('<span>'+ userName +'</span>');      
        $("#userInfoPerson").append('<div class="user-right-box"><div class="user c-main"> <i class="user-icon icon"></i><ul class="userlist"><li><a href = "personal.html"><i class = "pCenter icon"></i>个人中心'+ userName +'</a></li><li  id="logout"><a><i class = "exitLogin icon"></i>退出登录</a></li></ul></div></div>');

        //退出登录
        $("#logout").click(function(){
            console.log("退出登录");
            logout(); //注销

            sessionStorage.clear();//清空用户登录信息
            window.location.href="login.html";
        })
    }


/*
*第一次登录 填写信息
*真实姓名一旦确定无法修改，慎重
*/
var userUuid1 = sessionStorage.getItem("uuid_id"); 

var firstLoginBtn=$("#firstLoginBtn");
    firstLoginBtn.click(function(){
        
    var nameVal = $("#userNameTxt").val();
    var telVal = $("#userTelTxt").val();
    var yzmVal = $("#userYzmTxt").val();
    var newPwdVal = $("#userNewPwd").val();
    var userQrPwd = $("#userQrPwd").val();

    if(nameVal.length == 0 || telVal.length == 0 || yzmVal.length == 0 || newPwdVal.length == 0 || userQrPwd.length == 0 )
    {
        alert("请输入第一次登录绑定信息！");
    }else{
        Prompt.init({
            title:" ",
            height: 320,
            html : "<img src='images/warn.png' /><p class='txt'>真是姓名一点确认无法修改，请慎重。</p>",
            ConfirmFun : determineLogin,
            CancelFun : cancel 
        });
        //确定登录
        function determineLogin(){
           api.manageReplace({
                "uuid":userUuid1,
                "realName":nameVal,
                "phone":telVal,
                "password":newPwdVal
            }).done(function(data){
                if(data.data != null){
                    var url = "/cibn/webapp/login.html";
                    api.windowOpen(url);
                }
            })
        }
        function cancel(){
            alert("取消绑定登录信息");
        }
        
    }
})
//真实姓名验证(首次登录绑定真实姓名)
$("#userNameTxt").blur(function(){
    var name = $("#userNameTxt").val();
    if (name.length == 0 ){
        $(this).parent().find("p.error").html("真实姓名不能为空！");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }else if(!(/^[\u4e00-\u9fa5]{2,4}$/).test(name)){//匹配2到四个汉字  
        $(this).parent().find("p.error").html("真实姓名格式有误！请输入匹配2~4个汉字");
        $(this).parent().find("span.point").addClass("wrong");
        return false; 
    }else{
        $(this).parent().find("span.point").removeClass("wrong").addClass("right");
        $(this).parent().find("p.error").html("");
        $("#userTelTxt").focus();
    }  
})   
//管理员手机号唯一性验证(首次登录绑定手机号)
$("#userTelTxt").blur(function(){
    var phone = $(this).val();
    if (phone.length == 0 ){
        $(this).parent().find("p.error").html("手机号不能为空！");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }
    if(!(/^1[3|4|5|7|8]\d{9}$/).test(phone)){
        $(this).parent().find("p.error").html("手机号格式有误,请重新输入！11位数字");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }else{
        api.checkPhone({
            "phone":phone
        }).done(function(data){
            //console.log(data);
            if(data.data == true){
                alert("");
                $(this).parent().find("p.error").html("该手机号已经存在,请更换为别的手机号"); 
                $(this).parent().find("span.point").addClass("wrong");
                return false;
            }
        })
        $(this).parent().find("span.point").removeClass("wrong").addClass("right");
        $(this).parent().find("p.error").html("");
        $("#sendCodeBtn").css("background","#5878f5"); 
        $("#sendCodeBtn").attr("disabled", false); 
        $("#userYzmTxt").focus();
    }
    
});
//用户输入验证码 验证是否正确
$("#userYzmTxt").blur(function(){
    var telVal = $("#userTelTxt").val();
    var yzmVal = $("#userYzmTxt").val();
    if(yzmVal.length == 0){
        $(this).parent().find("p.error").html("验证码不能为空！");
        $(this).parent().find("span.point").addClass("wrong");
        $(this).parent().find("span.wrong").css("right","110px");
        return false;
    }else{
        $(this).parent().find("p.error").html("");
    }
    isCorrectCode(telVal,yzmVal);
})
//获取验证码
function sendTelCode(telval){
    api.getCheckcode({
        "phone" : telval
    }).done(function(data){
        console.log(data);  //返回验证码 (495277)
    })
}
//验证码是否正确
function isCorrectCode(telval,yamval){
    api.isCorrectCode({
        "phone" : telval,
        "smsCode" : yamval
    }).done(function(data){
        //console.log(data);
        //验证码正确 
        if(data.data == true){
           $("#userYzmTxt").parent().find("span.point").removeClass("wrong").addClass("right");
           $("#userYzmTxt").parent().find("span.wrong").css("right","110px");
           $("#userNewPwd").focus();
       }else{
            $("#userYzmTxt").parent().find("span.point").removeClass("right").addClass("wrong");
            $("#userYzmTxt").parent().find("span.wrong").css("right","110px");
       }
        
    })
}
//点击发送验证码
$("#sendCodeBtn").click(function(){
    var telVal = $("#userTelTxt").val();
    var yamVal = $("#userYzmTxt").val();
    if(telVal.length == 0){
        $(this).parent().find("p.error").html("手机号不能为空！");
        $(this).parent().find("span.point").addClass("wrong");
        $(this).parent().find("span.wrong").css("right","110px");
        return false;
    }else{
        $(this).parent().find("p.error").html(" ");
        $(this).parent().find("span.point").removeClass("wrong");
    }
    settime(this);
    sendTelCode(telVal);
})
$("#sendCodeBtn").css("background","#b2b2b2"); 
$("#sendCodeBtn").attr("disabled", true); 
/*发送验证码*/
var countdown = 60; 
function settime(obj) { 
    if (countdown == 0) { 
        obj.removeAttribute("disabled");
        obj.style.background="#5878f5"; 
        obj.value="发送验证码";   
        countdown = 60; 
        return;
    } else { 
        obj.setAttribute("disabled", true); 
        obj.style.background="#b2b2b2"; 
        obj.value="重新发送(" + countdown + ")"; 
        countdown--; 
    } 
setTimeout(function() { 
    settime(obj) 
},1000) 
}
//密码正则验证
$("#userNewPwd").blur(function(){
    var newpwd = $(this).val();
    if(newpwd.length == 0){
        $(this).parent().find("p.error").html("新密码不能为空！");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }
    if(!(/^[a-zA-Z]\w{5,17}$/).test(newpwd)){ //
        $(this).parent().find("p.error").html("以字母开头,长度在6~18之间,只能包含字符、数字和下划线");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }
    $(this).parent().find("p.error").html("");
    $(this).parent().find("span.point").removeClass("wrong").addClass("right");
    $("#userQrPwd").focus();
})
//确认密码验证
$("#userQrPwd").blur(function(){
    var qrpwd = $(this).val();
    var newpwd = $("#userNewPwd").val(); //新密码
    if(qrpwd.length == 0){
        $(this).parent().find("p.error").html("确认密码不能为空！");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }
    if(!(/^[a-zA-Z]\w{5,17}$/).test(qrpwd)){ //
        $(this).parent().find("p.error").html("以字母开头,长度在6~18之间,只能包含字符、数字和下划线");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }
    if(newpwd != qrpwd){
        $(this).parent().find("p.error").html("确认密码与新密码不一致！");
        $(this).parent().find("span.point").addClass("wrong");
        return false;
    }
    $(this).parent().find("p.error").html("");
    $(this).parent().find("span.point").removeClass("wrong").addClass("right");
})






/*获取个人中心信息展示*/
manageDetail(userUuid1);
function manageDetail(uuid_id){
    api.manageDetail({
        "uuid":uuid_id
    }).done(function(data){
        //console.log(data);
        var dataUserObj =data.data;

        $("#personInfo").append('<tr><th>真实姓名：</th><td>'+ dataUserObj.realName +'</td></tr><tr><th>手机号:</th><td><span id="telValue">'+ dataUserObj.phone +'</span></td><td ><button style="margin-left:20px;" type="submit" class="tip-bottom" title="" id="replaceBtn"><i>更换手机号</i></button></td></tr><tr><th>所属部门：</th><td>'+ dataUserObj.rName +'</td></tr>');
        $("#replaceBtn").click(function(){

            //var telValue=$("#telValue").html();
            //var newTel=telValue.slice(0,3)+'****'+telValue.slice(8,11);
           
            Prompt.init({
              title : "更换手机号",
              width : 480,
              height : 320,
              html : "<div id='updTelbox'><div class='form-group'><label class='label'>新手机号：</label><input type='tel' value=''  id='newTel' class='form-control' style='width:180px;float:left;'/><button id='checkCodeBtn' class='tip-bottom1'><i>获取验证码</i></button></div><div class='form-group'><label class='label'>验证码：</label><input type='text' class='yzmVal form-control' style='width:180px;' /></div><button class='tip-bottom1' id='wanBtn' style='margin-top:50px;padding:0 20px'><i>完成</i></button></div><div id='success'></div>",
              
            });
            
            $("#checkCodeBtn").click(function(){
              var telValue = $("#newTel").val();
                api.getCheckcode({
                  "phone":telValue
                }).done(function(data){
                    console.log(data);//返回验证码
                })
            })
            //验证码焦点离开时判断是否正确
            $(".yzmVal").blur(function(){
                var telValue = $("#newTel").val();
                var yzm = $(".yzmVal").val();
                isCorrectCode(telValue,yzm);
            })
            //修改手机号完成
            $("#wanBtn").click(function(){
                var telValue = $("#newTel").val();
                api.manageReplace({
                    "uuid": userUuid1,
                    "phone" : telValue
                }).done(function(data){
                    $("#updTelbox").css("display","none");
                    $("#success").html("更换手机号成功!");
                    //更换手机号成功后 刷新展示信息
                    $("#personInfo").empty();
                    manageDetail(userUuid1);
                })
            })

        })
    })
}
//修改密码
$("#updPwdBtn").click(function(){
   Prompt.init({
      title : "修改密码",
      width : 420 ,
      height : 320,
      html : "<div id='updPwdbox'><div class='form-group from-group1'><label>旧密码：</label><input type='password' value='' id='updOldPwd' class='form-control ' /></div><div class='form-group from-group1'><label>新密码：</label><input type='password' value='' id='updNewPwd' class='form-control'/></div><div class='form-group from-group1'><label>再一次：</label><input type='password' value='' id='updConPwd' class='form-control'/></div><button class='tip-bottom1' id='updPwdWanBtn' style='margin-top:20px;padding:0 20px'><i>完成</i></button></div><div id='success'></div>",
      //ConfirmFun : updataPassword
    }); 

    //console.log(updOldPwd,updNewPwd,updConPwd);
   $("#updPwdWanBtn").click(function(){
    var updOldPwd = $("#updOldPwd").val();
    var updNewPwd = $("#updNewPwd").val();
    var updConPwd = $("#updConPwd").val();

    console.log(updOldPwd,updNewPwd,updConPwd);
       // updataPassword(updOldPwd,updNewPwd,updConPwd);
       if(updOldPwd == userPwd){
           if(updNewPwd == updConPwd){
                api.manageReplace({
                    "uuid": userUuid1,
                    "password" : updNewPwd
                }).done(function(data){
                   $("#updPwdbox").css("display","none");
                    $("#success").html("更换密码成功!");
                })
           }
       }else{
        alert("旧密码输入不正确！");
       }
   })
   
})

//修改密码完成
function updataPassword(OldPwd,updNewPwd,updConPwd){
   console.log(OldPwd,updNewPwd,updConPwd);
   console.log(userPwd); 
}

/*顶部导航右侧用户信息图标下拉显示*/ 
$(".user").hover(function(){
    $(this).parent().find("ul.userlist").css("display","block");
},function(){
    $(this).parent().find("ul.userlist").css("display","none");
});


})


/*
*退出登录
*/
function logout(){
    api.logout().done(function(data){
        console.log("data");
    })
}

