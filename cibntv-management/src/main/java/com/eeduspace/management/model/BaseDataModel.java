package com.eeduspace.management.model;

import java.util.List;

import com.eeduspace.management.model.PaperModel;




public class BaseDataModel {

	//学段code
	private String stageCode;
	//学年code
	private String gradeCode;
	//学科code
	private String subjectCode;
	//教材code
	private String bookTypeCode;
	//教材版本上下册code
	private String bookTypeVersionCode;
	//单元code
	private String unitCode;
	//其他返回code
	private String ctbCode;
	//课程code
	private String courseCode;
	//产生式code
	private String productionCode;
	//视频对象集合
	private List<CourseVideoModel> reponseVedio;
	//视频播放地址
	private String urlWeVideo;
	//试卷对象集合
	private List<PaperModel> paperDatas;
	
	//分页属性
	private Integer cp;
	private Integer pageSize;
	private Integer totalPage;
	private Integer item;
	
	//查询属性
	private String searchName;
	private String searchValue;
	private String paperType;
	private String paperCode;
	
	public List<CourseVideoModel> getReponseVedio() {
		return reponseVedio;
	}
	public void setReponseVedio(List<CourseVideoModel> reponseVedio) {
		this.reponseVedio = reponseVedio;
	}
	public String getCtbCode() {
		return ctbCode;
	}
	public void setCtbCode(String ctbCode) {
		this.ctbCode = ctbCode;
	}
	public String getUrlWeVideo() {
		return urlWeVideo;
	}
	public void setUrlWeVideo(String urlWeVideo) {
		this.urlWeVideo = urlWeVideo;
	}
	public String getCourseCode() {
		return courseCode;
	}
	public void setCourseCode(String courseCode) {
		this.courseCode = courseCode;
	}
	public String getProductionCode() {
		return productionCode;
	}
	public void setProductionCode(String productionCode) {
		this.productionCode = productionCode;
	}
	public String getStageCode() {
		return stageCode;
	}
	public void setStageCode(String stageCode) {
		this.stageCode = stageCode;
	}
	public String getGradeCode() {
		return gradeCode;
	}
	public void setGradeCode(String gradeCode) {
		this.gradeCode = gradeCode;
	}
	public String getSubjectCode() {
		return subjectCode;
	}
	public void setSubjectCode(String subjectCode) {
		this.subjectCode = subjectCode;
	}
	public String getBookTypeCode() {
		return bookTypeCode;
	}
	public void setBookTypeCode(String bookTypeCode) {
		this.bookTypeCode = bookTypeCode;
	}
	public String getBookTypeVersionCode() {
		return bookTypeVersionCode;
	}
	public void setBookTypeVersionCode(String bookTypeVersionCode) {
		this.bookTypeVersionCode = bookTypeVersionCode;
	}
	public String getUnitCode() {
		return unitCode;
	}
	public void setUnitCode(String unitCode) {
		this.unitCode = unitCode;
	}
	public List<PaperModel> getPaperDatas() {
		return paperDatas;
	}
	public void setPaperDatas(List<PaperModel> paperDatas) {
		this.paperDatas = paperDatas;
	}
	public Integer getCp() {
		return cp;
	}
	public void setCp(Integer cp) {
		this.cp = cp;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public Integer getItem() {
		return item;
	}
	public void setItem(Integer item) {
		this.item = item;
	}
	public String getSearchName() {
		return searchName;
	}
	public void setSearchName(String searchName) {
		this.searchName = searchName;
	}
	public String getSearchValue() {
		return searchValue;
	}
	public void setSearchValue(String searchValue) {
		this.searchValue = searchValue;
	}
	public String getPaperType() {
		return paperType;
	}
	public void setPaperType(String paperType) {
		this.paperType = paperType;
	}
	public String getPaperCode() {
		return paperCode;
	}
	public void setPaperCode(String paperCode) {
		this.paperCode = paperCode;
	}





}
