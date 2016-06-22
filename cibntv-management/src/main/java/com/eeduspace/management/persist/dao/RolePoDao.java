package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.po.RolePo;

public interface RolePoDao extends CrudRepository<RolePo, Long>{
	
	Page<RolePo> findAll(Specification<RolePo> specification,Pageable pageable);
	
	Page<RolePo> findByStatus(RoleEnum.Status status,Pageable pageable);
	
	List<RolePo> findByStatus(RoleEnum.Status status);
	
	@Query("SELECT c FROM RolePo c WHERE c.r_uuid =?1 AND c.status =?2 ")
	RolePo findByR_uuidAndStatus(String uuid,RoleEnum.Status status);
	
	
}
