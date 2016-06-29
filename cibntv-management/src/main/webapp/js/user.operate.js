$(function() {
    /*
     *params Author Wangyanxiao
     *params Date 2016-6-18
     */
    var vipexpireTime;
    var totalRecords;
    var newArr = [];
    var getUserInfo;

    var api = new API();

    /*
     *通过创建时间导出用户Excel
     */
    $("#export-user-btn").click(function() {

            str = '<div class="radio"><h3>按注册时间：</h3></div><div class="input-daterange input-group" id="datepicker"><div><label class="control-label" for="starttime">开始时间：</label><input type="text" class="" name="start" id="startDate" /></div><label class="control-label" for="endtime">结束时间：</label><input type="text" class="" name="end" id="endDate" /></div>';
            Prompt.init({
                title: "导出为EXCEL",
                height: 400,
                html: str,
                ConfirmFun: confirm
            });
            $('.input-daterange').datepicker({
                language: "zh-CN"
            });

            function confirm() {
                //获取开始时间，结束时间
                var startDate = $("#startDate").val();
                var endDate = $("#endDate").val();
                console.log(startDate, endDate);
                getUserInfoByCreateTime = api.getUserInfoByCreateTime({
                    "startDate": startDate,
                    "endDate": endDate
                })
                var url;
                url = getUserInfoByCreateTime.api_url;
                window.location.href = url;
            }
        })
        /*
         *通过手机号搜索用户信息
         */
    var searchMobile;
    $("#searchBtn").click(searchMobile, function() {

        var reg = /^\d{11}$/; //只能输入数字且长度不能超过11
        var v = $("#searchTxt").val();

        searchMobile = $("#searchTxt").val(); //获取手机号
        $("#list tbody").empty();
        getUserInfoList(1, 2, searchMobile);

        /*if (reg.test(v)) {
           
        } else {
            alert('只能输入数字且长度不能超过11!');
            return false;
        }*/

    })

    //用户量
    totalRecords(1,10);
    function totalRecords(current,size){
         getUserInfo = api.getUserInfo({
            "currentPage": current,
            "size": size
        }).done(function(data) {

            totalRecords = data.totalRecords;
            $("#totalRecords").text(totalRecords); //用户量=总记录数
        })
    }
    //初始化用户列表
    getUserInfoList(1, 10);
    /*
     *params current  当前页
     *params size 一页显示多少条记录
     */
    function getUserInfoList(current, size) {
        getUserInfo = api.getUserInfo({
            "currentPage": current,
            "size": size,
            "mobile": searchMobile
        }).done(function(data) {

            totalRecords = data.totalRecords;

            if (totalRecords == 0) {
                $("#list tbody").append("<p class='prompt'>没有记录</p>");
            }

            if (data.datas != null) {

                getUserList(data, size, 1); //列表展示

                var pageCount = data.totalPage; //取到总页数
                var currentPage = data.currentPage; //得到currentPage

                //pagination(example,page,currentPage,pageCount); //调分页函数

                var options = {
                    bootstrapMajorVersion: 2, //版本
                    currentPage: currentPage, //当前页数
                    totalPages: pageCount, //总页数

                    //点击事件，用于通过Ajax来刷新整个list列表
                    onPageClicked: function(event, originalEvent, type, page) {

                        $("#list tbody").empty();
                        getUserInfo = api.getUserInfo({
                            "currentPage": page,
                            "size": size,
                            "mobile": searchMobile
                        }).done(function(data) {
                            if (data.datas != null) {
                                getUserList(data, size, page); //列表展示
                            } else {
                                alert("没有该记录！");
                            }
                        })

                    }
                };

                $('#example').bootstrapPaginator(options);

            } else {
                console.log("没有记录!");
            }
        })
    }


    function getUserList(data, size, page) {
        $.each(data.datas, function(index, item) { //遍历返回的json

            if (item.ip == null) {
                item.ip = "-";
            }
            if (item.isVip == true) {
                item.isVip = "是";
            }
            if (item.isVip == false) {
                item.isVip = "否";
                item.vipexpireTime = '-';
            }
            if (item.userName == null) {
                item.userName = '-';
            }


            index += (size * (page - 1)); //序号

            $("#list tbody").append(
                "<tr class='parent'><td>" + (index + 1) + "</td><td class='usercode' style='display:none'>" + item.userCode + "</td><td>" + item.userName + "</td><td>" + item.mobile + "</td><td>" + item.createDate + "</td><td>" + item.ip + "</td><td>" + item.isVip + "</td><td>" + item.vipexpireTime + "</td><td><a class='detail-user-btn'>详情</a></td></tr>");

            vipexpireTime = item.vipexpireTime; //到期时间 

            newArr.push(vipexpireTime);
        });

        //查看VIP用户到期时间、充值记录详情
        $("#list .detail-user-btn").each(function(i) {
            $(this).bind("click", function() {

                var userCode = $(this).parents(".parent").find(".usercode").html();
                var getVipList = api.getVipList({
                    "userCode": userCode
                }).done(function(data) {
                    if (data != null) {
                        $.each(data.datas, function(index, item) { //遍历返回的json
                            var rechargeRecord = getDate(item.createDate); //充值记录
                            var orderName = item.orderName; //订单名称
                            str = '<h3>到期时间：' + newArr[i] + '</h3><div style="margin-top:20px;line-height:30px;"><span>充值记录：</span><p><span>' + rechargeRecord + '&nbsp;&nbsp;&nbsp;&nbsp;</span><span>' + orderName + '</span></p></div>';
                            Prompt.init({
                                title: "详情",
                                height: 400,
                                html: str
                                    //ConfirmFun: confirm
                            });
                        });
                    }
                })


            })
        })
    }

})
