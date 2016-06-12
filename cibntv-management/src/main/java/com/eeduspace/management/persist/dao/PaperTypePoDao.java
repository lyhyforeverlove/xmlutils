package com.eeduspace.management.persist.dao;

import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.PaperTypePo;

public interface PaperTypePoDao extends CrudRepository<PaperTypePo, Long> {
	
}
