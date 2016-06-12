package com.eeduspace.management.client.impl;

import java.text.MessageFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.eeduspace.management.client.BaseDataClient;
import com.eeduspace.management.model.BaseData;
import com.eeduspace.management.model.ExamDataDetailBeanForResponse;
import com.eeduspace.management.model.PaperResponse;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

/**
 * @author songwei
 * Date 2016-05-16
 * Describe 资源库基础数据接口实现
 *
 */
@Service
public class BaseDataClientImpl implements BaseDataClient {
	private final Logger logger = LoggerFactory.getLogger(BaseDataClientImpl.class);
	private Gson gson = new Gson();
	@Value("${cibn.stage.url}")
	private String stageUrl;
	@Value("${cibn.grade.url}")
	private String gradeUrl;
	@Value("${cibn.subject.url}")
	private String subjectUrl;
	@Value("${cibn.bookType.url}")
	private String bookTypeUrl;
	@Value("${cibn.bookTypeVersion.url}")
	private String bookTypeVersionUrl;
	@Value("${cibn.unit.url}")
	private String unitUrl;
	@Value("${cibn.courses.url}")
	private String coursesUrl;
	@Value("${cibn.course.url}")
	private String courseUrl;
	@Value("${cibn.papers.url}")
	private String papersUrl;
	@Value("${cibn.paper.url}")
	private String paperUrl;

	@Override
	public List<BaseData> getStageList() throws JsonSyntaxException{
		String urlReq = stageUrl;
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		List<BaseData> baseDatas = new ArrayList<BaseData>();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse, new TypeToken<List<BaseData>>() { }.getType());
		}
		return baseDatas;
	}

	@Override
	public List<BaseData> getGradeList (String stageCode) throws JsonSyntaxException{
		String urlReq = MessageFormat.format(gradeUrl, stageCode);
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		List<BaseData> baseDatas = new ArrayList<BaseData>();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse,  new TypeToken<List<BaseData>>() { }.getType());
		}
		return baseDatas;
	}

	@Override
	public List<BaseData> getSubjectList (String gradeCode) throws JsonSyntaxException{
		String urlReq = MessageFormat.format(subjectUrl,gradeCode);
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		List<BaseData> baseDatas = new ArrayList<BaseData>();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse,  new TypeToken<List<BaseData>>() { }.getType());
		}
		return baseDatas;
	}

	@Override
	public List<BaseData> getBookTypeList (String gradeCode, String subjectCode) throws JsonSyntaxException{
		String urlReq = MessageFormat.format(bookTypeUrl, gradeCode, subjectCode); 
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		List<BaseData> baseDatas = new ArrayList<BaseData>();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse,  new TypeToken<List<BaseData>>() { }.getType());
		}
		return baseDatas;
	}
	
	@Override
	public PaperResponse getPaperPage(String grade, String subject, String bookType,String paperType, Map<String, String> searchMap,int cp,int size) throws JsonSyntaxException,Exception {
		String urlReq = papersUrl;
		Map<String, Object> map2 = new HashMap<String, Object>();
		map2.put("blurSname", "paperName");
		map2.put("searchValue", searchMap.get("searchName"));
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("gradeCode", grade);
		map.put("subjectCode", subject);
		map.put("booktypeCode", bookType);
		map.put("type", paperType);
		map.put("cp", cp);
		map.put("pageSize", size);
		map.put("searchMap", map2);
		String gsonResponse = HTTPClientUtils.httpPostRequestJson(urlReq, gson.toJson(map));
		logger.debug("资源库返回数据：" + gsonResponse);
		PaperResponse baseDatas = new PaperResponse();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse, PaperResponse.class);
		}
		return baseDatas;
	}

	@Override
	public ExamDataDetailBeanForResponse getPaperDetail(String paperId) throws JsonSyntaxException {
		String urlReq = MessageFormat.format(paperUrl,paperId);
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		ExamDataDetailBeanForResponse baseDatas = new ExamDataDetailBeanForResponse();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse, ExamDataDetailBeanForResponse.class);
		}
		return baseDatas;
	}

	@Override
	public String getCourseVideoPage(String subject, String searchName) throws JsonSyntaxException,Exception {
		String urlReq = coursesUrl;
		Map<String, Object> map = new HashMap<String, Object>();
		String gsonResponse = HTTPClientUtils.httpPostRequestJson(urlReq,gson.toJson(map));
		logger.debug("资源库返回数据：" + gsonResponse);
		
		
		return null;
	}

	@Override
	public String getCourseVideoDetail(String courseCode) throws JsonSyntaxException {
		String urlReq = MessageFormat.format(paperUrl,courseCode);
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		
		return null;
	}


}
