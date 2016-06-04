package com.eeduspace.management.service.impl;

import java.text.ParseException;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.inject.Inject;
import javax.persistence.EntityManagerFactory;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Path;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.eeduspace.management.persist.dao.ManagerLogDao;
import com.eeduspace.management.persist.po.ManagerLogPo;
import com.eeduspace.management.persist.po.ManagerPo;
import com.eeduspace.management.service.ManagerLogService;
import com.eeduspace.management.util.ServiceHelper;
import com.eeduspace.uuims.comm.util.base.DateUtils;

/**
 * Author: dingran
 * Date: 2015/10/26
 * Description:管理员操作日志管理
 */
@Service
public class ManagerLogServiceImpl implements ManagerLogService {

    private final Logger logger = LoggerFactory.getLogger(ManagerLogServiceImpl.class);
    @Resource(name = "entityManagerFactory")
    private EntityManagerFactory emf;
    @Inject
    private ManagerLogDao managerLogDao;
   /* @Inject
    private AuthConverter authConverter;*/

    @Override
    public List<ManagerLogPo> findAll() {
        return (List<ManagerLogPo>) managerLogDao.findAll();
    }

    @Override
    public ManagerLogPo findOne(Long logId) {
        return managerLogDao.findOne(logId);
    }

    @Override
    public ManagerLogPo save(ManagerLogPo ManagerLogPo) {
        return managerLogDao.save(ManagerLogPo);
    }

    @Override
    public ManagerLogPo create(Long managerId, String action,String module, Boolean result,Long productId,String sourceIp,String sourceEquipment,String requestId) {
        ManagerLogPo managerLogPo=new ManagerLogPo();
        managerLogPo.setManagerId(managerId);
        managerLogPo.setAction(action);
        managerLogPo.setResult(result);
        managerLogPo.setModule(module);
        managerLogPo.setRequestId(requestId);
        return managerLogDao.save(managerLogPo);
    }

    @Override
    public ManagerLogPo create(ManagerPo managerPo, String id, String action, String module, Boolean result, String sourceIp, String sourceEquipment,String requestId) {

        try {
            if(managerPo!=null){
                ManagerLogPo managerLogPo=new ManagerLogPo();
                managerLogPo.setManagerId(managerPo.getId());
                managerLogPo.setAction(action);
                managerLogPo.setResult(result);
                managerLogPo.setModule(module);
                managerLogPo.setRequestId(requestId);
                if(id!=null){
                    managerLogPo.setResourceId(id);
                }
                return managerLogDao.save(managerLogPo);
            }
        }catch (Exception e){
            logger.error("create manager logs error:{}",e);
        }

        return null;
    }

    @Override
    public void delete(Long id) {
        managerLogDao.delete(id);
    }

    @Override
    public Page<ManagerLogPo> findPage(final ManagerPo managerPo,final String type, final String keyword,final String param,final String sort, Pageable pageable) {
        return managerLogDao.findAll(new Specification<ManagerLogPo>() {
            public Predicate toPredicate(Root<ManagerLogPo> root, CriteriaQuery<?> query, CriteriaBuilder builder) {
                if(managerPo==null){
                    return null;
                }
               /* Predicate managerIdP = null;
                if(managerPo.getRolePo().getType().equals(RoleEnum.Type.Ordinary)){
                    managerIdP = builder.and(builder.equal(root.get("managerId"), managerPo.getId()));
                }*/

                Predicate predicate = null;
                if ("createDate".equals(type)) {
                    Path<Date> createTime = root.get("createDate");
                    Date beginTime = null;
                    Date endTime = null;
                    if (StringUtils.isNotBlank(keyword) && keyword.contains("|")) {
                        try {
                            String [] keyArr = keyword.split("\\|");
                            if(keyArr.length > 0) {
                                if (keyword.startsWith("|")) {
                                    endTime = DateUtils.parseDate(keyword.substring(1, keyword.length()), DateUtils.DATE_FORMAT_DATETIME);
                                } else if (keyword.endsWith("|")) {
                                    beginTime = DateUtils.parseDate(keyword.substring(0, keyword.length() - 1), DateUtils.DATE_FORMAT_DATEONLY);
                                } else if (keyArr.length == 2) {
                                    if (StringUtils.isNotBlank(keyArr[0]))
                                        beginTime = DateUtils.parseDate(keyArr[0], DateUtils.DATE_FORMAT_DATEONLY);
                                    if (StringUtils.isNotBlank(keyArr[1]))
                                        endTime = DateUtils.parseDate(keyArr[1], DateUtils.DATE_FORMAT_DATETIME);
                                }
                            }
                        } catch (ParseException e) {
                            e.printStackTrace();
                        }
                    }
                    if(beginTime != null && endTime != null){
                        predicate = builder.or(builder.between(createTime, beginTime, endTime));
                    }else if(beginTime != null){
                        predicate = builder.or(builder.greaterThanOrEqualTo(createTime, beginTime));
                    }else if(endTime != null){
                        predicate = builder.or(builder.lessThanOrEqualTo(createTime, endTime));
                    }
                }
                if(null != predicate){
                    query.where(predicate);
                }
                //执行排序
                ServiceHelper.sortQuery(root, query, builder, param, sort);
                return null;
            }
        }, pageable);
    }


	
}
