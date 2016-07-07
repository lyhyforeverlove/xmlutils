var ajaxTool = new AJAXTool();
function searcherValue(page){
    if(page===1){
      if(dataList){
          iterationList(dataList,page);
      }
    }else{
        var result = ajaxTool.getInfo({"queryName":queryName,"currentPage":page,"size":"10"},"/role/manageLog",false);
        result.done(function(resultList){
             var data = resultList.data;
             if(data){
                iterationList(data,page);
             }
        });
    }
}
function firstLink(){
    queryName = $("#searcher_condition").val();
    $("#privileges-list").empty();
    var result = ajaxTool.getInfo({"queryName":queryName,"currentPage":"1","size":"10"},"/role/manageLog",false);
    result.done(function(resultList){
        if(resultList.data){
          dataList = resultList.data;
          totalpage = resultList.data.totalPages;
          initPagination();
        }
    });
}

//循环列表
function  iterationList(publicList,page){
    var tmpl="";
    var rlt = "";
    $("#operation_list").empty();
    if(publicList.content){
        for(var i=0;i<publicList.content.length;i++){
          var index =(page-1)*10+(i+1);
          if(publicList.content[i].result){
             rlt="成功";
          }else{
             rlt="失败";
          }
          tmpl +="<tr><td>"+index+"</td><td>"+publicList.content[i].sourceIp+"</td><td>"+publicList.content[i].module+"</td><td>"+publicList.content[i].action+"</td><td>"+rlt+"</td><td>"+publicList.content[i].description+"</td><td>"+publicList.content[i].createDate+"</td><tr>";
        }
        $("#operation_list").append(tmpl);
    }
}

$(function(){
    firstLink();
});
