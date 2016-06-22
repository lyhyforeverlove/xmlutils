package com.eeduspace.management.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.eeduspace.management.model.ManagerModel;



public interface ManagerService {
	
	/** 管理员分页查询
	 * @param managerModel  管理员model 
	 * @param pageable  分页类
	 * @return
	 */
	public Page<ManagerModel> getPage(ManagerModel managerModel,Pageable pageable);
	
	/** 查询管理员详情
	 * @param uuid  管理员uuid
	 * @return
	 */
	public ManagerModel getManagerModel(String uuid);
	
	/** 新增或更新信息
	 * @param managerModel  管理员模型
	 * @return
	 */
	public ManagerModel saveOrReplaceManager(ManagerModel managerModel);
	
	/**管理员操作日志
	 * 
	 */
	public void logSave();
	
	/**查询日志
	 * 
	 */
	public void getLogs();
	
	/**验证手机号是否唯一
	 * @param phone
	 * @return
	 */
	public Boolean validatePhone(String phone);
	
	/**密码是否是旧密码；新密码是否与旧密码相同
	 * @param phone
	 * @return
	 */
	public Boolean validatePassword(ManagerModel managerModel);
	/**
	 * 获取用户信息
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年6月14日 下午5:06:48
	 * @param userName
	 * @return
	 */
	public ManagerModel getByUserName(String userName);
	
}
