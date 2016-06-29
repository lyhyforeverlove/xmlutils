var api = new API();
var disStartDate;
var disEndDate;
var discountPrice; 
var priceArr = [] ;
$(function() {
    var api = new API();
    /*
     *新增vip方案
     */
    $("#createVipBtn").click(function() {

      str = '<form enctype="multipart/form-data" action="http://192.168.1.12:8180/action/vip_pack/vip_pack_create" method="post" id="formid" name="form"><div id="addbox"><p><a href="javascript:;" class="file">选择背景图片<input type="file" name="file" id="file_pic"></a></p><p>VIP方案<select name="vipType" id="vipType"/><option value="ONE_MONTH">1个月</option><option value="TWO_MONTH">2个月</option><option value="THREE_MONTH">3个月</option><option value="ONE_YEAR">1年</option><option value="SIX_MONTH">半年</option><option value="TWO_YEAR">2年</option></select></p><p>VIP价格<input type="text" name="vipPrice" id ="" value="" /></p><p>VIP描述<input type="text" name="vipDesc" value="" /></p><input type="submit" id="submit" class="tip-bottom" value="提交" style="color:#fff;font-size:14px;border-radius:2px;height:34px;"></div>';

            Prompt.init({
                title: "新增VIP方案",
                height: 400,
                html: str
            });
            $("#submit").submit(function() {
                //判断是否已经存在vip包
                if(message == "VIP包已存在"){
                  alert("VIP包已存在，不能添加！");
                }
                return false; 
            })

        })
        /*
         *VIP包打折操作
         */
    $("#DiscountVipBtn").click(function() {
        str = '<form method="post" id="formid" name="form"><div id="addbox"><p><div class="input-daterange input-group" id="datepicker"><div><label class="control-label" for="starttime">开始时间：</label><input type="text" class="" name="discountStartDate" id="startDate1" /></div><label class="control-label" for="endtime">结束时间：</label><input type="text" class="" name="discountEndDate" id="endDate1" /></div></p><p>VIP方案<select name="uuid" id="vipType"/><option value="all">全部</option></select></p><p>&nbsp;&nbsp;&nbsp;折扣&nbsp;&nbsp;<select name="vipSale"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option><option value="6">6</option><option value="7">7</option><option value="8">8</option><option value="9">9</option></select></p></div>';

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
            format: 'yyyy-mm-dd',
            autoclose: true,
            todayBtn: "linked", //当天日期
            pickerPosition: "bottom-left",
            todayHighlight: true
        })
    })

    //发布
    $("#releaseBtn").click(function() {
        vipPackRelease();
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

        //var disPriceStr = JSON.stringify(discountPrice);
        
        if(uuid == "all"){
            console.log("all");
            
             $(".vipPrice").each(function(){
                var price = $(this).find("em").text();
                //折后价格
                discountPrice = (vipSale * price) / 10;
                priceArr.push(discountPrice);
                return priceArr; //存放打折后数组
            });
         var disPriceStr = JSON.stringify(priceArr);    
         sessionStorage.setItem("priceArr", disPriceStr);    
        }

        $("#list").empty();
        initVipPackList(1,true,true);

    })
    
}

/*
 *VIP包发布
 */
function vipPackRelease() {
    api.vipPackRelease().done(function(data) {
        //发布
        if(data.message == "success"){
            alert("发布成功！");
        }
        $("#list").empty();
        initVipPackList(1,true,true);
    })
}

/*
 *VIP包下拉框选项
 */
function vipPackSelect(vipType) {
    api.vipPackSelect().done(function(data) {
        if (data != null) {
            $.each(data.datas, function(index, item) {
                vipType.append("<option value=" + item.uuid + ">" + item.vipDesc + "</option>");
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

            //console.log(data);
            //$("#list").empty(); //清空#list
             console.log(priceArr);
            $.each(data.datas, function(index, item) {
                //遍历返回的json

              var discountPrice = sessionStorage.getItem("priceArr");
              var jsonDisPrice= JSON.parse(discountPrice);
              //console.log(jsonDisPrice);
              

              $("#list").append('<div class="sale" id=' + item.uuid + '><a href="#"><img src=' + api.apiPath + item.backgroundimg + ' /></a><p style="position:relative;width:240px;"><span class="vipPrice"><em>' + item.vipPrice + '</em>元</span><a class="state del" id="del' + item.uuid + '">' + state + '</a></p><p style="display:block;font-size:22px;color:#ff6666;margin:6px 0;" class="disPrice">折后价：<em>' + jsonDisPrice[index] + '</em>元</p><p style="font-size:16px;color:#999;" class="actTime">活动时间：<span class="disStartDate">' + item.discountStartDate + '</span>-<span class="disEndDate"">' + item.discountEndDate + '</span></p></div>');

               

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
            //VIP包删除
            $(".del").each(function(index) {
                $(this).click(function() {
                    var uuId = $(this).parents(".sale").attr("id");
                    if(state == 0 ){
                      $(this).unbind('click');
                    }else if(state == 1){
                      delteVipPack($(this), uuId);
                    }
                })
            })
        }

    })
}

/*
 *VIP包删除
 */
function delteVipPack(ele, uuId) {
    $('#' + uuId).delegate(ele, "click", function() {
        api.deleteVipPack({
            "uuid": uuId
        }).done(function(data) {
            $('#' + uuId).html("");
        })
    })
}
