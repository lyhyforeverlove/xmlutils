 /*
@params author wangyanxiao
@params date 2016-6-8
 */
 $(function(){
 	/*顶部导航右侧用户信息图标下拉显示*/
    $(".user").hover(function(){
        $(this).parent().find("ul.userlist").css("display","block");
    },function(){
        $(this).parent().find("ul.userlist").css("display","none");
    });
})

/*
*分页
*/
function pagination(container, callback, currentPage, pageCount){
    var options = {
        bootstrapMajorVersion: 2, //版本
        currentPage: currentPage, //当前页数
        totalPages: pageCount, //总页数

       //点击事件，用于通过Ajax来刷新整个list列表
        onPageClicked : callback
    };
    $('#'+container).bootstrapPaginator(options);
}
var uuid = localStorage.getItem("uuid_id");
//console.log(uuid);
if(uuid ==  null || uuid == "undefined"){
    //用户没有登录，无法访问页面,跳转登录页面！
    window.location.href="login.html";
}
//所有页面右上角显示
var userName = localStorage.getItem("userName");
var userPwd = localStorage.getItem("userPwd");

indexPage(userName);

function indexPage(name) {
    $("#userName_login").append('<span>' + userName + '</span>');
    $("#userInfoPerson").append('<div class="user-right-box"><div class="user c-main"> <i class="user-icon icon"></i><ul class="userlist"><li><a href = "personal.html"><i class = "pCenter icon"></i>个人中心</a></li><li  id="logout"><a><i class = "exitLogin icon"></i>退出登录</a></li></ul></div></div>');

    //退出登录
    $("#logout").click(function() {
        var api = new API();
        logout(); //注销

        localStorage.clear(); //清空用户登录信息
        api.windowLogin();
        //window.location.href = "login.html";
    })
}
/*
*获取个人中心信息展示
*/
var userUuid1 = localStorage.getItem("uuid_id");
manageDetail(userUuid1);
function manageDetail(uuid_id) {
    var api = new API();
    api.manageDetail({
        "uuid": uuid_id
    }).done(function(data) {

        var dataUserObj = data.data;
        
        //用户没有权限跳转登录页面
        if(dataUserObj == "login.html"){
            clear.localStorage();
            api.windowLogin();
        }

        $("#personInfo").append('<tr><th>真实姓名：</th><td>' + dataUserObj.realName + '</td></tr><tr><th>手机号:</th><td><span id="telValue">' + dataUserObj.phone + '</span></td></tr><tr><th>所属部门：</th><td>' + dataUserObj.rName + '</td></tr>');
        
    })
}

/*
 *退出登录
 */
function logout() {
    var api = new API();
    api.logout().done(function(data) {
        console.log("data");
    })
}

