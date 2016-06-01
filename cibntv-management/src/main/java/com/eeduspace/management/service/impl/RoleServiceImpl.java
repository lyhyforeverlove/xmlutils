package com.eeduspace.management.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.dao.RolePoDao;
import com.eeduspace.management.persist.po.RolePo;
import com.eeduspace.management.service.RoleService;

@Service
public class RoleServiceImpl implements RoleService {
	
	@Inject
	private RolePoDao rolePoDao;

	@Override
	public List<RoleModel> getRoleModels(String status) {
		List<RolePo> rolePos = new ArrayList<RolePo>();
		if(StringUtils.isEmpty(status)){
			rolePos = (List<RolePo>) rolePoDao.findAll();
		}else {
			rolePos = rolePoDao.findByStatus(Integer.valueOf(status));
		}
		return CIBNManagementConvert.fromRolePos(rolePos);
	}

	@Override
	public RoleModel saveModel(RoleModel roleModel) {
		if (StringUtils.isEmpty(roleModel)) {
			return null;
		}
		RolePo rolePo = CIBNManagementConvert.fromRoleModel(roleModel);
		RolePo rp = rolePoDao.save(rolePo);
		if (StringUtils.isEmpty(rp)) {
			return null;
		}
		return roleModel;
	}
	
}
