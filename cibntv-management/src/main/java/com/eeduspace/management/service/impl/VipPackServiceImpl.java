package com.eeduspace.management.service.impl;

import java.text.ParseException;
import java.util.List;

import javax.inject.Inject;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eeduspace.management.model.VipPackModel;
import com.eeduspace.management.persist.dao.VipPackDao;
import com.eeduspace.management.persist.po.VIPPack;
import com.eeduspace.management.service.VipPackService;
import com.eeduspace.uuims.comm.util.base.DateUtils;
@Service
public class VipPackServiceImpl implements VipPackService{
	@Inject
	private VipPackDao vipPackDao;
	@Override
	public List<VIPPack> findAll() {
		return (List<VIPPack>) vipPackDao.findAll();
	}
	@Transactional
	@Override
	public void deleteByUUID(String uuid) {
		vipPackDao.deleteByUUID(uuid);
	}
	@Transactional
	@Override
	public int updateVipPackRelease() {
		return vipPackDao.updateRelease(true);
	}
	@Transactional
	@Override
	public VIPPack updateVipPackSale(VIPPack vipPack) {
		return vipPackDao.save(vipPack);
	}
	@Override
	public VIPPack findByUUID(String uuid) {
		return vipPackDao.findByUuid(uuid);
	}
	@Override
	public int updateAllVipPackSale(VipPackModel vipPackModel) throws ParseException {
		return vipPackDao.updateAllVipPackSale(vipPackModel.getVipSale(), DateUtils.parseDate(vipPackModel.getDiscountStartDate(), DateUtils.DATE_FORMAT_DATETIME), DateUtils.parseDate(vipPackModel.getDiscountEndDate(), DateUtils.DATE_FORMAT_DATETIME));
	}
	

}
