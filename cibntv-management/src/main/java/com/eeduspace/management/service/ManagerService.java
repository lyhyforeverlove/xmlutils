package com.eeduspace.management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.model.ManagerModel;



public interface ManagerService {
	
	/** 管理员分页查询
	 * @param status  管理员状态 0：未激活（NoActive）1：禁用（Disable）2：启用（Enable）3：已删除（IsDelete） 
	 * @param pageable  分页类
	 * @return
	 */
	public Page<ManagerModel> getPage(String status,Pageable pageable);
	
	/** 查询管理员详情
	 * @param uuid  管理员uuid
	 * @return
	 */
	public ManagerModel getManagerModel(String uuid);
	
	/** 修改管理员状态
	 * @param managerModel  管理员模型
	 * @return
	 */
	public ManagerModel saveOrReplaceManager(ManagerModel managerModel);

}
