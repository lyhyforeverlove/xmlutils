package com.eeduspace.management.persist.po;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.eeduspace.management.persist.enumeration.UserEnum;
import com.eeduspace.management.util.UIDGenerator;

/**
 * Author: dingran
 * Date: 2015/10/21
 * Description:管理员实体类
 */
@Entity
@Table(name = "cibn_manager")
public class ManagerPo {
    //用户id
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    protected Long id;
    //用户uuid
    @Column(unique = true)
    private String uuid = UIDGenerator.getUUID();
    //手机号
    @Column( nullable = false,unique = true)
    private String phone;
    //用户登陆密码
    private String password;
    //创建该用户的管理员ID
    @Column(name = "create_manager_id")
    private Long createManagerId;
    //用户登录名
    private String name;
    //邮箱
    private String email;
    //公钥
    @Column( unique = true,name = "access_key")
    private String accessKey;
    //秘钥
    @Column( unique = true,name = "secret_key")
    private String secretKey;
    //状态
    private UserEnum.Status status;
    //扩展字段
    private String extend_;
    @Column(name = "last_login_time")
    private Date lastLoginDate;
    //创建时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(updatable = false,name = "create_time")
    private Date createDate = new Date();
    //更新时间
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "update_time")
    private Date updateDate = new Date();

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
}
