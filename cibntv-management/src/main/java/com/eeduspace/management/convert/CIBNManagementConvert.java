package com.eeduspace.management.convert;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.eeduspace.management.model.ManagerModel;
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

	public static ManagerModel fromManagerPo(ManagerPo managerPo){
		ManagerModel mm = new ManagerModel();

		return mm;
	}
	public static ManagerPo fromManagerModel(ManagerModel managerModel){
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
