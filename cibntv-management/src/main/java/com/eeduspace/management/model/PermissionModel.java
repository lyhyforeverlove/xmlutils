package com.eeduspace.management.model;

import com.eeduspace.management.persist.enumeration.RoleEnum;
import com.eeduspace.management.persist.enumeration.RoleEnum.Status;

public class PermissionModel {
	
    private Long id;
    private String uuid;
    private String name;
    private String type;
    private RoleEnum.Status status;
    private String description;
    private String createDate;
    private String updateDate;
    
    private String groups;
    private Long functionId;
    private String perUrl;
    
	public PermissionModel() {
		super();
	}
	
	public PermissionModel(String name, String type, Status status,
			String perUrl) {
		super();
		this.name = name;
		this.type = type;
		this.status = status;
		this.perUrl = perUrl;
	}


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
	public String getPerUrl() {
		return perUrl;
	}
	public void setPerUrl(String perUrl) {
		this.perUrl = perUrl;
	}
    

}
