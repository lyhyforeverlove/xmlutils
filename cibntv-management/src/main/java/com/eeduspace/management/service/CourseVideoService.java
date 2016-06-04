package com.eeduspace.management.service;

import com.eeduspace.management.model.BaseDataModel;

/**
 * @author songwei
 * Date 2016-05-16
 * Describe 课程视频业务数据
 */
public interface CourseVideoService {
	
	public BaseDataModel getCousreVideos(BaseDataModel baseDataModel);
	
	public BaseDataModel getCousreVideo(BaseDataModel baseDataModel);
	
	public BaseDataModel getSubjects(BaseDataModel baseDataModel);
	
}
