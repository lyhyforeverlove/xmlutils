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
		testUserOrder();
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
		map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/user/userList";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	public static void  testUserOrder() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("currentPage", "0");
		map.put("size", "100");
		map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/vip_order/user_vip_order";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	
	public static void  testRelease() throws IOException{
		Map<String, String> map=new HashMap<String, String>();
		map.put("currentPage", "0");
		map.put("size", "100");
		map.put("userCode", "df6548d1fd534b90aa18939af7e1f052");
		//map.put("mobile", "186");
		String urlString="http://192.168.1.87:8181/action/vip_order/user_vip_order";
		System.out.println(HTTPClientUtils.httpPost(urlString,map));
	}
	
}
