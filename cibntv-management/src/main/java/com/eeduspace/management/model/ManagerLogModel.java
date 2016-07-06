package com.eeduspace.management.model;


public class ManagerLogModel {
	
	    private Long id;
	    //管理员ID
	    private Long managerId;
	    //管理员uuid
	    private String resourceId;
	    //请求方 Ip
	    private String sourceIp;
	    //管理员用户名
	    private String module;
	    //请求地址
	    private String action;
	    //请求操作结果
	    private Boolean result;
	    //请求操作方式（get，post）
	    private String description;
	    //请求requestId
	    private String requestId;
	    //创建时间
	    private String createDate;
	    
	    
	    /**当前页数**/
		private int currentPage;
		/**显示条数*/
		private int size = 10;
		/**总页数**/
		private int totalPage;
		/**总条数*/
		private int totalSize;
		//查询参数
		private String queryName;
		public Long getId() {
			return id;
		}
		public void setId(Long id) {
			this.id = id;
		}
		public Long getManagerId() {
			return managerId;
		}
		public void setManagerId(Long managerId) {
			this.managerId = managerId;
		}
		public String getResourceId() {
			return resourceId;
		}
		public void setResourceId(String resourceId) {
			this.resourceId = resourceId;
		}
		public String getSourceIp() {
			return sourceIp;
		}
		public void setSourceIp(String sourceIp) {
			this.sourceIp = sourceIp;
		}
		public String getModule() {
			return module;
		}
		public void setModule(String module) {
			this.module = module;
		}
		public String getAction() {
			return action;
		}
		public void setAction(String action) {
			this.action = action;
		}
		public Boolean getResult() {
			return result;
		}
		public void setResult(Boolean result) {
			this.result = result;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getRequestId() {
			return requestId;
		}
		public void setRequestId(String requestId) {
			this.requestId = requestId;
		}
		public String getCreateDate() {
			return createDate;
		}
		public void setCreateDate(String createDate) {
			this.createDate = createDate;
		}
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
		public int getTotalSize() {
			return totalSize;
		}
		public void setTotalSize(int totalSize) {
			this.totalSize = totalSize;
		}
		public String getQueryName() {
			return queryName;
		}
		public void setQueryName(String queryName) {
			this.queryName = queryName;
		}
	    
	    

}
