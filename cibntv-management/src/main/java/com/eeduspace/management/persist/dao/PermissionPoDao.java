package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.po.PermissionPo;

public interface PermissionPoDao extends CrudRepository<PermissionPo, Long>{
	
	List<PermissionPo> findByStatus(RoleEnum.Status status);
	
	@Query("SELECT cp FROM PermissionPo cp ,PermissionAndRolePo cpr WHERE cp.p_uuid=cpr.p_uuid AND cpr.r_uuid = ?1 AND cp.status = ?2")
	List<PermissionPo> findByP_uuidAndStatus(String r_uuid,RoleEnum.Status status);
	
}
