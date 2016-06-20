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

import com.eeduspace.management.model.OrderQueryModel;
import com.eeduspace.management.persist.dao.VipBuyRecordDao;
import com.eeduspace.management.persist.enumeration.BuyTypeEnum;
import com.eeduspace.management.persist.enumeration.VipEnum.VipPackTypeEnum;
import com.eeduspace.management.persist.po.UserPo;
import com.eeduspace.management.persist.po.VipBuyRecord;
import com.eeduspace.management.service.VipBuyRecordService;
import com.eeduspace.management.util.ExcelExportUtil;
import com.eeduspace.uuims.comm.util.base.DateUtils;
/**
 * @author zhuchaowei
 * 2016年4月19日
 * Description VIP 购买记录
 */
@Service
public class VipBuyRecordServiceImpl implements VipBuyRecordService{
    private static final Logger logger = LoggerFactory.getLogger(VipBuyRecordServiceImpl.class);
    @Inject
    private VipBuyRecordDao vipBuyRecordDao;

	@Override
	public VipBuyRecord save(VipBuyRecord vipBuyRecord) {
		return vipBuyRecordDao.save(vipBuyRecord);
	}

	@Override
	public Page<VipBuyRecord> findByUserCodeAndIsDelAndBuyType(String userCode,boolean isDel,boolean isPay,Pageable pageable) {
		OrderQueryModel orderQueryModel=new OrderQueryModel();
		orderQueryModel.setUserCode(userCode);
		orderQueryModel.setIsDel(isDel);
		orderQueryModel.setIsPay(isPay);
		Specification<VipBuyRecord> specification=getWhereClause(orderQueryModel);
		return vipBuyRecordDao.findAll(specification, pageable);
	}

	@Override
	public VipBuyRecord update(VipBuyRecord vipBuyRecord) {
		return vipBuyRecordDao.save(vipBuyRecord);
	}


	@Override
	public VipBuyRecord findById(Long id) {
		return vipBuyRecordDao.findOne(id);
	}

	@Override
	public VipBuyRecord findByUUID(String uuid) {
		return vipBuyRecordDao.findByUuid(uuid);
	}

	@Override
	public VipBuyRecord deleteByUUID(String uuid) {
		VipBuyRecord vipBuyRecord=this.findByUUID(uuid);
		vipBuyRecord.setDel(true);
		vipBuyRecord=this.save(vipBuyRecord);
		return vipBuyRecord;
	}

	@Override
	public VipBuyRecord findByOrderSn(String orderSn) {
		return vipBuyRecordDao.findByOrderSN(orderSn);
	}

	@Override
	public Page<VipBuyRecord> findAll(OrderQueryModel orderQueryModel, Pageable pageable) {
		Specification<VipBuyRecord> specification=getWhereClause(orderQueryModel);
		return vipBuyRecordDao.findAll(specification, pageable);
	}
	/**
     * 动态生成where语句
     * @param userQueryModel 查询实体
     * @return
     */
    private Specification<VipBuyRecord> getWhereClause(final OrderQueryModel orderQueryModel){
        return new Specification<VipBuyRecord>() {
			@Override
			public Predicate toPredicate(Root<VipBuyRecord> root,
					CriteriaQuery<?> query, CriteriaBuilder cb) {
				   List<Predicate> predicate = new ArrayList<>();
	                if(orderQueryModel.getMobile()!=null){
	                	predicate.add(cb.like(root.get("mobile").as(String.class), "%" + orderQueryModel.getMobile() + "%"));
	                }
	                if(orderQueryModel.getOrderSn()!=null){
	                	predicate.add(cb.like(root.get("orderSN").as(String.class), "%"+orderQueryModel.getOrderSn()+"%"));
	                }
	                if(orderQueryModel.getIsDel()!=null){
	                	predicate.add(cb.equal(root.get("isDel"), orderQueryModel.getIsDel()));
	                }
	                if(orderQueryModel.getIsPay()!=null){
	                	predicate.add(cb.equal(root.get("isPay"), orderQueryModel.getIsPay()));
	                }
	                if(StringUtils.isNotBlank(orderQueryModel.getOrderType())){
	                	predicate.add(cb.equal(root.get("buyType"),BuyTypeEnum.toEnumValue(orderQueryModel.getOrderType())));
	                }
	                if(StringUtils.isNotBlank(orderQueryModel.getStartDate())){
	                	try {
							predicate.add(cb.greaterThanOrEqualTo(root.get("createDate").as(Date.class), DateUtils.parseDate(orderQueryModel.getStartDate(), "yyyy-MM-dd HH:mm:ss")));
						} catch (ParseException e) {
							e.printStackTrace();
						}	                }
	                if(StringUtils.isNotBlank(orderQueryModel.getEndDate())){
	                	try {
	                		Date queryEndDate=DateUtils.parseDate(orderQueryModel.getStartDate(),"yyyy-MM-dd");
	                		queryEndDate=DateUtils.addHour(queryEndDate, 23);
	                		queryEndDate=DateUtils.addMinute(queryEndDate, 59);
	                		queryEndDate=DateUtils.addSecond(queryEndDate, 59);
							predicate.add(cb.lessThanOrEqualTo(root.get("createDate").as(Date.class), queryEndDate));
						} catch (ParseException e) {
							e.printStackTrace();
						}	
	                }
	                Predicate[] pre = new Predicate[predicate.size()];
	                return query.where(predicate.toArray(pre)).getRestriction();
			}
        };
    }

	@Override
	public List<VipBuyRecord> findByUserCodeAndIsPay(String  userCode, boolean isPay,BuyTypeEnum buyTypeEnum) {
		return vipBuyRecordDao.getVipBuyRecords(userCode, isPay,buyTypeEnum);
	}

	@Override
	public List<VipBuyRecord> findByUserCodeAndIsPay(UserPo userPo,
			boolean isPay, BuyTypeEnum buyTypeEnum) {
		return vipBuyRecordDao.findByUserPoAndIsPayAndBuyType(userPo, isPay, buyTypeEnum);
	}

}
