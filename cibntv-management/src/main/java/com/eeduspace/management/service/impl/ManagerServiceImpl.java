package com.eeduspace.management.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;







import com.eeduspace.management.convert.CIBNManagementConvert;
import com.eeduspace.management.model.ManagerModel;
import com.eeduspace.management.persist.dao.ManagerAndRolePoDao;
import com.eeduspace.management.persist.dao.ManagerPoDao;
import com.eeduspace.management.persist.po.ManagerAndRolePo;
import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.service.ManagerService;

@Service
public class ManagerServiceImpl implements ManagerService {
	
	private final Logger logger = LoggerFactory.getLogger(ManagerServiceImpl.class);
	
	@Inject
	private ManagerPoDao managerPoDao;
	@Inject
	private ManagerAndRolePoDao managerAndRolePoDao;

	@Override
	public Page<ManagerModel> getPage(String status, Pageable pageable) {
		List<ManagerModel> managerModels = new ArrayList<ManagerModel>();
		List<ManagerPo> managerPos = new ArrayList<ManagerPo>();
		Page<ManagerPo> managerPoPage = null;
		if (StringUtils.isEmpty(status)) {
			managerPoPage = managerPoDao.findAll(pageable);
			managerPos = managerPoPage.getContent();
		}else {
			managerPoPage = managerPoDao.findByStatus(Integer.valueOf(status), pageable);
			managerPos = managerPoPage.getContent();
		}
		if(managerPos.size() > 0){
			for (ManagerPo mPo : managerPoPage) {
				managerModels.add(CIBNManagementConvert.fromManagerPo(mPo));
			}
		}
		Page<ManagerModel> managerPage = new PageImpl<ManagerModel>(managerModels,pageable,managerPoPage.getTotalElements());
		return managerPage;
	}

	@Override
	public ManagerModel getManagerModel(String uuid) {
		return CIBNManagementConvert.fromManagerPo(managerPoDao.findByUuid(uuid));
	}

	@Override
	public ManagerModel saveOrReplaceManager(ManagerModel managerModel) {
		ManagerPo managerPo = new ManagerPo();
		if(!StringUtils.isEmpty(managerModel)){
			managerPo = managerPoDao.findByUuid(managerModel.getUuid());
			if(StringUtils.isEmpty(managerPo)){
				managerPoDao.save(CIBNManagementConvert.fromManagerModel(managerModel));
				ManagerAndRolePo managerAndRolePo = new ManagerAndRolePo();
				managerAndRolePo.setManagerUuid(managerModel.getUuid());
				
				managerAndRolePoDao.save(managerAndRolePo);
				
			}else{
				managerPo.setStatus(managerModel.getStatus());
				managerPoDao.save(managerPo);
			}
		}
		return managerModel;
	}


}
