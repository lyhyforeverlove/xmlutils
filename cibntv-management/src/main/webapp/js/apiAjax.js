var API = function(){	
	//api地址
	this.apiPath = "http://192.168.1.12:8180";

	//用户列表信息
	this.getUserInfo = function(paramsObj){
		var params = {
			"currentPage":paramsObj.currentPage, //当前页
			"size":paramsObj.size,
			"mobile" : paramsObj.mobile
		};
		var url = this.apiPath + "/action/user/userList";
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
		var url = this.apiPath + "/action/user/userList"
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
		var url = this.apiPath + "/action/user/user_excel_export?"+params;
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
		var url = this.apiPath + "/action/vip_order/user_vip_order"
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
		var url = this.apiPath + "/action/vip_order/order_list"
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

		var url = this.apiPath + "/action/vip_order/order_excel_export?"+params;
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
		var url = this.apiPath + "/action/vip_pack/vip_pack_list";
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
		var url = this.apiPath + "/action/vip_pack/vip_pack_create";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	/*VIP包下拉框选项*/
	this.vipPackSelect = function(){
		var url = this.apiPath + "/action/vip_pack/vip_pack_select";
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

		var url = this.apiPath + "/action/vip_pack/vip_pack_sale";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	/*VIP包发布*/
	this.vipPackRelease = function(){
		var url = this.apiPath + "/action/vip_pack/vip_pack_release";
		var data = {'api_url':url};
		return this.ajaxFun(data);
	}
	/*VIP包删除*/
	this.deleteVipPack = function(paramsObj){
		var params = {
			"uuid":paramsObj.uuid
		};
		var url = this.apiPath + "/action/vip_pack/delete_vip_pack";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	/*管理员登录*/
	this.userLogin = function(paramsObj){
		var params = {
			"user":paramsObj.user,
			"password":paramsObj.password
		};
		var url = this.apiPath + "/action/inORout/login";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	
	//获取手机验证码
	this.getCheckcode = function(paramsObj){
		var params ={
			"phone":paramsObj.phone
		};

		var url = this.apiPath+'/action/manager/sendSMS';		
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	};
	//判断验证码是否正确
	this.isCorrectCode = function(paramsObj){
		var params ={
			"phone":paramsObj.phone,
			"smsCode":paramsObj.smsCode 
		};

		var url = this.apiPath+'/action/manager/validateSMS';		
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
		var url = this.apiPath + "/action/manager/manageReplace";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//检测手机号是否存在
	this.checkPhone = function(paramsObj){
		var params = {
			"phone":paramsObj.phone
		};
		var url = this.apiPath + "/action/manager/validatePhone";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//个人中心  信息展示
	this.manageDetail = function(paramsObj){
		var params = {
			"uuid":paramsObj.uuid 
		};
		var url = this.apiPath + "/action/manager/manageDetail";
		var data = {'api_url':url,'postdata':params};
		return this.ajaxFun(data);
	}
	//注销 退出登录
	this.logout = function(){
		var url = this.apiPath + "/action/inORout/logout";
		var data = {'api_url':url};
		return this.ajaxFun(data);
	};



	this.ajaxFun = function(data){		
		var api_url = data.api_url ? data.api_url : "";
		var callback = data.callback ? data.callback : "jsonpCallback";	
		var postdata = data.postdata || {};

		return $.ajax({
			type:'post',
			url:api_url,
			data:postdata,	
			dataType:'json',	
			context:this,
			beforeSend:function(){

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
};
