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
        if (userName == "" || password == "") {
            $(".errorInfo").html("用户名或密码不能为空!");
            return false;
        }
        login(userName, password);
    })
    /*
     *第一次登录 填写信息
     *真实姓名一旦确定无法修改，慎重
     */
    var userUuid1 = localStorage.getItem("uuid_id");
    $(".login_btn_box #firstLoginBtn").css("background-color","#ccc")
;
    var firstLoginBtn = $("#firstLoginBtn");
    function firstLogin(){
        var nameVal = $("#userNameTxt").val();
        var telVal = $("#userTelTxt").val();
        var yzmVal = $("#userYzmTxt").val();
        var newPwdVal = $("#userNewPwd").val();
        var userQrPwd = $("#userQrPwd").val();

        if (nameVal.length == 0 || telVal.length == 0 || yzmVal.length == 0 || newPwdVal.length == 0 || userQrPwd.length == 0) {
            alert("请输入第一次登录绑定信息！");
        } else {
            Prompt.init({
                title: " ",
                height: 320,
                html: "<img src='images/warn.png' /><p class='txt'>真实姓名一旦确认无法修改，请慎重。</p>",
                ConfirmFun: determineLogin,
                CancelFun: cancel
            });
            //确定登录
            function determineLogin() {
                api.manageReplace({
                    "uuid": userUuid1,
                    "realName": nameVal,
                    "phone": telVal,
                    "password": newPwdVal
                }).done(function(data) {
                    if (data.data != null) {
                        /*var url = "/cibn/webapp/login.html";
                        api.windowOpen(url);*/
                        api.windowLogin();
                    }
                })
            }
            function cancel() {
               // alert("取消绑定登录信息");
            }
        }
    }
    //第一次绑定基本信息 Enter登录
    $("#loginform #userQrPwd").keypress(function (e) {
        if (e.keyCode == 13){ //键码值是13 Enter
           firstLogin();
        }
    })
    //第一次登录点击进入
    firstLoginBtn.click(function(){
        firstLogin();
    })
    function checkNull(){
        var nameVal = $("#userNameTxt").val();
        var telVal = $("#userTelTxt").val();
        var yzmVal = $("#userYzmTxt").val();
        var newPwdVal = $("#userNewPwd").val();
        var userQrPwd = $("#userQrPwd").val();    
        if (nameVal.length != 0 && telVal.length != 0 && yzmVal.length != 0 && newPwdVal.length != 0 && userQrPwd.length != 0){
            $(".login_btn_box #firstLoginBtn").css("background-color","#5878f5");
        }
    }
    
    //真实姓名验证(首次登录绑定真实姓名)
    $("#userNameTxt").blur(function() {
            var name = $("#userNameTxt").val();
            if (name.length == 0) {
                $(this).parent().find("p.error").html("真实姓名不能为空！");
                $(this).parent().find("span.point").addClass("wrong");
                return false;
            } else if (!(/^[\u4e00-\u9fa5]{2,4}$/).test(name)) { //匹配2到四个汉字
                $(this).parent().find("p.error").html("真实姓名格式有误！请输入匹配2~4个汉字");
                $(this).parent().find("span.point").addClass("wrong");
                return false;
            } else {
                $(this).parent().find("span.point").removeClass("wrong").addClass("right");
                $(this).parent().find("p.error").html("");
                $("#userTelTxt").focus();

                checkNull();
            }
        })
    //管理员手机号唯一性验证(首次登录绑定手机号)
    $("#userTelTxt").blur(function() {
        var phone = $(this).val();
        if (phone.length == 0) {
            $(this).parent().find("p.error").html("手机号不能为空！");
            $(this).parent().find("span.point").addClass("wrong");
            return false;
        }
        if (!(/^1[3|4|5|7|8]\d{9}$/).test(phone)) {
            $(this).parent().find("p.error").html("手机号格式有误,请重新输入！11位数字");
            $(this).parent().find("span.point").addClass("wrong");
            return false;
        } 
        else{
            api.checkPhone({
                "phone": phone
            }).done(function(data) {
                if (data.data == true) {
                    console.log(data.data);
                    $("#userTelTxt").parent().find("p.error").html("该手机号已经存在,请更换为别的手机号");
                    $("#userTelTxt").parent().find("span.point").addClass("wrong");
                    return false;
                }else{
                    $("#userTelTxt").parent().find("span.point").removeClass("wrong").addClass("right");
                    $("#userTelTxt").parent().find("p.error").html("");    
                    $("#sendCodeBtn").css("background", "#5878f5");
                    $("#sendCodeBtn").attr("disabled", false);
                    $("#userYzmTxt").focus();      

                    checkNull();
                }
            })
        }

    });
     //用户输入验证码 验证是否正确
    $("#userYzmTxt").blur(function() {
            var telVal = $("#userTelTxt").val();
            var yzmVal = $("#userYzmTxt").val();
            if (yzmVal.length == 0) {
                $(this).parent().find("p.error").html("验证码不能为空！");
                $(this).parent().find("span.point").addClass("wrong");
                $(this).parent().find("span.wrong").css("right", "110px");
                return false;
            } else {
                $(this).parent().find("p.error").html("");
            }
            isCorrectCode(telVal, yzmVal);
        })
        //获取验证码
    function sendTelCode(telval) {
        api.getCheckcode({
            "phone": telval
        }).done(function(data) {
            //console.log(data); //返回验证码 (495277)
        })
    }
    //验证码是否正确
    function isCorrectCode(telval, yamval) {
        api.isCorrectCode({
            "phone": telval,
            "smsCode": yamval
        }).done(function(data) {
            //console.log(data);
            //验证码正确
            if (data.data == true) {
                $("#userYzmTxt").parent().find("span.point").removeClass("wrong").addClass("right");
                $("#userYzmTxt").parent().find("span.wrong").css("right", "110px");
                $("#userNewPwd").focus();

                checkNull();
            } else {
                $("#userYzmTxt").parent().find("span.point").removeClass("right").addClass("wrong");
                $("#userYzmTxt").parent().find("span.wrong").css("right", "110px");
            }

        })
    }
    //点击发送验证码
    $("#sendCodeBtn").click(function() {
        var telVal = $("#userTelTxt").val();
        var yamVal = $("#userYzmTxt").val();
        if (telVal.length == 0) {
            $(this).parent().find("p.error").html("手机号不能为空！");
            $(this).parent().find("span.point").addClass("wrong");
            $(this).parent().find("span.wrong").css("right", "110px");
            return false;
        } else {
            $(this).parent().find("p.error").html(" ");
            $(this).parent().find("span.point").removeClass("wrong");
        }
        settime(this);
        sendTelCode(telVal);
    })
    $("#sendCodeBtn").css("background", "#b2b2b2");
    $("#sendCodeBtn").attr("disabled", true);
    /*发送验证码*/
    var countdown = 60;

    function settime(obj) {
        if (countdown == 0) {
            obj.removeAttribute("disabled");
            obj.style.background = "#5878f5";
            obj.value = "发送验证码";
            countdown = 60;
            return;
        } else {
            obj.setAttribute("disabled", true);
            obj.style.background = "#b2b2b2";
            obj.value = "重新发送(" + countdown + ")";
            countdown--;
        }
        setTimeout(function() {
            settime(obj)
        }, 1000)
    }
    //密码正则验证
    $("#userNewPwd").blur(function() {
            var newpwd = $(this).val();
            if (newpwd.length == 0) {
                $(this).parent().find("p.error").html("新密码不能为空！");
                $(this).parent().find("span.point").addClass("wrong");
                return false;
            }
            if (!(/^[a-zA-Z]\w{5,17}$/).test(newpwd)) { //
                $(this).parent().find("p.error").html("以字母开头,长度在6~18之间,只能包含字符、数字和下划线");
                $(this).parent().find("span.point").addClass("wrong");
                return false;
            }
            $(this).parent().find("p.error").html("");
            $(this).parent().find("span.point").removeClass("wrong").addClass("right");
            $("#userQrPwd").focus();

            checkNull();
        })
        //确认密码验证
    $("#userQrPwd").blur(function() {
        var qrpwd = $(this).val();
        var newpwd = $("#userNewPwd").val(); //新密码
        if (qrpwd.length == 0) {
            $(this).parent().find("p.error").html("确认密码不能为空！");
            $(this).parent().find("span.point").addClass("wrong");
            return false;
        }
        if (!(/^[a-zA-Z]\w{5,17}$/).test(qrpwd)) { //
            $(this).parent().find("p.error").html("以字母开头,长度在6~18之间,只能包含字符、数字和下划线");
            $(this).parent().find("span.point").addClass("wrong");
            return false;
        }
        if (newpwd != qrpwd) {
            $(this).parent().find("p.error").html("确认密码与新密码不一致！");
            $(this).parent().find("span.point").addClass("wrong");
            return false;
        }
        $(this).parent().find("p.error").html("");
        $(this).parent().find("span.point").removeClass("wrong").addClass("right");

        checkNull();
    })

    /*获取个人中心信息展示*/
    manageDetail(userUuid1);

    function manageDetail(uuid_id) {
        api.manageDetail({
            "uuid": uuid_id
        }).done(function(data) {
            //console.log(data);
            var dataUserObj = data.data;

            $("#personInfo").append('<tr><th>真实姓名：</th><td>' + dataUserObj.realName + '</td></tr><tr><th>手机号:</th><td><span id="telValue">' + dataUserObj.phone + '</span></td><td ><button style="margin-left:20px;" type="submit" class="tip-bottom" title="" id="replaceBtn"><i>更换手机号</i></button></td></tr><tr><th>所属部门：</th><td>' + dataUserObj.rName + '</td></tr>');
            $("#replaceBtn").click(function() {

                Prompt.init({
                    title: "更换手机号",
                    width: 480,
                    height: 320,
                    html: "<div id='updTelbox'><div class='form-group'><label class='label'>新手机号：</label><input type='tel' value=''  id='newTel' class='form-control' style='width:180px;float:left;'/><button id='checkCodeBtn' class='tip-bottom1'><i>获取验证码</i></button></div><div class='form-group'><label class='label'>验证码：</label><input type='text' class='yzmVal form-control' style='width:180px;' /></div><div class='errorInfo'></div><button class='tip-bottom1' id='wanBtn' style='margin-top:50px;padding:0 20px'><i>完成</i></button></div><div id='success'></div>",

                });

                $("#checkCodeBtn").css("background", "#ccc");
                $("#checkCodeBtn").attr("disabled", true);

                $("#newTel").blur(function(){
                    var phone = $(this).val();
                    if (phone.length == 0) {
                        $("#updTelbox").find(".errorInfo").html("手机号不能为空");
                        return false;
                    }
                    if (!(/^1[3|4|5|7|8]\d{9}$/).test(phone)) {
                         $("#updTelbox").find(".errorInfo").html("手机号格式有误,请重新输入！11位数字");
                        return false;
                    } else {
                        api.checkPhone({
                            "phone": phone
                        }).done(function(data) {
                            //console.log(data);
                            if (data.data == true) {
                                $("#updTelbox").find(".errorInfo").html("该手机号已经存在,请更换为别的手机号");
                                return false;
                            }else{
                                $("#updTelbox").find(".errorInfo").html("");
                                $("#checkCodeBtn").css("background", "#5878f5");
                                $("#checkCodeBtn").attr("disabled", false);
                            }
                        })
                    }
                })

                $("#checkCodeBtn").click(function() {
                        var telValue = $("#newTel").val();
                        api.getCheckcode({
                            "phone": telValue
                        }).done(function(data) {
                            console.log(data); //返回验证码
                        })
                    })
                    //验证码焦点离开时判断是否正确
                $(".yzmVal").blur(function() {
                        var telValue = $("#newTel").val();
                        var yzm = $(".yzmVal").val();
                        if(yzm.length == 0 ){
                            $("#updTelbox").find(".errorInfo").html("验证码不能为空！");
                        }else{
                           isCorrectCode(telValue, yzm);
                        }

                    })
                    //修改手机号完成
                $("#wanBtn").click(function() {
                    var telValue = $("#newTel").val();
                    var yzm = $(".yzmVal").val();
                    if(yzm.length == 0 || telValue.length == 0 ){
                            $("#updTelbox").find(".errorInfo").html("手机号或验证码不能为空！");
                    }else{
                        api.manageReplace({
                            "uuid": userUuid1,
                            "phone": telValue
                        }).done(function(data) {
                            $("#updTelbox").css("display", "none");
                            $("#success").html("更换手机号成功!");
                            //更换手机号成功后 刷新展示信息
                            $("#personInfo").empty();
                            manageDetail(userUuid1);
                        })
                    }
                })

            })
        })
    }
    //修改密码
    $("#updPwdBtn").click(function() {
        Prompt.init({
            title: "修改密码",
            width: 420,
            height: 320,
            html: "<div id='updPwdbox'><div class='form-group from-group1'><label>旧密码：</label><input type='password' value='' id='updOldPwd' class='form-control ' onfocus/></div><div class='form-group from-group1'><label>新密码：</label><input type='password' value='' id='updNewPwd' class='form-control'/></div><div class='form-group from-group1'><label>再一次：</label><input type='password' value='' id='updConPwd' class='form-control'/></div><div class='errorInfo'></div><button class='tip-bottom1' id='updPwdWanBtn' style='margin-top:20px;padding:0 20px'><i>完成</i></button></div><div id='success'></div>",
            //ConfirmFun : updataPassword
        });

        $("#updPwdWanBtn").click(function() {
            var updOldPwd = $("#updOldPwd").val();
            var updNewPwd = $("#updNewPwd").val();
            var updConPwd = $("#updConPwd").val();

            if(updOldPwd.length == 0 || updNewPwd.length == 0 || updConPwd.length == 0){
                $("#updPwdbox").find("errorInfo").html("旧密码、新密码、确认密码不能为空!");
            } else {
                 api.manageReplace({
                    "uuid": userUuid1,
                    "password": updNewPwd
                }).done(function(data) {
                    if(data.message == "Success"){
                        $("#updPwdbox").css("display", "none");
                        $("#success").html("更换密码成功,请退出后重新登录!");
                    }
                    //alert(data);
                })
            }
        })
        //密码验证
        $("#updOldPwd").blur(function(){
            var pwd = $(this).val();
            passwordCheck(pwd);
            if (pwd != userPwd) {
               $("#updPwdbox").find("errorInfo").html("旧密码输入不正确！");
            }

        })
        $("#updNewPwd").blur(function(){
            var pwd = $(this).val();
            passwordCheck(pwd);
        })
        $("#updConPwd").blur(function(){
            var pwd = $(this).val();
            passwordCheck(pwd);
            var newpwd = $("#updNewPwd").val();
            if ( newpwd != pwd) {
                $("#updPwdbox").find("errorInfo").html("确认密码与新密码不一致！");
                return false;
            }
        })
        //密码验证方法
        function passwordCheck(obj){
            if (obj.length == 0) {
                $("#updPwdbox").find("errorInfo").html("确认密码不能为空！");
                return false;
            }
            if (!(/^[a-zA-Z]\w{5,17}$/).test(obj)) { //
                $("#updPwdbox").find("errorInfo").html("以字母开头,长度在6~18之间,只能包含字符、数字和下划线");
                return false;
            }
        }
    })

    //修改密码完成
    function updataPassword(OldPwd, updNewPwd, updConPwd) {
        console.log(OldPwd, updNewPwd, updConPwd);
        console.log(userPwd);
    }

    /*顶部导航右侧用户信息图标下拉显示*/
    $(".user").hover(function() {
        $(this).parent().find("ul.userlist").css("display", "block");
    }, function() {
        $(this).parent().find("ul.userlist").css("display", "none");
    });

    //密码框按下的时候 判断键值Enter 登录
    $("#loginform .userPwd").keypress(function (e) {
        if (e.keyCode == 13){ //键码值是13 Enter
            var userName = $("#userName").val();
            var password = $("#password").val();
            login(userName, password);
        }
    })
})
/*
*用户登录公共方法
*parmas userName  用户名
*parmas password 密码
*/
function login(userName, password) {
    api.userLogin({
        "user": userName,
        "password": password
    }).done(function(data) {
        //console.log(data);
        var dataObj = data.data;

        if (dataObj != null) {

            var url;

            uuid_id = dataObj.userUuid; // 管理员uuid

            //存放用户uuid,用户名，密码
            localStorage.setItem("uuid_id", uuid_id);
            localStorage.setItem("userName", userName);
            localStorage.setItem("userPwd", password);

            var flag = dataObj.isFirst; //判断用户是否第一次登录 true 是 false 否

            if (flag == true) {
                url = "login-enter.html";
                //alert("用户第一次登录，需要填写具体信息！");
                api.windowOpen(url);

            } else if (flag == false) {

                var roleModelObj = dataObj.roleModel;
                var permissionModels = roleModelObj.permissionModels; //lifang  5个

                //console.log(permissionModels);
                var stringPer = JSON.stringify(permissionModels);
                localStorage.setItem("permissionModels", stringPer);

                url = "index.html";
                api.windowOpen(url);

            }
        } else {
            if (data.message == ".password") {
                $(".errorInfo").html("密码输入错误,请重新输入！");
            } else if (data.message == ".no user") {
                $(".errorInfo").html(userName + "用户不存在！");
            }

        }
    })
}

