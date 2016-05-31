package com.eeduspace.management.model;

import com.eeduspace.management.persist.enumeration.UserEnum;

public class ManagementModel {
	
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
    private String lastLoginDate;
    private String createDate;
    private String updateDate;
    
    private RoleModel roleModel;
    
    private PermissionModel permissionModel;

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

	public String getLastLoginDate() {
		return lastLoginDate;
	}

	public void setLastLoginDate(String lastLoginDate) {
		this.lastLoginDate = lastLoginDate;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
	}

	public RoleModel getRoleModel() {
		return roleModel;
	}

	public void setRoleModel(RoleModel roleModel) {
		this.roleModel = roleModel;
	}

	public PermissionModel getPermissionModel() {
		return permissionModel;
	}

	public void setPermissionModel(PermissionModel permissionModel) {
		this.permissionModel = permissionModel;
	}
    
    

}
