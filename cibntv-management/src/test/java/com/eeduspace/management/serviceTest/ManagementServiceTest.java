package com.eeduspace.management.serviceTest;

import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.persist.dao.PermissionPoDao;
import com.eeduspace.management.persist.dao.RolePoDao;
import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.management.persist.po.PermissionPo;
import com.eeduspace.management.persist.po.RolePo;
import com.eeduspace.management.service.ManagerService;
import com.eeduspace.management.service.RoleService;

public class ManagementServiceTest extends BaseTest {
	
	@Inject
	private ManagerService managerService;
	@Inject
	private RoleService roleService;
	@Inject
	private RolePoDao rolePoDao;
	@Inject
	private PermissionPoDao permissionPoDao;
	
	@Resource(name = "entityManagerFactory")
    private EntityManagerFactory factory;
	
	@Test
	public void managementTest(){
		System.out.println("测试~~~");
	}
	
	@Test
	public void roleTest(){
		RolePo rolePo = new RolePo();
		rolePo.setDescription("测试");
		rolePo.setR_name("测试");
		rolePo.setStatus(RoleEnum.Status.Enable);
		rolePo.setType(RoleEnum.Type.Test);
		List<PermissionPo> pplList = permissionPoDao.findByStatus(Status.valueOf("Enable"));
		System.out.println(rolePo.getR_name()+":"+rolePo.getStatus()+":"+rolePo.getType());
		rolePoDao.save(rolePo);
	}
	
	@Test
	public void permissionTest(){
		PermissionPo po = new PermissionPo();
		po.setP_name("test1");
		po.setStatus(RoleEnum.Status.Enable);
		po.setType(RoleEnum.PermissionType.Test);
		permissionPoDao.save(po);
		/*List<PermissionPo> pplList = permissionPoDao.findByStatus(Status.valueOf("Enable"));
		for (PermissionPo pp : pplList) {
			System.out.println(pp.getP_uuid()+":"+pp.getP_name()+":"+pp.getType());
		}*/
		
//		List<PermissionPo> pList = permissionPoDao.findByP_uuidAndStatus("b0fcaf7eeca943e69611a0c6c108931c", Status.valueOf("Enable"));
//		RoleModel pList = roleService.getRoleModel("8592a00a8c6c421bad398356a5fc7197", "Enable");
//		System.out.println(pList.getUuid());
//		for (PermissionModel pp : pList.getPermissionModels()) {
//			System.out.println(pp.getUuid()+":"+pp.getName()+":"+pp.getType());
//		}
		
	}
	
	
	public static void main(String[] args) {
		ManagementServiceTest mst = new ManagementServiceTest();
		mst.permissionTest();
		
	}
}
