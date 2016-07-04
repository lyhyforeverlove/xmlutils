var api = new API();

$(function() {

        var id;
        var newArr = [];
        var getOrderList;

        //通过开始时间、结束时间查询订单列表
        $('.form_datetime').datepicker({
            language: "zh-CN",
            autoclose: true,
            todayBtn: "linked", //当天日期
            pickerPosition: "bottom-left",
            todayHighlight: true
        })

        $(".endDateVip").on('changeDate', function(ev) { //当结束日期被改变时被触发

            var startDate = $("#startDate").val();
            var endDate = $("#endDate").val();
            

            getOrderInfoList(1, 10, "VIP",null,null,startDate,endDate);
        });
        $(".endDateDia").on('changeDate', function(ev) { //当结束日期被改变时被触发

            var startDate = $("#startDate").val();
            var endDate = $("#endDate").val();

            getOrderInfoList(1, 10, "DIAGNOSTIC",null,null,startDate,endDate);
        });

    var val = 0;

    $("#searchSelected").click(function() {
        $("#searchTab").show();
        $(this).addClass("searchOpen");

    });

    $("#searchTab li").hover(function() {
        $(this).addClass("selected");
    }, function() {
        $(this).removeClass("selected");
    });
    $("#searchTab li").click(function() {
        $("#searchSelected").html($(this).html());
        $("#searchTab").hide();
        $("#searchSelected").removeClass("searchOpen");

        val = $(this).val();
    });
    /*
    *通过手机号/订单号查询订单信息
    */
    $("#searchOrderBtn").click(function() {
        var searchText;
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        //console.log(startDate,endDate);
        if (val == 0) {
            searchText = $(".search-order-input").val();
            
            getOrderInfoList(1,10,"VIP",searchText,null,startDate,endDate); 
        } else if (val == 1) {
            searchText = $(".search-order-input").val();
            getOrderInfoList(1,10,"VIP",null,searchText,startDate,endDate); 
        }  
    })   
  $("#searchOrderBtn1").click(function() {
        var searchText;
        var startDate = $("#startDate").val();
        var endDate = $("#endDate").val();
        if (val == 0) {
            searchText = $(".search-order-input").val();
            getOrderInfoList(1,10,"DIAGNOSTIC",searchText,null,startDate,endDate); 
        } else if (val == 1) {
            searchText = $(".search-order-input").val();
            getOrderInfoList(1,10,"DIAGNOSTIC",null,searchText,startDate,endDate); 
        }  
    })  
    /*
     *通过创建时间导出诊断订单Excel
     */
    $("#export-order-btn1").click(function() {

        str = '<div class="radio"><label for="">按订单时间段导出</label></div><div class="input-daterange input-group" id="datepicker"><div><label class="control-label" for="starttime">开始时间：</label><input type="text" class="" readonly name="start" id="startDate1" /></div><label class="control-label" for="endtime">结束时间：</label><input type="text" class="" readonly name="end" id="endDate1" /></div>';
        Prompt.init({
            title: "导出为EXCEL",
            height: 400,
            html: str,
            ConfirmFun: exportOrder
        });
        function exportOrder() {
            //获取开始时间，结束时间
            var startDate = $("#startDate1").val();
            var endDate = $("#endDate1").val();

            getExportOrder("VIP",startDate,endDate);

            //getExportOrder("DIAGNOSTIC",startDate,endDate);

        }
        //日期调用插件配置参数
        $('.input-daterange').datepicker({
            language: "zh-CN",
            autoclose: true,
            todayBtn: "linked", //当天日期
            pickerPosition: "bottom-left",
            todayHighlight: true
        });
    })


    $("#export-order-btn2").click(function() {
           // console.log("DIAGNOSTIC");
        str = '<div class="radio"><label for="">按订单时间段导出</label></div><div class="input-daterange input-group" id="datepicker"><div><label class="control-label" for="starttime">开始时间：</label><input type="text" class="" name="start" readonly id="startDate1" /></div><label class="control-label" for="endtime">结束时间：</label><input type="text" class="" readonly name="end" id="endDate1" /></div>';
        Prompt.init({
            title: "导出为EXCEL",
            height: 400,
            html: str,
            ConfirmFun: exportOrder
        });
        function exportOrder() {
            //获取开始时间，结束时间
            var startDate = $("#startDate1").val();
            var endDate = $("#endDate1").val();

            //getExportOrder("VIP",startDate,endDate);

            getExportOrder("DIAGNOSTIC",startDate,endDate);

        }
        //日期调用插件配置参数
        $('.input-daterange').datepicker({
            language: "zh-CN",
            autoclose: true,
            todayBtn: "linked", //当天日期
            pickerPosition: "bottom-left",
            todayHighlight: true
        });
    })

}) 

