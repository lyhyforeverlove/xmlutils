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
@Table(name = "cibn_manager_role")
public class ManagerAndRolePo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    private Long id;
    //唯一标识
    @Column(nullable = false,name = "role_uuid")
    private String roleUuid ;
    //名称
    @Column(nullable = false,name = "manager_uuid")
    private String managerUuid;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getRoleUuid() {
		return roleUuid;
	}
	public void setRoleUuid(String roleUuid) {
		this.roleUuid = roleUuid;
	}
	public String getManagerUuid() {
		return managerUuid;
	}
	public void setManagerUuid(String managerUuid) {
		this.managerUuid = managerUuid;
	}
	
    
  
}
