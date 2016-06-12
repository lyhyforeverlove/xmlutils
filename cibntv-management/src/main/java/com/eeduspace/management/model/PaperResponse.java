package com.eeduspace.management.model;

import java.util.List;

import com.eeduspace.management.model.PaperModel;

public class PaperResponse {
	private Integer cp;
	private Integer pageSize;
	private Integer totalPage;
	private Integer item;
	private List<PaperModel> paperDatas;
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
	
}
