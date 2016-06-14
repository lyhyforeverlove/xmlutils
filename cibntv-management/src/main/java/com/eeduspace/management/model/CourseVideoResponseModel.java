package com.eeduspace.management.model;

import java.util.List;

public class CourseVideoResponseModel {


	private int total;
	private int curPage;
	private int pageSize;
	private int pagetotal;

	//视频对象集合
	private List<CourseVideoModel> videoList;
	
	private List<CourseVideoModel> reponseVedio;

	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public int getCurPage() {
		return curPage;
	}

	public void setCurPage(int curPage) {
		this.curPage = curPage;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPagetotal() {
		return pagetotal;
	}

	public void setPagetotal(int pagetotal) {
		this.pagetotal = pagetotal;
	}

	public List<CourseVideoModel> getVideoList() {
		return videoList;
	}

	public void setVideoList(List<CourseVideoModel> videoList) {
		this.videoList = videoList;
	}

	public List<CourseVideoModel> getReponseVedio() {
		return reponseVedio;
	}

	public void setReponseVedio(List<CourseVideoModel> reponseVedio) {
		this.reponseVedio = reponseVedio;
	}
	
	

}
