package com.eeduspace.management.bean;


import java.io.Serializable;

import com.eeduspace.management.model.RoleModel;

/**
 * Copyright：CNIaas Technology (Beijing) CO.,LTD
 * Author: DingRan
 * Date: 2014/9/5
 * Description:
 */
public class SessionItem implements Serializable {
    private static final long serialVersionUID = 7810824562808348742L;

    @Deprecated
    public SessionItem() {
    }



    private Long userId;
    private String userUuid;
    private String userName;
    private String realName;
    private String userEmail;
    private String userPhone;
    private String accessKey;
    private String secretKey;
    private String roleUUID;
    private Boolean isFirst;
    private RoleModel roleModel;
    
    
    public SessionItem(Long userId, String userUuid, String userName,
			String realName, String userEmail, String userPhone,
			String accessKey, String secretKey, String roleUUID,
			Boolean isFirst, RoleModel roleModel) {
		super();
		this.userId = userId;
		this.userUuid = userUuid;
		this.userName = userName;
		this.realName = realName;
		this.userEmail = userEmail;
		this.userPhone = userPhone;
		this.accessKey = accessKey;
		this.secretKey = secretKey;
		this.roleUUID = roleUUID;
		this.isFirst = isFirst;
		this.roleModel = roleModel;
	}


	public String getRoleUUID() {
		return roleUUID;
	}


	public void setRoleUUID(String roleUUID) {
		this.roleUUID = roleUUID;
	}



	@Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        SessionItem that = (SessionItem) o;

        if (userId != that.userId) return false;

        return true;
    }

    @Override
    public int hashCode() {
        return (int) (userId ^ (userId >>> 32));
    }

    public static long getSerialVersionUID() {
        return serialVersionUID;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(String userPhone) {
        this.userPhone = userPhone;
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


	public Boolean getIsFirst() {
		return isFirst;
	}


	public void setIsFirst(Boolean isFirst) {
		this.isFirst = isFirst;
	}


	public RoleModel getRoleModel() {
		return roleModel;
	}


	public void setRoleModel(RoleModel roleModel) {
		this.roleModel = roleModel;
	}


	public String getUserUuid() {
		return userUuid;
	}


	public void setUserUuid(String userUuid) {
		this.userUuid = userUuid;
	}


	public String getRealName() {
		return realName;
	}


	public void setRealName(String realName) {
		this.realName = realName;
	}
	
	
}
