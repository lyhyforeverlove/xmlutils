package com.eeduspace.management.persist.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.util.UIDGenerator;

/**角色
 * Author: songwei
 * Date: 2016-06-03
 * Description:
 */
@Entity
@Table(name = "cibn_role")
public class RolePo implements Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    private Long id;
    //唯一标识
    @Column(unique = true,name = "uuid")
    private String r_uuid = UIDGenerator.getUUID().toString().replace("-", "");
    //名称
    @Column(name="name")
    private String r_name;
    //类型
    private RoleEnum.Type type;
    //状态
    private RoleEnum.Status status;
    //描述
    private String description;
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
	public String getR_uuid() {
		return r_uuid;
	}
	public void setR_uuid(String r_uuid) {
		this.r_uuid = r_uuid;
	}
	public RoleEnum.Type getType() {
		return type;
	}

	public void setType(RoleEnum.Type type) {
		this.type = type;
	}

	public RoleEnum.Status getStatus() {
        return status;
    }

    public void setStatus(RoleEnum.Status status) {
        this.status = status;
    }

    public void setId(Long id) {
        this.id = id;
    }
    public String getR_name() {
		return r_name;
	}
	public void setR_name(String r_name) {
		this.r_name = r_name;
	}
	public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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
