package com.eeduspace.management.controllerTest.baseDataTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class BaseDataControllerTest extends BaseTest {
	
	@Test
	public void testStage(){
		String url = "http://localhost:8070/cibntv-management/action/baseData/stage";
//		String url = "http://101.200.155.215:8180/cibnws/baseData/stage";
		Map<String, Object> paramMap = new HashMap<>();
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			logger.debug(response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Test
	public void testGrade(){
		String url = "http://localhost:8070/cibntv-management/action/baseData/grade";
//		String url ="http://101.200.155.215:8180/cibnws/baseData/grade";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("stageCode", "1");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			logger.debug(response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Test
	public void testSubject(){
		String url = "http://localhost:8070/cibntv-management/action/baseData/subject";
//		String url ="http://101.200.155.215:8180/cibnws/baseData/subject";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("gradeCode", "11");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			logger.debug(response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Test
	public void testBookType(){
		String url = "http://localhost:8070/cibntv-management/action/baseData/bookType";
//		String url ="http://101.200.155.215:8180/cibnws/baseData/bookType";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("gradeCode", "11");
		paramMap.put("subjectCode", "2");
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			logger.debug(response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		BaseDataControllerTest baseDataTest = new BaseDataControllerTest();
		baseDataTest.testBookType();
	}
}
