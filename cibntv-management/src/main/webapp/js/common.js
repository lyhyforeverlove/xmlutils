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


/*用户管理 导出为Excel*/