/*
*导出订单
*/
function getExportOrder(orderType,startDate,endDate){
    var getExportOrderInfo = api.getExportOrderInfo({
        "orderType": orderType,
        "startDate": startDate,
        "endDate": endDate
    })
    var url = getExportOrderInfo.api_url;
    window.location.href = url;
}
/*
 *订单信息列表
 */
function getOrderInfoList(currentpage, size, orderType,searchText,searchText1,startDate,endDate) {
    getOrderList = api.getOrderList({
        "currentPage": currentpage,
        "size": size,
        "orderType": orderType,
        "mobile": searchText,
        "orderSn": searchText1,
        "startDate": startDate,
        "endDate": endDate
    }).done(function(data) {
        $("#list tbody").empty();
        orderList(data,size,orderType,searchText,searchText1,startDate,endDate);
        
    })
}
/*
*订单信息遍历追加#list tbody
*/
function getList(data, size, page) {
    $.each(data.datas, function(index, item) { //遍历返回的json
        index += (size * (page - 1)); //序号
        if(item.payType == null){
            item.payType = "-";
        }
        if(item.transactionId == null){
            item.transactionId ="-";
        }
        if(item.buyType == "VIP"){
            $("#list tbody").append(
            "<tr><td>" + (index + 1) + "</td><td>" + item.orderSn + "</td><td>" + item.transactionId + "</td><td>" + item.mobile +"</td><td>" + item.orderPrice + "</td><td>" + item.payType + "</td><td>" + item.buyDate + "</td><td>" + item.orderState + "</td></tr>");
        }else if(item.buyType == "DIAGNOSTIC"){
            if(item.buyType == "DIAGNOSTIC"){
                item.buyType = "诊断订单";
            }
            $("#list tbody").append(
            "<tr><td>" + (index + 1) + "</td><td>" + item.orderSn + "</td><td>" + item.transactionId + "</td><td>" + item.mobile +"</td><td>" + item.buyType + "</td><td>" + item.orderName + "</td><td>" + item.orderPrice + "</td><td>" + item.payType + "</td><td>" + item.buyDate + "</td><td>" + item.orderState + "</td></tr>");
        }
        

        id = index + 1;
    });
}
/*订单列表不为空 展示订单*/
function orderList(data,size,orderType,searchText,searchText1,startDate,endDate){
    if( data != null){
        //console.log(data);
        getList(data, size, 1);

        var pageCount = data.totalPage; //取到总页数
        var currentPage = data.currentPage; //得到urrentPage

        var options = {
            bootstrapMajorVersion: 2, //版本
            currentPage: currentPage, //当前页数
            totalPages: pageCount, //总页数

            //点击事件，用于通过Ajax来刷新整个list列表

            onPageClicked: function(event, originalEvent, type, page) {

                $("#list tbody").empty();
                var api = new API();

                getOrderList = api.getOrderList({
                    "currentPage": page,
                    "size": size,
                    "orderType": orderType,
                    "mobile": searchText,
                    "orderSn": searchText1,
                    "startDate": startDate,
                    "endDate": endDate      
                });
                getOrderList.done(function(data1) {

                    if (data1 != null) {
                        getList(data1, size, page);
                    }
                })

            }
        };
        $('#example').bootstrapPaginator(options);
    }
}