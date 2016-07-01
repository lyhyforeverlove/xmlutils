//ajax 封装方法
var AJAXTool=function(){
   this.apiPath = "action";
   //获取列表页面
   this.getInfo = function(paramsObj,url,bool){
     var new_url = this.apiPath +url;
     var data = {'api_url':new_url};
     return this.ajaxFun(data,paramsObj,bool);
   };

   this.ajaxFun = function(data,paramsObj,bool)
   {
       var api_url = data.api_url ? data.api_url : "";
       return $.ajax({
         type:'post',
         url:api_url,
         data:paramsObj,
         dataType:"json",
         traditional:bool,
         success:function(result){
           var data = result.data;
            //result.data  如果false 没有权限   提示页面
            //result.data  如果为login.html就是session过期  直接跳到login.html
            if(!data){
              if(confirm("您没有访问此功能模块的权限")){
                  window.location.href="login.html";
              }
            }
            else if(data ==="login.html"){
               localStorage.clear();
               window.location.href="login.html";
            }
         },
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
