package com.eeduspace.management.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.model.RoleModel;

/**角色接口
 * @author songwei
 *
 */
public interface RoleService {
	
	/**查询角色列表：无分页
	 * @param status
	 * @return
	 */
	List<RoleModel> getRoleModels(String status);
	
	/**查询角色列表：有分页
	 * @param status
	 * @return
	 */
	Page<RoleModel> getPage(RoleModel managerModel,Pageable pageable);
	
	
	/**增加角色,同时增加权限uuid到关联表
	 * @param roleModel
	 * @return
	 */
	RoleModel saveModel(RoleModel roleModel);
	
	/**查询角色对象Model带有权限列表
	 * @param status
	 * @return
	 */
	RoleModel getRoleModel(String uuid,String status);
	
}