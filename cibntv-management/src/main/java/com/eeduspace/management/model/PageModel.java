package com.eeduspace.management.model;

public class PageModel {
	 /**
     * 当前页
     */
    private Integer currentPage;
    /**
     * 显示条数
     */
    private Integer size;
    /**
     * 总页数
     */
    private Integer totalPage;
    /**
     * 总记录条数
     */
    private Long totalRecords;
	public Integer getCurrentPage() {
		return currentPage;
	}
	public void setCurrentPage(Integer currentPage) {
		this.currentPage = currentPage;
	}
	public Integer getSize() {
		return size;
	}
	public void setSize(Integer size) {
		this.size = size;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public Long getTotalRecords() {
		return totalRecords;
	}
	public void setTotalRecords(Long totalRecords) {
		this.totalRecords = totalRecords;
	} 
}
