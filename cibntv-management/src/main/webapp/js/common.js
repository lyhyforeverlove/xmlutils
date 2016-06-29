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
        /*function(event, originalEvent, type, page)*/              
    };
    $('#'+container).bootstrapPaginator(options);
}
var uuid = sessionStorage.getItem("uuid_id");  
//console.log(uuid);  
if(uuid ==  null || uuid == "undefined"){
    //alert("用户没有登录，无法访问页面,跳转登录页面！");
    window.location.href="login.html";
}

