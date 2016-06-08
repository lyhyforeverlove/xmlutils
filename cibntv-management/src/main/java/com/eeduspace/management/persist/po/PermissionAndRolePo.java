package com.eeduspace.management.persist.po;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
/**
 * Author: songwei
 * Date: 2016-06-03
 * Description:
 */
@Entity
@Table(name = "cibn_permission_role")
public class PermissionAndRolePo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(updatable = false)
    private Long id;
    //唯一标识
    @Column(nullable = false,name = "role_uuid")
    private String r_uuid ;
    //名称
    @Column(nullable = false,name = "permission_uuid")
    private String p_uuid;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getR_uuid() {
		return r_uuid;
	}
	public void setR_uuid(String r_uuid) {
		this.r_uuid = r_uuid;
	}
	public String getP_uuid() {
		return p_uuid;
	}
	public void setP_uuid(String p_uuid) {
		this.p_uuid = p_uuid;
	}
	
    
  
}
