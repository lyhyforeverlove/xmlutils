package com.eeduspace.management.controllerTest.manangerTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.persistence.EntityManagerFactory;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class ManagerControllerTest extends BaseTest {

	@Resource(name = "entityManagerFactory")
	private EntityManagerFactory emf;

	

	//详情
	@Test
	public void mDetail(){
		String url = "http://localhost:8070/cibntv-management/action/manager/manageDetail";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("uuid", "79b7ac89ac734f05b212d0efd0a2f667");

		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	
	//修改:密码修改,手机号修改,真实姓名
	@Test
	public void mUpdateTest(){
		String url = "http://localhost:8070/cibntv-management/action/manager/manageChange";
		RoleModel roleModel = new RoleModel();
		String password = "111111";
		String uuid = "0b65ba9d72614fc2996b811e93a66711";
		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("password", password);
//		paramMap.put("createManagerId", 123123465);
		paramMap.put("realName", "测试");
		paramMap.put("phone", "15511112222");
		paramMap.put("uuid", uuid);

		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	//用户名唯一性验证
	@Test
	public void vName(){
		String url = "http://localhost:8070/cibntv-management/action/manager/validateName";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("name", "admin");

		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	

	public static void main(String[] args) {
		ManagerControllerTest mct = new ManagerControllerTest();
		mct.mUpdateTest();
		

	}


}
