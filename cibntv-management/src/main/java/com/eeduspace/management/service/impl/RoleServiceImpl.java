package com.eeduspace.management.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.PermissionModel;
import com.eeduspace.management.model.RoleModel;
import com.eeduspace.management.persist.dao.PermissionAndRolePoDao;
import com.eeduspace.management.persist.dao.PermissionPoDao;
import com.eeduspace.management.persist.dao.RolePoDao;
import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;
import com.eeduspace.management.persist.po.PermissionAndRolePo;
import com.eeduspace.management.persist.po.PermissionPo;
import com.eeduspace.management.persist.po.RolePo;
import com.eeduspace.management.service.RoleService;
import com.google.gson.Gson;

@Service
@Transactional
public class RoleServiceImpl implements RoleService {
	
	private final Logger logger = LoggerFactory.getLogger(ManagerServiceImpl.class);
	private Gson gson = new Gson();
	
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
			roleModel.setType(RoleEnum.Type.Test.toString());
		}
		RolePo rolePo = CIBNManagementConvert.fromRoleModel(roleModel);
		rolePo.setStatus(Status.Enable);
		RoleModel roleModel2 = new RoleModel();
		List<PermissionModel> permissionModels = roleModel.getPermissionModels();
		if (permissionModels.size() > 0) {
			RolePo rp = rolePoDao.save(rolePo);
			if (StringUtils.isEmpty(rp)) {
				return null;
			}
			for (PermissionModel pm : permissionModels) {
				PermissionAndRolePo permissionAndRolePo = new PermissionAndRolePo();
				permissionAndRolePo.setP_uuid(pm.getUuid());
				permissionAndRolePo.setR_uuid(rp.getR_uuid());
				permissionAndRolePoDao.save(permissionAndRolePo);
			}
			roleModel2= CIBNManagementConvert.fromRolePo(rp);
		}
		return roleModel2;
	}

	@Override
	public RoleModel getRoleModel(String uuid,String status) {
		if (StringUtils.isEmpty(status)) {
			status = RoleEnum.Status.Enable.toString();
		}
		RoleModel roleModel = new RoleModel();
		RolePo rolePo = rolePoDao.findByR_uuidAndStatus(uuid, Status.valueOf(status));
		List<PermissionPo> permissionPos = permissionPoDao.findByP_uuidAndStatus(uuid, Status.valueOf(status));
		roleModel = CIBNManagementConvert.fromRolePo(rolePo);
		roleModel.setPermissionModels(CIBNManagementConvert.fromPermissionPos(permissionPos));
		return roleModel;
	}

	@Override
	public Page<RoleModel> getPage(RoleModel roleModel, Pageable pageable) {
		
		Specification<RolePo> specification = this.getWhereClause(roleModel);
		Page<RolePo> rolePage= rolePoDao.findAll(specification, pageable);
		logger.debug("数据库返回数据：" + gson.toJson(rolePage));
		List<RoleModel> roleModelList = new ArrayList<>();
		for (RolePo rp : rolePage.getContent()) {
			roleModelList.add(CIBNManagementConvert.fromRolePo(rp));
		}
		Page<RoleModel> roleModelPage = new PageImpl<RoleModel>(roleModelList,pageable,rolePage.getTotalElements());
		return roleModelPage;
		
	}
	
	private Specification<RolePo> getWhereClause(final RoleModel roleModel){
		return new Specification<RolePo>() {
			@Override
			public Predicate toPredicate(Root<RolePo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> preList= new ArrayList<>();
				if (!StringUtils.isEmpty(roleModel.getQueryName())) {
					preList.add(cb.like(root.get("r_name").as(String.class), "%"+ roleModel.getQueryName() +"%"));
				}
				Predicate[] preArray= new Predicate[preList.size()];
				return query.where(preList.toArray(preArray)).getRestriction();
			}
		};
	}
	
	
	
}
