package com.eeduspace.management.model;

import java.util.List;

import com.eeduspace.management.persist.enumeration.RoleEnum;

public class RoleModel {
	
	    private Long id;
	    private String uuid;
	    private String name;
	    private RoleEnum.CibnTvType type;
	    private RoleEnum.Status status;
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
		public RoleEnum.CibnTvType getType() {
			return type;
		}
		public void setType(RoleEnum.CibnTvType type) {
			this.type = type;
		}
		public RoleEnum.Status getStatus() {
			return status;
		}
		public void setStatus(RoleEnum.Status status) {
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
