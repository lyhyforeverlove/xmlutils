package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eeduspace.management.persist.enumeration.BuyTypeEnum;
import com.eeduspace.management.persist.po.UserPo;
import com.eeduspace.management.persist.po.VipBuyRecord;

public interface VipBuyRecordDao extends JpaRepository<VipBuyRecord, Long>{
		//Page<VipBuyRecord> findByUserCodeAndIsDelAndIsPay(String userCode,boolean isDel,boolean isPay,Pageable pageable);
		VipBuyRecord findByUuid(String uuid);
		Page<VipBuyRecord> findAll(Specification<VipBuyRecord> specification,Pageable pageable);
		VipBuyRecord findByOrderSN(String orderSn);
		List<VipBuyRecord> findByUserPoAndIsPayAndBuyType(UserPo userPo,Boolean isPay,BuyTypeEnum buTypeEnum);
		@Query("select v from VipBuyRecord v where v.userPo.userCode=?1 and v.isPay=?2 and v.buyType=?3")
		List<VipBuyRecord> getVipBuyRecords(String userCode,Boolean isPay,BuyTypeEnum buyTypeEnum);
}
