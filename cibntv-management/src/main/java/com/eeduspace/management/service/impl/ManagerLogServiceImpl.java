package com.eeduspace.management.service.impl;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
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
import com.eeduspace.management.model.ManagerLogModel;
import com.eeduspace.management.persist.dao.ManagerLogDao;
import com.eeduspace.management.persist.po.ManagerLogPo;
import com.eeduspace.management.service.ManagerLogService;
import com.google.gson.Gson;

/**
 * Author: dingran
 * Date: 2015/10/26
 * Description:管理员操作日志管理
 */
@Service
public class ManagerLogServiceImpl implements ManagerLogService {

    private final Logger logger = LoggerFactory.getLogger(ManagerLogServiceImpl.class);
    private Gson gson = new Gson();
    @Inject
    private ManagerLogDao managerLogDao;
   /* @Inject
    private AuthConverter authConverter;*/

    @Override
    public List<ManagerLogPo> findAll() {
        return (List<ManagerLogPo>) managerLogDao.findAll();
    }

    @Override
    public ManagerLogPo save(ManagerLogPo ManagerLogPo) {
        return managerLogDao.save(ManagerLogPo);
    }

    @Override
    public Page<ManagerLogModel> findPage(ManagerLogModel model,Pageable pageable) {
    	Specification<ManagerLogPo> specification = this.getWhereClause(model);
		Page<ManagerLogPo> managePage = managerLogDao.findAll(specification, pageable);
		List<ManagerLogModel> manageModelList = new ArrayList<>();
		for (ManagerLogPo mp : managePage.getContent()) {
			manageModelList.add(CIBNManagementConvert.fromManagerLogPo(mp));
		}
		Page<ManagerLogModel> managerPage = new PageImpl<ManagerLogModel>(manageModelList,pageable,managePage.getTotalElements());
		logger.debug("数据库返回数据：" + gson.toJson(managerPage));
		return managerPage;
    }
    private Specification<ManagerLogPo> getWhereClause(final ManagerLogModel managerModel){
		return new Specification<ManagerLogPo>() {
			@Override
			public Predicate toPredicate(Root<ManagerLogPo> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> preList= new ArrayList<>();
				if (!StringUtils.isEmpty(managerModel.getQueryName())) {
					preList.add(cb.like(root.get("module").as(String.class), "%"+ managerModel.getQueryName() +"%"));
				}
//				preList.add(cb.equal(root.get("isDel").as(Boolean.class), StringUtils.isEmpty(managerModel.getIsDel()) ? false: managerModel.getIsDel()));
				Predicate[] preArray= new Predicate[preList.size()];
				return query.where(preList.toArray(preArray)).getRestriction();
			}
		};
	}

	
}
