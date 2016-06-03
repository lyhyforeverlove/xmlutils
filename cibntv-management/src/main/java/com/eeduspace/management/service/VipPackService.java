package com.eeduspace.management.service;

import java.text.ParseException;
import java.util.List;

import com.eeduspace.management.model.VipPackModel;
import com.eeduspace.management.persist.po.VIPPack;

public interface VipPackService {
	public List<VIPPack> findAll();
	public void deleteByUUID(String uuid);
	public int updateVipPackRelease();
	public VIPPack findByUUID(String uuid);
	public VIPPack  updateVipPackSale(VIPPack vipPack);
	public int updateAllVipPackSale(VipPackModel vipPackModel) throws ParseException;
}
