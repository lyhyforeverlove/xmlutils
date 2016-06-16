package com.eeduspace.management.controllerTest.manangerTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.enumeration.RoleEnum;
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
		String name = "cibnguanli";
		String password = "123456";
		roleModel.setName("CIBN管理");
		roleModel.setUuid("c601bee5a61e457fa2df485fe4f0f2eb");
		roleModel.setType(RoleEnum.Type.CIBNTV.toString());
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("name", name);
		paramMap.put("password", password);
		paramMap.put("rName", roleModel.getName());
		paramMap.put("rUuid", roleModel.getUuid());
		paramMap.put("type", roleModel.getType());
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
		paramMap.put("uuid", "4bd9f930c77748a4a07dc1699c61f9d9");

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
		managerModel.setCurrentPage(0);
		managerModel.setSize(5);
		/*managerModel.setType(RoleEnum.Type.Test);
		managerModel.setQueryName("test");*/
		paramMap.put("currentPage", managerModel.getCurrentPage());
		paramMap.put("size", managerModel.getSize());
		/*paramMap.put("type", managerModel.getType());
		paramMap.put("queryName", managerModel.getQueryName());*/
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
//		RoleModel roleModel = new RoleModel();
//		String password = "123456";
		String uuid = "4bd9f930c77748a4a07dc1699c61f9d9";
//		roleModel.setName("CustomerService");
//		roleModel.setUuid("1fca5e380a514e49ab708cd310c5f10c");
//		roleModel.setType(RoleEnum.Type.CustomerService.toString());
		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("password", password);
//		paramMap.put("rName", roleModel.getName());
//		paramMap.put("rUuid", roleModel.getUuid());
//		paramMap.put("type", roleModel.getType());
//		paramMap.put("createManagerId", 123123465);
//		paramMap.put("status", "Enable");
		paramMap.put("isDel", false);
		paramMap.put("uuid", uuid);

		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public static void main(String[] args) {
		ManagerControllerTest mct = new ManagerControllerTest();
		mct.mListTest();
//		System.out.println(RoleEnum.Type.Test.toString());

	}


}
