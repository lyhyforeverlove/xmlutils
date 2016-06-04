package com.eeduspace.management.model;

import java.util.Date;

import javax.persistence.Column;

import org.springframework.data.domain.PageRequest;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.eeduspace.management.persist.enumeration.UserEnum;

public class ManagerModel {
	
    protected Long id;
    private String uuid;
    private String phone;
    private String password;
    private Long createManagerId;
    private String name;
    private String email;
    private String accessKey;
    private String secretKey;
    private UserEnum.Status status;
    private String extend_;
    @DateTimeFormat(iso = ISO.DATE_TIME,pattern = "yyyy-MM-dd HH:mm:ss")
    private Date lastLoginDate;
    @DateTimeFormat(iso = ISO.DATE_TIME,pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createDate;
    @DateTimeFormat(iso = ISO.DATE_TIME,pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateDate;
    private Boolean isFirst;
    private RoleModel roleModel;
    
    /**当前页数**/
	private int currentPage;
	/**显示条数*/
	private int size;
	/**总页数**/
	private int totalPage;
	/**总条数*/
	private int totalSize;
    

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUuid() {
		return uuid;
	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Long getCreateManagerId() {
		return createManagerId;
	}

	public void setCreateManagerId(Long createManagerId) {
		this.createManagerId = createManagerId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getAccessKey() {
		return accessKey;
	}

	public void setAccessKey(String accessKey) {
		this.accessKey = accessKey;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}

	public UserEnum.Status getStatus() {
		return status;
	}

	public void setStatus(UserEnum.Status status) {
		this.status = status;
	}

	public String getExtend_() {
		return extend_;
	}

	public void setExtend_(String extend_) {
		this.extend_ = extend_;
	}
	public Date getLastLoginDate() {
		return lastLoginDate;
	}

	public void setLastLoginDate(Date lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Date updateDate) {
		this.updateDate = updateDate;
	}

	public RoleModel getRoleModel() {
		return roleModel;
	}

	public void setRoleModel(RoleModel roleModel) {
		this.roleModel = roleModel;
	}
	
	public Boolean getIsFirst() {
		return isFirst;
	}

	public void setIsFirst(Boolean isFirst) {
		this.isFirst = isFirst;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(int totalSize) {
		this.totalSize = totalSize;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
    
    

}
