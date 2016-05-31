package com.eeduspace.management.persist.dao;

import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.persist.po.RolePo;

public interface RolePoDao extends CrudRepository<RolePo, Long>{

}
