//ajax 封装方法
var AJAXTool=function(){
   this.apiPath = "http://192.168.1.12:8180/action";
   //获取列表页面
   this.getInfo = function(paramsObj,url,bool){
     var new_url = this.apiPath +url;
     var data = {'api_url':new_url};
     return this.ajaxFun(data,paramsObj,bool);
   };

   this.ajaxFun = function(data,paramsObj,bool)
   {
       var api_url = data.api_url ? data.api_url : "";
       var callback = data.callback ? data.callback : "jsonpCallback";
       return $.ajax({
         type:'post',
         url:api_url,
         data:paramsObj,
         dataType:'json',
         jsonp:'callback',
         traditional:bool,
         jsonpCallback:callback,
         context:this,
         beforeSend:function(result){
          },
         error:function(XMLHttpRequest,textStatus){
         }
       });
   };
};


//分页标签初始化
function initPagination(){
  $("#pagination_zc").remove();
  $("#pagination_box").append('<ul id="pagination_zc" class="pagination"></ul>');
  $("#pagination_zc").twbsPagination({
       totalPages: totalpage,
       startPage: 1,
       onPageClick: function (event, page) {
          searcherValue(page);
       }
  });
}


$(function(){
    initUl();
    var name = sessionStorage.getItem("userName");
    $("#userName").html(name);
});

//增加个人中心和退出菜单
function initUl(){
  var list= "<ul class='userlist'><li><a href='personal.html'><i class='pCenter icon'></i> 个人中心</a></li><li><a href='login.html'><i class='exitLogin icon'></i> 退出登录</a></li></ul>";
  $(".user").hover(function(){
       $("#userInfoPerson").html(list);
   },function(){
      $(".userlist").hover(function(){

      },function(){
         $("#userInfoPerson").empty();
      });
   });
}
