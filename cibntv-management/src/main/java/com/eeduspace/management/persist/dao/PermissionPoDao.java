package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.PermissionPo;

public interface PermissionPoDao extends CrudRepository<PermissionPo, Long>{
	
	List<PermissionPo> findByStatus(int status);
}
