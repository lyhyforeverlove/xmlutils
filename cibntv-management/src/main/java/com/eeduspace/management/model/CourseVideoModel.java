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
	private String video_name = null;
	//视频类型
	private String video_type = null;
	//视频讲师
	private String create_name = null;
	//视频描述
	private String video_desc = null;
	//视频播放地址
	private String video_url = null;
	//视频关联所有产生式
	private String production_code = null;
	//视频初始价格
	private String video_price = null;
	//视频所属学年
	private String grade_code = null;
	//视频难易程度（难中易）
	private String difficult_star = null;
	//学科code
	private String subject_code;
	//视频时长
	private String video_duration = null;
	//视频收藏状态
	private Boolean isDel;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getVideo_name() {
		return video_name;
	}
	public void setVideo_name(String video_name) {
		this.video_name = video_name;
	}
	public String getVideo_type() {
		return video_type;
	}
	public void setVideo_type(String video_type) {
		this.video_type = video_type;
	}
	public String getCreate_name() {
		return create_name;
	}
	public void setCreate_name(String create_name) {
		this.create_name = create_name;
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
	public String getProduction_code() {
		return production_code;
	}
	public void setProduction_code(String production_code) {
		this.production_code = production_code;
	}
	public String getVideo_price() {
		return video_price;
	}
	public void setVideo_price(String video_price) {
		this.video_price = video_price;
	}
	public String getGrade_code() {
		return grade_code;
	}
	public void setGrade_code(String grade_code) {
		this.grade_code = grade_code;
	}
	public String getDifficult_star() {
		return difficult_star;
	}
	public void setDifficult_star(String difficult_star) {
		this.difficult_star = difficult_star;
	}
	public String getSubject_code() {
		return subject_code;
	}
	public void setSubject_code(String subject_code) {
		this.subject_code = subject_code;
	}
	public String getVideo_duration() {
		return video_duration;
	}
	public void setVideo_duration(String video_duration) {
		this.video_duration = video_duration;
	}
	public Boolean getIsDel() {
		return isDel;
	}
	public void setIsDel(Boolean isDel) {
		this.isDel = isDel;
	}


}
