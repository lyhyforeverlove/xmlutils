package com.eeduspace.management.model;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.format.annotation.DateTimeFormat.ISO;

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.enumeration.UserEnum;

public class ManagerModel {
	
    protected Long id;
    private String uuid;
    private String phone;
    private String password;
    private Long createManagerId;
    private String name;
    private String realName;
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
    private Boolean isDel;
    private RoleModel roleModel;
    private String rUuid;
    private String rName;
    private RoleEnum.Type type;
    //其他状态
    private RoleEnum.Status otherStatus;
    
    //权限集合
    private List<PermissionModel> pModels;
    
    /**当前页数**/
	private int currentPage;
	/**显示条数*/
	private int size;
	/**总页数**/
	private int totalPage;
	/**总条数*/
	private int totalSize;
	//查询参数
	private String queryName;
	//新密码
	private String oldPassword;
	//验证码
	private String smsCode;
    

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

	public String getRealName() {
		return realName;
	}

	public void setRealName(String realName) {
		this.realName = realName;
	}

	public RoleEnum.Status getOtherStatus() {
		return otherStatus;
	}

	public void setOtherStatus(RoleEnum.Status otherStatus) {
		this.otherStatus = otherStatus;
	}

	public Boolean getIsDel() {
		return isDel;
	}

	public void setIsDel(Boolean isDel) {
		this.isDel = isDel;
	}

	public String getrUuid() {
		return rUuid;
	}

	public void setrUuid(String rUuid) {
		this.rUuid = rUuid;
	}

	public String getrName() {
		return rName;
	}

	public void setrName(String rName) {
		this.rName = rName;
	}

	public RoleEnum.Type getType() {
		return type;
	}

	public void setType(RoleEnum.Type type) {
		this.type = type;
	}

	public String getQueryName() {
		return queryName;
	}

	public void setQueryName(String queryName) {
		this.queryName = queryName;
	}

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getSmsCode() {
		return smsCode;
	}

	public void setSmsCode(String smsCode) {
		this.smsCode = smsCode;
	}

	public List<PermissionModel> getpModels() {
		return pModels;
	}

	public void setpModels(List<PermissionModel> pModels) {
		this.pModels = pModels;
	}
    
    

}
