package com.eeduspace.management.persist.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.ManagerPo;

public interface ManagerPoDao extends CrudRepository<ManagerPo, Long>{
	
	Page<ManagerPo> findAll(Pageable pageable);
	
	Page<ManagerPo> findByStatus(int status,Pageable pageable);
	
	ManagerPo findByUuid(String uuid);
	//暂时不用
	@Modifying
	@Query("update ManagerPo m set m.status = ?1 where m.uuid = ?2")
	ManagerPo updateManager(int status,String uuid);
	
	
}
