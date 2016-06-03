package com.eeduspace.management.model;

import java.util.List;

import com.eeduspace.management.persist.po.VipBuyRecord;

public class UserOrderModel {
	List<VipBuyRecord> vipOrder;
	List<VipBuyRecord> diagnosticOrder;
	public List<VipBuyRecord> getVipOrder() {
		return vipOrder;
	}
	public void setVipOrder(List<VipBuyRecord> vipOrder) {
		this.vipOrder = vipOrder;
	}
	public List<VipBuyRecord> getDiagnosticOrder() {
		return diagnosticOrder;
	}
	public void setDiagnosticOrder(List<VipBuyRecord> diagnosticOrder) {
		this.diagnosticOrder = diagnosticOrder;
	}
}
