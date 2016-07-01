package com.eeduspace.management.model;



public class VipPackModel {
	private Double vipPrice;
	private String vipType;
	private Integer vipDays;
	private String vipDesc;
	private String uuid;
	private Boolean isRelease;
	private Double discountPrice;
	private String 	discountStartDate;
	private String discountEndDate;
	private String backgroundimg;
	private Double vipSale;
	private String vipTypeDesc;
	/**
	 * 是否  获取全部vip包  true 是  false 否
	 */
	private Boolean isAll=false;
	/**
	 * 是否打折  true 打折  false 不打折 默认false
 	 */
	private Boolean isDiscount=false;
	public String getDiscountStartDate() {
		return discountStartDate;
	}
	public void setDiscountStartDate(String discountStartDate) {
		this.discountStartDate = discountStartDate;
	}
	public String getDiscountEndDate() {
		return discountEndDate;
	}
	public void setDiscountEndDate(String discountEndDate) {
		this.discountEndDate = discountEndDate;
	}
	public Double getVipPrice() {
		return vipPrice;
	}
	public void setVipPrice(Double vipPrice) {
		this.vipPrice = vipPrice;
	}
	public Integer getVipDays() {
		return vipDays;
	}
	public void setVipDays(Integer vipDays) {
		this.vipDays = vipDays;
	}
	public String getVipDesc() {
		return vipDesc;
	}
	public void setVipDesc(String vipDesc) {
		this.vipDesc = vipDesc;
	}
	public String getVipType() {
		return vipType;
	}
	public void setVipType(String vipType) {
		this.vipType = vipType;
	}
	public Boolean getIsRelease() {
		return isRelease;
	}
	public void setIsRelease(Boolean isRelease) {
		this.isRelease = isRelease;
	}
	public Double getDiscountPrice() {
		return discountPrice;
	}
	public void setDiscountPrice(Double discountPrice) {
		this.discountPrice = discountPrice;
	}
	public String getBackgroundimg() {
		return backgroundimg;
	}
	public void setBackgroundimg(String backgroundimg) {
		this.backgroundimg = backgroundimg;
	}
	public Double getVipSale() {
		return vipSale;
	}
	public void setVipSale(Double vipSale) {
		this.vipSale = vipSale;
	}
	public Boolean getIsDiscount() {
		return isDiscount;
	}
	public void setIsDiscount(Boolean isDiscount) {
		this.isDiscount = isDiscount;
	}
	public String getUuid() {
		return uuid;
	}
	public void setUuid(String uuid) {
		this.uuid = uuid;
	}
	public Boolean getIsAll() {
		return isAll;
	}
	public void setIsAll(Boolean isAll) {
		this.isAll = isAll;
	}
	public String getVipTypeDesc() {
		return vipTypeDesc;
	}
	public void setVipTypeDesc(String vipTypeDesc) {
		this.vipTypeDesc = vipTypeDesc;
	}
}
