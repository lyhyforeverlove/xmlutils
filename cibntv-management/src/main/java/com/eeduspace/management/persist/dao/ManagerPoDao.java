package com.eeduspace.management.persist.dao;

import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.po.ManagerPo;

public interface ManagerPoDao extends CrudRepository<ManagerPo, Long>,JpaSpecificationExecutor<ManagerPo>{
	//删除操作，查询过滤到删除标识
	
	
	
	ManagerPo findByUuid(String uuid);
	ManagerPo findByName(String name);
	ManagerPo findByPhone(String phone);
	//暂时不用
	@Modifying
	@Query("update ManagerPo m set m.status = ?1 where m.uuid = ?2")
	ManagerPo updateManager(RoleEnum.Status status,String uuid);
	
	
}
