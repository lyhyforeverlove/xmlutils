package com.eeduspace.management.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.eeduspace.management.model.PaperResponseModel;
import com.eeduspace.management.model.PaperTypeModel;
import com.google.gson.JsonSyntaxException;

/**试卷接口
 * @author songwei
 *	Date 2016-06-06
 */
public interface PaperService {
		
	/**
	 * 试卷列表
	 * @return
	 */
	public PaperResponseModel getPaperPage(String grade,String subject,String bookType,String paperType,Map<String, String> searchMap,int cp,int size) throws JsonSyntaxException,Exception;

	/**
	 * 试卷属性列表
	 * @return
	 */
	public List<PaperTypeModel> getPaperTypeList();
	
	/**
	 * 修改试卷属性：价格，折扣，折扣的时间
	 * @return
	 */
	public List<PaperTypeModel> saveOrReplacePaperTypes(List<PaperTypeModel> pTypeModels) throws ParseException;
	
}
