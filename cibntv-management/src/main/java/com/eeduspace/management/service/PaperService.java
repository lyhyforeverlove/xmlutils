package com.eeduspace.management.service;

import java.util.Map;

import com.eeduspace.management.model.PaperResponse;
import com.google.gson.JsonSyntaxException;

public interface PaperService {
		
	public PaperResponse getPaperPage(String grade,String subject,String bookType,String paperType,Map<String, String> searchMap,int cp,int size) throws JsonSyntaxException,Exception;

	
}
