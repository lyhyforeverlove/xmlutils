package com.eeduspace.management;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import com.eeduspace.management.service.Test;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class UserTest {
	public static void main(String[] args) throws IOException {
		//TestVipOrderList();
		//testUserList();
		//testUserOrder();
		testUserList();
	}
	
	public static void  TestVipOrderList() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("isDel", "false");
		map.put("currentPage", "0");
		map.put("size", "100");
		map.put("orderType", "VIP");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/vip_order/order_list";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	public static void  testUserList() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("currentPage", "0");
		map.put("size", "20");
		//map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/user/userList";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	@org.junit.Test
	public  void  user_diagnostic_order() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("userCode", "ab8499cd45c047639bff6b165b4ca5c2");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/vip_order/user_diagnostic_order";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	@org.junit.Test
	public  void  user_vip_order() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/vip_order/user_vip_order";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	@org.junit.Test
	public  void  testUserInfo() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/user/user_info";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	
	
	@org.junit.Test
	public  void  userBlacklist() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		map.put("isBlacklist", "true");
		String urlString="http://192.168.1.87:8181/action/user/user_blacklist";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	
	@org.junit.Test
	public  void  order_list() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
//		map.put("mobile", "186");
//		map.put("orderSn", "true");
//		map.put("startDate", "true");
//		map.put("endDate", "true");
		map.put("orderType","VIP");
		map.put("currentPage", "0");
		map.put("size", "20");
		String urlString="http://192.168.1.87:8181/action/vip_order/order_list";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	@org.junit.Test
	public  void  vipPackList() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
//		map.put("mobile", "186");
//		map.put("orderSn", "true");
//		map.put("startDate", "true");
//		map.put("endDate", "true");
//		map.put("orderType","VIP");
//		map.put("currentPage", "0");
//		map.put("size", "20");
		String urlString="http://192.168.1.87:8181/action/vip_pack/vip_pack_list";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
}
