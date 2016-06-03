package com.eeduspace.management.persist.po;


import javax.persistence.*;

import org.hibernate.annotations.ForeignKey;

import com.eeduspace.management.persist.enumeration.UserEnum;

import java.io.Serializable;
import java.util.Date;

/**
 * Author: dingran
 * Date: 2016/4/19
 * Description:
 */
@Entity
@Table(name="cibn_user")
public class UserPo  implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    private Long id;
    @Column(name = "user_code",unique=true)
    private String userCode;//用户唯一标识
    private String email;
    private String mobile;
    /**
     * 是否黑名单 true 是  false 否
     */
    @Column(name="is_blacklist",columnDefinition="INT default 0")
    private boolean isBlacklist;
    @Column(name = "user_name")
    private String userName;
    private String password;
    @Column(name = "is_vip")
    private boolean isVIP;//是否是vip
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "vip_expire_time")
    private Date  VIPExpireTime;//vip到期时间

    @Column(name = "login_status")
    private UserEnum.LoginStatus loginStatus;

/*    @Column(name = "scan_status")
    private UserEnum.ScanStatus scanStatus;*/

    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false,name = "create_time")
    private Date createDate = new Date();
    //更新时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_time")
    private Date updateDate = new Date();
    private String accessKey;
	private String secretKey;

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

	public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserCode() {
        return userCode;
    }

    public void setUserCode(String userCode) {
        this.userCode = userCode;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getMobile() {
        return mobile;
    }

    public void setMobile(String mobile) {
        this.mobile = mobile;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isVIP() {
        return isVIP;
    }

    public void setVIP(boolean isVIP) {
        this.isVIP = isVIP;
    }

    public Date getVIPExpireTime() {
        return VIPExpireTime;
    }

    public void setVIPExpireTime(Date VIPExpireTime) {
        this.VIPExpireTime = VIPExpireTime;
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

    public UserEnum.LoginStatus getLoginStatus() {
        return loginStatus;
    }

    public void setLoginStatus(UserEnum.LoginStatus loginStatus) {
        this.loginStatus = loginStatus;
    }

	public boolean isBlacklist() {
		return isBlacklist;
	}

	public void setBlacklist(boolean isBlacklist) {
		this.isBlacklist = isBlacklist;
	}
}
