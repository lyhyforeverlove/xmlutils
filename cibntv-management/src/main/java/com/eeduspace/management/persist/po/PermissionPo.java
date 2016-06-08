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

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.util.UIDGenerator;

/**权限
 * Author: songwei
 * Date: 2016-06-03
 * Description:
 */
@Entity
@Table(name = "cibn_permission")
public class PermissionPo {
	 	@Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(updatable = false)
	    private Long id;
	    //唯一标识
	    @Column(unique = true,name = "uuid")
	    private String p_uuid = UIDGenerator.getUUID().toString().replace("-", "");
	    //名称
	    @Column(name="name")
	    private String p_name;
	    //类型
	    private RoleEnum.PermissionType type;
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
	    
	    private String groups;
	    private Long functionId;
	    
	    public Long getId() {
	        return id;
	    }
	    public String getP_uuid() {
			return p_uuid;
		}
		public void setP_uuid(String p_uuid) {
			this.p_uuid = p_uuid;
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
	    public String getP_name() {
			return p_name;
		}
		public void setP_name(String p_name) {
			this.p_name = p_name;
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

		public RoleEnum.PermissionType getType() {
			return type;
		}

		public void setType(RoleEnum.PermissionType type) {
			this.type = type;
		}

		public String getGroups() {
			return groups;
		}

		public void setGroups(String groups) {
			this.groups = groups;
		}

		public Long getFunctionId() {
			return functionId;
		}

		public void setFunctionId(Long functionId) {
			this.functionId = functionId;
		}
	

}
