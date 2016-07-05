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
import org.springframework.util.StringUtils;

import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.persist.dao.ManagerPoDao;
import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.enumeration.UserEnum;
import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.service.ManagerService;
import com.google.gson.Gson;

@Service
public class ManagerServiceImpl implements ManagerService {

	private final Logger logger = LoggerFactory.getLogger(ManagerServiceImpl.class);
	private Gson gson = new Gson();


	@Inject
	private ManagerPoDao managerPoDao;

	@Override
	public Page<ManagerModel> getPage(ManagerModel managerModel,Pageable pageable) {
		Specification<ManagerPo> specification = this.getWhereClause(managerModel);
		Page<ManagerPo> managePage= managerPoDao.findAll(specification, pageable);
		logger.debug("数据库返回数据：" + gson.toJson(managePage));
		List<ManagerModel> manageModelList = new ArrayList<>();
		for (ManagerPo mp : managePage.getContent()) {
			manageModelList.add(CIBNManagementConvert.fromManagerPo(mp));
		}
		Page<ManagerModel> managerPage = new PageImpl<ManagerModel>(manageModelList,pageable,managePage.getTotalElements());
		return managerPage;
	}

	@Override
	public ManagerModel getManagerModel(String uuid) {
		ManagerPo po = managerPoDao.findByUuid(uuid);
		logger.debug("数据库返回数据：" + gson.toJson(po));
		return CIBNManagementConvert.fromManagerPo(po);
	}

	@Override
	public ManagerModel saveOrReplaceManager(ManagerModel managerModel) throws Exception {
		ManagerPo managerPo = new ManagerPo();
		ManagerModel model = new ManagerModel();
		if(!StringUtils.isEmpty(managerModel)){
			if (StringUtils.isEmpty(managerModel.getUuid())) {
				managerPo = managerPoDao.save(CIBNManagementConvert.fromManagerModel(managerModel));
			}else {
				managerPo = managerPoDao.findByUuid(managerModel.getUuid());
				if (StringUtils.isEmpty(managerPo)) {
					return null;
				}
				if (!StringUtils.isEmpty(managerModel.getStatus())) {
					managerPo.setStatus(managerModel.getStatus());
				}
				if (!StringUtils.isEmpty(managerModel.getIsFirst())) {
					managerPo.setIsFirst(managerModel.getIsFirst());
				}
				if (!StringUtils.isEmpty(managerModel.getPassword())) {
					managerPo.setPassword(managerModel.getPassword());
				}
				if (!StringUtils.isEmpty(managerModel.getPhone())) {
					managerPo.setPhone(managerModel.getPhone());
				}
				if (!StringUtils.isEmpty(managerModel.getRealName())) {
					managerPo.setRealName(managerModel.getRealName());
				}
				if (!StringUtils.isEmpty(managerModel.getIsDel())) {
					managerPo.setIsDel(managerModel.getIsDel());
				}
				if (!StringUtils.isEmpty(managerModel.getrUuid())) {
					managerPo.setR_uuid(managerModel.getrUuid());
				}
				if (!StringUtils.isEmpty(managerModel.getrName())) {
					managerPo.setR_name(managerModel.getrName());
				}
				if (!StringUtils.isEmpty(managerModel.getType())) {
					managerPo.setType(managerModel.getType());
				}
				managerPo = managerPoDao.save(managerPo);
			}
			model = CIBNManagementConvert.fromManagerPo(managerPo);
			logger.debug("数据库返回数据：" + gson.toJson(model));
			return model;
		}
		return null;
	}

	private Specification<ManagerPo> getWhereClause(final ManagerModel managerModel){
		return new Specification<ManagerPo>() {
			@Override
			public Predicate toPredicate(Root<ManagerPo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> preList= new ArrayList<>();
//				preList.add(cb.equal(root.get("status").as(UserEnum.Status.class), StringUtils.isEmpty(managerModel.getStatus()) ? UserEnum.Status.Enable : managerModel.getStatus()));
				preList.add(cb.isNull(root.get("type").as(RoleEnum.Type.class)));
				if (!StringUtils.isEmpty(managerModel.getQueryName())) {
					preList.add(cb.or(cb.like(root.get("name").as(String.class), "%"+ managerModel.getQueryName() +"%"),(cb.like(root.get("phone").as(String.class), "%"+ managerModel.getQueryName() +"%"))));
				}
				preList.add(cb.equal(root.get("isDel").as(Boolean.class), StringUtils.isEmpty(managerModel.getIsDel()) ? false: managerModel.getIsDel()));
				Predicate[] preArray= new Predicate[preList.size()];
				return query.where(preList.toArray(preArray)).getRestriction();
			}
		};
	}

	@Override
	public Boolean validatePhone(String phone) {
		boolean flag = false;
		ManagerPo managerPo = managerPoDao.findByPhone(phone);
		if (!StringUtils.isEmpty(managerPo)) {
			flag = true;
		}
		return flag;
	}

	@Override
	public Boolean validatePassword(ManagerModel managerModel) {
		ManagerPo managerPo = managerPoDao.findByUuid(managerModel.getUuid());
		String pwdM = "";
		if (!StringUtils.isEmpty(managerModel.getOldPassword())) {
			pwdM = managerModel.getOldPassword();
		}
		if (!StringUtils.isEmpty(managerPo)) {
			String pwdP = managerPo.getPassword();
			if (pwdP.equals(pwdM)) {
				return true;
			}else {
				return false;
			}
		}
		return null;
	}

	@Override
	public ManagerModel getByUserName(String userName) {
		ManagerPo managerPo=managerPoDao.findByName(userName);
		return CIBNManagementConvert.fromManagerPo(managerPo);
	}

	@Override
	public ManagerModel getLoginManager(String userName) {
		ManagerPo managerPo = managerPoDao.findByNameAndStatusAndIsDel(userName, UserEnum.Status.Enable, false);
		return CIBNManagementConvert.fromManagerPo(managerPo);
	}

}
