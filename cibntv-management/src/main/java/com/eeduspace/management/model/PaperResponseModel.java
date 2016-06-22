package com.eeduspace.management.model;

import java.util.List;

import com.eeduspace.management.model.PaperModel;

public class PaperResponseModel {
	private Integer cp;
	private Integer pageSize = 10;
	private Integer totalPage;
	private Integer item;
	
	private String stageCode;
	private String statgeName;
	private String gradeCode;
	private String gradeName;
	private String subjectCode;
	private String subjectName;
	private String bookTypeCode;
	private String bookTypeName;
	private String searchName;
	private String searchValue;
	private String paperType;
	private String paperTypeName;

	private List<PaperModel> paperDatas;
	private List<PaperTypeModel> paperTypeDatas;
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
	public List<PaperModel> getPaperDatas() {
		return paperDatas;
	}
	public void setPaperDatas(List<PaperModel> paperDatas) {
		this.paperDatas = paperDatas;
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
	public String getStatgeName() {
		return statgeName;
	}
	public void setStatgeName(String statgeName) {
		this.statgeName = statgeName;
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
	public List<PaperTypeModel> getPaperTypeDatas() {
		return paperTypeDatas;
	}
	public void setPaperTypeDatas(List<PaperTypeModel> paperTypeDatas) {
		this.paperTypeDatas = paperTypeDatas;
	}
	public String getPaperTypeName() {
		return paperTypeName;
	}
	public void setPaperTypeName(String paperTypeName) {
		this.paperTypeName = paperTypeName;
	}

}
