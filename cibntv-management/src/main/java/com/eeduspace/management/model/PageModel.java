package com.eeduspace.management.model;

public class PageModel {
	 /**
     * 当前页
     */
    private int currentPage;
    /**
     * 显示条数
     */
    private int size;
    /**
     * 总页数
     */
    private int totalPage;
    /**
     * 总记录条数
     */
    private Long totalRecords;
	public int getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}
	public int getSize() {
		return size;
	}
	public void setSize(int size) {
		this.size = size;
	}
	public int getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}
	public Long getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(Long totalRecords) {
		this.totalRecords = totalRecords;
	} 
}
