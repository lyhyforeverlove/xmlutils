package com.eeduspace.management.persist.dao;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eeduspace.management.persist.po.DiagnosticReport;
/**
 * @author zhuchaowei
 * 2016年4月21日
 * Description 诊断报告DAO
 */
public interface DiagnosticReportDao extends JpaRepository<DiagnosticReport, Long>{
	Page<DiagnosticReport> findByUserCodeAndIsDelAndIsBuy(String userCode,boolean isDel,boolean isBuy,Pageable pageable);
	
	DiagnosticReport findByUuid(String uuid);
	
	@Query("select count(*) from DiagnosticReport where paperCode=?1")
	Long count(String paperCode);
	/**
	 * 根据试卷code和userCode 获取诊断报告
	 * Author： zhuchaowei
	 * e-mail:zhuchaowei@e-eduspace.com
	 * 2016年4月27日 下午1:03:57
	 * @param userCode
	 * @param paperCode
	 * @return
	 */
	List<DiagnosticReport> findByUserCodeAndPaperCodeAndUnitCode(String userCode,String paperCode,String unitCode);
}