var person = localStorage.getItem("permissionModels");
    var jsonPerson = JSON.parse(person);

    //console.log(jsonPerson);


    function indexShow() {

        $("#indexMenuBox").empty();
        $.each(jsonPerson, function(index, item) {
            //console.log(jsonPerson);
            $("#indexMenuBox").append('<li id='+item.id+'><a href="" class="linkA"><div class="menu-box-icon"><i></i></div><h3>'+ item.name + '</h3></a></li>');
            if (item.name == "用户管理") {
                $("#1").find(".menu-box-icon").addClass("user-manage");
                $("#1").find("a.linkA").attr("href", "usermanage.html");
            } else if (item.name == "订单管理") {
                $("#2").find(".menu-box-icon").addClass("order-manage");
                $("#2").find("a.linkA").attr("href", "ordermanage1.html");
            } else if (item.name == "VIP管理") {
                $("#3").find(".menu-box-icon").addClass("vip-manage");
                $("#3").find("a.linkA").attr("href", "vipmanage.html");
            } else if (item.name == "试卷管理") {
                $("#4").find(".menu-box-icon").addClass("test-manage");
                $("#4").find("a.linkA").attr("href", "examination-manage.html ");
            } else if (item.name == "视频管理") {
                $("#5").find(".menu-box-icon").addClass("video-manage");
                $("#5").find("a.linkA").attr("href", "video.html");
            } else if (item.name == "权限管理") {
                $("#6").find(".menu-box-icon").addClass("power-manage");
                $("#6").find("a.linkA").attr("href", "privileges-manage.html");
            }
        });

    }
/*
 *退出登录
 */
/*function logout() {
    api.logout().done(function(data) {
        console.log("data");
    })
}*/
