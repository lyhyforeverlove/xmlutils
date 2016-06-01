package com.eeduspace.management.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.persist.dao.PermissionPoDao;
import com.eeduspace.management.persist.po.PermissionPo;
import com.eeduspace.management.service.PermissionService;

@Service
public class PermissionServiceImpl implements PermissionService {
	
	@Inject
	private PermissionPoDao permissionPoDao;
	
	@Override
	public List<PermissionModel> getPermissionModels(String status) {
		List<PermissionPo> permissionPos = new ArrayList<PermissionPo>();
		if(StringUtils.isEmpty(status)){
			permissionPos = (List<PermissionPo>) permissionPoDao.findAll();
		}else {
			permissionPoDao.findByStatus(Integer.valueOf(status));
		}
		return CIBNManagementConvert.fromPermissionPos(permissionPos);
	}

}
