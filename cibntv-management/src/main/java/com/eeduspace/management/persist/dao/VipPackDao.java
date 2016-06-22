package com.eeduspace.management.persist.dao;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.eeduspace.management.persist.po.VIPPack;

public interface VipPackDao extends JpaRepository<VIPPack, Long>{
	
	@Modifying
	@Query("delete  from VIPPack v where v.uuid=?1")
	void deleteByUUID(String uuid);
	
	@Modifying 
	@Query("update VIPPack v set v.isRelease=?1")
	Integer updateRelease(Boolean isRelease);
	
	VIPPack findByUuid(String uuid);
	VIPPack findByVipType(String vipType);
	@Modifying
	@Query("update VIPPack v set v.vipSale=?1, v.discountStartDate=?2,v.discountEndDate=?3")
	Integer updateAllVipPackSale(Double vipSale,Date sDate,Date eDate);
}
