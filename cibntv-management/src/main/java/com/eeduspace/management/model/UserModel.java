package com.eeduspace.management.model;

import com.eeduspace.management.anntation.Excel;

/**
 * Author: dingran
 * Date: 2016/4/19
 * Description: 
 */
public class UserModel {

	/**
	 * 邮箱
	 */
	private String email;
	private String userCode;
	/**
	 * 用户名称
	 */
	@Excel(exportName="用户名")
	private String userName;
	/**
	 * 手机号
	 */
	@Excel(exportName="手机号")
	private String mobile;
	  /**
     * 创建时间
     */
    @Excel(exportName="注册时间")
    private String createDate;
    /**
     * 注册来源
     */
    @Excel(exportName="注册来源")
    private String registerSource;
	/**
	 * 是否VIP
	 */
	@Excel(exportName="是否VIP",exportConvertSign=true)
	private Boolean isVip;
	/**
	 * VIP到期时间
	 */
	private String VIPExpireTime;

    /**
     * VIP到期天数
     */
	@Excel(exportName="VIP剩余天数")
    private Long VIPExpireDays;
	/**
	 * VIP是否过期  true 过期  false 未过期
	 */
	@Excel(exportName="VIP是否过期",exportConvertSign=true)
	private Boolean isOverdue;

    /**
     * 登录时的扫码状态
     */
    private String scanStatus;

  
    /**
     * token 令牌
     */
    private String token;

    /**
     * token 刷新令牌
     */
    private String refreshToken;
    /**
     * token 令牌失效时间
     */
    private String expires;
    /**
     * 请求IP地址
     */
    private String ip;
   
    

	public String getIp() {
		return ip;
	}
	public void setIp(String ip) {
		this.ip = ip;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getUserCode() {
		return userCode;
	}
	public void setUserCode(String userCode) {
		this.userCode = userCode;
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

    public Boolean getIsVip() {
		return isVip;
	}
    
    public String getIsVipConvert() {
    	if(isVip){
    		return "是";
    	}else{
    		return "否";
    	}
	}
    
    
	public void setIsVip(Boolean isVip) {
		this.isVip = isVip;
	}
	public String getVIPExpireTime() {
        return VIPExpireTime;
    }

    public void setVIPExpireTime(String VIPExpireTime) {
        this.VIPExpireTime = VIPExpireTime;
    }

    public String getIsOverdueConvert(){
    	if (isOverdue) {
			return "过期";
		}else{
			return "未过期";
		}
    }
    public Boolean getIsOverdue() {
		return isOverdue;
	}
	public void setIsOverdue(Boolean isOverdue) {
		this.isOverdue = isOverdue;
	}
	public String getScanStatus() {
        return scanStatus;
    }

    public void setScanStatus(String scanStatus) {
        this.scanStatus = scanStatus;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getExpires() {
        return expires;
    }

    public void setExpires(String expires) {
        this.expires = expires;
    }

    public Long getVIPExpireDays() {
        return VIPExpireDays;
    }

    public void setVIPExpireDays(Long VIPExpireDays) {
        this.VIPExpireDays = VIPExpireDays;
    }
	public String getRegisterSource() {
		return registerSource;
	}
	public void setRegisterSource(String registerSource) {
		this.registerSource = registerSource;
	}
}
