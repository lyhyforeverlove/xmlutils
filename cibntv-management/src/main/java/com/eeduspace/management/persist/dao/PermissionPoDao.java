package com.eeduspace.management.persist.dao;

import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.persist.po.PermissionPo;

public interface PermissionPoDao extends CrudRepository<PermissionPo, Long>{

}
