var api = new API();
var disStartDate;
var disEndDate;
var discountPrice;
var delIdsArr=[];//存放删除VIP数组

$(function() {
    var api = new API();
    /*
     *新增vip方案
     */
    $("#createVipBtn").click(function() {

      str = '<form enctype="multipart/form-data" action="" method="post" id="formid" name="form"><div id="addbox"><p><a href="javascript:;" class="file">选择背景图片<input type="file" name="file" id="file_pic"></a></p><p>VIP方案<select name="vipType" id="vipType"/><option value="ONE_MONTH">1个月</option><option value="TWO_MONTH">2个月</option><option value="THREE_MONTH">3个月</option><option value="SIX_MONTH">6个月</option><option value="ONE_YEAR">1年</option><option value="TWO_YEAR">2年</option></select></p><p>VIP价格<input type="text" name="vipPrice" class ="vipPrice" value="" /></p><p>VIP描述<input type="text" name="vipDesc" value="" class="vipDesc" /></p></div>';

            Prompt.init({
                title: "新增VIP方案",
                height: 400,
                html: str,
                ConfirmFun: uploadCreateVip
            });

            var reg = /^[\d]+$/g;
          
          $(".vipPrice").blur(function(){
            if(!reg.test($(this).val())){
              alert("只能输入数字");
            }
          })

        })
        
        /*
         *VIP包打折操作
         */
    $("#DiscountVipBtn").click(function() {
      str = '<form method="post" id="formid" name="form"><div id="addbox"><div class="input-daterange input-group" id="datepicker"><label class="control-label" for="starttime">开始时间：</label><input type="text" class="" name="discountStartDate" id="startDate1" /><label class="control-label" for="endtime">结束时间：</label><input type="text" class="" name="discountEndDate" id="endDate1" /></div><p>VIP方案<select name="uuid" id="vipType"/><option value="all">全部</option></select></p><p>&nbsp;&nbsp;&nbsp;折扣&nbsp;&nbsp;<select name="vipSale"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></p></div></form>';

        Prompt.init({
            title: "打折活动",
            height: 400,
            html: str,
            ConfirmFun: vipPackSale
        });

        $("#prompt_bottom .btn").css("margin-left","120px");//设置打折按钮样式

        var viptype = $("#addbox").find("#vipType"); //存放vip方案
        vipPackSelect(viptype);//VIP方案数据函数

        //时间插件配置参数
        $('.input-daterange').datepicker({
            language: "zh-CN",
            autoclose: true,
            todayBtn: "linked", //当天日期
            pickerPosition: "bottom-left",
            todayHighlight: true
        })
    })
    //发布
    $("#releaseBtn").click(function() {
        //console.log(delIdsArr);
        vipPackRelease(delIdsArr);
    })


})
/*
*VIP打折
*/
function vipPackSale() {
    var res = {};
    var v11 = $("#formid").serialize();
    v11.split('&').forEach(function(i) {
        var j = i.split('=');
        res[j[0]] = j[1];
    });
    var json = JSON.stringify(res);
    var jsonobj = eval('(' + json + ')');

    disStartDate = jsonobj.discountStartDate; //页面展示活动时间
    disEndDate = jsonobj.discountEndDate;

    var discountStartDate = jsonobj.discountStartDate + " 00:00:00";
    var discountEndDate = jsonobj.discountEndDate + " 23:59:59";

    var uuid = jsonobj.uuid;
    var vipSale = jsonobj.vipSale;

    api.vipPackSale({
        "discountStartDate": discountStartDate,
        "discountEndDate": discountEndDate,
        "uuid": uuid,
        "vipSale": vipSale
    }).done(function(data){

        $("#list").empty();
        initVipPackList(1,true,true);

    })
    
}

/*
 *VIP包发布
 */
