package com.eeduspace.management.service.impl;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.inject.Inject;

import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eeduspace.management.convert.CIBNManagementConvert;
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
	public List<VIPPack> findAllByRelease(Boolean isRelease) {
		return  vipPackDao.findByIsReleaseOrderByVipDaysAsc(isRelease);
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
	@Transactional
	@Override
	public int updateAllVipPackSale(VipPackModel vipPackModel) throws ParseException {
		return vipPackDao.updateVipPackSale(vipPackModel.getVipSale(), DateUtils.parseDate(vipPackModel.getDiscountStartDate(), DateUtils.DATE_FORMAT_DATETIME), DateUtils.parseDate(vipPackModel.getDiscountEndDate(), DateUtils.DATE_FORMAT_DATETIME));
	}
	@Override
	public VIPPack saveVipPack(VIPPack pack) {
		return vipPackDao.save(pack);
	}
	@Override
	public List<VipPackModel> findVipPackForSelect() {
		List<VIPPack> vipPacks=vipPackDao.findAll(new Sort(Direction.ASC, "vipDays"));
		List<VipPackModel> models=new ArrayList<>();
		for (VIPPack vipPack : vipPacks) {
			VipPackModel vipPackModel=CIBNManagementConvert.fromVipPackPoForSelect(vipPack);
			models.add(vipPackModel);
		}
		return models;
	}
	@Override
	public VIPPack findByVipPackType(String vipPackType) {
		return vipPackDao.findByVipType(vipPackType);
	}
	@Override
	public List<VIPPack> findAll() {
		return vipPackDao.findAll(new Sort(Direction.ASC, "vipDays"));
	}
	

}
