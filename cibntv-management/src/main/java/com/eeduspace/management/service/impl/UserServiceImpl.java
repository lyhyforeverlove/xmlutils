package com.eeduspace.management.service.impl;

import java.io.IOException;
import java.io.OutputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang3.StringUtils;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.eeduspace.management.model.UserQueryModel;
import com.eeduspace.management.persist.dao.UserDao;
import com.eeduspace.management.persist.po.UserPo;
import com.eeduspace.management.service.UserService;
import com.eeduspace.management.util.ExcelExportUtil;
import com.eeduspace.uuims.comm.util.base.DateUtils;

/**
 * Author: dingran
 * Date: 2016/4/19
 * Description:
 */
@Service
public class UserServiceImpl implements UserService{
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Inject
    private UserDao userDao;

    @Override
    public UserPo findByUserCode(String userCode) {
        return userDao.findByUserCode(userCode);
    }

    @Override
    public UserPo findLoginUser(String user, String password) {
        return userDao.findLoginUser(user,user,user,password);
    }

    @Override
	public UserPo save(UserPo userPo) {
		return userDao.save(userPo);
	}

	@Override
	public UserPo findOne(Long userId) {
		return userDao.findOne(userId);
	}

	@Override
	public UserPo findByMobile(String mobile) {
		return userDao.findByMobile(mobile);
	}

	@Override
	public UserPo changeBlacklist(String userCode, Boolean isBlacklist) {
		UserPo  userPo=this.findByUserCode(userCode);
		if(userPo==null){
			return userPo;
		}
		userPo.setBlacklist(isBlacklist);
		this.save(userPo);
		return userPo;
	}

	@Override
	public Page<UserPo> findAll(Pageable pageable,UserQueryModel userQueryModel) {
		Specification<UserPo> specification=getWhereClause(userQueryModel);
		Page<UserPo> userList=userDao.findAll(specification, pageable);
		return userList;
	}
	
	
	/**
     * 动态生成where语句
     * @param userQueryModel 查询实体
     * @return
     */
    private Specification<UserPo> getWhereClause(final UserQueryModel userQueryModel){
        return new Specification<UserPo>() {
			@Override
			public Predicate toPredicate(Root<UserPo> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				List<Predicate> predicate = new ArrayList<>();
				if (userQueryModel.getMobile() != null) {
					predicate.add(cb.like(root.get("mobile").as(String.class),
							"%" + userQueryModel.getMobile() + "%"));
				}
				if (userQueryModel.getIsBlacklist() != null) {
					predicate.add(cb.equal(root.get("isBlacklist"),userQueryModel.getIsBlacklist()));
				}
				if (StringUtils.isNotBlank(userQueryModel.getStartDate())) {
					try {
						predicate.add(cb.greaterThanOrEqualTo(root.get("createDate").as(Date.class),DateUtils.parseDate(userQueryModel.getStartDate(),"yyyy-MM-dd")));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
				if (StringUtils.isNotBlank(userQueryModel.getEndDate())) {
					try {
						Date endDate=DateUtils.parseDate(userQueryModel.getStartDate(),"yyyy-MM-dd");
						endDate=DateUtils.addHour(endDate, 23);
						endDate=DateUtils.addMinute(endDate, 59);
						endDate=DateUtils.addSecond(endDate, 59);
						predicate.add(cb.lessThanOrEqualTo(root.get("createDate").as(Date.class),endDate));
					} catch (ParseException e) {
						e.printStackTrace();
					}
				}
				Predicate[] pre = new Predicate[predicate.size()];
				return query.where(predicate.toArray(pre)).getRestriction();
			}
		};
    }

}
