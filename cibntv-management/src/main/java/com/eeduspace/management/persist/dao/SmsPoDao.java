package com.eeduspace.management.persist.dao;

import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.SmsPo;

public interface SmsPoDao extends CrudRepository<SmsPo, Long> {
	
	SmsPo findByPhone(String phone);
	
}
