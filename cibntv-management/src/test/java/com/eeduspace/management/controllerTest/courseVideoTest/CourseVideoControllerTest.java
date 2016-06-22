package com.eeduspace.management.controllerTest.courseVideoTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class CourseVideoControllerTest extends BaseTest {
	
	
	@Test
	public void courseVideoPageTest(){
//		String url = "http://211.157.179.216:8080/llsfw/rest/selectVideoBySubjectCodeAndVideoName";
		String url = "http://localhost:8070/cibntv-management/action/video/videoPage";
		Map<String, Object> paramMap = new HashMap<>();
//		paramMap.put("subjectCode", "4");
//		paramMap.put("subjectName", "物理");
//		paramMap.put("searchName", "变压器");
		paramMap.put("cp", 1);
//		paramMap.put("pageSize", 10);
		
		
		try {
//			String response = HTTPClientUtils.httpPostRequestJson(url, gson.toJson(paramMap));
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	@Test
	public void courseVideoDetailTest(){
//		String code = "012a7c95867a4af5ace7bac306f90126";
//		String url = "http://211.157.179.216:8080/llsfw/rest/getVideoDetail/" + code;
//		
		String url = "http://localhost:8070/cibntv-management/action/video/videoDetail";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("courseCode", "012a7c95867a4af5ace7bac306f90126");
		try {
//			String response = HTTPClientUtils.httpGetRequestJson(url);
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	
	
	public static void main(String[] args) {
		CourseVideoControllerTest pct = new CourseVideoControllerTest();
		pct.courseVideoPageTest();
//		Map<String, Object> map = new HashMap<>();
//		map.put("1", "单元测试");
//		System.out.println(map.keySet().contains(String.valueOf(PaperTypeEnum.UINT.getValue())));
		
		
	}
	
	
	
}
