package com.eeduspace.management.persist.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.ManagerPo;

public interface ManagementPoDao extends CrudRepository<ManagerPo, Long>{
	
	Page<ManagerPo> findByStatusPage(int status,Pageable pageable);
	
	ManagerPo findByStatus();
}
