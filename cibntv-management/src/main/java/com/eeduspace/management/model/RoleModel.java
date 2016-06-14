package com.eeduspace.management.model;

import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

public class RoleModel {
	
	    private Long id;
	    private String uuid;
	    private String name;
	    private String type;
	    private String status;
	    private String description;
	    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	    private Date createDate;
	    private Date updateDate;
	    
	    private List<PermissionModel> permissionModels;
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
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getType() {
			return type;
		}
		public void setType(String type) {
			this.type = type;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
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
		public List<PermissionModel> getPermissionModels() {
			return permissionModels;
		}
		public void setPermissionModels(List<PermissionModel> permissionModels) {
			this.permissionModels = permissionModels;
		}
	    
	    
	    

}
