package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.RolePo;

public interface RolePoDao extends CrudRepository<RolePo, Long>{
	
	Page<RolePo> findAll(Pageable pageable);
	
	Page<RolePo> findByStatus(int status,Pageable pageable);
	
	List<RolePo> findByStatus(int status);
}
