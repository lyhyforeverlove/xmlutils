package com.eeduspace.management.service;

import java.util.List;

import com.eeduspace.management.model.PermissionModel;

/**权限接口
 * @author songwei
 *
 */
public interface PermissionService {
	
	/**查询权限列表，无分页
	 * @return 
	 */
	List<PermissionModel> getPermissionModels(String status);
}
