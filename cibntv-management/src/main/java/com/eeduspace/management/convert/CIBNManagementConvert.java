package com.eeduspace.management.convert;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.eeduspace.management.model.ManagementModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.persist.po.RolePo;


/**
 * Author: dingran
 * Date: 2016/4/20
 * Description: model与实体转换
 */

public class CIBNManagementConvert {
	//    private static final Logger logger = LoggerFactory.getLogger(CIBNManagementConvert.class);

	public static ManagementModel fromManagerPo(ManagerPo managerPo){
		ManagementModel mm = new ManagementModel();

		return mm;
	}
	public static ManagerPo fromManagerModel(ManagementModel managementModel){
		ManagerPo po = new ManagerPo();

		return po;
	}
	public static RoleModel fromRolePo(RolePo rolePo){
		RoleModel roleModel = new RoleModel();

		return roleModel;
	}
	public static RolePo fromRoleModel(RoleModel roleModel){
		RolePo rolePo = new RolePo();
		
		return rolePo;
	}

}
