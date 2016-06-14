package com.eeduspace.management.client;

import java.util.List;
import java.util.Map;

import com.eeduspace.management.model.BaseData;
import com.eeduspace.management.model.CourseVideoResponseModel;
import com.eeduspace.management.model.ExamDataDetailModel;
import com.google.gson.JsonSyntaxException;


/**
 * @author songwei
 * Date 2016-05-16
 * Describe 资源库基础数据接口
 *
 */
public interface BaseDataClient {
	
	/**
	 * 学段
	 * */
	public List<BaseData> getStageList() throws JsonSyntaxException;
	/**
	 * 学年
	 * */
	public List<BaseData> getGradeList(String stageCode) throws JsonSyntaxException;
	/**
	 * 学科(有)
	 * */
	public List<BaseData> getSubjectList() throws JsonSyntaxException;
	public List<BaseData> getSubjectList(String gradeCode) throws JsonSyntaxException;
	/**
	 * 教材
	 * */
	public List<BaseData> getBookTypeList(String gradeCode,String subjectCode) throws JsonSyntaxException;
	/**
	 * 试卷列表
	 * */
	public String getPaperPage(String grade,String subject,String bookType,String paperType,Map<String, String> searchMap,int cp,int size) throws Exception;
	/**
	 * 试卷详情
	 * */
	public ExamDataDetailModel getPaperDetail(String paperId) throws JsonSyntaxException;
	/**
	 * 视频列表
	 * */
	public CourseVideoResponseModel getCourseVideoPage(String subject,String searchName,int page,int rows) throws JsonSyntaxException,Exception;
	/**
	 * 视频详情
	 * */
	public CourseVideoResponseModel getCourseVideoDetail(String courseCode) throws JsonSyntaxException;
	
	
}
