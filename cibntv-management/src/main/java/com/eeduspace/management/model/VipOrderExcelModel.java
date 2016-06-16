package com.eeduspace.management.model;

import com.eeduspace.management.anntation.Excel;


public class VipOrderExcelModel {
	// 唯一标识			String[] vipOrderTableHeader = { "订单号", "流水号", "手机号", "VIP时长", "价格", "支付方式", "交易时间", "状态" };

	/**
	 * 订单流水号
	 */
	@Excel(exportName="订单号")
	private String orderSN;
	/**
	 * 微信订单流水号 微信生成
	 */
	@Excel(exportName="流水号")
	private String transactionId;
	@Excel(exportName="手机号")
	private String mobile;
	/**
	 * 本次购买VIP天数
	 */
	@Excel(exportName="VIP时长")
	private String vipDays;
	/**
	 * VIP价格
	 */
	@Excel(exportName="价格")
	private Double vipPrice;
	/**
	 * 支付类型 weixinpay alipay
	 */
	@Excel(exportName="支付方式")
	private String payType;
	/**
	 * 创建时间
	 */
	@Excel(exportName="交易时间")
	private String createDate;
	/**
	 * 订单状态
	 */
	@Excel(exportName="状态")
	private String orderState;
	public String getOrderSN() {
		return orderSN;
	}
	public void setOrderSN(String orderSN) {
		this.orderSN = orderSN;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getVipDays() {
		return vipDays;
	}
	public void setVipDays(String vipDays) {
		this.vipDays = vipDays;
	}
	public Double getVipPrice() {
		return vipPrice;
	}
	public void setVipPrice(Double vipPrice) {
		this.vipPrice = vipPrice;
	}
	public String getPayType() {
		return payType;
	}
	public void setPayType(String payType) {
		this.payType = payType;
	}
	public String getCreateDate() {
		return createDate;
	}
	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}
	public String getOrderState() {
		return orderState;
	}
	public void setOrderState(String orderState) {
		this.orderState = orderState;
	}
}
