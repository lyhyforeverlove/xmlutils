package com.eeduspace.management.service;

import java.text.ParseException;
import java.util.List;
import java.util.Map;

import com.eeduspace.management.model.PaperResponseModel;
import com.eeduspace.management.model.PaperTypeModel;
import com.google.gson.JsonSyntaxException;

public interface PaperService {
		
	public PaperResponseModel getPaperPage(String grade,String subject,String bookType,String paperType,Map<String, String> searchMap,int cp,int size) throws JsonSyntaxException,Exception;

	public List<PaperTypeModel> getPaperTypeList();
	
	public List<PaperTypeModel> saveOrReplacePaperTypes(List<PaperTypeModel> pTypeModels) throws ParseException;
	
}
