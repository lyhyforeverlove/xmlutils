package com.eeduspace.management.model;

/**
 * @author songwei
 *	Date 2016-05-12
 *	Describe 课程视频Model
 */
public class CourseVideoModel {

	//视频id
	private String id;
	//视频名称
	private String videoName;
	private String video_name;
	//视频描述
	private String video_desc = null;
	//视频播放地址
	private String video_url = null;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getVideo_desc() {
		return video_desc;
	}
	public void setVideo_desc(String video_desc) {
		this.video_desc = video_desc;
	}
	public String getVideo_url() {
		return video_url;
	}
	public void setVideo_url(String video_url) {
		this.video_url = video_url;
	}
	public String getVideoName() {
		return videoName;
	}
	public void setVideoName(String videoName) {
		this.videoName = videoName;
	}
	public String getVideo_name() {
		return video_name;
	}
	public void setVideo_name(String video_name) {
		this.video_name = video_name;
	}


}
