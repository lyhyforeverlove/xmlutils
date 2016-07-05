var API = function(){	
	//api地址
	this.apiPath = "action";
	this.apiPath1 = location.origin;
	//用户列表信息
	this.getUserInfo = function(paramsObj){
		var params = {
			"currentPage":paramsObj.currentPage, //当前页
			"size":paramsObj.size,
			"mobile" : paramsObj.mobile
		};
		var url = this.apiPath + "/user/userList";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	};

	//通过手机号搜索用户信息	
	this.getSearchUserInfoByMobile=function(paramsObj){
		var params = {
			"currentPage":paramsObj.currentPage, //当前页
			"size":paramsObj.size,
			"mobile" : paramsObj.mobile	
		}
		var url = this.apiPath + "/user/userList"
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}

	
	//导出用户列表通过注册时间
	this.getUserInfoByCreateTime = function(paramsObj){
		var params = {
			"startDate" : paramsObj.startDate,
			"endDate" : paramsObj.endDate
		};
		params = $.param(paramsObj);
		var url = this.apiPath + "/user/user_excel_export?"+params;
		var data = {'api_url':url};
		return data;
	}
	/*
	*订单管理
	*/
	//vip订单列表
	this.getVipList=function(paramsObj){
		var params = {
			"userCode":paramsObj.userCode
		}
		var url = this.apiPath + "/vip_order/user_vip_order"
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}

	//vip订单/诊断订单分页列表	
	this.getOrderList=function(paramsObj){
		var params = {
			"orderType":paramsObj.orderType, 
			"currentPage":paramsObj.currentPage, //当前页
			"size":paramsObj.size,
			"orderSn":paramsObj.orderSn,
			"mobile":paramsObj.mobile,
			"startDate" : paramsObj.startDate,
			"endDate" : paramsObj.endDate
		}
		var url = this.apiPath + "/vip_order/order_list"
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}

	//导出VIP订单/诊断订单 通过订单时间
	this.getExportOrderInfo = function(paramsObj){
		var params = {
			"orderType" : paramsObj.orderType,
			"startDate" : paramsObj.startDate,
			"endDate" : paramsObj.endDate
		};

		params = $.param(paramsObj);

		var url = this.apiPath + "/vip_order/order_excel_export?"+params;
		var data = {'api_url':url};
		return data;
	}
	/*
	*VIP管理 Interface
	**/
	//VIP包列表 
	this.getVipPackList = function(paramsObj){
		var params = {
			"isRelease":paramsObj.isRelease, //是否发布
			"isAll":paramsObj.isAll  //是否显示全部vip包（包含 已发布和未发布） 可选参数 默认为 false
		};
		var url = this.apiPath + "/vip_pack/vip_pack_list";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//VIP包新增
	this.createVipPack = function(paramsObj){
		var params = {
			"file":paramsObj.file, //背景图片文件
			"vipType":paramsObj.vipType, //VIP类型
			"vipPrice":paramsObj.vipPrice, //VIP价格
			"vipDesc":paramsObj.vipDesc //VIP描述
		};
		var url = this.apiPath + "/vip_pack/vip_pack_create";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	/*VIP包下拉框选项*/
	this.vipPackSelect = function(){
		var url = this.apiPath + "/vip_pack/vip_pack_select";
		var data = {'api_url':url};
		return this.ajaxFun(data);
	}
	/*VIP包打折*/
	this.vipPackSale = function(paramsObj){
		var params = {
			"uuid":paramsObj.uuid, //背景图片文件
			"vipSale":paramsObj.vipSale, //VIP类型
			"discountStartDate":paramsObj.discountStartDate, //VIP价格
			"discountEndDate":paramsObj.discountEndDate //VIP描述
		};

		var url = this.apiPath + "/vip_pack/vip_pack_sale";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	/*VIP包发布*/
	this.vipPackRelease = function(paramsObj){
		var params = {
			"ids":paramsObj.ids, //背景图片文件
		};
		var url = this.apiPath + "/vip_pack/vip_pack_release";
		//var url ="http://192.168.1.35:8070/cibntv-management/action/vip_pack/vip_pack_release";
		var data = {'api_url':url,"postdata":params};
		return this.ajaxFun(data);

		
	}
	/*VIP包删除*/
	/*this.deleteVipPack = function(paramsObj){
		var params = {
			"vipUUID":paramsObj.vipUUID
		};
		var url = this.apiPath + "/vip_pack/delete_vip_pack";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}*/
	/*管理员登录*/
	this.userLogin = function(paramsObj){
		var params = {
			"user":paramsObj.user,
			"password":paramsObj.password
		};
		var url = this.apiPath + "/inORout/login";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	
	//获取手机验证码
	this.getCheckcode = function(paramsObj){
		var params ={
			"phone":paramsObj.phone
		};

		var url = this.apiPath+'/manager/sendSMS';		
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	};
	//判断验证码是否正确
	this.isCorrectCode = function(paramsObj){
		var params ={
			"phone":paramsObj.phone,
			"smsCode":paramsObj.smsCode 
		};

		var url = this.apiPath+'/manager/validateSMS';		
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	};
	//修改管理员信息(更换手机号,修改密码)
	this.manageReplace= function(paramsObj){
		var params = {
			"uuid":paramsObj.uuid,
			"realName":paramsObj.realName,
			"phone":paramsObj.phone,
			"password":paramsObj.password
		};
		var url = this.apiPath + "/manager/manageChange";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//检测手机号是否存在
	this.checkPhone = function(paramsObj){
		var params = {
			"phone":paramsObj.phone
		};
		var url = this.apiPath + "/manager/validatePhone";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//个人中心  信息展示
	this.manageDetail = function(paramsObj){
		var params = {
			"uuid":paramsObj.uuid 
		};
		var url = this.apiPath + "/manager/manageDetail";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//注销 退出登录
	this.logout = function(){
		var url = this.apiPath + "/inORout/logout";
		var data = {'api_url':url};
		return this.ajaxFun(data);
	};



	this.ajaxFun = function(data){		
		var api_url = data.api_url ? data.api_url : "";
		var postdata = data.postdata || {};

		return $.ajax({
			type:'post',
			url:api_url,
			data:postdata,	
			dataType:'json',
			traditional:true,	
			context:this,
			beforeSend:function(){

			 },	
			success:function(data){
		        var data = data.data;
	            /*result.data  如果false 没有权限   提示页面
	            *result.data  如果为login.html就是session过期  直接跳到login.html
	            */
	            if(data =="disable"){
	                alert.dialog.confirm('您没有访问此功能模块的权限？',function(){
	                    localStorage.clear();
	                    window.location.href="login.html";
	                });
	            }
	            else if(data ==="login.html"){
	               localStorage.clear();
	               window.location.href="login.html";
	            }
			     
			},	
			error:function(XMLHttpRequest,textStatus){
				//showTips(this.api_error+textStatus);
			}
		});
	};
	this.windowOpen = function(url){
		//window.open(url);
		window.location.href = url;
	};
	this.windowLogin = function(){
		window.location.href = "login.html";
	};
};
