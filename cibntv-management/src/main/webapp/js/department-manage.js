var ajaxTool = new AJAXTool();
//新建部门方法开始
function addDepartment()
{
     $('#myModal').modal('show');
     $("#department_name").val("");
     var result  = ajaxTool.getInfo({},"/role/roleSkip",false);
     result.done(function(resultList){
         $("#doweBok").empty();
         var role="";
         var data = resultList.data;
         if(data)
         {
           for(var i=0;i<data.length;i++)
           {
              role +="<li><input type='checkbox' name='checkbox' data-labelauty='"+data[i].name+"' value="+data[i].uuid+"></li>";
           }
           $("#doweBok").append(role);
           $(':input').labelauty();
         }
     });
  }
  //新建部门方法结束

  //保存新建部门信息方法开始
  function saveDepartment(){
     var departmentName = $("#department_name").val();
     var arrayObj = [];
     $("[name='checkbox']").each(function(){
         if($(this).parent().find("label").children(".labelauty-checked-image").is(":visible"))
         {
             arrayObj.push($(this).val());
         }
     });

     if(!departmentName){
        alert.dialog.confirm('请输入部门名称！',function(){});      
     }else if(departmentName.length>16){
        alert.dialog.confirm('部门名称过长！',function(){});
     }else if(arrayObj.length<1){
        alert.dialog.confirm('请选择部门权限!',function(){});
     }
     else{
         var result = ajaxTool.getInfo({"name":departmentName,"ids":arrayObj},"/role/roleSave",true);
         result.done(function(){
             $('#myModal').modal('hide');
             searcherValue("1");
         });
     }
  }

  //保存新建部门信息方法结束
  function searcherValue(page){
    $("#deparment_list").empty();
    if(page===1){
        var data = dataList;
        var department="";
        if(data){
          for(var i=0;i<data.content.length;i++){
             var index =(page-1)*10+(i+1);
             department+="<tr><td>"+index+"</td><td>"+data.content[i].name+"</td><td>"+data.content[i].createDate+"</td><td><a href='#' onclick=departmentDetail('"+data.content[i].uuid+"')>详情</a></td></tr>";
          }
          $("#deparment_list").append(department);
        }
    }else{
        var result  = ajaxTool.getInfo({"queryName":queryName,"currentPage":page,"size":"10"},"/role/roleList",false);
        result.done(function(resultList){
            var data = resultList.data;
            var department="";
            if(data){
              for(var i=0;i<data.content.length;i++){
                 var index =(page-1)*10+(i+1);
                 department+="<tr><td>"+index+"</td><td>"+data.content[i].name+"</td><td>"+data.content[i].createDate+"</td><td><a href='#' onclick=departmentDetail('"+data.content[i].uuid+"')>详情</a></td></tr>";
              }
              $("#deparment_list").append(department);
            }
        });
     }
  }

  //查看部门详情方法
  function departmentDetail(uuid){
     window.location.href="department-detail.html?id="+uuid;
  }
  //初始化分页标签
  function firstLink(){
    queryName=$("#searcher_condition").val();
    $("#deparment_list").empty();
    var result  = ajaxTool.getInfo({"queryName":queryName,"currentPage":"1","size":"10"},"/role/roleList",false);
     result.done(function(resultList){
         if(resultList.data.totalPages ===0 ){
           totalpage = 1;
         }else{
           totalpage = resultList.data.totalPages;
         }
        dataList = resultList.data;
        initPagination();
     });
  }
$(function(){
    firstLink();
});
