package com.eeduspace.management.controllerTest.roleTest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.dao.PermissionPoDao;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class RoleControllerTest extends BaseTest {

	@Inject
	private PermissionPoDao permissionPoDao;


	@Test
	public void roleList(){
		String url = "http://localhost:8070/cibntv-management/action/role/roleList";
		Map<String, Object> paramMap = new HashMap<>();
		//		paramMap.put("status", "");
		paramMap.put("currentPage", 1);
		//		paramMap.put("size",10);
		//		paramMap.put("queryName", "管理");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回数据为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@Test
	public void roleDetail(){
		String url = "http://localhost:8070/cibntv-management/action/role/roleDetail";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("uuid", "c601bee5a61e457fa2df485fe4f0f2eb");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回数据为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@Test
	public void roleSave(){
		String url = "http://localhost:8070/cibntv-management/action/role/roleSave";
		String[] ids = {"5b2f2de6152c4619b0a14204bbaf6a7a","98ec614925ab42f989ae3e15103d3aa5"};
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("ids", ids);
		paramMap.put("name", "测试订单");
		//		paramMap.put("type", "");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回数据为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	@Test
	public void roleSkip(){
		String url = "http://localhost:8070/cibntv-management/action/role/roleSkip";
		Map<String, Object> paramMap = new HashMap<>();
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回数据为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}


	//-- 管理员操作 开始--//
	//跳转
	@Test
	public void mSkipTest(){
		String url = "http://localhost:8070/cibntv-management/action/role/manageSkip";
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
		String url = "http://localhost:8070/cibntv-management/action/role/manageSave";
		RoleModel roleModel = new RoleModel();
		String name = "testuser1";
		String password = "123456";
		roleModel.setName("测试用户");
		roleModel.setUuid("a2c2e236a57f492db408fcfbb136474f");
		//			roleModel.setType(RoleEnum.Type.CIBNTV.toString());
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("name", name);
		paramMap.put("password", password);
		paramMap.put("rName", roleModel.getName());
		paramMap.put("rUuid", roleModel.getUuid());
		//			paramMap.put("type", roleModel.getType());
		//			paramMap.put("createManagerId", 123123465);


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
		String url = "http://localhost:8070/cibntv-management/action/role/manageList";
		Map<String, Object> paramMap = new HashMap<>();
		ManagerModel managerModel = new ManagerModel();
		managerModel.setCurrentPage(1);
		managerModel.setSize(10);
		//			managerModel.setQueryName("an");
		paramMap.put("currentPage", managerModel.getCurrentPage());
		//			paramMap.put("size", managerModel.getSize());
		//			paramMap.put("queryName", managerModel.getQueryName());
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	//修改:角色；状态（停用，启用）；删除状态；
	@Test
	public void mUpdateTest(){
		String url = "http://localhost:8070/cibntv-management/action/role/manageReplace";
		RoleModel roleModel = new RoleModel();
		String uuid = "3ffb2fc5e9234172a782b4490297c331";
		roleModel.setName("客服管理");
		roleModel.setUuid("b7a5c3106a144267843422de85bf34aa");
		//			roleModel.setType(RoleEnum.Type.CustomerService.toString());
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("rName", roleModel.getName());
		paramMap.put("rUuid", roleModel.getUuid());
		paramMap.put("uuid", uuid);
		//			paramMap.put("status", "Enable");
		//			paramMap.put("isDel", false);

		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}
	//-- 管理员操作 结束--//


	@Test
	public void logList(){
		String url = "http://localhost:8070/cibntv-management/action/role/manageLog";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("currentPage", 1);
		paramMap.put("queryName", "admin");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回数据为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	@Test
	public void permissionSave(){
		PermissionModel pm1= new PermissionModel("用户管理", "managerControl", Status.Enable, "/action/manager");
		PermissionModel pm2= new PermissionModel("订单管理", "OrderControl", Status.Enable, "/action/vip_order");
		PermissionModel pm3= new PermissionModel("VIP管理", "vipControl", Status.Enable, "/action/vip_pack");
		PermissionModel pm4= new PermissionModel("试卷管理", "paperControl", Status.Enable, "/action/paper");
		PermissionModel pm5= new PermissionModel("视频管理", "videoControl", Status.Enable, "/action/video");
		PermissionModel pm6= new PermissionModel("权限管理", "roleControl", Status.Enable, "/action/role");
		PermissionModel pm7= new PermissionModel("测试管理", "testControl", Status.Enable, "/action/test");
		List<PermissionModel> pModels = new ArrayList<>();
		pModels.add(pm1);
		pModels.add(pm2);
		pModels.add(pm3);
		pModels.add(pm4);
		pModels.add(pm5);
		pModels.add(pm6);
		pModels.add(pm7);
		for (PermissionModel pm : pModels) {
			permissionPoDao.save(CIBNManagementConvert.fromPermissionModel(pm));
		}

	}

	public static void main(String[] args) {
		RoleControllerTest rct = new RoleControllerTest();
		rct.logList();


	}

}
