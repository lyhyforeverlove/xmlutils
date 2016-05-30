package com.eeduspace.management.persist.po;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * Author: dingran
 * Date: 2015/10/22
 * Description:
 */
@Entity
@Table(name = "cibn_management_role")
public class ManagementAndRolePo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    private Long id;
    //唯一标识
    @Column(nullable = false,name = "role_id")
    private Long roleId ;
    //名称
    @Column(nullable = false,name = "management_id")
    private Long managementId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public Long getManagementId() {
		return managementId;
	}
	public void setManagementId(Long managementId) {
		this.managementId = managementId;
	}
    
  
}
