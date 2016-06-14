package com.eeduspace.management.model;

import java.util.Map;

/**
 * @author songwei
 * 2016年4月20日
 * Description  试卷model
 */
public class PaperModel {
	/**
	 * 试卷code
	 */
	private String id;
	/**
	 * 试卷名称
	 */
	private String paperName;
	/**
	 * 试卷属性（1：单元测试 2：期中考试 3：期末考试 4：中考模拟 5：高考真题）:待修改
	 * */
	private Map<String, String> type;
	
	private String paperType;
	
	private String typeName;
	
	private String price;
	/**
	 * 学期
	 * */
	private String semester;
	/**
	 * 创建人
	 * */
	private String createName;
	/**
	 * 创建时间：待修改
	 * */
	private String createDateStr;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPaperName() {
		return paperName;
	}
	public void setPaperName(String paperName) {
		this.paperName = paperName;
	}
	public String getSemester() {
		return semester;
	}
	public void setSemester(String semester) {
		this.semester = semester;
	}
	public String getCreateName() {
		return createName;
	}
	public void setCreateName(String createName) {
		this.createName = createName;
	}
	public Map<String, String> getType() {
		return type;
	}
	public void setType(Map<String, String> type) {
		this.type = type;
	}
	public String getCreateDateStr() {
		return createDateStr;
	}
	public void setCreateDateStr(String createDateStr) {
		this.createDateStr = createDateStr;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getPaperType() {
		return paperType;
	}
	public void setPaperType(String paperType) {
		this.paperType = paperType;
	}
	
}
