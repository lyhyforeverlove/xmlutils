package com.eeduspace.management.controllerTest.paperTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class PaperControllerTest extends BaseTest {
	
	@Test
	public void paperPageTest(){
		String url = "http://localhost:8070/cibntv-management/action/paper/paperPage";
//		String url = "http://192.168.1.190:8182/llsfw/paperController/rest/getIdAndNames";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("stageCode", "1");
		paramMap.put("stageName", "小学");
		paramMap.put("gradeCode", "11");
		paramMap.put("gradeName", "一年级");
		paramMap.put("subjectCode", "2");
		paramMap.put("subjectName", "数学");
		paramMap.put("bookTypeCode", "170a286029b24ed78626c5203fc1c816");
		paramMap.put("bookTypeName", "人教新课标版");
		paramMap.put("cp", 1);
		paramMap.put("pageSize", 10);
//		paramMap.put("paperType", "1");
//		paramMap.put("paperTypeName", "单元测试");
		/*paramMap.put("searchName", "paperName");
		paramMap.put("searchValue", "认识");*/
		
		try {
//			String response = HTTPClientUtils.httpPostRequestJson(url, gson.toJson(paramMap));
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Test
	public void paperDetailTest(){
//		String code = "8a2a7468544c359901545b830bee0cf0";
//		String url = "http://192.168.1.190:8182/llsfw/paperController/rest/getPaperWithCode/code/" + code;
		
		String url = "http://localhost:8070/cibntv-management/action/paper/paperDetail";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("paperCode", "8a2a7468544c359901545afd09330a46");
		try {
//			String response = HTTPClientUtils.httpGetRequestJson(url);
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	
	@Test
	public void saveOrReplacePaperType(){
		String url = "http://localhost:8070/cibntv-management/action/paper/paperTypeReplace";
		Map<String, Object> paramMap = new HashMap<>();
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	@Test
	public void paperTypeList(){
		String url = "http://localhost:8070/cibntv-management/action/paper/paperTypeList";
		Map<String, Object> paramMap = new HashMap<>();
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}
	
	public static void main(String[] args) {
		PaperControllerTest pct = new PaperControllerTest();
		pct.paperPageTest();
	}
	
	
	
	
}
