package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import com.eeduspace.management.persist.po.PaperTypePo;

public interface PaperTypePoDao extends CrudRepository<PaperTypePo, Long> {
	
	List<PaperTypePo> findByUuidIn(List<String> ids);
	
}
