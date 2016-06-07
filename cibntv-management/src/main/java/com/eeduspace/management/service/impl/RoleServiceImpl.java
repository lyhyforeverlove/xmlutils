package com.eeduspace.management.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.dao.PermissionAndRolePoDao;
import com.eeduspace.management.persist.dao.PermissionPoDao;
import com.eeduspace.management.persist.dao.RolePoDao;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.management.persist.enumeration.RoleEnum.Type;
import com.eeduspace.management.persist.po.PermissionAndRolePo;
import com.eeduspace.management.persist.po.PermissionPo;
import com.eeduspace.management.persist.po.RolePo;
import com.eeduspace.management.service.RoleService;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
	
	@Inject
	private RolePoDao rolePoDao;
	@Inject
	private PermissionAndRolePoDao permissionAndRolePoDao;
	@Inject
	private PermissionPoDao permissionPoDao;
	

	@Override
	public List<RoleModel> getRoleModels(String status) {
		List<RolePo> rolePos = new ArrayList<RolePo>();
		List<RoleModel> roleModels = new ArrayList<RoleModel>();
		if(StringUtils.isEmpty(status)){
			rolePos = (List<RolePo>) rolePoDao.findAll();
		}else {
			rolePos = rolePoDao.findByStatus(Status.valueOf(status));
		}
		roleModels = CIBNManagementConvert.fromRolePos(rolePos);
		
		return roleModels;
	}
	
	@Override
	public RoleModel saveModel(RoleModel roleModel) {
		if (StringUtils.isEmpty(roleModel)) {
			return null;
		}
		if (StringUtils.isEmpty(roleModel.getType())) {
			roleModel.setType(String.valueOf(Type.Test));
		}
		RolePo rolePo = CIBNManagementConvert.fromRoleModel(roleModel);
		rolePo.setStatus(Status.Enable);
		RolePo rp = rolePoDao.save(rolePo);
		if (StringUtils.isEmpty(rp)) {
			return null;
		}
		List<PermissionModel> permissionModels = roleModel.getPermissionModels();
		List<PermissionPo> permissionPos = new ArrayList<PermissionPo>();
		if (permissionModels.size() > 0) {
			for (PermissionModel pm : permissionModels) {
				PermissionAndRolePo permissionAndRolePo = new PermissionAndRolePo();
				permissionAndRolePo.setP_uuid(pm.getUuid());
				permissionAndRolePo.setR_uuid(rp.getR_uuid());
				permissionAndRolePoDao.save(permissionAndRolePo);
			}
		}
		RoleModel roleModel2= CIBNManagementConvert.fromRolePo(rp);
		roleModel2.setPermissionModels(CIBNManagementConvert.fromPermissionPos(permissionPos));
		return roleModel2;
	}

	@Override
	public RoleModel getRoleModel(String uuid,String status) {
		if (StringUtils.isEmpty(uuid)) {
			return null;
		}
		if (StringUtils.isEmpty(status)) {
			status = "Enable";
		}
		RoleModel roleModel = new RoleModel();
		RolePo rolePo = rolePoDao.findByR_uuidAndStatus(uuid, Status.valueOf(status));
		List<PermissionPo> permissionPos = permissionPoDao.findByP_uuidAndStatus(uuid, Status.valueOf(status));
		roleModel = CIBNManagementConvert.fromRolePo(rolePo);
		roleModel.setPermissionModels(CIBNManagementConvert.fromPermissionPos(permissionPos));
		return roleModel;
	}
	
	
	
}
