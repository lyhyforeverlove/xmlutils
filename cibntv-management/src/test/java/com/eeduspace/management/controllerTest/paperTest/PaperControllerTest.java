package com.eeduspace.management.controllerTest.paperTest;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.persist.dao.PaperTypePoDao;
import com.eeduspace.management.persist.po.PaperTypePo;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;

public class PaperControllerTest extends BaseTest {
	
	@Inject
	private PaperTypePoDao pTypePoDao;
	
	@Test
	public void paperPageTest(){
		String url = "http://localhost:8070/cibntv-management/action/paper/paperPage";
//		String url = "http://192.168.1.190:8182/llsfw/paperController/rest/getIdAndNames";
		Map<String, Object> paramMap = new HashMap<>();
		paramMap.put("stageCode", "1");
		paramMap.put("gradeCode", "11");
		paramMap.put("subjectCode", "2");
		paramMap.put("bookTypeCode", "170a286029b24ed78626c5203fc1c816");
//		paramMap.put("booktype", "170a286029b24ed78626c5203fc1c816");
//		paramMap.put("type", "1");
		paramMap.put("paperType", "1");
		paramMap.put("cp", 1);
		paramMap.put("pageSize", "10");
		
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
		paramMap.put("paperCode", "8a2a7468544c359901545b89195f0d42");
		try {
//			String response = HTTPClientUtils.httpGetRequestJson(url);
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
	}
	
	@Test
	public void savePaperType(){
		/*PaperTypePo po = new PaperTypePo();
		po.setName("高考考试");
		po.setPrice("20");
		po.setType(PaperTypeEnum.GAOKAO.getValue());
		po.setDiscount((double)1);
		po.setDateBef(new Date());
		po.setDateAft(new Date());
		pTypePoDao.save(po);*/
		List<PaperTypePo> list = (List<PaperTypePo>) pTypePoDao.findAll();
		String name = null;
		for (PaperTypePo ptp : list) {
			int type = ptp.getType();
			if ( type == 2) {
				name = ptp.getName();
				System.out.println(name);
				break;
			}
			System.out.println(ptp.getType()+":" +ptp.getName()+":"+ptp.getPrice()+":"+ptp.getDiscount());
		}
	}
	
	public static void main(String[] args) {
		PaperControllerTest pct = new PaperControllerTest();
		pct.paperDetailTest();
//		Map<String, Object> map = new HashMap<>();
//		map.put("1", "单元测试");
//		System.out.println(map.keySet().contains(String.valueOf(PaperTypeEnum.UINT.getValue())));
		
		
	}
	
	
	
}
