var ajaxTool = new AJAXTool();
  //停用启用方法
  function stopping(id,status){
     if(status==="停用"){
        alert.dialog.confirm('确定停用吗？',function(){
            var result = ajaxTool.getInfo({"uuid":id,"status":"Disable"},"/manager/manageReplace",false);
            result.done(function(resultList){
               firstLink();
            });
        });
     }
     else
     {
        alert.dialog.confirm('确定启用吗？',function(){
            var result = ajaxTool.getInfo({"uuid":id,"status":"Enable"},"/manager/manageReplace",false);
            result.done(function(resultList){
               firstLink();
            });
       });
     }
  }
  //删除管理员信息方法
  function deleting(id){
    alert.dialog.confirm('确定删除吗？',function(){
        var result = ajaxTool.getInfo({"uuid":id,"isDel":"true"},"/manager/manageReplace",false);
        result.done(function(resultList){
          firstLink();
        });
   });
  }

  function updatePrivileges(uuid,rUuid){
    $('#myModal').modal('show');
    $("#myModalLabel").find("input").val(uuid);
    //部门列表下拉框
    var result = ajaxTool.getInfo({"uuid":uuid},"/manager/manageDetail",false);
    result.done(function(resultList){
        var data = resultList.data;
        if(data){
          $("#departValue").html(data.rName);
          $(".btn-group").find("input").val(data.rUuid);
        }
    });
  }


  //下拉框选中状态
  function departChecked(uuid,name){
     $("#departValue").html(name);
     $(".btn-group").find("input").val(uuid);
  }



  function saveUpdatePlg(){
      var rname = $("#departValue").html();
      var ruuid = $(".btn-group").find("input").val();
      var uuid = $("#myModalLabel").find("input").val();
      var result = ajaxTool.getInfo({"uuid":uuid,"rName":rname,"rUuid":ruuid},"/manager/manageReplace",false);
      resule.done(function(resultList){
         $('#myModal').modal('hide');
         firstLink();
      });
  }
  //查询方法
  function searcherValue(page){
      $("#privileges-list").empty();
      if(page===1){
          var data = dataList;
          if(dataList){
              var privilegesList = "";
              for(var i=0;i<data.content.length;i++){
                  var status="";
                  if(data.content[i].status=="Enable"){
                      status="停用";
                  }else if(data.content[i].status=="Disable"){
                      status="启用";
                  }
                  var index =(page-1)*10+(i+1);
                  privilegesList +="<tr><td>"+index+"</td><td>"+data.content[i].name+"</td><td>"+data.content[i].phone+"</td><td>"+data.content[i].rName+"</td><td><a href='javascript:;' onclick=stopping('"+data.content[i].uuid+"','"+status+"')>"+status+"</a><a href='#' onclick=deleting('"+data.content[i].uuid+"')>删除</a><a href='#' onclick=updatePrivileges('"+data.content[i].uuid+"','"+data.content[i].rUuid +"')>修改</a></td></tr>";
              }
              $("#privileges-list").append(privilegesList);
          }
      }else{
          var result = ajaxTool.getInfo({"queryName":queryName,"currentPage":page,"size":"10"},"/manager/manageList",false);
          result.done(function(resultList){
              var data = resultList.data;
              if(data){
                  var privilegesList = "";
                  for(var i=0;i<data.content.length;i++){
                      var status="";
                      if(data.content[i].status=="Enable"){
                          status="停用";
                      }else if(data.content[i].status=="Disable"){
                          status="启用";
                      }
                      var index =(page-1)*10+(i+1);
                      privilegesList +="<tr><td>"+index+"</td><td>"+data.content[i].name+"</td><td>"+data.content[i].phone+"</td><td>"+data.content[i].rName+"</td><td><a href='javascript:;' onclick=stopping('"+data.content[i].uuid+"','"+status+"')>"+status+"</a><a href='#' onclick=deleting('"+data.content[i].uuid+"')>删除</a><a href='#' onclick=updatePrivileges('"+data.content[i].uuid+"','"+data.content[i].rUuid +"')>修改</a></td></tr>";
                  }
                  $("#privileges-list").append(privilegesList);
              }
          });
      }
  }

  function firstLink(){
    queryName = $("#queryValue").val();
    $("#privileges-list").empty();
    var result = ajaxTool.getInfo({"queryName":queryName,"currentPage":"1","size":"10"},"/manager/manageList",false);
    result.done(function(resultList){
       totalpage = resultList.data.totalPages;
       dataList = resultList.data;
       initPagination();
    });
  }

  $(function(){
      firstLink();
      //部门列表下拉框
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
