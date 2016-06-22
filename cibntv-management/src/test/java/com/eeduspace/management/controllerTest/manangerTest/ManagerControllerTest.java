package com.eeduspace.management.controllerTest.manangerTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class ManagerControllerTest extends BaseTest {

	//跳转
	@Test
	public void mSkipTest(){
		String url = "http://localhost:8070/cibntv-management/action/manager/manageSkip";
		Map<String, Object> paramMap = new HashMap<>();
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	//保存
	@Test
	public void mSaveTest(){
		String url = "http://localhost:8070/cibntv-management/action/manager/manageSave";
		RoleModel roleModel = new RoleModel();
		String name = "testuser";
		String password = "123456";
		roleModel.setName("测试用户");
		roleModel.setUuid("a2c2e236a57f492db408fcfbb136474f");
//		roleModel.setType(RoleEnum.Type.CIBNTV.toString());
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("name", name);
		paramMap.put("password", password);
		paramMap.put("rName", roleModel.getName());
		paramMap.put("rUuid", roleModel.getUuid());
//		paramMap.put("type", roleModel.getType());
//		paramMap.put("createManagerId", 123123465);

		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

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
	//列表
	@Test
	public void mListTest(){
		String url = "http://localhost:8070/cibntv-management/action/manager/manageList";
		Map<String, Object> paramMap = new HashMap<>();
		ManagerModel managerModel = new ManagerModel();
		managerModel.setCurrentPage(1);
		managerModel.setSize(10);
		managerModel.setQueryName("an");
		paramMap.put("currentPage", managerModel.getCurrentPage());
		paramMap.put("size", managerModel.getSize());
		paramMap.put("queryName", managerModel.getQueryName());
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	//修改:角色；状态（停用，启用）；删除状态；密码修改
	@Test
	public void mUpdateTest(){
		String url = "http://localhost:8070/cibntv-management/action/manager/manageReplace";
		RoleModel roleModel = new RoleModel();
//		String password = "123456";
		String uuid = "3ffb2fc5e9234172a782b4490297c331";
		roleModel.setName("客服管理");
		roleModel.setUuid("b7a5c3106a144267843422de85bf34aa");
//		roleModel.setType(RoleEnum.Type.CustomerService.toString());
		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("password", password);
		paramMap.put("rName", roleModel.getName());
		paramMap.put("rUuid", roleModel.getUuid());
//		paramMap.put("type", roleModel.getType());
//		paramMap.put("createManagerId", 123123465);
//		paramMap.put("status", "Enable");
//		paramMap.put("isDel", false);
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
//		System.out.println(RoleEnum.Type.Test.toString());

	}


}
