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
import com.eeduspace.management.model.CourseVideoResponseModel;
import com.eeduspace.management.model.ExamDataDetailModel;
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
	@Value("${cibn.subject.no.url}")
	private String subjectNOUrl;
	@Value("${cibn.bookType.url}")
	private String bookTypeUrl;
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
	public String getPaperPage(String grade, String subject, String bookType,String paperType, Map<String, String> searchMap,int cp,int size) throws Exception {
		String urlReq = papersUrl;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("gradeCode", grade);
		map.put("subjectCode", subject);
		map.put("booktype", bookType);
		map.put("type", paperType);
		map.put("cp", cp);
		map.put("pageSize", size);
		if (StringUtils.isNotBlank(searchMap.get("searchValue"))) {
			Map<String, Object> map2 = new HashMap<String, Object>();
			map2.put("blurSname", "paperName");
			map2.put("blurSvalue", searchMap.get("searchName"));
			map.put("searchMap", map2);
		}
		String gsonResponse = HTTPClientUtils.httpPostRequestJson(urlReq, gson.toJson(map));
		logger.debug("资源库返回数据：" + gsonResponse);
		return gsonResponse;
	}

	@Override
	public ExamDataDetailModel getPaperDetail(String paperId) throws JsonSyntaxException {
		String urlReq = MessageFormat.format(paperUrl,paperId);
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		ExamDataDetailModel baseDatas = new ExamDataDetailModel();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse, ExamDataDetailModel.class);
		}
		return baseDatas;
	}

	@Override
	public CourseVideoResponseModel getCourseVideoPage(String subject, String searchName,int page,int rows) throws JsonSyntaxException,Exception {
		String urlReq = coursesUrl;
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("subjectCode", subject);
		map.put("videoName", searchName);
		map.put("page", page);
		map.put("rows", rows);
		String gsonResponse = HTTPClientUtils.httpPostRequestJson(urlReq,gson.toJson(map));
		logger.debug("资源库返回数据：" + gsonResponse);
		CourseVideoResponseModel baseDatas = gson.fromJson(gsonResponse, CourseVideoResponseModel.class);
		return baseDatas;
	}

	@Override
	public CourseVideoResponseModel getCourseVideoDetail(String courseCode) throws JsonSyntaxException {
		String urlReq = MessageFormat.format(courseUrl,courseCode);
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		CourseVideoResponseModel courseVideoResponse = gson.fromJson(gsonResponse, CourseVideoResponseModel.class);
		return courseVideoResponse;
	}

	@Override
	public List<BaseData> getSubjectList() throws JsonSyntaxException {
		String urlReq = subjectNOUrl;
		String gsonResponse = HTTPClientUtils.httpGetRequestJson(urlReq);
		logger.debug("资源库返回数据：" + gsonResponse);
		List<BaseData> baseDatas = new ArrayList<BaseData>();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDatas = gson.fromJson(gsonResponse,  new TypeToken<List<BaseData>>() { }.getType());
		}
		return baseDatas;
	}


}
