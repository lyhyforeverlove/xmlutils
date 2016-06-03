package com.eeduspace.management.model;
/**
 * 用户查询实体
 * @author zhuchaowei
 * 2016年6月2日
 * Description
 */
public class UserQueryModel extends PageModel{	
	private Boolean isBlacklist;
	private String mobile;
	private String startDate;
	private String userCode;
	private String endDate;
	public Boolean getIsBlacklist() {
		return isBlacklist;
	}
	public void setIsBlacklist(Boolean isBlacklist) {
		this.isBlacklist = isBlacklist;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
	}
}
