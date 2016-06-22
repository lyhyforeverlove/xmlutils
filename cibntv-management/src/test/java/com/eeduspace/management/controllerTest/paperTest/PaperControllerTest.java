package com.eeduspace.management.controllerTest.paperTest;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.inject.Inject;

import org.junit.Test;

import com.eeduspace.management.BaseTest;
import com.eeduspace.management.model.PaperTypeModel;
import com.eeduspace.management.persist.dao.PaperTypePoDao;
import com.eeduspace.management.persist.enumeration.PaperTypeEnum;
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
		paramMap.put("stageName", "小学");
		paramMap.put("gradeCode", "11");
		paramMap.put("gradeName", "一年级");
		paramMap.put("subjectCode", "2");
		paramMap.put("subjectName", "数学");
		paramMap.put("bookTypeCode", "170a286029b24ed78626c5203fc1c816");
		paramMap.put("bookTypeName", "人教新课标版");
		paramMap.put("cp", 1);
		paramMap.put("pageSize", 10);
		paramMap.put("paperType", "1");
		paramMap.put("paperTypeName", "单元测试");
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
	public void saveOrReplacePaperType(){
		String url = "http://localhost:8070/cibntv-management/action/paper/paperTypeReplace";
		Map<String, Object> paramMap = new HashMap<>();
		try {
			String response = HTTPClientUtils.httpPostForm(url, paramMap);
			System.out.println("返回值为：" + response);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		
		/*PaperTypePo po= new PaperTypePo();
		po.setName("高考测试");
		po.setPrice("20");
		po.setType(PaperTypeEnum.GAOKAO.getValue());
		po.setDiscount((double)1);
		po.setDateBef(new Date());
		po.setDateAft(new Date());
		PaperTypePo po1 = new PaperTypePo();
		po1.setName("单元测试");
		po1.setPrice("20");
		po1.setType(PaperTypeEnum.UINT.getValue());
		po1.setDiscount((double)1);
		po1.setDateBef(new Date());
		po1.setDateAft(new Date());
		PaperTypePo po2 = new PaperTypePo();
		po2.setName("期末测试");
		po2.setPrice("20");
		po2.setType(PaperTypeEnum.FINEXAM.getValue());
		po2.setDiscount((double)1);
		po2.setDateBef(new Date());
		po2.setDateAft(new Date());
		PaperTypePo po3 = new PaperTypePo();
		po3.setName("期中测试");
		po3.setPrice("20");
		po3.setType(PaperTypeEnum.MIDTERM.getValue());
		po3.setDiscount((double)1);
		po3.setDateBef(new Date());
		po3.setDateAft(new Date());
		PaperTypePo po4 = new PaperTypePo();
		po4.setName("中考测试");
		po4.setPrice("20");
		po4.setType(PaperTypeEnum.ZHONGGAO.getValue());
		po4.setDiscount((double)1);
		po4.setDateBef(new Date());
		po4.setDateAft(new Date());
		List<PaperTypePo> plist = new ArrayList<PaperTypePo>();
		plist.add(po);
		plist.add(po1);
		plist.add(po2);
		plist.add(po3);
		plist.add(po4);
		List<PaperTypePo> pList2 = pTypePoDao.save(plist);
		for (PaperTypePo ptp : pList2) {
			System.out.println(ptp.getType()+":" +ptp.getName()+":"+ptp.getPrice()+":"+ptp.getDiscount());
		}*/
		
		
		
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
		
		
		//循环赋予试卷价值
		/*List<PaperTypePo> list = (List<PaperTypePo>) pTypePoDao.findAll();
		String name = null;
		for (PaperTypePo ptp : list) {
			int type = ptp.getType();
			if ( type == 2) {
				name = ptp.getName();
				System.out.println(name);
				break;
			}
			System.out.println(ptp.getType()+":" +ptp.getName()+":"+ptp.getPrice()+":"+ptp.getDiscount());
		}*/
		//in查询测试
		/*List<String> ids = new ArrayList<>();
		ids.add("e6e6be87ed124fac879f345d7375ecb0");
		ids.add("51c4c716c30e4b0ba902d1604d2d1b54");
		ids.add("4e954de8fd9341b38231b97202a4606f");
		List<PaperTypePo> list =pTypePoDao.findByUuidIn(ids);
		for (PaperTypePo ptp : list) {
			System.out.println(ptp.getType()+":" +ptp.getName()+":"+ptp.getPrice()+":"+ptp.getDiscount());
		}*/
		
	}
	
	public static void main(String[] args) {
		PaperControllerTest pct = new PaperControllerTest();
		pct.paperPageTest();
	}
	
	
	
	
}
