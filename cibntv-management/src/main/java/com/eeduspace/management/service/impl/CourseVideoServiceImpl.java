package com.eeduspace.management.service.impl;

import java.text.MessageFormat;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.eeduspace.management.model.BaseDataModel;
import com.eeduspace.management.service.CourseVideoService;
import com.eeduspace.uuims.comm.util.HTTPClientUtils;
import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;

/**
 * @author songwei
 * Date 2016-05-16
 * Describe 课程视频业务数据实现
 */
@Service
public class CourseVideoServiceImpl implements CourseVideoService {
	
	private final Logger logger = LoggerFactory.getLogger(CourseVideoServiceImpl.class);
	private Gson gson = new Gson();
	
	@Value("${cibn.subject.url}")
	private String subjectUrl;
	@Value("${cibn.courses.url}")
	private String coursesUrl;
	@Value("${cibn.course.url}")
	private String courseUrl;
	
	@Override
	public BaseDataModel getCousreVideos(BaseDataModel baseDataModel) throws JsonSyntaxException{
		String coursesReq = MessageFormat.format(coursesUrl,baseDataModel.getUnitCode());
		String gsonResponse= HTTPClientUtils.httpGetRequestJson(coursesReq);
		logger.debug("资源库返回的数据：" + gsonResponse);
		BaseDataModel baseDataModel2 = new BaseDataModel();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDataModel2 = gson.fromJson(gsonResponse, BaseDataModel.class);
			baseDataModel2.setCourseCode(baseDataModel.getCourseCode());
			baseDataModel2.setProductionCode(baseDataModel.getProductionCode());
		}
		return baseDataModel2;
	}

	@Override
	public BaseDataModel getCousreVideo(BaseDataModel baseDataModel) {
		String courseReq = MessageFormat.format(courseUrl, baseDataModel.getCourseCode());
		String gsonResponse= HTTPClientUtils.httpGetRequestJson(courseReq);
		logger.debug("资源库返回的数据：" + gsonResponse);
		BaseDataModel baseDataModel2 = new BaseDataModel();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDataModel2 = gson.fromJson(gsonResponse, BaseDataModel.class);
			baseDataModel2.setCourseCode(baseDataModel.getCourseCode());
			baseDataModel2.setProductionCode(baseDataModel.getProductionCode());
		}
		return baseDataModel2;
	}
	
	//没有接口
	@Override
	public BaseDataModel getSubjects(BaseDataModel baseDataModel) {
		String coursesReq = MessageFormat.format(coursesUrl,baseDataModel.getUnitCode());
		String gsonResponse= HTTPClientUtils.httpGetRequestJson(coursesReq);
		logger.debug("资源库返回的数据：" + gsonResponse);
		BaseDataModel baseDataModel2 = new BaseDataModel();
		if(StringUtils.isNotBlank(gsonResponse)){
			baseDataModel2 = gson.fromJson(gsonResponse, BaseDataModel.class);
			baseDataModel2.setCourseCode(baseDataModel.getCourseCode());
			baseDataModel2.setProductionCode(baseDataModel.getProductionCode());
		}
		return baseDataModel2;
	}


}
