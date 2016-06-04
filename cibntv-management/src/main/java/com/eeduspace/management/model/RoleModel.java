package com.eeduspace.management.model;

import java.util.List;

public class RoleModel {
	
	    private Long id;
	    private String uuid;
	    private String name;
	    private String type;
	    private String status;
	    private String description;
	    private String createDate;
	    private String updateDate;
	    
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
		public List<PermissionModel> getPermissionModels() {
			return permissionModels;
		}
		public void setPermissionModels(List<PermissionModel> permissionModels) {
			this.permissionModels = permissionModels;
		}
	    
	    
	    

}
