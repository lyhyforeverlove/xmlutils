package com.eeduspace.management.model;

import java.util.List;




public class BaseDataModel {

	//学段code
	private String stageCode;
	private String stageName;
	//学年code
	private String gradeCode;
	private String gradeName;
	//学科code
	private String subjectCode;
	private String subjectName;
	//教材code
	private String bookTypeCode;
	private String bookTypeName;
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
	
	//分页属性
	private Integer cp;
	private Integer pageSize = 10;
	private Integer totalPage;
	private Integer item;
	
	//查询属性
	private String searchName;
	private String searchValue;
	private String paperType;
	private String paperTypeName;
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
	public String getStageName() {
		return stageName;
	}
	public void setStageName(String stageName) {
		this.stageName = stageName;
	}
	public String getGradeName() {
		return gradeName;
	}
	public void setGradeName(String gradeName) {
		this.gradeName = gradeName;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public String getBookTypeName() {
		return bookTypeName;
	}
	public void setBookTypeName(String bookTypeName) {
		this.bookTypeName = bookTypeName;
	}
	public String getPaperTypeName() {
		return paperTypeName;
	}
	public void setPaperTypeName(String paperTypeName) {
		this.paperTypeName = paperTypeName;
	}





}