function vipPackRelease(ids) {
    api.vipPackRelease({"ids":ids}).done(function(data) {
        //发布
        if(data.message == "success"){
            alert("发布成功！");
        }
        $("#list").empty();
        initVipPackList(1,true,true);
        var url = "vipmanage.html";
        api.windowOpen(url);
    })
}

/*
 *VIP包下拉框选项
 */
function vipPackSelect(vipType) {
    api.vipPackSelect().done(function(data) {
        if (data != null) {
            $.each(data.datas, function(index, item) {
                vipType.append("<option value=" + item.uuid + ">" + item.vipTypeDesc + "</option>");
            })
        }
    })
}
/*
 *vip包初始化列表
 */
//initVipPackList(0,true);
function initVipPackList(state, flag ,isAllFlag) {
    api.getVipPackList({ "isRelease": flag,"isAll":isAllFlag }).done(function(data) {

        if (data != null) {
            $.each(data.datas, function(index, item) {
                //遍历返回的json

                  var vipSale = item.vipSale;
                  var price = item.vipPrice;
                  //console.log(vipSale,price);
                    //折后价格
                   var discountPrice = (vipSale * price ) / 10;
                  

                $("#list").append('<div class="sale" id=' + item.uuid + '><a href="#"><img src=' + api.apiPath1 + item.backgroundimg + ' /></a><p style="position:relative;width:240px;"><span class="vipPrice"><em>' + item.vipPrice + '</em>元</span><a class="state del" id="del' + item.uuid + '">' + state + '</a></p><p style="display:block;font-size:22px;color:#ff6666;margin:6px 0;" class="disPrice">折后价：<em>' + discountPrice+ '</em>元</p><p style="font-size:16px;color:#999;" class="actTime">活动时间：<span class="disStartDate">' + item.discountStartDate + '</span>-<span class="disEndDate"">' + item.discountEndDate + '</span></p></div>');

                 

                  //0=已发布 1=删除
                  if (state == 0) {
                      $(".state").html("已发布");
                  } else if (state == 1) {
                      $(".state").html("删除");
                  }

            });

            $(".disStartDate").each(function(){
              var startdate = $(this).html().substring(0,10);
              var msgStart = startdate.split("-").join(".");
              $(this).html(msgStart);
              $(this).parents(".sale").find(".vipPrice").css("text-decoration","line-through");
              if($(this).html() == "null"){
                $(this).parents(".sale").find(".vipPrice").css("text-decoration","none");
                $(this).parent(".actTime").css("display","none");
                $(this).parents(".sale").find(".disPrice").css("display","none");
              }
            })
            $(".disEndDate").each(function(){
              var enddate = $(this).html().substring(0,10);
              var msgEnd = enddate.split("-").join(".");
              $(this).html(msgEnd);
            })    
        }

        //VIP包删除
            $(".del").each(function(index) {
                $(this).click(function() {
                  //console.log(111);
                    var uuId = $(this).parents(".sale").attr("id");
                    $(this).parents(".sale").css("display","none");
                    delIdsArr.push(uuId);
                   // console.log(delIdsArr);
                })
            })

    })
}

/*新增vip方案提交方法*/
function uploadCreateVip(){
    var vipPr = $(".vipPrice").val();
    var vipDe = $(".vipDesc").val();      

    /*if(vipPr.length == 0 || vipDe.length == 0){
        alert("请输入价格和描述！");
        return false;
    }else{*/
        var formData = new FormData($("#formid")[0]);
        $.ajax({  
              url: api.apiPath+'/vip_pack/vip_pack_create' ,  
              type: 'POST',  
              data: formData,  
              async: false,  
              cache: false,  
              contentType: false,  
              processData: false,  
              success: function (data) { 
                //console.log(data);
                if(data.message == "VIP包已存在" ){
                    alert("VIP包已存在");
                    return false;
                }else if(data.message == "success" ){
                    alert("上传成功!");
                    $("#list").empty();
                    initVipPackList(1, true ,true);
                }
                  
              },  
              error: function (data) {  
                  alert(data);  
              }  
        });
    
}

